import styles from "./PlaylistPage.module.scss"
import { useMemo, useState } from "react";
import { Playlist, playlistService, PlaylistType } from "@playlist";
import { IAudio } from "@audio";
import AudioFileModal from "@/components/modals/AudioFileModal/AudioFileModal";
import PlaylistTrack from "@/components/ui/track/variations/PlaylistTrack";
import { useParams } from "react-router-dom";
import { CheckBoxIcon, CirclePlusIcon, TrashIcon } from "@/assets/icons";
import SearchableLayout from "@/components/layout/SearchableLayout/SearchableLayout";
import { useData, useSearch } from "@common";
import { usePlaybackPlaylist, usePlaybackState } from "@playback";
import TrackImportModal from "@/components/modals/TrackImportModal/TrackImportModal";
import SelectableList from "@/components/ui/SelectableList/SelectableList";
import UploadsPlaylistTrack from "@/components/ui/track/variations/UploadsPlaylistTrack";

const PlaylistPage = ({}: {}) => {

    const { id } = useParams<{ id: string }>();

    const playlistId = Number(id)
    
    const [audioFileView, setAudioFileView] = useState<IAudio | null>(null);
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [importOpen, setImportOpen] = useState<boolean>(false)

    const { playbackState } = usePlaybackState();
    const { playbackPlaylist } = usePlaybackPlaylist();

    const { playlistsData } = useData();
        
    const playlist = useMemo<Playlist | null>(() => {
        if (!playlistId) return null;

        return playlistsData.playlists.find(p => p.id === playlistId) || null
    }, [playlistsData.playlists, playlistId])
    
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
                data={filteredList
                    .toSorted((a, b) => a.position - b.position)
                    .map((qi, idx) => ({
                        id: qi.audio.id,
                        node: playlist.type === PlaylistType.UPLOADED ? (
                            <UploadsPlaylistTrack
                                key={idx}
                                queueItem={qi}
                                trackNumber={idx + 1}
                                isInPlaylist={false}
                                currentPlaylistId={playlist.id}
                                openEditModal={setAudioFileView}
                                playing={playingAudioId === qi.audio.id}
                            />
                        ) : (
                            <PlaylistTrack
                                key={idx}
                                queueItem={qi}
                                trackNumber={idx + 1}
                                isInPlaylist={false}
                                currentPlaylistId={playlist.id}
                                openEditModal={setAudioFileView}
                                playing={playingAudioId === qi.audio.id}
                            />
                        )}))}
                extraActions={[
                    {
                        icon: <TrashIcon />,
                        title: "Remove from playlist",
                        func: (ids) => playlistService.removeEntry(playlist.id, ids),
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