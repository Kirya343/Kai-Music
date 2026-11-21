import { Client } from "@stomp/stompjs";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface PlaybackControlsContextType {
    togglePlay: (newPaused?: boolean) => void;
    pausePlayback: () => void;
    seek: (position: number) => void;
    changeTrack: (changing: "prev" | "next" | number) => void;
    reconnectPlayback: (client: Client) => void;
    resyncPlayback: (client: Client | null, autoPlay: boolean) => void;
    autoPlay: boolean;
    setAutoPlay: Dispatch<SetStateAction<boolean>>;
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