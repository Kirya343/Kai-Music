import { IQueueItem, usePlaybackControls, usePlaybackState } from "@playback";
import CompactTrack from "../CompactTrack/CompactTrack";

export default function SidebarPlaybackQueueTrack({entry}: {entry: IQueueItem}) {

    const { playbackState } = usePlaybackState();
    const { togglePlay, changeTrack } = usePlaybackControls();

    const handleTrackClick = async (qiId: number) => {
    
        console.log("Клик по треку в плейбэке")

        if (playbackState?.entryId === qiId) {
            togglePlay()
        } else {
            changeTrack(qiId)
        }
    }

    return <CompactTrack audio={entry.audio} onClick={() => handleTrackClick(entry.id)} />
}