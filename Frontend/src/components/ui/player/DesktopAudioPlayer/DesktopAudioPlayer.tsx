import { usePlaybackContext } from "@playback";

import styles from "./DesktopAudioPlayer.module.scss"
import { useGlobal } from "@common";
import AudioNavigation from "../parts/AudioNavigation/AudioNavigation";
import TrackPositionTracker from "../parts/TrackPositionTracker/TrackPositionTracker";
import ScrollableTitle from "@/components/ui/ScrollableTitle/ScrollableTitle";
import VolumeSlider from "../parts/VolumeSlider/VolumeSlider";

/**
 * Component that display on bottom of pages and displays
 * current playing audio
 * 
 * on click opens AudioPlayer
 */
const DesktopAudioPlayer = () => {

    const { isMobile } = useGlobal();

    const { playbackState, playingAudio } = usePlaybackContext();

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
                <VolumeSlider />
            </div>
        </div>
    );
}

export default DesktopAudioPlayer;