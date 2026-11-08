import { createApi } from "@common";
import { CreatePlaylist, Playlist } from "../playlistTypes";
import { IQueueItemCreate } from "@playback";

const playlistApi = createApi("/playlist")

export const loadPlaylists = () => playlistApi.get<Playlist[]>("/my")

export const loadPlaylistById = (playlistId: number) => playlistApi.get<Playlist>(`/${playlistId}`)

export const deletePlaylist = (playlistId: number) => playlistApi.delete<void>(`/${playlistId}`)

export const importToRoom = (targetPlaylistId: number, importPlaylistId: number) => 
    playlistApi.post<void>(`/${targetPlaylistId}/import`, {}, { params: { playlistId: importPlaylistId } })

export const createPlaylist = (playlist: CreatePlaylist) => playlistApi.post<void>("", playlist)

export const addToQueue = (playlistId: number, list: IQueueItemCreate[]) => 
    playlistApi.post(`/${playlistId}/queue`, list)

export const removeFromQueue = (playlistId: number, list: number[]) => 
    playlistApi.delete<void>(`/${playlistId}/queue`, { data: list })

export const addRandomTracks = (playlistId: number, amount: number) => 
    playlistApi.post<void>(`/${playlistId}/queue/rundom`, {}, { params: { amount } })

export const addLiked = (list: IQueueItemCreate[]) => 
    playlistApi.post(`/liked`, list)

export const removeLiked = (list: number[]) => 
    playlistApi.delete<void>(`/liked`, { data: list })