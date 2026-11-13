import { createContext, useContext } from "react";
import { PlaybackData } from "@playback";

const PlaybackDataContext = createContext<PlaybackData | null>(null);

export const usePlaybackData = () => {
    const context = useContext(PlaybackDataContext);

    if (context === null) {
        throw new Error("usePlaybackData must be used inside PlaybackDataProvider");
    }

    return context;
};

export const PlaybackDataProvider = ({
    children,
    value
}: {
    children: React.ReactNode;
    value: PlaybackData;
}) => {
    return (
        <PlaybackDataContext.Provider value={value}>
            {children}
        </PlaybackDataContext.Provider>
    );
};