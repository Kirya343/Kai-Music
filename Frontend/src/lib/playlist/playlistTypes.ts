import { IQueueItem, IQueueItemCreate } from "../playback/playbackTypes";

export interface Playlist {
    id: number;
    ownerId: number;
    title: string;
    queue: IQueueItem[];
    type: string
}


export interface CreatePlaylist {
    title: string;
    audios?: IQueueItemCreate[];
}