import styles from "./PlaylistPage.module.scss"
import { useMemo, useState } from "react";
import { Playlist, playlistService } from "@playlist";
import { IAudio } from "@audio";
import AudioFileModal from "@/components/modals/AudioFileModal/AudioFileModal";
import PlaylistTrack from "@/components/ui/track/PlaylistTrack";
import { useParams } from "react-router-dom";
import { CheckBoxIcon, CirclePlusIcon, PenIcon, TrashIcon } from "@/assets/icons";
import SearchableLayout from "@/components/layout/SearchableLayout/SearchableLayout";
import { useData, useSearch } from "@common";
import { usePlaybackContext } from "@playback";
import TrackImportModal from "@/components/modals/TrackImportModal/TrackImportModal";
import SelectableList from "@/components/ui/SelectableList/SelectableList";

const PlaylistPage = ({}: {}) => {

    const { id } = useParams<{ id: string }>();

    const playlistId = Number(id)
    
    const [audioFileView, setAudioFileView] = useState<IAudio | null>(null);
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [importOpen, setImportOpen] = useState<boolean>(false)

    const { playbackState, playbackPlaylist } = usePlaybackContext();

    const { playlistsData } = useData();
        
    const playlist = useMemo<Playlist | null>(() => {
        if (!playlistId) return null;

        return playlistsData.playlists.find(p => p.id === playlistId) || null
    }, [playlistsData.playlists])
    
    const { filteredList, searchQuery, setSearchQuery } = useSearch(playlist?.queue || []);

    const playingAudioId = useMemo(() => {
        return playbackPlaylist?.queue.find(
            item => item.id === playbackState?.entryId
        )?.audio.id;
    }, [playbackPlaylist?.queue, playbackState?.entryId]);

    if (!playlist) return null;

    return (
        <SearchableLayout
            title={playlist?.title || ""}
            search={{searchQuery, setSearchQuery, filteredList}}
            extraActions={[
                <button className={styles.upload} key='select' onClick={() => setSelectMode(true)}>
                    <CheckBoxIcon />
                </button>,
                <button className={styles.upload} key='upload' onClick={() => setImportOpen(true)}>
                    <CirclePlusIcon />
                    <span>Add tracks</span>
                </button>
            ]}
        >

            <SelectableList
                className={styles.trackList}
                data={Object.fromEntries(
                    filteredList
                        .slice()
                        .sort((a, b) => a.id - b.id)
                        .map((qi, idx) => [
                            qi.id,
                            <PlaylistTrack
                                key={idx}
                                queueItem={qi}
                                trackNumber={idx + 1}
                                isInPlaylist={false}
                                currentPlaylistId={playlist.id}
                                openEditModal={setAudioFileView}
                                handleRemove={playlistsData.removeAudio}
                                playing={playingAudioId === qi.audio.id}
                            />
                        ])
                )}
                extraActions={[
                    {
                        icon: <TrashIcon />,
                        title: "Remove from playlist",
                        func: (ids) => {
                            const audioIds = filteredList
                                .filter(qi => ids.some(id => Number(qi.id) === Number(id)))
                                .map(qi => qi.audio.id);

                            if (audioIds.length === 0) return;

                            playlistService.removeFromQueue(playlist.id, audioIds);
                        },
                        influence: "selected"
                    }
                ]}
                selectMode={selectMode}
                setSelectMode={setSelectMode}
                trackedItem={playbackState?.entryId}
                initialVisible={50}
            />

            <AudioFileModal
                audioFile={audioFileView} 
                onClose={() => setAudioFileView(null)} 
            />

            {playlist && <TrackImportModal importPlaylist={playlist} isOpen={importOpen} onClose={() => setImportOpen(false)} />}

        </SearchableLayout>
    )
}

export default PlaylistPage;