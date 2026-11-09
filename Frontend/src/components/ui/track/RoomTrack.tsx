import { playlistService } from "@playlist";
import Track, { ITrackAction } from "./Track/Track";
import { TrashIcon } from "@/assets/icons";
import { playbackService, IQueueItem, usePlaybackContext } from "@playback";
import { HTMLAttributes } from "react";

/** Props for the RoomTrack component */
interface RoomTrackProps extends HTMLAttributes<HTMLDivElement> {

    /** Playlist queue item with audio metadata to display */
    queueItem: IQueueItem, 
    
    /** Apply the playing style and display the playback indicator. */
    playing: boolean
}

/** Displays audio track in the RoomPage */
const RoomTrack = ({
    queueItem,
    playing,
    ...props
}: RoomTrackProps) => {

    const { 
        playbackState,
        togglePlay,
        playbackPlaylist
    } = usePlaybackContext();

    const handleTrackClick = async (qiId: number) => {

        if (playbackState?.entryId === qiId) {
            togglePlay()
        } else {
            await playbackService.changeTrack(qiId)
        }
    }

    const actions: ITrackAction[] = []

    if (playbackPlaylist?.id) {
        actions.push({
            icon: <TrashIcon/>,
            title: "deleteAudio",
            func: async () => await playlistService.removeFromQueue(playbackPlaylist?.id, [queueItem.id])
        })
    }


    return (
        <Track
            onClick={() => handleTrackClick(queueItem.id)}
            audio={queueItem.audio}
            trackNumber={queueItem.position + 1}
            noBorder
            actions={actions}
            visualProps={{
                title: true,
                artist: true
            }}

            playing={playing}

            currentPlaylistId={null}

            {...props}
        />
    )
}

export default RoomTrack;