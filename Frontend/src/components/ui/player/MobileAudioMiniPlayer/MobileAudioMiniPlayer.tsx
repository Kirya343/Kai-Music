import { usePlaybackContext } from "@playback";

import styles from "./MobileAudioMiniPlayer.module.scss"
import { RightIcon, PlayIcon, PauseIcon } from "@/assets/icons";
import { useGlobal } from "@common";
import ScrollableTitle from "../../ScrollableTitle/ScrollableTitle";

/**
 * Component that display on bottom of pages and displays
 * current playing audio
 * 
 * on click opens AudioPlayer
 */
const MobileAudioMiniPlayer = () => {

    const { isMobile } = useGlobal();

    const { 
        playbackState, playingAudio, 
        setFullPlayerOpen, togglePlay,
        changeTrack
    } = usePlaybackContext();

    const duration = playingAudio?.duration || 0

    return playingAudio && playbackState && isMobile && (
        <div 
            className={styles.miniPlayer} 
            data-testid="mini-player" 
            onClick={() => setFullPlayerOpen(true)}
        >

            <ScrollableTitle title={playingAudio?.title ?? playingAudio?.name} />

            <div 
                className={styles.trackPosition}
                style={{ 
                    background: `
                        linear-gradient(to right, #ffffff ${(playbackState.position / duration) * 100}%, 
                        #444 ${(playbackState.position / duration) * 100}%)
                    `
                }}
            />
            
            <div className={styles.navigation} onClick={(e) => e.stopPropagation()}>

                <button
                    aria-label={playbackState.pause ? "Resume Track" : "Pause Track"}
                    onClick={togglePlay}
                >
                    {playbackState.pause ? <PlayIcon /> : <PauseIcon />}
                </button>

                <button 
                    aria-label="Play Next Track"
                    onClick={() => changeTrack("next")}
                >
                    <RightIcon />
                </button>

            </div>
        </div>
    );
}

export default MobileAudioMiniPlayer;