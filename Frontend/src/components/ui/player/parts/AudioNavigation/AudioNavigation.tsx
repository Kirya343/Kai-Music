import { usePlaybackContext } from "@playback";
import { PlaybackModeToggle } from "../PlaybackModeToggle"
import styles from "./AudioNavigation.module.scss"
import { LeftIcon, PauseIcon, PlayIcon, PlusIcon, RightIcon } from "@/assets/icons";

const AudioNavigation = () => {

    const {  
        togglePlay,
        playbackState,
        changeTrack
    } = usePlaybackContext();

    return playbackState && (
        <div className={styles.navigation}>
            <PlaybackModeToggle />
            <button 
                aria-label="Play Prev Track"
                onClick={() => changeTrack("prev")}
            >
                <LeftIcon />
            </button>
            <button
                aria-label={playbackState.pause ? "Resume Track" : "Pause Track"}
                onClick={togglePlay}
            >
                {playbackState.pause ? <PlayIcon /> : <PauseIcon />}
            </button>
            <button 
                aria-label="Play Next Track"
                onClick={() => changeTrack("next")}>
                <RightIcon />
            </button>
            <button><PlusIcon/></button>
        </div>
    )
}

export default AudioNavigation;