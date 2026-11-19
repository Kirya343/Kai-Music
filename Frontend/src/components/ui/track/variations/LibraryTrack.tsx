import { PenIcon, PlusIcon } from "@/assets/icons";
import { playlistService } from "@playlist"
import { IAudio } from "@audio"
import Track from "../Track/Track"
import { HTMLAttributes, useMemo } from "react";
import { IKebabAction } from "../../KebabMenu/KebabMenu";
import { usePlayTrackPersonally } from "@/lib/playback/services/playback.hooks";

/**
 * Props for the LibraryTrack component
 */
interface LibraryTrackProps extends HTMLAttributes<HTMLDivElement> {
    /** Audio metadata to display */
    audio: IAudio;

    /** Position-based number displayed instead of the audio ID. */
    trackNumber: number;
    
    /** Apply the playing style and display the playback indicator. */
    playing: boolean;
    
    /** ID of the playlist to add the track to. */
    importPlaylistId?: number;

    /** Opens the audio editing modal. */
    openEditModal: (audio: IAudio) => void;
}

/** Displays an audio track with control actions. */
const LibraryTrack = ({
    audio, 
    trackNumber,
    playing,
    importPlaylistId,
    openEditModal,
    ...divProps
}: LibraryTrackProps) => {

    const extraActions = useMemo<IKebabAction[]>(() => {
        return [
            {
                icon: <PenIcon/>,
                title: "Edit audio info",
                func: () => openEditModal(audio)
            },
            ...(importPlaylistId ? [{
                icon: <PlusIcon />,
                title: "Add to Room",
                func: async () => await playlistService.addToQueue(
                    importPlaylistId,
                    [{ audioId: audio.id }]
                )
            }] : [])
        ]
    }, [audio, importPlaylistId])

    const playTrack = usePlayTrackPersonally()

    return (
        <Track
            audio={audio}
            trackNumber={trackNumber}
            extraActions={extraActions}
            visualProps={{
                title: true,
                artist: true,
                album: true
            }}
            playing={playing}
            onClick={() => playTrack(audio.id)}
            {...divProps}
        />
    )
}

export default LibraryTrack;