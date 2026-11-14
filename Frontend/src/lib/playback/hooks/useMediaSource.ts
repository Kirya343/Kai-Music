import { useCallback, useEffect, useRef, useState } from "react";
import { useAudioBuffer } from "./useAudioBuffer";
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Audio.MediaSource");

export const useMediaSource = () => {

    const currentStreamIdRef = useRef<string | null>(null)

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mediaSourceRef = useRef<MediaSource | null>(null);
    const objectUrlRef = useRef<string | null>(null);

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const { 
        sourceBufferRef, 
        setBufferUpdateHandler,
        onBufferUpdateRef, 
        appendChunks,
        resetBuffer
    } = useAudioBuffer({ currentStreamIdRef, mediaSourceRef });

    const createMediaSource = useCallback<(streamId: string) => HTMLAudioElement | null>((streamId: string) => {
        logger.debug("создаём новый mediaSource, streamId:", streamId)

        if (mediaSourceRef.current) {
            return audioRef.current;
        }

        currentStreamIdRef.current = streamId;

        const audio = new Audio();
        const mediaSource = new MediaSource();

        audio.autoplay = false;
        audio.controls = false;

        const objectUrl = URL.createObjectURL(mediaSource);

        audio.src = objectUrl;
        const saved = localStorage.getItem("audioVolume");
        audio.volume = saved ? Number(saved) : 1;

        audioRef.current = audio;
        mediaSourceRef.current = mediaSource;
        objectUrlRef.current = objectUrl;

        mediaSource.addEventListener('sourceopen', () => {
            logger.debug('MediaSource opened');

            if (!sourceBufferRef.current) {
                const sourceBuffer = mediaSource.addSourceBuffer(
                    'audio/mp4; codecs="mp4a.40.2"'
                );

                sourceBufferRef.current = sourceBuffer;

                sourceBuffer.addEventListener('updateend', () => {
                    const currentStreamId = currentStreamIdRef.current;

                    if (!currentStreamId) {
                        return;
                    }

                    onBufferUpdateRef.current?.();
                });

                sourceBuffer.addEventListener('error', event => {
                    logger.error(
                        'SourceBuffer error:',
                        event
                    );
                });
            }

            mediaSource.addEventListener('error', event => {
                logger.error(
                    'MediaSource error:',
                    event
                );
            });
        });

        setAudio(audio);

        return audio;
    }, [])
    
    useEffect(() => {
        logger.debug("audio updated", audio)
    }, [audio])

    const cleanupMediaSource = useCallback(() => {
        const audioElement = audioRef.current;

        if (audioElement) {
            audioElement.pause();
            audioElement.removeAttribute("src");
            audioElement.load();
        }

        if (objectUrlRef.current) {
            URL.revokeObjectURL(objectUrlRef.current);
        }

        audioRef.current = null;
        mediaSourceRef.current = null;
        objectUrlRef.current = null;

        resetBuffer();

        setAudio(null);
    }, []);

    return {
        audio,
        audioRef,
        mediaSourceRef,
        createMediaSource,
        cleanupMediaSource,
        currentStreamIdRef,

        setBufferUpdateHandler,
        appendChunks,
        resetBuffer
    };
}