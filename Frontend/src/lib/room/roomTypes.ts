import { IShortUser } from "@user";

export interface IListeningRoom {
    id: number;
    title: string;
    ownerId: number;
    code: string;
    listeners: IShortUser[] | null;
}

export interface IRoomUpdate {
    title: string;
}

export interface MainPageRequest {
    publicRooms: IListeningRoom[];
    activeListners: number;
    activeRooms: number;
}