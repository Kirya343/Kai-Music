import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface PlaybackUIContextType {
    fullPlayerOpen: boolean;
    setFullPlayerOpen: Dispatch<SetStateAction<boolean>>;
    updateMessage: string;
}

const PlaybackUIContext = createContext<PlaybackUIContextType | null>(null);

export const usePlaybackUI = () => {
    const context = useContext(PlaybackUIContext);

    if (context === null) {
        throw new Error("usePlaybackUI must be used inside PlaybackUIProvider");
    }

    return context;
};

export const PlaybackUIProvider = ({
    children,
    value
}: {
    children: React.ReactNode;
    value: PlaybackUIContextType;
}) => {
    return (
        <PlaybackUIContext.Provider value={value}>
            {children}
        </PlaybackUIContext.Provider>
    );
};