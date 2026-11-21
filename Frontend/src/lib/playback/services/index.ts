import {
    updateTrackPosition,
    setPlaylistPlaybackMode,
    subscribe,
    unsubscribe,
    changeTrack,
    getCurrentRoomState,
    getActiveRooms
} from './playback.api';
import * as hooks from './playback.hooks';

export const playbackService = {
    updateTrackPosition,
    setPlaylistPlaybackMode,
    subscribe,
    unsubscribe,
    changeTrack,
    getCurrentRoomState,
    getActiveRooms,
    ...hooks
};