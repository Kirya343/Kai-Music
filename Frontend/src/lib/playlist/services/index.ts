import {
    loadPlaylists,
    loadPlaylistById,
    addToQueue,
    addRandomTracks
} from './playlist.api';
import * as service from './playlist.service';

export const playlistService = {
    loadPlaylists,
    loadPlaylistById,
    addToQueue,
    addRandomTracks,
    ...service
};