import { playbackService, usePlaybackAudio, usePlaybackControls, usePlaybackPlaylist, usePlaybackState, usePlaybackUI } from "@playback";

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

    const { audioRef, position } = usePlaybackAudio();
    const { playbackState } = usePlaybackState();
    const { playingAudio } = usePlaybackPlaylist();
    const { setFullPlayerOpen } = usePlaybackUI();
    const { togglePlay } = usePlaybackControls();

    const { playlistsData } = useData();

    const isLiked = !!playlistsData.liked?.queue.some(qi => qi.audio.id === playingAudio?.id)

    const audio = audioRef.current;

    const audioPosition = Math.max(audio?.currentTime || 0, position)

    const duration = playingAudio?.duration || 0

    return playingAudio && playbackState && audio && isMobile && (
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
                        linear-gradient(to right, #ffffff ${(audioPosition / duration) * 100}%, 
                        #444 ${(audioPosition / duration) * 100}%)
                    `
                }}
            />
            
            <div className={styles.navigation} onClick={(e) => e.stopPropagation()}>

                <button onClick={() => playlistService.toggleLike(isLiked, playingAudio.id)}>
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
                    onClick={() => playbackService.changeTrack("next")}
                >
                    <RightIcon />
                </button>

            </div>
        </div>
    );
}

export default MobileAudioMiniPlayer;