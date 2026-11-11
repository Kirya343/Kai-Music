import { useState } from "react";
import styles from "./PlaybackQueueModal.module.scss"
import Modal from "@/components/modals/Modal/Modal";
import { usePlaybackContext } from "@playback";
import TrackImportModal from "../TrackImportModal/TrackImportModal";
import SelectableList from "@/components/ui/SelectableList/SelectableList";
import PlaybackQueueTrack from "@/components/ui/track/PlaybackQueueTrack";
import { playlistService } from "@playlist";

/**
 * AudioFileModal is modal to view and edit data of audiofiles
 * 
 * @param audioFile data to edit 
 * @param onClose void to close modal 
 */
const PlaybackQueueModal = ({ 
    isOpen, onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) => {

    const [importOpen, setImportOpen] = useState<boolean>(false)
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const { playbackState, playbackPlaylist } = usePlaybackContext();

    const deleteFromPlaylist = (ids: number[]) => {
            
        if (!playbackPlaylist?.id) return;

        playlistService.removeFromQueue(playbackPlaylist.id, ids)
    }

    return (
        <Modal
            isOpen={isOpen} 
            onClose={onClose} 
            title={`Playback queue`}
        >
            <div className={styles.body}>
                <SelectableList
                    className={styles.trackList}
                    data={Object.fromEntries(
                        (playbackPlaylist?.queue ?? [])
                            .slice()
                            .sort((a, b) => a.position - b.position)
                            .map(qi => [
                                qi.id,
                                <PlaybackQueueTrack
                                    key={qi.id}
                                    queueItem={qi}
                                    playing={playbackState?.entryId === qi.id}
                                />
                            ])
                    )}
                    extraActions={[
                        {
                            title: "Remove from queue",
                            func: (ids) => deleteFromPlaylist(ids),
                            influence: "selected"
                        }
                    ]}
                    selectMode={selectMode}
                    setSelectMode={setSelectMode}
                    trackedItem={playbackState?.entryId}
                    initialVisible={"all"}
                />

                <button 
                    className={styles.addTrack} 
                    onClick={() => setImportOpen(true)}
                >
                    Add track
                </button>
            </div>

            {playbackPlaylist && <TrackImportModal importPlaylist={playbackPlaylist} isOpen={importOpen} onClose={() => setImportOpen(false)} />}
        </Modal>
    )
}


export default PlaybackQueueModal;