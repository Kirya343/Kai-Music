import { playbackService, usePlaybackControls, usePlaybackPlaylist, usePlaybackState } from "@playback";
import { PlaybackModeToggle } from "../PlaybackModeToggle"
import styles from "./AudioNavigation.module.scss"
import { HeartIcon, LeftIcon, PauseIcon, PlayIcon, RightIcon } from "@/assets/icons";
import { useData } from "@common";
import { playlistService } from "@playlist";

const AudioNavigation = () => {

    const { playbackState } = usePlaybackState();
    const { playingAudio } = usePlaybackPlaylist();
    const { togglePlay } = usePlaybackControls();
    const { playlistsData } = useData()

    const isLiked = !!playlistsData.liked?.queue.some(qi => qi.audio.id === playingAudio?.id)

    return playbackState && (
        <div className={styles.navigation}>
            <PlaybackModeToggle />
            <button 
                aria-label="Play Prev Track"
                onClick={() => playbackService.changeTrack("prev")}
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
                onClick={() => playbackService.changeTrack("next")}>
                <RightIcon />
            </button>
            <button onClick={() => playlistService.toggleLike(isLiked, playingAudio?.id)}>
                <HeartIcon filled={isLiked} />
            </button>
        </div>
    )
}

export default AudioNavigation;