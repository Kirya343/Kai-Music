import { Playlist } from "@playlist";
import { IAudio } from "../audio";

export interface IListeningRoom extends RoomTemplate {
    audio: IAudio;
    playlist: Playlist;
}

interface RoomTemplate {
    id: number;
    title: string;
    ownerId: number;
    code: string;
    listeners: number;
}

export interface IShortRoom extends RoomTemplate {
    playlistId: number;
}

export interface IRoomUpdate {
    title: string;
}

export interface MainPageRequest {
    publicRooms: IShortRoom[];
    activeListners: number;
    activeRooms: number;
}