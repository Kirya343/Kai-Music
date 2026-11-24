import { createContext, useContext } from "react";
import { PlaybackState } from "../playback.types";

interface PlaybackAudioContextType {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    currentPlaybackState: PlaybackState | null;
}

const PlaybackAudioContext = createContext<PlaybackAudioContextType | null>(null);

export const usePlaybackAudio = () => {
    const context = useContext(PlaybackAudioContext);

    if (context === null) {
        throw new Error("usePlaybackAudio must be used inside PlaybackAudioProvider");
    }

    return context;
};

export const PlaybackAudioProvider = ({
    children,
    value
}: {
    children: React.ReactNode;
    value: PlaybackAudioContextType;
}) => {
    return (
        <PlaybackAudioContext.Provider value={value}>
            {children}
        </PlaybackAudioContext.Provider>
    );
};