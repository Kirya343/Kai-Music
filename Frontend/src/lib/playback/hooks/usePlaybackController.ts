import { useGlobal } from "@common";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { PlaybackState, PlaybackMode } from "../playbackTypes";
import { useWebSocket } from "@websocket";
import { playbackService } from "../services";
import { loggerFactory } from "@common";
import { Playlist } from "@playlist";
import { Client } from "@stomp/stompjs";

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

    const [playlist, setPlaylist] = useState<Playlist | null>(() => {
        const saved = localStorage.getItem("playback.playlist");

        return saved ? JSON.parse(saved) : null;
    });

    const { started } = useGlobal();
    const { addOnConnectHandler, client } = useWebSocket();

    const unsyncedStateRef = useRef<PlaybackState | null>(null);
    const debounceTimeoutRef = useRef<number | null>(null);
    const awaitingStateRef = useRef(false);

    // audio state
    const [playbackState, setPlaybackState] = useState<PlaybackState | null>(null);
    const [playbackMode, setPlaybackMode] = useState<PlaybackMode>(PlaybackMode.NORMAL);

    /**
     * Pauses playing audio
     */
    const pausePlayback = useCallback(() => {
        if (!audio) {
            return;
        }

        audio.pause();
    }, [audio]);

    const changeTrack = useCallback(async (changing: "next" | "prev" | number) => {
        console.log("переключаем трек на", changing)
        await playbackService.changeTrack(changing)
    }, [])

    /**
     * Resumes playing audio
     */
    const resumePlayback = useCallback(async () => {

        if (!audio) {
            return;
        }

        try {
            await audio.play();
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

        if (newPaused) {
            pausePlayback()
        }

        await playbackService.updateTrackPosition({...playbackState, pause: newPaused});
    }, [playbackState]);

    const seek = useCallback((position: number) => {

        if (!playbackState?.entryId) return;

        awaitingStateRef.current = true;

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
        logger.debug("попытка начать воспроизведение", started)

        if (!started || awaitingStateRef.current) return;

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
    }, [audio, started, setPlaybackState, resumePlayback]);

    useEffect(() => {
        playIfBuffered();
    }, [started, playIfBuffered]);

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

                setPlaybackState(prev => {
                    if (prev === null) {
                        return prev;
                    }

                    return {
                        ...prev,
                        position: audio.currentTime
                    };
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

    const reconnect = useCallback((stompClient: Client) => {

        let c: Client | null = stompClient || client

        if (!c) return;

        logger.debug("переподключаемся к комнате")

        c?.publish({
            destination: "/app/playback.reconnect",
            body: ""
        });
    }, [client])


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

                setPlaylist(playlist);
            });

            logger.debug("Подписались на /user/queue/playback .mode, .playlist, .state")

            reconnect(client);

            return () => {
                playbackPlaylistSub.unsubscribe();
                playbackModeSub.unsubscribe();
                playbackSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    return {
        pausePlayback,
        resumePlayback,
        playbackState,
        playbackMode,
        playbackPlaylist: playlist,
        togglePlay,
        seek,
        changeTrack
    }
}