import { createApi } from "@common";
import { PlaybackState, PlaybackMode } from "@playback";

const playbackApi = createApi("/playback")

/**
 * Retrieves current playback state of room
 *  
 * @param roomId - ID of the room.
 */
export const getCurrentRoomState = (targetType: string, targetId: number) => 
    playbackApi.get<PlaybackState>(`/playback-state`, { params: { targetType, targetId }});

/**
 * Changes track in playback.
 *
 * @param roomId - ID of the room.
 * @param track - ID of the track, or "prev" or "next"
 */
export const playTrack = (track: "next" | "prev" | number) => 
    playbackApi.post<void>(`/change-track`, {}, { params: { changing: String(track) }});

/**
 * Updates state of playback in room.
 *
 * @param roomId - ID of the room.
 * @param state - is playback state
 */
export const updateTrackPosition = (state: PlaybackState) => 
    playbackApi.post<void>(`/update-state`, state);

export const setPlaylistPlaybackMode = (mode: PlaybackMode) => 
    playbackApi.post<void>(`/mode`, {}, { params: { mode }})

export const subscribe = (targetType: string, targetId: number) => 
    playbackApi.post<void>(`/subscribe`, {}, { params: { targetType, targetId }})

export const unsubscribe = () => playbackApi.post<void>(`/unsubscribe`)