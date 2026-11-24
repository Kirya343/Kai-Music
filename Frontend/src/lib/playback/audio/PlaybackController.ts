import { loggerFactory } from "@common";
import { playbackService } from "../services";
import AudioMediaSource from "./AudioMediaSource";
import { PlaybackState } from "../playback.types";
import AudioBufferManager from "./AudioBufferManager";
import { AudioChunk } from "@audio";
import PlaybackContext from "./PlaybackContext";

const logger = loggerFactory.getLogger("Audio.PlaybackController");

export default class PlaybackController {

    private mediaSource: AudioMediaSource | null = null;

    private debounceTimeout: number | null = 0;

    private autoPlay = false

    private awaitingState = false;
    private unsyncedState: PlaybackState | null = null;

    private bufferManager;

    public context = new PlaybackContext();

    constructor(
        private readonly enableAutoPlay: () => void
    ) {
        this.bufferManager = new AudioBufferManager(
            () => this.handleBufferUpdate()
        )
    }

    private createNewMediaSource(streamId: string): AudioMediaSource {
        return new AudioMediaSource(
            this.bufferManager,
            streamId,
            position => this.context.updatePosition(position)
        );
    }

    private handleBufferUpdate() {
        this.playIfBuffered();
    }

    /**
     * Pauses playing audio
     */
    pausePlayback() {
        this.mediaSource?.audio.pause();
    };

    changeTrack(changing: "next" | "prev" | number) {
        this.enableAutoPlay();
        playbackService.changeTrack(changing);
    };

    /**
     * Resumes playing audio
     */
    public async resumePlayback() {

        try {
            await this.mediaSource?.audio.play();

            this.enableAutoPlay();

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
    };

    // Play / Pause кнопка
    public togglePlay(newPaused?: boolean) {

        const state = this.context.getPlaybackState();

        if (!state) return;

        if (newPaused === undefined) newPaused = !state.pause

        this.enableAutoPlay();

        if (newPaused) {
            this.pausePlayback()
        }

        playbackService.updateTrackPosition({
            ...state, 
            position: this.mediaSource?.audio.currentTime || 0, 
            pause: newPaused
        });
    };

    public seek(position: number) {
        
        const state = this.context.getPlaybackState()

        if (!state) return;

        this.awaitingState = true;

        this.enableAutoPlay();

        try {
            this.pausePlayback();
        } finally {

            const newState = ({...state, position})

            this.unsyncedState = newState

            this.context.updateState(newState)

            // отменяем предыдущий таймаут, если был
            if (this.debounceTimeout) {
                clearTimeout(this.debounceTimeout);
            }

            // ставим новый таймаут на 300 мс
            this.debounceTimeout = setTimeout(async () => {
                if (state) {
                    await playbackService.updateTrackPosition(newState);
                }
                this.debounceTimeout = null;
            }, 100);
        }
    };

    /**
     * Starts playing audio if last playbackState isn't paused and 
     * audio is loaded on current position
     */
    playIfBuffered() {

        if (!this.autoPlay || this.awaitingState) return;

        const state = this.unsyncedState;
        const audio = this.mediaSource?.audio

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
        this.unsyncedState = null;

        if (!state.pause) {
            logger.debug("начинаем проигрываание")
            const prevState = this.context.getPlaybackState()
            this.context.updateState({ ...prevState!, pause: false });
            this.resumePlayback();
        }
    };

    startNewStream(streamId: string) {
        logger.debug("Начинаем новый media resource");

        this.mediaSource?.cleanupMediaSource();
        this.mediaSource = this.createNewMediaSource(streamId);
    };

    cleanup() {
        this.mediaSource?.cleanupMediaSource();
    }

    public handleAudioChunk(chunk: AudioChunk) {

        logger.debug(`Получен ${chunk.initialization ? "init" : "media"} chunk: ${chunk.sequence}`);

        const manager = this.bufferManager;

        if (!manager) {
            return;
        }

        manager.addChunk(chunk);

        this.mediaSource?.processQueue()
    }

    public getAudio() {
        return this.mediaSource?.audio ?? null;
    }
} 