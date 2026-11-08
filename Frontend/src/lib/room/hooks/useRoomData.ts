import { useCallback, useEffect, useRef, useState } from "react";
import { IListeningRoom } from "../roomTypes";
import { roomService } from "../services";
import { useWebSocket } from "@websocket";
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

    /**
     * synchronizes list of audios with the server  
     */
    const syncRoom = useCallback(async () => {
        try {
            const res = await roomService.loadCurrentRoom();

            setRoom(res.data)

            logger.debug("roomService.loadCurrentRoom:", res.data)

            setSynced(true)
        } finally {
            
        }
    }, [])

    const reconnectToRoom = useCallback(() => {
        if (!client) return;

        logger.debug("переподключаемся к комнате")

        client.publish({
            destination: "/app/playback.reconnect",
            body: ""
        });
    }, [client])

    useEffect(() => {
        reconnectToRoom()
    }, [room?.id, client])

    useEffect(() => {
        syncRoom()
    }, [])

    useEffect(() => {
        localStorage.setItem("room", JSON.stringify(room));
    }, [room])

    useEffect(() => {
        const unsubscribe = addOnConnectHandler((client) => {

            const roomSub = client.subscribe(`/user/queue/room`, (message) => {
                const room: IListeningRoom = JSON.parse(message.body);
                
                setRoom(room);

                currentRoomIdRef.current = room.id
            });

            return () => {
                roomSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    return {
        room,
        synced,
        syncRoom
    }
}