import { IAudio, useLibrary } from "@audio";
import { useMemo, useState } from "react";
import styles from "./LibraryPage.module.scss"
import AudioFileModal from "@/components/modals/AudioFileModal/AudioFileModal";
import { CirclePlusIcon, CheckmarkIcon, CrossIcon } from "@/assets/icons";
import LibraryTrack from "@/components/ui/track/variations/LibraryTrack";
import SearchableLayout from "@/components/layout/SearchableLayout/SearchableLayout";
import { usePlaybackPlaylist, usePlaybackState } from "@playback";
import SelectableList from "@/components/ui/SelectableList/SelectableList";
import Loader from "@/components/ui/Loader/Loader";
import Pagination from "@/components/ui/Pagination/Pagination";

const LibraryPage = () => {

    const [selectMode, setSelectMode] = useState<boolean>(false);

    const {
        setSearchQuery,
        searchQuery,
        audiosPage, loading,
        page, setPage
    } = useLibrary();

    const [audioFileView, setAudioFileView] = useState<IAudio | null>(null);

    const { playbackState } = usePlaybackState();
    const { playbackPlaylist } = usePlaybackPlaylist();

    const playingAudioId = useMemo(() => {
        return playbackPlaylist?.queue.find(
            item => item.id === playbackState?.entryId
        )?.audio.id;
    }, [playbackPlaylist?.queue, playbackState?.entryId]);

    return (
        <SearchableLayout
            title="Library"
            search={{ searchQuery, setSearchQuery, filteredList: audiosPage?.content || [] }}
        >
            
            <Loader loadingActive={!loading && !audiosPage?.content}>
                <SelectableList
                    className={styles.trackList}
                    data={(audiosPage?.content ?? [])
                        .toSorted((a, b) => a.id - b.id)
                        .map((audio, idx) => ({
                            id: audio.id,
                            node: (
                                <LibraryTrack
                                    key={idx}
                                    audio={audio}
                                    trackNumber={idx + 1}
                                    importPlaylistId={playbackPlaylist?.id}
                                    openEditModal={setAudioFileView}
                                    playing={playingAudioId === audio.id}
                                />
                            )
                        }))}
                    extraActions={[]}
                    selectMode={selectMode}
                    setSelectMode={setSelectMode}
                    trackedItem={playbackState?.entryId}
                    initialVisible={50}
                    pagination={audiosPage ? {
                        page: page,
                        totalPages: audiosPage.page.totalPages,
                        onPageChange: (i) => setPage(i)
                    } : undefined}
                />
            </Loader>

            <AudioFileModal 
                audioFile={audioFileView} 
                onClose={() => setAudioFileView(null)} 
            />
        </SearchableLayout>
    )
}

export default LibraryPage;