import { IAudio } from "@audio"
import styles from "./Track.module.scss"
import { HeartIcon, PlayingAudioIcon } from "@/assets/icons"
import { countPosition, useData } from "@common"
import { HTMLAttributes, ReactNode, useMemo, useRef } from "react"
import clsx from "clsx"
import { usePlaybackState } from "@playback"
import KebabMenu, { IKebabAction } from "@/components/ui/KebabMenu/KebabMenu"
import { playlistService } from "@playlist"
import { Artwork } from "../../Artwork/Artwork"

/** Defines an action button displayed on a track. */
export interface ITrackAction {
    /** Non-visible track title */
    title: string;

    /** Callback executed then action is triggered */
    func: () => void;

    /** Icon displayed on button */
    icon: ReactNode;
}

/**
 * Controls the visibility of track metadata.
 * Unspecified properties default to visible.
 */
interface TrackVisualParameters {
    /** Show the audio ID. */
    id?: true;

    /** Show the track title. */
    title?: true;

    /** Show the artist name. */
    artist?: true;

    /** Show the album name. */
    album?: true;

    /** Show the track duration. */
    duration?: true;
}

/**
 * Props for the Track component.
 */
interface TrackProps extends HTMLAttributes<HTMLDivElement> {
    /** Audio metadata to display. */
    audio: IAudio;

    /** Action buttons displayed alongside the track. */
    actions?: ITrackAction[];

    /** Additional actions displayed in the kebab menu. */
    extraActions?: IKebabAction[];

    /** Position-based number displayed instead of the audio ID. */
    trackNumber?: number;

    /** Remove the track's border. */
    noBorder?: true;

    /** Controls the visibility of individual metadata fields. */
    visualProps?: TrackVisualParameters;

    /** Display a checkbox for track selection. */
    selectionMode?: boolean;

    /** Whether the track is currently selected. */
    selected?: boolean;

    /** Apply the playing style and display the playback indicator. */
    playing?: boolean;
}

/**
 * Displays an audio track with its metadata and optional actions.
 *
 * Supports customizable metadata visibility, selection mode,
 * playback indication, and standard HTML div attributes.
 */
const Track = ({
    audio,
    actions,
    extraActions,
    trackNumber,
    noBorder,
    visualProps,

    onClick,

    selectionMode = false,
    selected = false,

    playing = false,
    className,

    ...divProps
}: TrackProps) => {
    const { playbackState } = usePlaybackState();
    const { playlistsData } = useData();
    const dragGhostRef = useRef<HTMLDivElement>(null);

    const isLiked = !!playlistsData.liked?.queue.some(qi => qi.audio.id === audio.id);

    const finalActions = useMemo<ITrackAction[]>(() => [
        ...(actions ?? []),
        {
            icon: <HeartIcon filled={isLiked} />,
            title: "Like",
            func: () => playlistService.toggleLike(isLiked, audio.id)
        }
    ], [isLiked, actions]);

    const trackTitle = audio?.title ?? audio?.name ?? "Unknown track";
    const trackArtist = audio?.artist || "Unknown artist";

    return (
        <>
            <div
                {...divProps}
                className={clsx(
                    styles.track,
                    noBorder && styles.noBorder,
                    playing && styles.playing,
                    className
                )}
                draggable
                onDragStart={(e) => {
                    e.dataTransfer.setData("application/json", JSON.stringify(audio));
                    e.dataTransfer.effectAllowed = "move";

                    if (dragGhostRef.current) {
                        e.dataTransfer.setDragImage(dragGhostRef.current, 16, 16);
                    }

                    divProps.onDragStart?.(e);
                }}
            >
                <div className={styles.body} onClick={onClick}>
                    <Artwork src={audio.coverUrl} title={audio?.title} />

                    {/* <div className={styles.audioCover}>
                        <MusicNoteIcon/>
                    </div> */}

                    <div className={styles.meta}>
                        {(!visualProps || visualProps.title) && (
                            <span className={styles.title}>
                                {playing && <PlayingAudioIcon playing={!playbackState?.pause} />}

                                {(!visualProps || visualProps.id) && <span className={styles.id}>#{trackNumber || audio.id}</span>}
                                {trackTitle}
                            </span>
                        )}
                        {(!visualProps || visualProps.artist) && (
                            <span className={styles.artist}>{trackArtist}</span>
                        )}
                        <span className={styles.info}>
                            {(!visualProps || visualProps.album) && audio?.album && (<>{audio?.album} • </>)}
                            {(!visualProps || visualProps.duration) && audio?.duration && (<>{countPosition(audio?.duration)}</>)}
                        </span>
                    </div>
                </div>

                <div className={styles.actions}>
                    {finalActions.map(act => (
                        <button
                            onClick={(event) => {
                                event.stopPropagation();
                                act.func();
                            }}
                            key={act.title}
                        >
                            {act.icon}
                        </button>
                    ))}
                    {extraActions && <KebabMenu actions={extraActions} />}
                </div>
            </div>

            <div
                ref={dragGhostRef}
                aria-hidden="true"
                className={styles.dragGhost}
            >
                <div className={styles.ghostArtwork}>
                    <Artwork src={audio.coverUrl} title={audio?.title} />
                </div>
                <div className={styles.ghostMeta}>
                    <span className={styles.ghostTitle}>{trackTitle}</span>
                    <span className={styles.ghostArtist}>{trackArtist}</span>
                </div>
            </div>
        </>
    );
};

export default Track;