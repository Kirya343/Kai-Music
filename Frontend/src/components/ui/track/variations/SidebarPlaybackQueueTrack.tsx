import { IQueueItem, usePlaybackControls, usePlaybackState } from "@playback";
import CompactTrack from "../CompactTrack/CompactTrack";

export default function SidebarPlaybackQueueTrack({
    entry, playing 
}: { 
    entry: IQueueItem, playing: boolean 
}) {

    const { playbackState } = usePlaybackState();
    const { togglePlay, changeTrack } = usePlaybackControls();

    const handleTrackClick = async (qiId: number) => {
    
        if (playbackState?.entryId === qiId) {
            togglePlay()
        } else {
            changeTrack(qiId)
        }
    }

    return <CompactTrack 
        audio={entry.audio} 
        onClick={() => handleTrackClick(entry.id)}
        playing={playing}
    />
}