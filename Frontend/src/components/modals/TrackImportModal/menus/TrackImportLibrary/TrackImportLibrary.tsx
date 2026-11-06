import { useLibrary } from "@audio";
import styles from "./TrackImportLibrary.module.scss"
import ImportingTrack from "@/components/ui/track/ImportingTrack";
import { useMemo } from "react";
import { Playlist, playlistService } from "@playlist";
import { ShuffleIcon } from "@/assets/icons";

/** Displays user library with importable tracks to playlist */
const TrackImportLibrary = ({ importPlaylist, onClose }: { importPlaylist: Playlist, onClose: () => void }) => {

    const { 
        setSearchQuery, searchQuery,
        visibleAudios, filteredList,
        visibleItems, setVisiblItems
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
        <div className={styles.page}>
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
                    Add rundom <ShuffleIcon/>
                </button>
                
                {visibleAudios.map((audio, idx) => (
                    <ImportingTrack
                        key={idx}
                        audio={audio}
                        trackNumber={idx + 1}
                        isInPlaylist={playlistAudioIds.has(audio.id)}
                        importPlaylistId={importPlaylist.id}
                        className={styles.track}
                    />
                ))}

                {visibleItems < filteredList.length && (
                    <button className={styles.loadMore} onClick={() => setVisiblItems(prev => prev + 50)}>Load more</button>
                )}
            </div>
        </div>
    )
}

export default TrackImportLibrary;