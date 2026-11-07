import { Playlist } from "@playlist";
import { IAudio } from "../audio";
import { IShortUser } from "@user";

export interface IListeningRoom extends RoomTemplate {
    audio: IAudio;
    playlist?: Playlist;
}

interface RoomTemplate {
    id: number;
    title: string;
    ownerId: number;
    code: string;
    listeners: IShortUser[] | null;
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