import { useLibrary } from "@audio";
import styles from "./TrackImportLibrary.module.scss"
import ImportingTrack from "@/components/ui/track/ImportingTrack";
import { useMemo } from "react";
import { Playlist, playlistService } from "@playlist";
import { ShuffleIcon } from "@/assets/icons";

/** Displays user library with importable tracks to playlist */
const TrackImportLibrary = ({ importPlaylist, onClose }: { importPlaylist: Playlist, onClose: () => void }) => {

    const { 
        visibleAudios,
        setSearchQuery, searchQuery,
        rowVirtualizer, parentRef,
        filteredList
    } = useLibrary();

    const playlistAudioIds = useMemo(() => {
        return new Set(
            importPlaylist?.queue.map(item => item.audio.id)
        );
    }, [importPlaylist?.queue]);

    const addRandomTracks = async () => {
        try {
            await playlistService.addRandomTracks(importPlaylist.id, 30)
        } finally {
            onClose()
        }
    }

    return (
        <div className={styles.page} ref={parentRef}>
            <div className={styles.sorting}>

                <div className={styles.row}>
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.search}
                        placeholder="Search audios..."
                    />
                </div>

                {searchQuery.length != 0 && <span>Found {filteredList.length} audios</span>}
            </div>
            
            <div className={styles.trackList}>
                <button onClick={addRandomTracks} className={styles.rundomBtn}>
                    Добавить случайные <ShuffleIcon/>
                </button>
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: "relative",
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map(item => {
                        const audio = visibleAudios[item.index];

                        return (
                            <div
                                key={audio.id}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    transform: `translateY(${item.start}px)`,
                                }}
                            >
                                <ImportingTrack
                                    audio={audio}
                                    trackNumber={item.index + 1}
                                    isInPlaylist={playlistAudioIds.has(audio.id)}
                                    importPlaylistId={importPlaylist.id}
                                    className={styles.track}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default TrackImportLibrary;