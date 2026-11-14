import { createContext, useContext } from "react";
import { PlaybackState, PlaybackMode } from "@playback";

interface PlaybackStateContextValue {
    playbackState: PlaybackState | null;
    playbackMode: PlaybackMode;
}

const PlaybackStateContext = createContext<PlaybackStateContextValue | null>(null);

export const usePlaybackState = () => {
    const context = useContext(PlaybackStateContext);

    if (context === null) {
        throw new Error("usePlaybackState must be used inside PlaybackStateProvider");
    }

    return context;
};

export const PlaybackStateProvider = ({
    children,
    value
}: {
    children: React.ReactNode;
    value: PlaybackStateContextValue
}) => {

    return (
        <PlaybackStateContext.Provider value={value}>
            {children}
        </PlaybackStateContext.Provider>
    );
};