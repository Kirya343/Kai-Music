import { IAudio } from "@audio";
import { forwardRef } from "react";
import styles from "./TrackDragPreview.module.scss";
import { Artwork } from "@/components/ui/Artwork/Artwork";

interface TrackDragPreviewProps {
    audio: IAudio;
}

export const TrackDragPreview = forwardRef<
    HTMLDivElement,
    TrackDragPreviewProps
>(({ audio }, ref) => {
    const title = audio.title ?? audio.name ?? "Unknown track";
    const artist = audio.artist || "Unknown artist";

    return (
        <div
            ref={ref}
            aria-hidden="true"
            className={styles.dragGhost}
        >
            <div className={styles.ghostArtwork}>
                <Artwork
                    src={audio.coverUrl}
                    title={title}
                />
            </div>

            <div className={styles.ghostMeta}>
                <span className={styles.ghostTitle}>
                    {title}
                </span>

                <span className={styles.ghostArtist}>
                    {artist}
                </span>
            </div>
        </div>
    );
});

TrackDragPreview.displayName = "TrackDragPreview";