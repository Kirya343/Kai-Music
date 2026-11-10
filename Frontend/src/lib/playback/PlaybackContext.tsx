import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IAudio, TimeRange } from "@audio";
import { countPosition, useData } from "@common";
import { PlaybackState, PlaybackMode, playbackService } from "@playback";
import { useAudioPlayer } from "./hooks";
import { Playlist } from "@playlist";

interface RoomPlaybackContextType {
    playingAudio: IAudio | null;

    playbackState: PlaybackState | null;
    playbackMode: PlaybackMode;
    playbackPlaylist: Playlist | null;

    fullPlayerOpen: boolean;
    setFullPlayerOpen: Dispatch<SetStateAction<boolean>>;
    updateMessage: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    togglePlay: () => void;
    changeTrack: (changing: "prev" | "next" | number) => void;
    bufferedRanges: TimeRange[];
    pausePlayback: () => void;
    seek: (position: number) => void;
}

const RoomPlaybackContext = createContext<RoomPlaybackContextType | null>(null);

export const usePlaybackContext = () => {
    const ctx = useContext(RoomPlaybackContext);
    if (!ctx) {
        throw new Error("usePlaybackContext must be used inside AuthProvider");
    }
    return ctx;
}

export const RoomPlaybackProvider = ({ children }: { children?: React.ReactNode }) => {

    const prevPlaybackStateRef = useRef<PlaybackState | null>(null);

    const { 
        pausePlayback, 
        audioRef, bufferedRanges,

        playbackState, 
        playbackMode,
        playbackPlaylist,
        seek,
        togglePlay,
        changeTrack
    } = useAudioPlayer();

    const playingAudio = useMemo<IAudio | null>(() => {
        const queueItem = playbackPlaylist?.queue.find(qi => qi.id === playbackState?.entryId)

        if (!queueItem?.audio) return null;

        return queueItem.audio;
    }, [playbackPlaylist, playbackState])

    // info
    const updateMessage = useMemo<string>(() => {
        if (!playbackState || !prevPlaybackStateRef.current) return "";

        const newState = playbackState;
        const prevState = prevPlaybackStateRef.current;

        let message = `${newState.user} `

        if (newState.entryId != prevState.entryId) {
            message += `started playing track #${newState.entryId}`;
        } else if (newState.pause != prevState.pause && newState.pause) {
            message += `paused the playback`
        } else if (newState.pause != prevState.pause && !newState.pause) {
            message += `resumed playback`
        } else if (newState.position != prevState.position) {
            message += `seeked to ${countPosition(newState.position)}`
        }

        prevPlaybackStateRef.current = playbackState

        return message;
    }, [playbackState]);

    // ui
    const [fullPlayerOpen, setFullPlayerOpen] = useState<boolean>(false);

    useEffect(() => {

        if (!("mediaSession" in navigator) || !playbackState || !playingAudio) {
            return;
        }

        navigator.mediaSession.metadata = new MediaMetadata({
            title: playingAudio.title || "",
            artist: playingAudio.artist || "",
            album: playingAudio.album || "",
            artwork: [
                {
                    src: "https://kaimusic.app/image/logo.svg",
                    sizes: "400x400",
                    type: "image/svg+xml"
                }
            ]
        });

        navigator.mediaSession.setActionHandler("play", () => {
            togglePlay()
        });

        navigator.mediaSession.setActionHandler("pause", () => {
            togglePlay()
        });

        navigator.mediaSession.setActionHandler("nexttrack", async () => {
            changeTrack("next");
        });

        navigator.mediaSession.setActionHandler("previoustrack", async () => {
            changeTrack("prev");
        });

        navigator.mediaSession.setActionHandler("seekbackward", () => {
            seek(Math.max(0, playbackState?.position || 0 - 10));
        });

        navigator.mediaSession.setActionHandler("seekforward", () => {
            seek(playbackState?.position || 0 + 10);
        });

        navigator.mediaSession.setActionHandler("seekto", (details) => {
            if (details.seekTime != null) {
                seek(details.seekTime);
            }
        });

        navigator.mediaSession.setPositionState({
            playbackRate: 1,
            position: Math.min(playbackState?.position || 0, playingAudio.duration),
            duration: playingAudio.duration
        })

        return () => {
            navigator.mediaSession.setActionHandler("play", null);
            navigator.mediaSession.setActionHandler("pause", null);
            navigator.mediaSession.setActionHandler("nexttrack", null);
            navigator.mediaSession.setActionHandler("previoustrack", null);
            navigator.mediaSession.setActionHandler("seekbackward", null);
            navigator.mediaSession.setActionHandler("seekforward", null);
            navigator.mediaSession.setActionHandler("seekto", null);
        };
    }, [
        playingAudio,
        playbackState,
        seek
    ]);
    
    return (
        <RoomPlaybackContext.Provider value={{ 
            playingAudio,

            playbackState,
            playbackMode,
            playbackPlaylist,

            fullPlayerOpen, 
            setFullPlayerOpen,
            updateMessage,
            audioRef, 
            togglePlay,
            changeTrack,
            bufferedRanges,
            pausePlayback,
            seek
        }}>
            {children}
        </RoomPlaybackContext.Provider>
    );
};