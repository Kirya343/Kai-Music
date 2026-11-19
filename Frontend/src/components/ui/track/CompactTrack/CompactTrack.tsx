import { Artwork } from "@/components/ui/Artwork/Artwork";
import styles from "./CompactTrack.module.scss"
import { countPosition } from "@common";
import React, { HTMLAttributes } from "react";
import { IAudio } from "@audio";

interface CompactTrackProps extends HTMLAttributes<HTMLDivElement> {
    audio: IAudio;
    trackNumber?: number;
}

const CompactTrack: React.FC<CompactTrackProps> = ({
    audio,
    trackNumber,
    ...divProps
}) => {

    return (
        <div 
            className={styles.track}
            {...divProps}
        >
            {trackNumber && <span className={styles.trackIdx}>{trackNumber}</span>}
            <Artwork
                src={audio.coverUrl}
                title={audio.title}
                seed={audio.title}
                size="xs"
                rounded="md"
            />
            <div className={styles.rowMeta}>
                <strong>{audio.title}</strong>
                <span>{audio.artist}</span>
            </div>
            <span className={styles.duration}>{countPosition(audio.duration)}</span>
        </div>
    )
}

export default CompactTrack;