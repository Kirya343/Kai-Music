import { IAudio, useLibrary } from "@audio";
import { useMemo, useState } from "react";
import styles from "./LibraryPage.module.scss"
import AudioFileModal from "@/components/modals/AudioFileModal/AudioFileModal";
import { CirclePlusIcon, CheckmarkIcon, CrossIcon } from "@/assets/icons";
import LibraryTrack from "@/components/ui/track/LibraryTrack";
import SearchableLayout from "@/components/layout/SearchableLayout/SearchableLayout";
import { useData } from "@common";
import { useRoomPlayback } from "@playback";

const LibraryPage = () => {

    const { audiosData, roomData } = useData();

    const { 
        visibleAudios,
        setSearchQuery,
        searchQuery, uploadAudios,
        uploading, filteredList,
        rowVirtualizer, parentRef
    } = useLibrary();

    const [audioFileView, setAudioFileView] = useState<IAudio | null>(null);
    
    const { playbackState } = useRoomPlayback();

    const playlistAudioIds = useMemo(() => {
        return new Set(
            roomData.playlist?.queue.map(item => item.audio.id)
        );
    }, [roomData.playlist?.queue]);

    const playingAudioId = useMemo(() => {
        return roomData.playlist?.queue.find(
            item => item.id === playbackState?.entryId
        )?.audio.id;
    }, [roomData.playlist?.queue, playbackState?.entryId]);

    return (
        <SearchableLayout
            title="Library"
            search={{searchQuery, setSearchQuery, filteredList}}
            extraActions={[
                <label htmlFor="uploadAudio" className={styles.upload}>
                    <CirclePlusIcon />
                    <span>Upload new</span>
                </label>
            ]}
        >

            {uploading.length > 0 && (
                <>
                    <div className={styles.uploadingStat}>
                        <span>Uploaded: <strong>{uploading.filter(a => a.progress == 100).length}/{uploading.length}</strong></span>
                        <span>||</span>
                        <span>Success: <strong>{uploading.filter(a => a.success && a.progress == 100).length}</strong></span>
                        <span>||</span>
                        <span>Failed: <strong>{uploading.filter(a => !a.success && a.progress == 100).length}</strong></span>
                    </div>
                    <div className={styles.uploadingList}>
                        {uploading.map(item => (
                            <div key={item.id} className={styles.uploadItem}>
                                <div className={styles.progressBar} style={{ width: `${item.progress}%` }}/>
                                <span>{item.file?.name}</span>
                                <span className={styles.percent}>{item.progress}%</span>
                                {item.success && <CheckmarkIcon className={`${styles.status} ${styles.success}`} />}
                                {item.success === false && <CrossIcon className={`${styles.status} ${styles.error}`} />}
                            </div>
                        ))}
                    </div>
                </>
            )}
                
            <div className={styles.trackList} ref={parentRef}>
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
                                <LibraryTrack
                                    audio={audio}
                                    trackNumber={item.index + 1}
                                    importPlaylistId={roomData.playlist?.id}
                                    openEditModal={setAudioFileView}
                                    handleDelete={audiosData.deleteAudio}
                                    playing={playingAudioId === audio.id}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>

            <input 
                type="file"
                accept="audio/*"
                id="uploadAudio"
                className={styles.uploadAudio}
                multiple
                onChange={uploadAudios}
            />

            <AudioFileModal 
                audioFile={audioFileView} 
                onClose={() => setAudioFileView(null)} 
            />
        </SearchableLayout>
    )
}

export default LibraryPage;