import { PlaybackState } from "../playback.types";

export default class PlaybackContext {

    private playbackState: PlaybackState | null = null;
    private position = 0;

    private positionListeners = new Set<() => void>();
    private stateListeners = new Set<() => void>();

    constructor() {}

    subscribePosition = (listener: () => void) => {
        this.positionListeners.add(listener);

        return () => this.positionListeners.delete(listener);
    };

    public getPlaybackState = () => this.playbackState;
    public getPosition = () => this.position;

    public updateState(state: PlaybackState | null) {
        this.playbackState = state;
        this.notifyState();
    }

    public updatePosition(position: number) {
        this.position = position;
        this.notifyPosition();
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

    private notifyState() {
        this.stateListeners.forEach(listener => listener());
    }

    public subscribeState = (listener: () => void) => {
        this.stateListeners.add(listener);

        return () => this.stateListeners.delete(listener);
    };

    public getState = () => this.playbackState;
}