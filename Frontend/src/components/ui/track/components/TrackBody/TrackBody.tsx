import { IAudio } from "@audio";
import { HTMLAttributes } from "react";
import styles from "./TrackBody.module.scss";
import { TrackMetadata } from "../TrackMetadata/TrackMetadata";
import { TrackVisualParameters } from "../../types";
import { Artwork } from "@/components/ui/Artwork/Artwork";

interface TrackBodyProps {
    audio: IAudio;
    trackNumber?: number;
    visualProps?: TrackVisualParameters;
    playing: boolean;
    onClick?: HTMLAttributes<HTMLDivElement>["onClick"];
}

export const TrackBody = ({
    audio,
    trackNumber,
    visualProps,
    playing,
    onClick
}: TrackBodyProps) => {
    return (
        <div className={styles.body} onClick={onClick}>
            <Artwork
                src={audio.coverUrl}
                title={audio.title}
            />

            <TrackMetadata
                audio={audio}
                trackNumber={trackNumber}
                visualProps={visualProps}
                playing={playing}
            />
        </div>
    );
};