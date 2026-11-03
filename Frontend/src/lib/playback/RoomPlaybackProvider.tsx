import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IAudio, TimeRange } from "@audio";
import { countPosition, useData } from "@common";
import { PlaybackState, PlaybackMode, playbackService } from "@playback";
import { useAudioPlayer } from "./hooks";

interface RoomPlaybackContextType {
    playingAudio: IAudio | null;

    playbackState: PlaybackState | null;
    playbackMode: PlaybackMode;
    roomLoaded: boolean;
    fullPlayerOpen: boolean;
    setFullPlayerOpen: Dispatch<SetStateAction<boolean>>;
    updateMessage: string;
    audioRef: React.RefObject<HTMLAudioElement | null>;
    togglePlay: () => void;
    bufferedRanges: Map<number, TimeRange[] | []>;
    pausePlayback: () => void;
    seek: (position: number) => void;
}

const RoomPlaybackContext = createContext<RoomPlaybackContextType | null>(null);

export const useRoomPlayback = () => {
    const ctx = useContext(RoomPlaybackContext);
    if (!ctx) {
        throw new Error("useRoomPlayback must be used inside AuthProvider");
    }
    return ctx;
}

export const RoomPlaybackProvider = ({ children }: { children?: React.ReactNode }) => {

    const { roomData } = useData();
    const prevPlaybackStateRef = useRef<PlaybackState | null>(null);

    const { 
        pausePlayback, 
        audioRef, bufferedRanges,

        playbackState, 
        playbackMode,
        seek,
        togglePlay
    } = useAudioPlayer(roomData.room?.id || null);

    const playingAudio = useMemo<IAudio | null>(() => {
        const queueItem = roomData.playlist?.queue.find(qi => qi.id === playbackState?.entryId)

        if (!queueItem?.audio) return null;

        return queueItem.audio;
    }, [roomData.playlist, playbackState])

    const roomLoaded: boolean = !!roomData.room;

    const prevRoomRef = useRef<number | null>(null);

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
        if (!roomData.room) return;

        if (
            prevRoomRef.current !== null &&
            prevRoomRef.current !== roomData.room.id
        ) {
            pausePlayback();
        }

        prevRoomRef.current = roomData.room.id;
    }, [roomData.room?.id]);

    useEffect(() => {

        const roomId = roomData.room?.id;

        if (!("mediaSession" in navigator) || !playbackState || !playingAudio || !roomId) {
            return;
        }

        navigator.mediaSession.metadata = new MediaMetadata({
            title: playingAudio.title || "",
            artist: playingAudio.artist || "",
            album: playingAudio.album || "",
            artwork: [
                {
                    src: "https://music.workswap.org/image/logo.svg",
                    sizes: "400x400",
                    type: "image/svg"
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
            await playbackService.playTrack(roomId, "next");
        });

        navigator.mediaSession.setActionHandler("previoustrack", async () => {
            await playbackService.playTrack(roomId, "prev");
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
        roomData.room?.id,
        seek
    ]);
    
    return (
        <RoomPlaybackContext.Provider value={{ 
            playingAudio,

            playbackState,
            playbackMode,

            roomLoaded, 
            fullPlayerOpen, 
            setFullPlayerOpen,
            updateMessage,
            audioRef, 
            togglePlay,
            bufferedRanges,
            pausePlayback,
            seek
        }}>
            {children}
        </RoomPlaybackContext.Provider>
    );
};