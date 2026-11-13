import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { IAudio, TimeRange } from "@audio";
import { PlaybackState, PlaybackMode, PlaybackData } from "@playback";
import { useAudioPlayer } from "./hooks";
import { Playlist } from "@playlist";
import { PlaybackStateProvider } from "./contexts/PlaybackStateContext";
import { PlaybackAudioProvider } from "./contexts/PlaybackAudioContext";
import { PlaybackControlsProvider } from "./contexts/PlaybackControlsContext";
import { PlaybackPlaylistProvider } from "./contexts/PlaybackPlaylistContext";
import { PlaybackDataProvider } from "./contexts/PlaybackDataContext";
import { PlaybackUIProvider } from "./contexts/PlaybackUIContext";

export const PlaybackProvider = ({ children }: { children?: React.ReactNode }) => {

    const { 
        pausePlayback, 
        audioRef, bufferedRanges,

        playbackState, 
        playbackMode,
        playbackPlaylist,
        playbackData,
        playingAudio,

        updateMessage,

        seek,
        togglePlay,
        changeTrack
    } = useAudioPlayer();

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
        seek,
        togglePlay,
        changeTrack
    ]);
    
    return (
        <PlaybackStateProvider value={{
            playbackState, 
            playbackMode
        }}>
            <PlaybackAudioProvider value={{
                audioRef,
                bufferedRanges
            }}>
                <PlaybackControlsProvider value={{
                    togglePlay,
                    changeTrack,
                    pausePlayback,
                    seek
                }}>
                    <PlaybackPlaylistProvider value={{
                        playingAudio,
                        playbackPlaylist
                    }}>
                        <PlaybackDataProvider value={playbackData}>
                            <PlaybackUIProvider value={{
                                fullPlayerOpen,
                                setFullPlayerOpen,
                                updateMessage
                            }}>
                                {children}
                            </PlaybackUIProvider>
                        </PlaybackDataProvider>
                    </PlaybackPlaylistProvider>
                </PlaybackControlsProvider>
            </PlaybackAudioProvider>
        </PlaybackStateProvider>
    );
};