import { createContext, useContext } from "react";
import { Playlist } from "@playlist";
import { PlaybackMode } from "@playback";
import { IAudio } from "@audio";

interface PlaybackPlaylistContextType {
    playbackPlaylist: Playlist | null;
    playingAudio: IAudio | null;
}

const PlaybackPlaylistContext = createContext<PlaybackPlaylistContextType | null>(null);

export const usePlaybackPlaylist = () => {
    const context = useContext(PlaybackPlaylistContext);

    if (context === null) {
        throw new Error("usePlaybackPlaylist must be used inside PlaybackPlaylistProvider");
    }

    return context;
};

export const PlaybackPlaylistProvider = ({
    children,
    value
}: {
    children: React.ReactNode;
    value: PlaybackPlaylistContextType;
}) => {
    return (
        <PlaybackPlaylistContext.Provider value={value}>
            {children}
        </PlaybackPlaylistContext.Provider>
    );
};