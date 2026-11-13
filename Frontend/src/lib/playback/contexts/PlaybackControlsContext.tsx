import { createContext, useContext } from "react";

interface PlaybackControlsContextType {
    togglePlay: () => void;
    changeTrack: (changing: "prev" | "next" | number) => void;
    pausePlayback: () => void;
    seek: (position: number) => void;
}

const PlaybackControlsContext = createContext<PlaybackControlsContextType | null>(null);

export const usePlaybackControls = () => {
    const context = useContext(PlaybackControlsContext);

    if (context === null) {
        throw new Error("usePlaybackControls must be used inside PlaybackControlsProvider");
    }

    return context;
};

export const PlaybackControlsProvider = ({
    children,
    value
}: {
    children: React.ReactNode;
    value: PlaybackControlsContextType;
}) => {
    return (
        <PlaybackControlsContext.Provider value={value}>
            {children}
        </PlaybackControlsContext.Provider>
    );
};