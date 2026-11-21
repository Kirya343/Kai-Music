import { IAudio } from "@audio";
import { countPosition } from "@common";
import { usePlaybackState } from "@playback";
import { PlayingAudioIcon } from "@/assets/icons";
import styles from "./TrackMetadata.module.scss";
import { TrackVisualParameters } from "../../types";
import clsx from "clsx";

interface TrackMetadataProps {
    audio: IAudio;
    trackNumber?: number;
    visualProps?: TrackVisualParameters;
    playing: boolean;
}

export const TrackMetadata = ({
    audio,
    trackNumber,
    visualProps,
    playing
}: TrackMetadataProps) => {
    const { playbackState } = usePlaybackState();

    const show = (property: keyof TrackVisualParameters) =>
        visualProps?.[property] !== false;

    const trackTitle = audio.title ?? audio.name ?? "Unknown track";
    const trackArtist = audio.artist || "Unknown artist";

    return (
        <div className={clsx(styles.meta, playing && styles.playing)}>
            {show("title") && (
                <span className={styles.title}>
                    {playing && (
                        <PlayingAudioIcon
                            playing={!playbackState?.pause}
                        />
                    )}

                    {show("id") && (
                        <span className={styles.id}>
                            #{trackNumber ?? audio.id}
                        </span>
                    )}

                    {trackTitle}
                </span>
            )}

            {show("artist") && (
                <span className={styles.artist}>
                    {trackArtist}
                </span>
            )}

            <span className={styles.info}>
                {show("album") && audio.album && (
                    <>{audio.album} • </>
                )}

                {show("duration") && audio.duration != null && (
                    <>{countPosition(audio.duration)}</>
                )}
            </span>
        </div>
    );
};