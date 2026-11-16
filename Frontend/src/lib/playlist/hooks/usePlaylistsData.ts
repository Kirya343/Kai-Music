import { useCallback, useEffect, useMemo, useState } from "react";
import { Playlist, PlaylistType } from "../playlistTypes";
import { playlistService } from "../services";
import { useWebSocket } from "@websocket";
import { loggerFactory } from "@common";

const logger = loggerFactory.getLogger("Data.Playlist");

export const usePlaylistsData = () => {
    
    const { addOnConnectHandler } = useWebSocket();

    const [playlists, setPlaylists] = useState<Playlist[]>(() => {
        const saved = localStorage.getItem("playlists");

        return saved ? JSON.parse(saved) : [];
    });

    const liked = useMemo<Playlist | null>(() => {
        return playlists.find(p => p.type === PlaylistType.LIKED) ?? null;
    }, [playlists])

    const syncPlaylists = useCallback(async () => {
        try {
            const res = await playlistService.loadPlaylists();
            setPlaylists(res.data);
        } finally {

        }
    }, [setPlaylists])

    const updatePlaylist = useCallback((playlist: Playlist) => {
        setPlaylists(prev => {
            if (!prev) return [playlist];
            
            const exists = prev.some(pl => pl.id === playlist.id);

            if (exists) {
                return prev.map(pl =>
                    pl.id === playlist.id
                        ? playlist
                        : pl
                );
            }

            return [...prev, playlist];
        });
    }, [setPlaylists]);

    useEffect(() => {
        localStorage.setItem("playlists", JSON.stringify(playlists));
    }, [playlists]);

    useEffect(() => {
        const unsubscribe = addOnConnectHandler((client) => {

            const playlistSub = client.subscribe(`/user/queue/playlists`, (message) => {

                const playlist: Playlist = JSON.parse(message.body)
                updatePlaylist(playlist);

                logger.debug("Обновление плейлиста", playlist.id, playlist.queue.map(qi => qi.audio.id))
            });

            return () => {
                playlistSub.unsubscribe();
            }
        });

        return unsubscribe;
    }, [addOnConnectHandler]);
    
    return { 
        playlists, 
        liked,
        syncPlaylists
    }
}