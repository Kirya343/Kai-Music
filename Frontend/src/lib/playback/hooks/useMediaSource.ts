import { useCallback, useEffect, useRef, useState } from "react";
import { useAudioBuffer } from "./useAudioBuffer";

export const useMediaSource = () => {

    const currentEntryIdRef = useRef<number | null>(null)

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const mediaSourceRef = useRef<MediaSource | null>(null);
    const objectUrlRef = useRef<string | null>(null);

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    const { 
        sourceBufferRef, 
        updateBufferedRanges, 
        setBufferUpdateHandler,
        bufferedRanges, 
        appendChunks,
        resetBuffer
    } = useAudioBuffer({ currentEntryIdRef, mediaSourceRef });

    const createMediaSource = useCallback<(entryId: number) => HTMLAudioElement | null>((entryId: number) => {
        console.log("создаём новый mediaSource")
        if (mediaSourceRef.current) {
            return audioRef.current;
        }

        currentEntryIdRef.current = entryId;

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
            console.log('MediaSource opened');

            if (!sourceBufferRef.current) {
                const sourceBuffer = mediaSource.addSourceBuffer(
                    'audio/mp4; codecs="mp4a.40.2"'
                );

                sourceBufferRef.current = sourceBuffer;

                sourceBuffer.addEventListener('updateend', () => {
                    const currentEntryId = currentEntryIdRef.current;

                    if (!currentEntryId) {
                        return;
                    }

                    updateBufferedRanges(entryId);
                });

                sourceBuffer.addEventListener('error', event => {
                    console.log(
                        'SourceBuffer error:',
                        event
                    );
                });
            }

            mediaSource.addEventListener('error', event => {
                console.log(
                    'MediaSource error:',
                    event
                );
            });
        });

        setAudio(audio);

        return audio;
    }, [])
    
    useEffect(() => {
        console.log("audio updated", audio)
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
        currentEntryIdRef,

        setBufferUpdateHandler,
        bufferedRanges, 
        appendChunks,
        resetBuffer
    };
}