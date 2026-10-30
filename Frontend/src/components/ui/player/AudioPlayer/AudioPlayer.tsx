import { useRoomPlayback } from "@playback";
import { useEffect, useRef } from "react";
import VolumeSlider from "../parts/VolumeSlider/VolumeSlider";
import styles from "./AudioPlayer.module.scss";
import { DownIcon } from "@/assets/icons";
import AudioNavigation from "../parts/AudioNavigation/AudioNavigation";
import TrackPositionTracker from "../parts/TrackPositionTracker/TrackPositionTracker";

/**
 * Audio is component that contains main player
 * gives to user access to controll playback
 */
const AudioPlayer = () => {

    // controls from RoomPlaybackContext
    const {  
        updateMessage, 
        fullPlayerOpen, playingAudio,
        setFullPlayerOpen,
        playbackState
    } = useRoomPlayback();

    // variables to control the scrolling title
    const headerRef = useRef<HTMLDivElement | null>(null);
    const textRef = useRef<HTMLDivElement | null>(null);

    // scrolling title control
    useEffect(() => {
        const header = headerRef.current;
        const text = textRef.current;

        if (!header || !text) return;

        if (text.scrollWidth > header.clientWidth) {
            text.classList.add(styles.animate);
        } else {
            text.classList.remove(styles.animate);
        }
    }, [playingAudio, fullPlayerOpen]);

    // displays only if playbackState is loaded
    return playbackState ? (
        <>
            <VolumeSlider visible={false}/>

            {fullPlayerOpen && (
                <div className={styles.audioPlayer}>
                    <div className={styles.playerHeader}>
                        <button onClick={() => setFullPlayerOpen(false)}><DownIcon/></button>
                        <button>⋮</button>
                    </div>
                    <img src="/image/player.gif" />
                    <div ref={headerRef} className={styles.header}>
                        <div ref={textRef} className={styles.headerText}>
                            {playingAudio?.title ?? playingAudio?.name}
                        </div>
                    </div>
                    <TrackPositionTracker />
                    <AudioNavigation />
                    <VolumeSlider />
                    {updateMessage && <div className={styles.update}>{updateMessage}</div>}
                </div>
            )}
        </>
    ) : <></>
};

export default AudioPlayer;