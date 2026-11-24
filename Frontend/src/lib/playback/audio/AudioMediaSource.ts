import { loggerFactory } from "@common";
import AudioBufferManager from "./AudioBufferManager";

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

    // console.log(
    //     "=== DEVICE DIAGNOSTICS ===",
    //     JSON.stringify(result, null, 4)
    // );
    // console.table(result.mse.isTypeSupported);
    // console.table(result.audio.codecs);

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

export default class AudioMediaSource {

    public audio!: HTMLAudioElement;
    private mediaSource!: MediaSource;
    private objectUrl: string | null = null;

    private removeTimeUpdateListener: (() => void) | null = null;

    constructor(
        private readonly bufferManager: AudioBufferManager,
        private readonly streamId: string,
        private readonly onPositionUpdate: (position: number) => void
    ) {
        this.createMediaSource()
    }

    private createMediaSource() {
        this.cleanupMediaSource();

        logger.debug("создаём новый mediaSource")

        this.audio = new Audio();
        const audio = this.audio;
        
        const { constructor: MediaSourceConstructor, managed } =
            getMediaSourceConstructor();

        this.mediaSource = new MediaSourceConstructor();

        audio.autoplay = false;
        audio.controls = false;

        if (managed) {
            audio.disableRemotePlayback = true;
        }

        this.objectUrl = URL.createObjectURL(this.mediaSource);

        audio.src = this.objectUrl;
        const saved = localStorage.getItem("audioVolume");
        audio.volume = saved ? Number(saved) : 1;

        this.mediaSource.addEventListener('sourceopen', () => {
            logger.debug('MediaSource opened');

            this.initializeSourceBuffer()

            this.mediaSource.addEventListener('error', event => {
                logger.error(
                    'MediaSource error:',
                    event
                );
            });
        });

        this.removeTimeUpdateListener?.();

        this.removeTimeUpdateListener =
            this.addTimeUpdateListener(audio);
    }

    initializeSourceBuffer() {
        const sourceBuffer = this.mediaSource.addSourceBuffer(
            'audio/mp4; codecs="mp4a.40.2"'
        );

        sourceBuffer.addEventListener('updateend', () => {
            this.bufferManager.onBufferUpdate?.();
        });

        sourceBuffer.addEventListener('error', event => {
            logger.error(
                'SourceBuffer error:',
                event
            );
        });

        this.bufferManager.setSourceBuffer(sourceBuffer);
    }

    cleanupMediaSource() {
        this.removeTimeUpdateListener?.();
        this.removeTimeUpdateListener = null;

        const audioElement = this.audio;

        if (audioElement) {
            audioElement.pause();
            audioElement.removeAttribute("src");
            audioElement.load();
        }

        if (this.objectUrl) {
            URL.revokeObjectURL(this.objectUrl);
            this.objectUrl = null;
        }

        this.bufferManager.reset();
    }

    /**
     * Adds listners to HTMLAudioElement events
     */
    addTimeUpdateListener(audio: HTMLAudioElement) {
        const handleTimeUpdate = () => {
            logger.debug("обновление времени")
            this.onPositionUpdate(audio.currentTime)
        };

        logger.debug("Установка хендлера timeupdate")

        audio.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
    };

    public processQueue() {
        this.bufferManager.processQueue(this.streamId);
    }
}