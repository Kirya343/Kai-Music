import { useGlobal } from "@common";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { IPlaybackState } from "../playbackTypes";
import { useWebSocket } from "@websocket";
import { playbackService } from "../services";

interface usePlaybackProps {
    roomId: number | null;

    audio: HTMLAudioElement | null,
    createMediaSource: (entryId: number) => HTMLAudioElement | null,
    cleanupMediaSource: () => void,
    currentEntryIdRef: RefObject<number | null>

    setBufferUpdateHandler: (callback: (entryId: number) => void) => void
}

export const usePlayback = ({
    roomId,

    audio, 
    createMediaSource, 
    cleanupMediaSource, 
    currentEntryIdRef,

    setBufferUpdateHandler
}: usePlaybackProps) => {

    const { started } = useGlobal();
    const { addOnConnectHandler } = useWebSocket();

    const unsyncedStateRef = useRef<IPlaybackState | null>(null);
    const debounceTimeoutRef = useRef<number | null>(null);

    // audio state
    const [playbackState, setPlaybackState] = useState<IPlaybackState | null>(null);

    /**
     * Pauses playing audio
     */
    const pausePlayback = useCallback(() => {
        if (!audio) {
            return;
        }

        audio.pause();
    }, []);

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

            console.log(
                'Ошибка запуска audio:',
                error
            );
        }
    }, []);

    // Play / Pause кнопка
    const togglePlay = useCallback(async () => {

        if (!playbackState || !roomId) return;

        const newPaused = !playbackState?.pause

        if (newPaused) {
            pausePlayback()
        }

        await playbackService.updateTrackPosition(roomId, {...playbackState, pause: newPaused});
    }, [playbackState, roomId]);

    const seek = useCallback((position: number) => {

        if (!playbackState?.entryId || !roomId) return;

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
                    await playbackService.updateTrackPosition(roomId, newState);
                }
                debounceTimeoutRef.current = null;
            }, 100);
        }
    }, [playbackState, pausePlayback, roomId]);

    /**
     * Starts playing audio if last playbackState isn't paused and 
     * audio is loaded on current position
     */
    const playIfBuffered = useCallback(() => {
        console.log("попытка начать воспроизведение", started)

        if (!started) return;

        const state = unsyncedStateRef.current;

        console.log("audio", audio, "state", state)

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
            console.warn(
                'Требуемая позиция не буферизирована',
                state.position
            );
            return;
        }

        audio.currentTime = state.position;
        unsyncedStateRef.current = null;

        if (!state.pause) {
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
    const initMediaSource = useCallback((entryId: number) => {

        const audio = createMediaSource(entryId);

        if (!audio) return;

        addTimeUpdateListener(audio);
    }, [addTimeUpdateListener, createMediaSource]);

    const startNewAudio = useCallback((entryId: number) => {
        console.log("Начинаем новый media resource");

        cleanupMediaSource();
        initMediaSource(entryId);
    }, [cleanupMediaSource, initMediaSource]);

    useEffect(() => {
        const unsubscribe = addOnConnectHandler((client) => {

            const playbackSub = client.subscribe(`/user/queue/playback`, (message) => {
                const state: IPlaybackState = JSON.parse(message.body);

                console.log("Пришло обновление playback: ", state)

                if (currentEntryIdRef.current !== state.entryId) {
                    startNewAudio(state.entryId);
                }

                setPlaybackState(state);
                unsyncedStateRef.current = state;
                playIfBufferedRef.current();
            });

            return () => {
                playbackSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    return {
        pausePlayback,
        resumePlayback,
        playbackState,
        togglePlay,
        seek
    }
}