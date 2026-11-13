import { usePlaybackControls, usePlaybackPlaylist, usePlaybackState, usePlaybackUI } from "@playback";

import styles from "./MobileAudioMiniPlayer.module.scss"
import { RightIcon, PlayIcon, PauseIcon, HeartIcon } from "@/assets/icons";
import { useData, useGlobal } from "@common";
import ScrollableTitle from "../../ScrollableTitle/ScrollableTitle";
import { playlistService } from "@playlist";

/**
 * Component that display on bottom of pages and displays
 * current playing audio
 * 
 * on click opens AudioPlayer
 */
const MobileAudioMiniPlayer = () => {

    const { isMobile } = useGlobal();

    const { playbackState } = usePlaybackState();
    const { playingAudio } = usePlaybackPlaylist();
    const { setFullPlayerOpen } = usePlaybackUI();
    const { togglePlay, changeTrack } = usePlaybackControls();

    const { playlistsData } = useData();

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

                <button onClick={toggleLike}>
                    <HeartIcon filled={isLiked} />
                </button>

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