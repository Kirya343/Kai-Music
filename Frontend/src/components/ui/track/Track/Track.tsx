import { IAudio } from "@audio";
import styles from "./Track.module.scss";
import { HeartIcon } from "@/assets/icons";
import { useData } from "@common";
import { HTMLAttributes, useMemo, useRef } from "react";
import clsx from "clsx";
import { playlistService } from "@playlist";

import { ITrackAction, TrackVisualParameters } from "../types";
import { TrackBody } from "../components/TrackBody/TrackBody";
import { TrackActions } from "../components/TrackActions/TrackActions";
import { TrackDragPreview } from "../components/TrackDragPreview/TrackDragPreview";
import { IKebabAction } from "@/components/ui/KebabMenu/KebabMenu";

export interface TrackProps extends HTMLAttributes<HTMLDivElement> {
    audio: IAudio;
    actions?: ITrackAction[];
    extraActions?: IKebabAction[];
    trackNumber?: number;
    noBorder?: boolean;
    visualProps?: TrackVisualParameters;
    selectionMode?: boolean;
    selected?: boolean;
    playing?: boolean;
}

const Track = ({
    audio,
    actions,
    extraActions,
    trackNumber,
    noBorder,
    visualProps,
    selectionMode = false,
    selected = false,
    playing = false,
    className,
    onClick,
    onDragStart,
    ...divProps
}: TrackProps) => {
    const { playlistsData } = useData();
    const dragGhostRef = useRef<HTMLDivElement>(null);

    const isLiked = !!playlistsData.liked?.queue.some(
        qi => qi.audio.id === audio.id
    );

    const finalActions = useMemo<ITrackAction[]>(() => [
        ...(actions ?? []),
        {
            icon: <HeartIcon filled={isLiked} />,
            title: "Like",
            func: () => playlistService.toggleLike(isLiked, audio.id)
        }
    ], [isLiked, actions, audio.id]);

    return (
        <>
            <div
                {...divProps}
                className={clsx(
                    styles.track,
                    noBorder && styles.noBorder,
                    className
                )}
                draggable
                onDragStart={event => {
                    event.dataTransfer.setData(
                        "application/json",
                        JSON.stringify(audio)
                    );

                    event.dataTransfer.effectAllowed = "move";

                    if (dragGhostRef.current) {
                        event.dataTransfer.setDragImage(
                            dragGhostRef.current,
                            16,
                            16
                        );
                    }

                    onDragStart?.(event);
                }}
            >
                <TrackBody
                    audio={audio}
                    trackNumber={trackNumber}
                    visualProps={visualProps}
                    playing={playing}
                    onClick={onClick}
                />

                <TrackActions
                    actions={finalActions}
                    extraActions={extraActions}
                />
            </div>

            <TrackDragPreview
                ref={dragGhostRef}
                audio={audio}
            />
        </>
    );
};

export default Track;