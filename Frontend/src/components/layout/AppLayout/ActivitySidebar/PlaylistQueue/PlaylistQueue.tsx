import { useState } from "react";
import styles from "./PlaylistQueue.module.scss"
import { usePlaybackPlaylist } from "@playback";
import { IAudio } from "@audio";
import { playlistService } from "@playlist";
import SidebarPlaybackQueueTrack from "@/components/ui/track/variations/SidebarPlaybackQueueTrack";

/* const MOCK_QUEUE: QueueTrackItem[] = [
    { id: "q-1", title: "Midnight City", artist: "M83", duration: "4:03", addedBy: "Kirya" },
    { id: "q-2", title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:51", addedBy: "Nutellka" },
    { id: "q-3", title: "Starboy", artist: "The Weeknd", duration: "3:50", addedBy: "Kirya" },
]; */

const PlaylistQueue = () => {
    const [isOver, setIsOver] = useState(false);

    const { playbackPlaylist } = usePlaybackPlaylist();

    const queueItems = playbackPlaylist?.queue || [];

    const onAcceptItem = (audio: IAudio) => {

        if (!playbackPlaylist) return

        playlistService.addToQueue(
            playbackPlaylist?.id,
            [{ audioId: audio.id }]
        )
    }

    return (
        <div 
            onDragOver={(e) => {
                // Обязательно вызываем preventDefault(), иначе onDrop не сработает
                e.preventDefault();
                if (!isOver) setIsOver(true);
            }}
            onDragLeave={() => setIsOver(false)}
            onDrop={(e) => {
                e.preventDefault();
                setIsOver(false);
                const rawJson = e.dataTransfer.getData("application/json");
                if (!rawJson) return;

                try {
                    const data = JSON.parse(rawJson) as IAudio;

                    onAcceptItem(data);
                } catch (err) {
                    console.error("Некорректный JSON в dataTransfer:", err);
                }
            }}
            className={styles.itemsList}
        >
            {queueItems
                .toSorted((a, b) => a.position - b.position)
                .map((entry, idx) => (
                    <SidebarPlaybackQueueTrack
                        key={idx}
                        entry={entry}
                    />
                )
            )}

            {/* {queueItems.length == 0 && (
                <span>Add Tracks</span>
            )} */}
        </div>
    )
}

export default PlaylistQueue;