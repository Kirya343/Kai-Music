import { PlaybackState } from "../playback.types";

export default class PlaybackContext {

    private playbackState: PlaybackState | null = null;
    private position = 0;
    private autoPlay = false;
    private audio: HTMLAudioElement | null = null;

    private positionListeners = new Set<() => void>();
    private stateListeners = new Set<() => void>();
    private autoPlayListeners = new Set<() => void>();
    private audioListeners = new Set<() => void>();

    public getPlaybackState = () => this.playbackState;
    public getPosition = () => this.position;
    public getAutoPlay = () => this.autoPlay;
    public getAudio = () => this.audio;

    public updateState(state: PlaybackState | null) {
        this.playbackState = state;
        this.notifyState();
    }

    public updatePosition(position: number) {
        this.position = position;
        this.notifyPosition();
    }

    public updateAutoPlay(autoPlay: boolean) {
        this.autoPlay = autoPlay;
        this.notifyAutoPlay();
    }

    public updateAudio(audio: HTMLAudioElement | null) {
        this.audio = audio;
        this.audioListeners.forEach(listener => listener());
    }

    public updateFromServer(state: PlaybackState | null) {
        this.playbackState = state;
        this.position = state?.position ?? 0;

        this.notifyState();
        this.notifyPosition();
    }

    private notifyPosition() {
        this.positionListeners.forEach(listener => listener());
    }

    private notifyAutoPlay() {
        this.autoPlayListeners.forEach(listener => listener());
    }

    private notifyState() {
        this.stateListeners.forEach(listener => listener());
    }

    public subscribeState = (listener: () => void) => {
        this.stateListeners.add(listener);

        return () => this.stateListeners.delete(listener);
    };

    public subscribePosition = (listener: () => void) => {
        this.positionListeners.add(listener);

        return () => this.positionListeners.delete(listener);
    };

    public subscribeAutoPlay = (listener: () => void) => {
        this.autoPlayListeners.add(listener);

        return () => this.autoPlayListeners.delete(listener);
    };

    public subscribeAudio = (listener: () => void) => {
        this.audioListeners.add(listener);
        return () => this.audioListeners.delete(listener);
    };
}