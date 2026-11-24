import { createApi } from "@common";
import { IListeningRoom, IRoomUpdate, MainPageRequest } from "@room";

const roomApi = createApi("/room")

export const loadCurrentRoom = () => roomApi.get<IListeningRoom>("");

export const getRoomsPage = () => roomApi.get<MainPageRequest>(`/list/page`)
export const createRoom = (vibe?: string) => roomApi.post<void>("", null, { params: { vibe }})

export const joinRoom = (code: string) => roomApi.post<void>("/join", {}, { params: { code }})

export const updateRoom = (roomId: number, room: IRoomUpdate) => roomApi.patch<void>(`/${roomId}`, room)