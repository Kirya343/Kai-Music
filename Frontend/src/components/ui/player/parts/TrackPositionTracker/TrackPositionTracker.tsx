import { usePlaybackAudio, usePlaybackControls, usePlaybackPlaylist, usePlaybackState } from "@playback";
import styles from "./TrackPositionTracker.module.scss"
import { countPosition } from "@common";

const TrackPositionTracker = () => {

    // controls from RoomPlaybackContext
    const { audioRef, currentPlaybackState } = usePlaybackAudio();
    const { playingAudio } = usePlaybackPlaylist();
    const { seek } = usePlaybackControls();

    // variables to control the scrolling title
    const duration = playingAudio?.duration || 0

    const audio = audioRef.current;

    const buffered = audio?.buffered;

    return currentPlaybackState && (
        <div className={styles.tracker}>
            <div className={styles.progress}>
                <div className={styles.buffered}>
                    {buffered && duration > 0 && Array.from(
                        { length: buffered.length },
                        (_, index) => ({
                            start: buffered.start(index),
                            end: buffered.end(index)
                        })
                    ).map((range, index) => (
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
                    value={currentPlaybackState?.position}
                    onChange={(e) => seek(Number(e.target.value))}
                    style={{
                        width: "100%",
                        background: `linear-gradient(
                            to right,
                            #ffffff ${(currentPlaybackState.position / duration) * 100}%,
                            #00000000 ${(currentPlaybackState.position / duration) * 100}%
                        )`
                    }}
                />
            </div>

            <div className={styles.positionMeta}>
                <span className={styles.currentPosition}>
                    {countPosition(Math.min(currentPlaybackState.position, duration))}
                </span>

                <span className={styles.duration}>
                    {countPosition(duration)}
                </span>
            </div>
        </div>
    )
}

export default TrackPositionTracker;