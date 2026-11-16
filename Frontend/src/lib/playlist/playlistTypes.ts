import { IQueueItem, IQueueItemCreate } from "../playback/playback.types";

export interface Playlist {
    id: number;
    ownerId: number;
    title: string;
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