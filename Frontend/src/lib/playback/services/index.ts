import {
    updateTrackPosition,
    setPlaylistPlaybackMode,
    subscribe,
    unsubscribe,
    changeTrack,
    getCurrentRoomState
} from './playback.api';
import * as hooks from './playback.hooks';

export const playbackService = {
    updateTrackPosition,
    setPlaylistPlaybackMode,
    subscribe,
    unsubscribe,
    changeTrack,
    getCurrentRoomState,
    ...hooks
};