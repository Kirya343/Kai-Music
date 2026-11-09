import { useCallback, useEffect, useMemo, useState } from "react";
import { CreatePlaylist, Playlist, PlaylistType } from "../playlistTypes";
import { playlistService } from "../services";
import { useWebSocket } from "@websocket";
import { IQueueItem } from "@playback";
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

    const deletePlaylist = useCallback(async (playlist: Playlist) => {
        const success = confirm(`Ary you sure deleting playlist ${playlist.title}`)

        if (success) {
            try {
                await playlistService.deletePlaylist(playlist.id)
            } catch (e) {
                logger.error(e)
            }
        }
    }, [])

    const createPlaylist = useCallback(async (playlist: CreatePlaylist) => {
        try {
            await playlistService.createPlaylist(playlist)
        } catch (e) {
            logger.error(e)
        }
    }, [])

    const importToRoom = useCallback(async (importPlaylist: Playlist, targetPlaylist: Playlist) => {

        if (!targetPlaylist?.id) return;

        const success = confirm(`Ary you sure replace playlist in room?`)

        if (success) {
            await playlistService.importToRoom(importPlaylist.id, targetPlaylist.id)
        }
    }, [])

    const removeAudio = async (playlistId: number, queueItem: IQueueItem) => {
        if (!playlistId) return;
        try {
            await playlistService.removeFromQueue(playlistId, [queueItem.audio.id])
        } catch (e) {
            logger.error(e)
        }
    }

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
        syncPlaylists,
        deletePlaylist,
        createPlaylist,
        importToRoom,
        removeAudio
    }
}