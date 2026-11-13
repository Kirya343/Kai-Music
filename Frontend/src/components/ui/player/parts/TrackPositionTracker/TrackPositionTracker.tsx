import { usePlaybackAudio, usePlaybackControls, usePlaybackPlaylist, usePlaybackState } from "@playback";
import styles from "./TrackPositionTracker.module.scss"
import { countPosition } from "@common";

const TrackPositionTracker = () => {

    // controls from RoomPlaybackContext
    const { bufferedRanges } = usePlaybackAudio();
    const { playbackState } = usePlaybackState();
    const { playingAudio } = usePlaybackPlaylist();
    const { seek } = usePlaybackControls();

    // variables to control the scrolling title
    const duration = playingAudio?.duration || 0

    return playbackState && (
        <div className={styles.tracker}>
            <div className={styles.progress}>
                <div className={styles.buffered}>
                    {bufferedRanges?.map((range, index) => (
                        <div
                            key={index}
                            className={styles.bufferedRange}
                            style={{
                                left: `${(range.start / duration) * 100}%`,
                                width: `${((range.end - range.start) / duration) * 100}%`
                            }}
                        />
                    ))}
                </div>

                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={playbackState.position}
                    onChange={(e) => seek(Number(e.target.value))}
                    style={{
                        width: "100%",
                        background: `linear-gradient(
                            to right,
                            #ffffff ${(playbackState.position / duration) * 100}%,
                            #00000000 ${(playbackState.position / duration) * 100}%
                        )`
                    }}
                />
            </div>

            <div className={styles.positionMeta}>
                <span className={styles.currentPosition}>
                    {countPosition(playbackState.position)}
                </span>

                <span className={styles.duration}>
                    {countPosition(duration)}
                </span>
            </div>
        </div>
    )
}

export default TrackPositionTracker;