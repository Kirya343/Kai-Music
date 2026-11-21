import { IShortUser } from "@user";
import { IQueueItem, IQueueItemCreate } from "../playback/playback.types";

export interface Playlist {
    id: number;
    owner: IShortUser;
    title: string;
    isPublic: boolean;
    position: number;
    saved: number;
    sourcePlaylistId: number;
    queue: IQueueItem[];
    type: PlaylistType;
}


export interface CreatePlaylist {
    title: string;
    audios?: IQueueItemCreate[];
}

export enum PlaylistType {
    STANDART = "STANDART",
    LIKED = "LIKED",
    UPLOADED = "UPLOADED",
    PLAYBACK_QUEUE = "PLAYBACK_QUEUE"
}