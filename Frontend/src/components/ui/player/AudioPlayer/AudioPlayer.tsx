import { usePlaybackContext } from "@playback";
import { useEffect, useRef, useState } from "react";
import VolumeSlider from "../parts/VolumeSlider/VolumeSlider";
import styles from "./AudioPlayer.module.scss";
import { DownIcon, PlaylistIcon } from "@/assets/icons";
import AudioNavigation from "../parts/AudioNavigation/AudioNavigation";
import TrackPositionTracker from "../parts/TrackPositionTracker/TrackPositionTracker";
import ScrollableTitle from "../../ScrollableTitle/ScrollableTitle";
import KebabMenu from "../../KebabMenu/KebabMenu";
import PlaybackQueueModal from "@/components/modals/PlaybackQueueModal/PlaybackQueueModal";

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
    } = usePlaybackContext();

    const [isOpen, setOpen] = useState(false);

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

                    <div className={styles.controls}>
                        <button onClick={() => setOpen(true)} className={styles.action}>
                            <PlaylistIcon/>
                        </button>
                    </div>

                    {updateMessage && <div className={styles.update}>{updateMessage}</div>}
                </div>
            )}

            <PlaybackQueueModal isOpen={isOpen} onClose={() => setOpen(false)}/>
        </>
    ) : <></>
};

export default AudioPlayer;