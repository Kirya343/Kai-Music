import { useCallback, useEffect, useRef, useState } from "react";
import { useAudioBuffer } from "./useAudioBuffer";
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Audio.MediaSource");

const MIME_TYPE = 'audio/mp4; codecs="mp4a.40.2"';

interface MediaSourceConstructor {
    new (): MediaSource;
    isTypeSupported(type: string): boolean;
}

const getMediaSourceConstructor = () => {

    const ua = navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua)
        || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    const mse = typeof MediaSource !== "undefined";
    const mediaSource = mse ? new MediaSource() : null;

    const codecs = [
        'audio/mp4; codecs="mp4a.40.2"',
        'audio/mp4; codecs="mp4a.40.5"',
        'audio/aac',
        'audio/mpeg',
        'audio/webm; codecs="opus"',
        'audio/webm; codecs="vorbis"'
    ];

    const audio = document.createElement("audio");
    const video = document.createElement("video");

    const audioContext = window.AudioContext
        || (window as Window & {
            webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

    const managedMediaSource =
            "ManagedMediaSource" in window;

    const result = {
        device: {
            userAgent: ua,
            platform: navigator.platform,
            isIOS,
            isSafari: /^((?!chrome|android).)*safari/i.test(ua),
            touchPoints: navigator.maxTouchPoints
        },

        browser: {
            secureContext: window.isSecureContext,
            online: navigator.onLine,
            serviceWorker: "serviceWorker" in navigator,
            webSocket: typeof WebSocket !== "undefined"
        },

        mse: {
            supported: mse,
            isTypeSupported: mse
                ? Object.fromEntries(
                    codecs.map(codec => [
                        codec,
                        MediaSource.isTypeSupported(codec)
                    ])
                )
                : false,

            isTypeSupportedFunction:
                typeof MediaSource?.isTypeSupported === "function",

            sourceBuffer:
                typeof SourceBuffer !== "undefined",

            sourceBufferMode:
                typeof SourceBuffer !== "undefined"
                    ? "mode" in SourceBuffer.prototype
                    : false,

            changeType:
                typeof SourceBuffer !== "undefined"
                    ? "changeType" in SourceBuffer.prototype
                    : false,
                    
            managedMediaSource
        },

        audio: {
            element: !!audio.canPlayType,
            codecs: Object.fromEntries(
                codecs.map(codec => [
                    codec,
                    audio.canPlayType(codec)
                ])
            ),
            mediaSession: "mediaSession" in navigator,
            audioContext: typeof audioContext !== "undefined",
            audioWorklet: typeof AudioWorklet !== "undefined"
        },

        video: {
            element: !!video.canPlayType,
            mse: mse && MediaSource.isTypeSupported(
                'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            ),
            requestVideoFrameCallback:
                "requestVideoFrameCallback" in video
        },

        apis: {
            requestAnimationFrame:
                typeof requestAnimationFrame === "function",
            resizeObserver:
                typeof ResizeObserver !== "undefined",
            intersectionObserver:
                typeof IntersectionObserver !== "undefined",
            abortController:
                typeof AbortController !== "undefined",
            textDecoder:
                typeof TextDecoder !== "undefined",
            crypto:
                typeof crypto !== "undefined",
            indexedDB:
                typeof indexedDB !== "undefined"
        }
    };

    console.log("=== DEVICE DIAGNOSTICS ===");
    console.log(result);
    console.table(result.mse.isTypeSupported);
    console.table(result.audio.codecs);

    const managed = (
        window as Window & {
            ManagedMediaSource?: MediaSourceConstructor;
        }
    ).ManagedMediaSource;

    if (managed?.isTypeSupported(MIME_TYPE)) {
        return {
            constructor: managed,
            managed: true
        };
    }

    return {
        constructor: MediaSource,
        managed: false
    };
};

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
        
        const { constructor: MediaSourceConstructor, managed } =
            getMediaSourceConstructor();

        const mediaSource = new MediaSourceConstructor();

        audio.autoplay = false;
        audio.controls = false;

        if (managed) {
            audio.disableRemotePlayback = true;
        }

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