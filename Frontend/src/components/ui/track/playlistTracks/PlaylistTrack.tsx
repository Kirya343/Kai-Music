import { TrashIcon, CheckmarkIcon, PenIcon, PlusIcon, ShazamIcon } from "@/assets/icons"
import { playlistService } from "@playlist"
import { audioService, IAudio } from "@audio"
import Track, { ITrackAction } from "../Track/Track"
import { IQueueItem } from "@playback"
import { HTMLAttributes, useMemo } from "react"
import { IKebabAction } from "../../KebabMenu/KebabMenu"
import { usePlayTrackPersonally } from "@/lib/playback/services/playback.hooks"

/**
 * Props for the PlaylistTrack component
 */
interface PlaylistTrackProps extends HTMLAttributes<HTMLDivElement> {

    /** Playlist queue item with audio metadata to display */
    queueItem: IQueueItem;

    /** Position-based number displayed instead of the audio ID. */
    trackNumber: number;
    
    /** Apply the playing style and display the playback indicator. */
    playing: boolean;

    /** ID of the current playlist. */
    currentPlaylistId: number;
    
    /** ID of the playlist to add the track to. */
    importPlaylistId?: number;

    /** Whether the track is already in the room's queue. */
    isInPlaylist: boolean;
  
    /** Opens the audio editing modal. */
    openEditModal: (audio: IAudio) => void;
}

/** Displays audio track inside playlist with playlist update actions */
const PlaylistTrack = ({
    queueItem, 
    trackNumber,
    playing,
    isInPlaylist,
    currentPlaylistId,
    importPlaylistId,
    openEditModal,
    ...divProps
}: PlaylistTrackProps) => {

    console.log("render")

    const extraActions = useMemo<IKebabAction[]>(() => {
        const actions: IKebabAction[] = [
            {
                icon: <PenIcon />,
                title: "Edit audio info",
                func: () => openEditModal(queueItem.audio)
            },
            {
                icon: <TrashIcon />,
                title: "Remove from playlist",
                func: () => playlistService.removeEntry(currentPlaylistId, queueItem)
            }
        ];

        if (importPlaylistId && currentPlaylistId !== importPlaylistId) {
            actions.push({
                icon: isInPlaylist ? <CheckmarkIcon /> : <PlusIcon />,
                title: "Add to Room",
                func: () => playlistService.addToQueue(
                    importPlaylistId,
                    [{ audioId: queueItem.audio.id }]
                )
            });
        }

        return actions;
    }, [
        queueItem,
        currentPlaylistId,
        importPlaylistId,
        isInPlaylist,
        openEditModal
    ]);

    const actions = useMemo<ITrackAction[]>(() => {
        if (!importPlaylistId || currentPlaylistId === importPlaylistId) {
            return [];
        }

        return [extraActions[2] as ITrackAction];
    }, [extraActions, importPlaylistId, currentPlaylistId]);

    const playTrack = usePlayTrackPersonally()

    return (
        <Track
            audio={queueItem.audio}
            trackNumber={trackNumber}
            actions={actions}
            visualProps={{
                title: true,
                album: true,
                duration: true,
                artist: true
            }}
            extraActions={extraActions}
            playing={playing}
            onClick={() => playTrack(queueItem.audio.id, currentPlaylistId)}
            {...divProps}
        />
    )
}

export default PlaylistTrack;