import { AudioChunk, AudioChunkFeedback } from "@audio";
import { useWebSocket } from "@websocket";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { loggerFactory } from "@common";
import AudioBufferManager from "../audio/AudioBufferManager";

const logger = loggerFactory.getLogger("Audio.Buffer");

interface useAudioBufferProps {
    mediaSourceRef: RefObject<MediaSource | null>;
    currentStreamIdRef: RefObject<string | null>
}

export function useAudioBuffer({ currentStreamIdRef }: useAudioBufferProps) {

    const [sourceBuffer, setSourceBuffer] = useState<SourceBuffer | null>(null);

    const bufferManagerRef = useRef<AudioBufferManager | null>(null);

    const onBufferUpdateRef = useRef<(() => void) | null>(null);

    const { addOnConnectHandler } = useWebSocket();

    const setBufferUpdateHandler = useCallback(
        (callback: () => void) => {
            onBufferUpdateRef.current = callback;
        }, []);

    useEffect(() => {
        if (!sourceBuffer) {
            return;
        }

        const manager = new AudioBufferManager(
            () => onBufferUpdateRef.current?.()
        );

        manager.setSourceBuffer(sourceBuffer);

        bufferManagerRef.current = manager;

        return () => {
            manager.reset();
            bufferManagerRef.current = null;
        };
    }, [sourceBuffer]);

    /**
     * Resets the source buffer
     */
    const resetBuffer = useCallback(() => {
        const manager = bufferManagerRef.current;

        if (!manager) {
            return;
        }

        manager.reset();
    }, []);

    /**
     * Вызывается на каждый chunk от backend.
     */
    const handleAudioChunk = useCallback((chunk: AudioChunk) => {

        logger.debug(`Получен ${chunk.initialization ? "init" : "media"} chunk: ${chunk.sequence}`);

        const manager = bufferManagerRef.current;

        if (!manager) {
            return;
        }

        manager.addChunk(chunk);

        const streamId = currentStreamIdRef.current;

        if (streamId) manager.processQueue(streamId);
    }, []);

    useEffect(() => {
        const unsubscribe = addOnConnectHandler((client) => {

            const audioSub = client.subscribe(`/user/queue/audio`, (message) => {
                const chunk: AudioChunk = {
                    bytes: message.binaryBody,
                    sequence: Number(message.headers["sequence"]),
                    duration: Number(message.headers["duration"]),
                    entryId: Number(message.headers["entry-id"]),
                    streamId: message.headers["stream-id"],
                    initialization: message.headers["initialization"] === "true"
                };

                logger.debug("Пришёл чанк: ", chunk.sequence)

                handleAudioChunk(chunk);

                const chunkFeedback: AudioChunkFeedback = {
                    streamId: chunk.streamId,
                    sequence: chunk.sequence,
                    initialization: chunk.initialization
                }

                client.publish({
                    destination: "/app/audio.feedback",
                    body: JSON.stringify(chunkFeedback)
                });
            });

            return () => {
                audioSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    return {
        setBufferUpdateHandler,
        onBufferUpdateRef,
        sourceBuffer,
        setSourceBuffer,
        resetBuffer
    }
}