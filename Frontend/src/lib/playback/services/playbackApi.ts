import { createApi } from "@common";
import { PlaybackState, PlaybackMode, PlaybackTargetType } from "@playback";

const playbackApi = createApi("/playback")

/**
 * Retrieves current playback state of room
 *  
 * @param roomId - ID of the room.
 */
export const getCurrentRoomState = (roomId: number) => playbackApi.get<PlaybackState>(`/${roomId}/playback-state`);

/**
 * Changes track in playback.
 *
 * @param roomId - ID of the room.
 * @param track - ID of the track, or "prev" or "next"
 */
export const playTrack = (roomId: number, track: "next" | "prev" | number) => 
    playbackApi.post<void>(`/${roomId}/change-track`, {}, { params: { changing: String(track) }});

/**
 * Updates state of playback in room.
 *
 * @param roomId - ID of the room.
 * @param state - is playback state
 */
export const updateTrackPosition = (roomId: number, state: PlaybackState) => 
    playbackApi.post<void>(`/${roomId}/update-state`, state);

export const setPlaylistPlaybackMode = (targetId: number, targetType: PlaybackTargetType, mode: PlaybackMode) => 
    playbackApi.post<void>(`/${targetId}/mode`, {}, { params: { mode, targetType }})

export const subscribe = (targetType: string, targetId: number) => playbackApi.post<void>(`/subscribe`, {}, { params: { targetType, targetId }})
export const unsubscribe = () => playbackApi.post<void>(`/unsubscribe`)