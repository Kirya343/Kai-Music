import { useCallback, useEffect, useRef, useState } from "react";
import { IListeningRoom } from "../roomTypes";
import { roomService } from "../services";
import { useWebSocket } from "@websocket";
import { Playlist } from "@playlist";
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Data.Room");

export function useRoomData() {

    const { addOnConnectHandler, client } = useWebSocket();
    
    const currentRoomIdRef = useRef<number | null>(null);

    const [synced, setSynced] = useState<boolean>(false);

    const [room, setRoom] = useState<IListeningRoom | null>(() => {
        const saved = localStorage.getItem("room");

        return saved ? JSON.parse(saved) : null;
    });

    const [playlist, setPlaylist] = useState<Playlist | null>(() => {
        const saved = localStorage.getItem("roomPlaylist");

        return saved ? JSON.parse(saved) : null;
    });

    /**
     * synchronizes list of audios with the server  
     */
    const syncRoom = useCallback(async () => {
        try {
            const res = await roomService.loadCurrentRoom();
            setRoom(res.data)
            setPlaylist(res.data.playlist)
            setSynced(true)
        } finally {
            
        }
    }, [])

    const reconnectToRoom = useCallback(() => {
        if (!client) return;

        logger.debug("переподключаемся к комнате")

        client.publish({
            destination: "/app/room/reconnect",
            body: JSON.stringify({ roomId: room?.id })
        });
    }, [client])

    useEffect(() => {
        syncRoom()
    }, [])

    useEffect(() => {
        localStorage.setItem("room", JSON.stringify(room));
    }, [room])

    useEffect(() => {
        if (room && synced) {
            reconnectToRoom()
        }
    }, [room?.id, synced, reconnectToRoom])

    useEffect(() => {
        const unsubscribe = addOnConnectHandler((client, isReconnect) => {

            const roomSub = client.subscribe(`/user/queue/room`, (message) => {
                const room: IListeningRoom = JSON.parse(message.body);
                
                setRoom(room);
                currentRoomIdRef.current = room.id
            });

            const playlistSub = client.subscribe(`/user/queue/playlist.room`, (message) => {
                setPlaylist(JSON.parse(message.body));
            });

            const playbackModeSub = client.subscribe(`/user/queue/playback-mode`, (message) => {
                const mode = JSON.parse(message.body);

                setPlaylist(prev => prev ? ({...prev, mode}) : prev);
            });

            return () => {
                roomSub.unsubscribe();
                playbackModeSub.unsubscribe();
                playlistSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    return {
        room,
        playlist,
        synced
    }
}