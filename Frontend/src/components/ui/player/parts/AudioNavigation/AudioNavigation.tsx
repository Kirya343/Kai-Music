import { usePlaybackContext } from "@playback";
import { PlaybackModeToggle } from "../PlaybackModeToggle"
import styles from "./AudioNavigation.module.scss"
import { HeartIcon, LeftIcon, PauseIcon, PlayIcon, PlusIcon, RightIcon } from "@/assets/icons";
import { useData } from "@common";
import { playlistService } from "@playlist";

const AudioNavigation = () => {

    const {  
        togglePlay,
        playbackState,
        changeTrack,
        playingAudio
    } = usePlaybackContext();

    const {playlistsData} = useData()

    const isLiked = !!playlistsData.liked?.queue.some(qi => qi.audio.id === playingAudio?.id)

    const toggleLike = async () => {

        if (!playingAudio) return;
    
        try {
            if (isLiked) {
                console.log("Unlike", playingAudio.id)
                await playlistService.removeLiked([playingAudio.id]);
            } else {
                console.log("Like", playingAudio.id)
                await playlistService.addLiked([{ audioId: playingAudio.id }]);
            }
        } finally {

        }
    };

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
            <button onClick={toggleLike}>
                <HeartIcon filled={isLiked} />
            </button>
        </div>
    )
}

export default AudioNavigation;