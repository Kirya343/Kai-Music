import styles from "./PlaylistPage.module.scss"
import { useMemo, useState } from "react";
import { Playlist } from "@playlist";
import { IAudio } from "@audio";
import AudioFileModal from "@/components/modals/AudioFileModal/AudioFileModal";
import PlaylistTrack from "@/components/ui/track/PlaylistTrack";
import { useParams } from "react-router-dom";
import { CirclePlusIcon } from "@/assets/icons";
import SearchableLayout from "@/components/layout/SearchableLayout/SearchableLayout";
import { useData, useSearch } from "@common";
import { usePlaybackContext } from "@playback";
import TrackImportModal from "@/components/modals/TrackImportModal/TrackImportModal";

const PlaylistPage = ({}: {}) => {

    const { id } = useParams<{ id: string }>();

    const playlistId = Number(id)
    
    const [audioFileView, setAudioFileView] = useState<IAudio | null>(null);
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
                <button className={styles.upload} onClick={() => setImportOpen(true)}>
                    <CirclePlusIcon />
                    <span>Add tracks</span>
                </button>
            ]}
        >
            <div className={styles.trackList}>
                {filteredList.map((qi, idx) => (
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
                ))}
            </div>

            <AudioFileModal
                audioFile={audioFileView} 
                onClose={() => setAudioFileView(null)} 
            />

            {playlist && <TrackImportModal importPlaylist={playlist} isOpen={importOpen} onClose={() => setImportOpen(false)} />}
        </SearchableLayout>
    )
}

export default PlaylistPage;