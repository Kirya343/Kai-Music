import { usePlaybackAudio, usePlaybackPlaylist, usePlaybackState } from "@playback";

import styles from "./DesktopAudioPlayer.module.scss"
import { useGlobal } from "@common";
import AudioNavigation from "../parts/AudioNavigation/AudioNavigation";
import TrackPositionTracker from "../parts/TrackPositionTracker/TrackPositionTracker";
import ScrollableTitle from "@/components/ui/ScrollableTitle/ScrollableTitle";
import VolumeSlider from "../parts/VolumeSlider/VolumeSlider";
import { useState } from "react";
import PlaybackQueueModal from "@/components/modals/PlaybackQueueModal/PlaybackQueueModal";
import { PlaylistIcon } from "@/assets/icons";

/**
 * Component that display on bottom of pages and displays
 * current playing audio
 * 
 * on click opens AudioPlayer
 */
const DesktopAudioPlayer = () => {

    const [isOpen, setOpen] = useState(false);
 
    const { isMobile } = useGlobal();

    const { playbackState } = usePlaybackState();
    const { playingAudio } = usePlaybackPlaylist();

    return playingAudio && playbackState && !isMobile && (
        <div 
            className={styles.player} 
            data-testid="desctop-player" 
        >
            <div className={styles.info}>
                <ScrollableTitle title={playingAudio?.title ?? playingAudio?.name} />
            </div>

            <div className={styles.tracker}>
                <TrackPositionTracker />
                <AudioNavigation />
            </div>
            
            <div className={styles.controls}>
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