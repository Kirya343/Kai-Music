import { countPosition, useGlobal } from "@common";
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PlaybackState, PlaybackMode, PlaybackData, PlaybackEventType } from "../playback.types";
import { useWebSocket } from "@websocket";
import { playbackService } from "../services";
import { loggerFactory } from "@common";
import { Playlist } from "@playlist";
import { Client } from "@stomp/stompjs";
import { IAudio } from "@audio";
import { useNavigate } from "react-router-dom";

const logger = loggerFactory.getLogger("Audio.Playback");

interface usePlaybackProps {
    audio: HTMLAudioElement | null,
    createMediaSource: (entryId: string) => HTMLAudioElement | null,
    cleanupMediaSource: () => void,
    currentStreamIdRef: RefObject<string | null>

    setBufferUpdateHandler: (callback: () => void) => void
}

export const usePlaybackController = ({
    audio, 
    createMediaSource, 
    cleanupMediaSource, 
    currentStreamIdRef,

    setBufferUpdateHandler
}: usePlaybackProps) => {

    const [playbackPlaylist, setPlaybackPlaylist] = useState<Playlist | null>(() => {
        const saved = localStorage.getItem("playback.playlist");

        return saved ? JSON.parse(saved) : null;
    });

    const { addOnConnectHandler } = useWebSocket();

    const unsyncedStateRef = useRef<PlaybackState | null>(null);
    const debounceTimeoutRef = useRef<number | null>(null);
    const awaitingStateRef = useRef(false);
    const prevPlaybackStateRef = useRef<PlaybackState | null>(null);

    // audio state
    const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);

    // state to increase the fastmutable position 
    const [position, setPosition] = useState<number>(0);
    const [autoPlay, setAutoPlay] = useState<boolean>(false);

    const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(PlaybackMode.NORMAL);
    const [playbackData, setPlaybackData] = useState<PlaybackData>({})
    const [playingAudio, setPlayingAudio] = useState<IAudio | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const audio = playbackPlaylist?.queue.find(
            qi => qi.id === playbackState?.entryId
        )?.audio;

        if (audio) {
            setPlayingAudio(audio);
        }
    }, [playbackPlaylist, playbackState]);

    // info
    const updateMessage = useMemo<string>(() => {
        if (!playbackState || !prevPlaybackStateRef.current) return "";

        const newState = playbackState;
        const prevState = prevPlaybackStateRef.current;

        let message = `${newState.user} `

        if (newState.entryId != prevState.entryId) {
            message += `started playing track #${newState.entryId}`;
        } else if (newState.pause != prevState.pause && newState.pause) {
            message += `paused the playback`
        } else if (newState.pause != prevState.pause && !newState.pause) {
            message += `resumed playback`
        } else if (newState.position != prevState.position) {
            message += `seeked to ${countPosition(newState.position)}`
        }

        prevPlaybackStateRef.current = playbackState

        return message;
    }, [playbackState]);

    /**
     * Pauses playing audio
     */
    const pausePlayback = useCallback(() => {
        if (!audio) {
            return;
        }

        audio.pause();
    }, [audio]);

    /**
     * Resumes playing audio
     */
    const resumePlayback = useCallback(async () => {

        if (!audio) {
            return;
        }

        try {
            await audio.play();

            setAutoPlay(true);

        } catch (error) {
            if (
                error instanceof DOMException &&
                error.name === 'AbortError'
            ) {
                return;
            }

            logger.error(
                'Ошибка запуска audio:',
                error
            );
        }
    }, [audio]);

    // Play / Pause кнопка
    const togglePlay = useCallback(async () => {

        if (!playbackState) return;

        const newPaused = !playbackState?.pause

        setAutoPlay(true);

        if (newPaused) {
            pausePlayback()
        }

        await playbackService.updateTrackPosition({...playbackState, position, pause: newPaused, });
    }, [playbackState, position]);

    const seek = useCallback((position: number) => {

        if (!playbackState?.entryId) return;

        awaitingStateRef.current = true;
        setAutoPlay(true);

        try {
            pausePlayback();
        } finally {

            const newState = ({...playbackState, position})
            unsyncedStateRef.current = newState
            setPlaybackState(newState)

            // отменяем предыдущий таймаут, если был
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }

            // ставим новый таймаут на 300 мс
            debounceTimeoutRef.current = setTimeout(async () => {
                if (playbackState) {
                    await playbackService.updateTrackPosition(newState);
                }
                debounceTimeoutRef.current = null;
            }, 100);
        }
    }, [playbackState, pausePlayback]);

    /**
     * Starts playing audio if last playbackState isn't paused and 
     * audio is loaded on current position
     */
    const playIfBuffered = useCallback(() => {

        if (!autoPlay || awaitingStateRef.current) return;

        const state = unsyncedStateRef.current;

        //logger.debug("audio", audio, "state", state)

        if (!audio || !state) return;

        const isBuffered = Array.from(
            { length: audio.buffered.length },
            (_, i) => ({
                start: audio.buffered.start(i),
                end: audio.buffered.end(i)
            })
        ).some(
            range =>
                state.position >= range.start &&
                state.position <= range.end
        );

        if (!isBuffered) {
            logger.warn(
                'Требуемая позиция не буферизирована',
                state.position
            );
            return;
        }

        audio.currentTime = state.position;
        unsyncedStateRef.current = null;

        if (!state.pause) {
            logger.debug("начинаем проигрываание")
            setPlaybackState(prev => ({ ...prev!, pause: false }));
            resumePlayback();
        }
    }, [audio, autoPlay, setPlaybackState, resumePlayback]);

    useEffect(() => {
        playIfBuffered();
    }, [playIfBuffered]);

    const playIfBufferedRef = useRef(playIfBuffered);

    useEffect(() => {
        playIfBufferedRef.current = playIfBuffered;
    }, [playIfBuffered]);

    useEffect(() => {
        setBufferUpdateHandler(() => {
            playIfBufferedRef.current();
        });

        return () => {
            setBufferUpdateHandler(() => {});
        };
    }, [setBufferUpdateHandler]);

    /**
     * Adds listners to HTMLAudioElement events
     */
    const addTimeUpdateListener = useCallback(
        (audio: HTMLAudioElement) => {
            const handleTimeUpdate = () => {
                if (unsyncedStateRef.current !== null) {
                    return;
                }

                setPosition(prev => {
                    if (prev === null) {
                        return prev;
                    }

                    return audio.currentTime;
                });
            };

            audio.addEventListener("timeupdate", handleTimeUpdate);

            return () => {
                audio.removeEventListener("timeupdate", handleTimeUpdate);
            };
        },
        [setPlaybackState]
    );

    /**
     * Inits media resource, when came new entryId
     */
    const initMediaSource = useCallback((streamId: string) => {

        const audio = createMediaSource(streamId);

        if (!audio) return;

        addTimeUpdateListener(audio);
    }, [addTimeUpdateListener, createMediaSource]);

    const startNewStream = useCallback((streamId: string) => {
        logger.debug("Начинаем новый media resource");

        cleanupMediaSource();
        initMediaSource(streamId);
    }, [cleanupMediaSource, initMediaSource]);

    const reconnect = (stompClient: Client | null) => {

        if (!stompClient) return;

        logger.debug("переподключаемся к комнате")

        stompClient.publish({
            destination: "/app/playback.reconnect",
            body: ""
        });
    }

    const resync = (stompClient: Client | null, autoPlay: boolean) => {

        if (!stompClient) return;

        logger.debug("перезагружаем состояние")

        awaitingStateRef.current = true;

        setAutoPlay(autoPlay)

        stompClient.publish({
            destination: "/app/playback.resync",
            body: ""
        });
    }

    const handleEvent = useCallback((event: PlaybackEventType) => {
        switch (event) {
            case "UNSUBSCRIBED":
                
                pausePlayback()

                setPlaybackData({})
                setPlaybackState(null)
                setPlaybackPlaylist(null)
                setPlayingAudio(null)

                if (window.location.pathname == "/app/room"){
                    navigate("/app")
                }
                break;
        
            default:
                break;
        }
    }, [pausePlayback])

    useEffect(() => {
        const unsubscribe = addOnConnectHandler((client) => {

            const playbackSub = client.subscribe(`/user/queue/playback.state`, (message) => {
                const state: PlaybackState = JSON.parse(message.body);

                const streamId = message.headers["stream-id"];

                logger.debug("Пришло обновление playback.state: ", state, streamId)

                if (currentStreamIdRef.current !== streamId) {
                    startNewStream(streamId);
                }

                awaitingStateRef.current = false;

                setPlaybackState(state);
                setPosition(state.position)
                unsyncedStateRef.current = state;
                playIfBufferedRef.current();
            });

            const playbackModeSub = client.subscribe(`/user/queue/playback.mode`, (message) => {
                const mode = JSON.parse(message.body);

                logger.debug("Пришло обновление playback.mode: ", mode)

                setPlaybackMode(mode);
            });

            const playbackPlaylistSub = client.subscribe(`/user/queue/playback.playlist`, (message) => {
                const playlist = JSON.parse(message.body);

                logger.debug("Пришло обновление playback.playlist: ", playlist)

                setPlaybackPlaylist(playlist);
            });

            const playbackDataSub = client.subscribe(`/user/queue/playback.data`, (message) => {
                const playbackData = JSON.parse(message.body);

                logger.debug("Пришло обновление playback.data: ", playbackData)

                setPlaybackData(playbackData);
            });

            const playbackEventSub = client.subscribe(`/user/queue/playback.event`, (message) => {
                const playbackEvent = JSON.parse(message.body);

                logger.debug("Пришло обновление playback.event: ", playbackEvent.type)

                handleEvent(playbackEvent.type)
            });

            logger.debug("Подписались на /user/queue/playback .mode, .playlist, .state, .data, .event")

            reconnect(client);

            return () => {
                playbackPlaylistSub.unsubscribe();
                playbackModeSub.unsubscribe();
                playbackSub.unsubscribe();
                playbackDataSub.unsubscribe();
                playbackEventSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    return {
        pausePlayback,
        resumePlayback,
        position,
        playbackState,
        playbackMode,
        playbackPlaylist,
        playbackData,
        playingAudio,
        updateMessage,
        togglePlay,
        seek,
        reconnectPlayback: reconnect,
        resyncPlayback: resync,
        autoPlay,
        setAutoPlay
    }
}