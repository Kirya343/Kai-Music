import { useCallback, useEffect, useRef, useState } from "react";
import { IListeningRoom, IShortRoom } from "../roomTypes";
import { roomService } from "../services";
import { useWebSocket } from "@websocket";
import { Playlist } from "@playlist";
import { loggerFactory } from "@common";
import { Client } from "@stomp/stompjs";

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

            logger.debug("roomService.loadCurrentRoom:", res.data)

            if (res.data.playlist) {
                setPlaylist(res.data.playlist)
            }

            setSynced(true)
        } finally {
            
        }
    }, [])

    const reconnectToRoom = useCallback(() => {
        if (!client || !room?.id) return;

        logger.debug("переподключаемся к комнате")

        client.publish({
            destination: "/app/room/reconnect",
            body: JSON.stringify({ roomId: room?.id })
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
                const shortRoom: IShortRoom = JSON.parse(message.body);
                
                // Mapping from Short to full listing room
                setRoom(prev => {
                    if (!prev?.playlist) return null;

                    return {
                        ...prev,
                        ...shortRoom,
                        playlist: {
                            ...prev.playlist,
                            id: shortRoom.playlistId
                        }
                    };
                });

                currentRoomIdRef.current = shortRoom.id
            });

            return () => {
                roomSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);

    useEffect(() => {

        if (!room?.playlist?.id) return; 

        const unsubscribe = addOnConnectHandler((client) => {

            const playlistSub = client.subscribe(`/topic/playlist/${room?.playlist?.id}`, (message) => {
                logger.debug(`пришло обновление плейлиста на ${room?.playlist?.id}`)

                setPlaylist(JSON.parse(message.body));
            });

            logger.debug(`подписались на /topic/playlist/${room?.playlist?.id}`)

            return () => {
                playlistSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [room?.playlist?.id, addOnConnectHandler])

    return {
        room,
        playlist,
        synced
    }
}