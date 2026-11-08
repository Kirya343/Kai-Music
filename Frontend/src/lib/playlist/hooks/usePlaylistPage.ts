import { useMemo } from "react";
import { Playlist } from "@playlist";
import { useSearch, useData } from "@common";
import { IQueueItem } from "@playback";

export const usePlaylistPage = (playlistId: number) => {

    const { playlistsData } = useData();

    const playlist = useMemo<Playlist | null>(() => {
        if (!playlistId) return null;

        return playlistsData.playlists.find(p => p.id === playlistId) || null
    }, [playlistsData.playlists])

    const queue = useMemo<IQueueItem[]>(() => {
        if (!playlist?.queue) return []

        return playlist?.queue
    }, [playlist?.queue])
    
    const { filteredList, searchQuery, setSearchQuery } = useSearch(queue);

    return {  
        setSearchQuery,
        searchQuery, filteredList, 
        playlist
    };
}