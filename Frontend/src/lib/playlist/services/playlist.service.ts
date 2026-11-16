import { IQueueItem } from "@playback";
import { playlistService } from ".";
import { loggerFactory } from "@common";
import { CreatePlaylist, Playlist } from "../playlistTypes";
import * as api from "./playlist.api";

const logger = loggerFactory.getLogger("Playlist.Service");

/** Removes a track from a playlist. */
export const removeEntry = async (
    playlistId: number | undefined,
    input: IQueueItem | IQueueItem[] | number | number[]
) => {
    if (!playlistId) return;

    const items = Array.isArray(input) ? input : [input];

    const ids = items.map(item =>
        typeof item === "number" ? item : item.id
    );

    try {
        await api.removeFromQueue(playlistId, ids);
    } catch (e) {
        logger.error(e);
    }
};

/** Deletes a playlist. */
export const deletePlaylist = async (playlist: Playlist) => {
    const success = confirm(`Ary you sure deleting playlist ${playlist.title}`)

    if (success) {
        try {
            await api.deletePlaylist(playlist.id)
        } catch (e) {
            logger.error(e)
        }
    }
}

/** Creates a new playlist. */
export const createPlaylist = async (playlist: CreatePlaylist) => {
    try {
        await api.createPlaylist(playlist)
    } catch (e) {
        logger.error(e)
    }
}

/** Imports tracks from one playlist into another. */
export const importToRoom = async (
    importPlaylist?: Playlist | null, 
    targetPlaylist?: Playlist
) => {

    if (!importPlaylist?.id || !targetPlaylist?.id) return;

    const success = confirm(`Ary you sure replace playlist in room?`)

    if (success) {
        await api.importToRoom(importPlaylist.id, targetPlaylist.id)
    }
}

export const toggleLike = async (isLiked: boolean, audioId?: number) => {

    if (!audioId) return;

    try {
        if (isLiked) {
             logger.debug("Unlike", audioId)
            await api.removeLiked([audioId]);
        } else {
            logger.debug("Like", audioId)
            await api.addLiked([{ audioId: audioId }]);
        }

        return true
    } catch (e) {
        return false
    }
};