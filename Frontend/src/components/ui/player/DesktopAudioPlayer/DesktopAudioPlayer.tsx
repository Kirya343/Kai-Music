import { playbackService, usePlaybackAudio, usePlaybackControls, usePlaybackData, usePlaybackPlaylist, usePlaybackState } from "@playback";

import styles from "./DesktopAudioPlayer.module.scss"
import { useGlobal } from "@common";
import AudioNavigation from "../parts/AudioNavigation/AudioNavigation";
import TrackPositionTracker from "../parts/TrackPositionTracker/TrackPositionTracker";
import ScrollableTitle from "@/components/ui/ScrollableTitle/ScrollableTitle";
import VolumeSlider from "../parts/VolumeSlider/VolumeSlider";
import { useState } from "react";
import PlaybackQueueModal from "@/components/modals/PlaybackQueueModal/PlaybackQueueModal";
import { PlaylistIcon } from "@/assets/icons";
import { useWebSocket } from "@websocket";
import { Artwork } from "../../Artwork/Artwork";

/**
 * Component that display on bottom of pages and displays
 * current playing audio
 * 
 * on click opens AudioPlayer
 */
const DesktopAudioPlayer = () => {

    const [isOpen, setOpen] = useState(false);

    const { client } = useWebSocket()
 
    const { isMobile } = useGlobal();

    const { resyncPlayback, autoPlay } = usePlaybackControls();
    const { playbackState } = usePlaybackState();
    const { playingAudio } = usePlaybackPlaylist();
    const playbackData = usePlaybackData();

    console.log(!autoPlay, playbackData.room, !playbackState?.pause)

    return playingAudio && playbackState && !isMobile && (
        <div 
            className={styles.player} 
            data-testid="desktop-player" 
        >
            {!autoPlay && playbackData.room && !playbackState.pause && (
                <div className={styles.overlay}>
                    You're in the room. Start listening?

                    <button onClick={() => resyncPlayback(client, true)}>
                        Continue
                    </button>
                    <button onClick={playbackService.unsubscribe}>
                        Leave room
                    </button>
                </div>
            )}

            <div className={styles.info}>
                <Artwork src={playingAudio.coverUrl} title={playingAudio?.title} />
                <ScrollableTitle title={playingAudio?.title ?? playingAudio?.name} />
            </div>

            <div className={styles.tracker}>
                <TrackPositionTracker />
                <AudioNavigation />
            </div>
            
            <div className={styles.controls}>
                {/* <button onClick={() => client?.webSocket?.close()}>
                    Disconnect WebSocket
                </button> */}
                <button onClick={() => setOpen(true)} className={styles.action}>
                    <PlaylistIcon/>
                </button>

                <VolumeSlider />
            </div>

            <PlaybackQueueModal isOpen={isOpen} onClose={() => setOpen(false)}/>
        </div>
    );
}

export default DesktopAudioPlayer;