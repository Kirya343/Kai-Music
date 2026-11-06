import { useRoomPlayback } from "@playback";
import { useEffect, useRef } from "react";
import VolumeSlider from "../parts/VolumeSlider/VolumeSlider";
import styles from "./AudioPlayer.module.scss";
import { DownIcon } from "@/assets/icons";
import AudioNavigation from "../parts/AudioNavigation/AudioNavigation";
import TrackPositionTracker from "../parts/TrackPositionTracker/TrackPositionTracker";
import ScrollableTitle from "../../ScrollableTitle/ScrollableTitle";
import KebabMenu from "../../KebabMenu/KebabMenu";

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

    // displays only if playbackState is loaded
    return playbackState && playingAudio ? (
        <>
            <VolumeSlider visible={false}/>

            {fullPlayerOpen && (
                <div className={styles.audioPlayer}>
                    <div className={styles.playerHeader}>
                        <button onClick={() => setFullPlayerOpen(false)}><DownIcon/></button>
                        <KebabMenu actions={[]}/>
                    </div>
                    <img src="/image/player.gif" />

                    <ScrollableTitle title={playingAudio?.title ?? playingAudio?.name} />

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