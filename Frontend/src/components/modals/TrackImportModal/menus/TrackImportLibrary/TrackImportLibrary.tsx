import { useLibrary } from "@audio";
import styles from "./TrackImportLibrary.module.scss"
import ImportingTrack from "@/components/ui/track/ImportingTrack";
import { useMemo, useState } from "react";
import { Playlist, playlistService } from "@playlist";
import { ShuffleIcon } from "@/assets/icons";
import SelectableList from "@/components/ui/SelectableList/SelectableList";

/** Displays user library with importable tracks to playlist */
const TrackImportLibrary = ({ importPlaylist, onClose }: { importPlaylist: Playlist, onClose: () => void }) => {

    const [selectMode, setSelectMode] = useState<boolean>(false);

    const { 
        setSearchQuery, searchQuery, filteredList
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

                    <button onClick={addRandomTracks} className={styles.rundomBtn}>
                        Add rundom <ShuffleIcon/>
                    </button>
                    
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.search}
                        placeholder="Search audios..."
                    />
                </div>

                {searchQuery.length != 0 && <span>Found {filteredList.length} audios</span>}
            </div>

            <SelectableList
                className={styles.trackList}
                data={Object.fromEntries(
                    filteredList
                        .slice()
                        .sort((a, b) => a.id - b.id)
                        .map((audio, idx) => [
                            audio.id,
                            <ImportingTrack
                                key={idx}
                                audio={audio}
                                trackNumber={idx + 1}
                                isInPlaylist={playlistAudioIds.has(audio.id)}
                                importPlaylistId={importPlaylist.id}
                                className={styles.track}
                            />
                        ])
                )}
                extraActions={[]}
                selectMode={selectMode}
                setSelectMode={setSelectMode}
                initialVisible={50}
            />
        </div>
    )
}

export default TrackImportLibrary;