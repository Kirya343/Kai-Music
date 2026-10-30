import { AudioChunk, TimeRange } from "@audio";
import { useWebSocket } from "@websocket";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Audio.Buffer");

interface useAudioBufferProps {
    mediaSourceRef: RefObject<MediaSource | null>;
    currentEntryIdRef: RefObject<number | null>
}

export function useAudioBuffer({ mediaSourceRef, currentEntryIdRef }: useAudioBufferProps) {

    const sourceBufferRef = useRef<SourceBuffer | null>(null);
    const [bufferedRanges, setBufferedRanges] = useState<Map<number, TimeRange[]>>(new Map());
    const onBufferUpdateRef = useRef<((entryId: number) => void) | null>(null);
    const queueRef = useRef<AudioChunk[]>([]);

    const { addOnConnectHandler } = useWebSocket();

    const setBufferUpdateHandler = useCallback(
        (callback: (entryId: number) => void) => {
            onBufferUpdateRef.current = callback;
        }, []);

    /**
     * Callback that updates bufferedRanges
     * 
     * @param entryId - ID of the current entry
     */
    const updateBufferedRanges = useCallback((entryId: number) => {
        const sourceBuffer = sourceBufferRef.current;

        if (!sourceBuffer) {
            return;
        }

        const ranges: TimeRange[] = [];

        for (let i = 0; i < sourceBuffer.buffered.length; i++) {
            ranges.push({
                start: sourceBuffer.buffered.start(i),
                end: sourceBuffer.buffered.end(i)
            });
        }

        setBufferedRanges(prev => {
            const updated = new Map(prev);
            updated.set(entryId, ranges);
            
            logger.debug("buffer", updated)

            return updated;
        });

        onBufferUpdateRef.current?.(entryId)
    }, []);

    /**
     * Append chunks to the buffer
     */
    const appendChunks = useCallback((chunks: AudioChunk[]) => {
        const sourceBuffer = sourceBufferRef.current;

        if (!sourceBuffer || sourceBuffer.updating || chunks.length === 0) {
            return false;
        }

        const totalSize = chunks.reduce(
            (size, chunk) => size + chunk.bytes.byteLength,
            0
        );

        const buffer = new Uint8Array(totalSize);

        let offset = 0;

        for (const chunk of chunks) {
            buffer.set(chunk.bytes, offset);
            offset += chunk.bytes.byteLength;
        }

        sourceBuffer.appendBuffer(buffer);

        return true;
    }, []);

    /**
     * Resets the source buffer
     */
    const resetBuffer = useCallback(() => {
        logger.info("Очищаем буфер")
        sourceBufferRef.current = null;
    }, []);

    const processQueue = useCallback((entryId: number) => {

        const sourceBuffer = sourceBufferRef.current;
        const mediaSource = mediaSourceRef.current;

        if (!sourceBuffer || !mediaSource) {
            return;
        }

        if (
            mediaSource.readyState !== 'open' ||
            sourceBuffer.updating
        ) {
            return;
        }

        const chunks = queueRef.current
            .filter(chunk => chunk.entryId === entryId);

        const initializationChunk = chunks.find(
            chunk => chunk.initialization
        );

        if (!initializationChunk) {
            return;
        }

        const mediaChunks = chunks
            .filter(chunk => !chunk.initialization)
            .sort((a, b) => a.sequence - b.sequence);

        if (mediaChunks.length === 0) {
            return;
        }

        const chunksToAppend: AudioChunk[] = [
            initializationChunk
        ];
        
        for (const chunk of mediaChunks) {
            chunksToAppend.push(chunk);
        }

        if (chunksToAppend.length === 1) {
            return;
        }

        if (!appendChunks(chunksToAppend)) {
            return;
        }

        logger.debug(
            'Добавлен buffer:',
            chunksToAppend.map(chunk =>
                chunk.initialization
                    ? 'init'
                    : chunk.sequence
            )
        );
    }, [appendChunks]);

    /**
     * Вызывается на каждый chunk от backend.
     */
    const handleAudioChunk = useCallback((chunk: AudioChunk) => {
        logger.debug(`Получен ${chunk.initialization ? "init" : "media"} chunk: ${chunk.sequence}`);

        queueRef.current.push(chunk);

        const entryId = currentEntryIdRef.current;

        if (entryId) processQueue(entryId);
    }, [processQueue]);

    useEffect(() => {
        const unsubscribe = addOnConnectHandler((client) => {

            const audioSub = client.subscribe(`/user/queue/audio`, (message) => {
                const chunk: AudioChunk = {
                    bytes: message.binaryBody,
                    sequence: Number(message.headers["sequence"]),
                    duration: Number(message.headers["duration"]),
                    entryId: Number(message.headers["entry-id"]),
                    initialization: message.headers["initialization"] === "true"
                };

                handleAudioChunk(chunk);
            });

            return () => {
                audioSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    return {
        updateBufferedRanges, setBufferUpdateHandler,
        bufferedRanges, onBufferUpdateRef,
        sourceBufferRef,
        appendChunks,
        setBufferedRanges,
        resetBuffer
    }
}