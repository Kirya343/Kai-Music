import { TrashIcon, CheckmarkIcon, PenIcon, PlusIcon, ShazamIcon } from "@/assets/icons"
import { playlistService } from "@playlist"
import { audioService, IAudio } from "@audio"
import Track, { ITrackAction } from "../Track/Track"
import { IQueueItem } from "@playback"
import React, { HTMLAttributes } from "react"
import { IKebabAction } from "../../KebabMenu/KebabMenu"
import { loggerFactory } from "@common"

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

const logger = loggerFactory.getLogger("Components.PlaylistTrack")
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

    const actions: ITrackAction[] = [];

    const deleteAudio = async (audio: IAudio) => {
        const success = confirm(`Ary you sure deleting audio ${audio.name}`)

        if (success) {
            try {
                await audioService.deleteAudio(audio.id)
            } catch (e) {
                logger.error(e)
            }
        }
    }

    const extraActions: IKebabAction[] = [
        {
            icon: <ShazamIcon/>,
            title: "Autofill info with Shazam",
            func: async () => await audioService.recognizeAudio(queueItem.audio.id)
        },
        {
            icon: <PenIcon/>,
            title: "Edit audio info",
            func: () => openEditModal(queueItem.audio)
        },
        {
            icon: <TrashIcon/>,
            title: "Delete audio",
            func: () => deleteAudio(queueItem.audio),
        }
    ]

    if (importPlaylistId && currentPlaylistId !== importPlaylistId) {
        const action = {
            icon: isInPlaylist ? <CheckmarkIcon/> : <PlusIcon/>,
            title: "Add to Room",
            func: async () => await playlistService.addToQueue(importPlaylistId, [{audioId: queueItem.audio.id}])
        }

        extraActions.push(action)
        actions.push(action)
    }

    return (
        <Track
            audio={queueItem.audio}
            trackNumber={trackNumber}
            actions={actions}
            extraActions={extraActions}
            playing={playing}
            currentPlaylistId={currentPlaylistId}
            {...divProps}
        />
    )
}

export default PlaylistTrack;