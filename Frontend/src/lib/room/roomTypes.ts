
export interface IListeningRoom {
    id: number;
    title: string;
    ownerId: number;
    code: string;
}

export interface IRoomUpdate {
    title: string;
}

export interface MainPageRequest {
    publicRooms: IListeningRoom[];
    activeListners: number;
    activeRooms: number;
}