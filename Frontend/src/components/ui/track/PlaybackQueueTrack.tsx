import { playlistService } from "@playlist";
import Track, { ITrackAction } from "./Track/Track";
import { TrashIcon } from "@/assets/icons";
import { IQueueItem, playbackService, usePlaybackControls, usePlaybackPlaylist, usePlaybackState } from "@playback";
import { HTMLAttributes } from "react";

/** Props for the PlaybackQueueTrack component */
interface PlaybackQueueTrackProps extends HTMLAttributes<HTMLDivElement> {

    /** Playlist queue item with audio metadata to display */
    queueItem: IQueueItem, 
    
    /** Apply the playing style and display the playback indicator. */
    playing: boolean
}

/** Displays audio track in the RoomPage */
const PlaybackQueueTrack = ({
    queueItem,
    playing,
    ...props
}: PlaybackQueueTrackProps) => {

    const { playbackState } = usePlaybackState();
    const { playbackPlaylist } = usePlaybackPlaylist();
    const { togglePlay } = usePlaybackControls();

    const handleTrackClick = async (qiId: number) => {

        console.log("Клик по треку в плейбэке")

        if (playbackState?.entryId === qiId) {
            togglePlay()
        } else {
            playbackService.changeTrack(qiId)
        }
    }

    const actions: ITrackAction[] = []

    if (playbackPlaylist?.id) {
        actions.push({
            icon: <TrashIcon/>,
            title: "deleteAudio",
            func: () => playlistService.removeEntry(playbackPlaylist?.id, queueItem)
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

            {...props}
        />
    )
}

export default PlaybackQueueTrack;