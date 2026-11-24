import styles from "./PlaylistPage.module.scss";
import { useMemo, useState } from "react";
import { Playlist, playlistService, PlaylistType } from "@playlist";
import { audioService, IAudio } from "@audio";
import AudioFileModal from "@/components/modals/AudioFileModal/AudioFileModal";
import PlaylistTrack from "@/components/ui/track/variations/PlaylistTrack";
import { useNavigate, useParams } from "react-router-dom";
import { CheckBoxIcon, CheckmarkIcon, CirclePlusIcon, CrossIcon, ShuffleIcon, TrashIcon } from "@/assets/icons";
import SearchableLayout from "@/components/layout/SearchableLayout/SearchableLayout";
import { useData, useSearch, loggerFactory } from "@common";
import { usePlaybackPlaylist, usePlaybackState } from "@playback";
import TrackImportModal from "@/components/modals/TrackImportModal/TrackImportModal";
import SelectableList from "@/components/ui/SelectableList/SelectableList";
import UploadsPlaylistTrack from "@/components/ui/track/variations/UploadsPlaylistTrack";
import { Artwork } from "@/components/ui/Artwork/Artwork";
import { AxiosProgressEvent } from "axios";

const logger = loggerFactory.getLogger("Pages.Playlist");

interface IUploadingAudio {
    file: File;
    progress: number;
    id: string;
    success?: boolean
}

const PlaylistPage = ({}: {}) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const playlistId = Number(id);

    const [audioFileView, setAudioFileView] = useState<IAudio | null>(null);
    const [selectMode, setSelectMode] = useState<boolean>(false);
    const [importOpen, setImportOpen] = useState<boolean>(false);
    const [addingRandom, setAddingRandom] = useState<boolean>(false);

    const { playbackState } = usePlaybackState();
    const { playbackPlaylist } = usePlaybackPlaylist();

    const { playlistsData } = useData();

    const playlist = useMemo<Playlist | null>(() => {
        if (!playlistId || Number.isNaN(playlistId)) return null;

        return playlistsData.playlists.find((p) => p.id === playlistId) || null;
    }, [playlistsData.playlists, playlistId]);

    const { filteredList, searchQuery, setSearchQuery } = useSearch(playlist?.queue || []);

    const sortedQueue = useMemo(() => {
        return [...filteredList].sort((a, b) => a.position - b.position);
    }, [filteredList]);

    const playingAudioId = useMemo(() => {
        return playbackPlaylist?.queue.find((item) => item.id === playbackState?.entryId)?.audio.id;
    }, [playbackPlaylist?.queue, playbackState?.entryId]);

    const handleAddRandom = async () => {
        if (!playlist || addingRandom) return;
        setAddingRandom(true);
        try {
            await playlistService.addRandomTracks(playlist.id, 15);
        } catch (e) {
            logger.error(e);
        } finally {
            setAddingRandom(false);
        }
    };

    /** Uploads audios on server */
    const uploadAudios = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (!files) return;

        const fileList = Array.from(files);

        let identifiedList: { id: string, file: File}[] = [];

        for (const file of fileList) {
            const uploadId = `${file.name}-${Date.now()}`;

            setUploading(prev => [
                ...prev,
                {
                    id: uploadId,
                    file,
                    progress: 0
                }
            ]);

            identifiedList.push({id: uploadId, file})
        }

        for (const fileItem of identifiedList) {

            const file = fileItem.file;

            const formData = new FormData();
            formData.append("file", file);

            try {
                await audioService.uploadAudio(formData, (progressEvent: AxiosProgressEvent) => {
                    if (!progressEvent.total) return;

                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );

                    setUploading(prev =>
                        prev.map(item =>
                            item.id === fileItem.id
                                ? {
                                    ...item,
                                    progress: percent,
                                    success: percent >= 100 ? true : undefined
                                }
                                : item
                        )
                    );
                });
            } catch (error) {
                setUploading(prev =>
                    prev.map(item =>
                        item.id === fileItem.id
                            ? { ...item, success: false }
                            : item
                    )
                );
            }
        }
    };

    const [uploading, setUploading] = useState<IUploadingAudio[]>([]);

    // Фолбэк: плейлист не найден или удалён
    if (!playlist) {
        const fallbackPlaylists = playlistsData.playlists.slice(0, 3);

        return (
            <div className={styles.fallbackPage}>
                <div className={styles.fallbackCard}>
                    <span className={styles.fallbackBadge}>PLAYLIST NOT FOUND</span>
                    <h1 className={styles.fallbackTitle}>
                        This playlist doesn&apos;t exist
                    </h1>
                    <p className={styles.fallbackDesc}>
                        It may have been deleted, or the link #{id || "—"} is invalid. Head back
                        to your library or jump into one of your existing playlists.
                    </p>

                    <div className={styles.fallbackActions}>
                        <button
                            type="button"
                            className={styles.primaryBtn}
                            onClick={() => navigate(-1)}
                        >
                            Go back
                        </button>
                        <button
                            type="button"
                            className={styles.secondaryBtn}
                            onClick={() => navigate("/")}
                        >
                            Home &amp; Library
                        </button>
                    </div>

                    {fallbackPlaylists.length > 0 && (
                        <div className={styles.quickSwitch}>
                            <div className={styles.quickSwitchLabel}>Available playlists</div>
                            <div className={styles.quickSwitchList}>
                                {fallbackPlaylists.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        className={styles.quickSwitchItem}
                                        onClick={() => navigate(`/app/playlists/${item.id}`)}
                                    >
                                        <Artwork
                                            title={item.title}
                                            seed={item.title}
                                            size="xs"
                                            rounded="md"
                                        />
                                        <span className={styles.quickSwitchName}>
                                            {item.title}
                                        </span>
                                        <span className={styles.quickSwitchCount}>
                                            {item.queue?.length ?? 0} tracks
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    const isSearchFilteredEmpty = Boolean(searchQuery.trim()) && sortedQueue.length === 0;

    return (
        <SearchableLayout
            title={playlist?.title || ""}
            search={{ searchQuery, setSearchQuery, filteredList }}
            extraActions={[
                <button
                    className={styles.upload}
                    key="select"
                    onClick={() => setSelectMode((prev) => !prev)}
                >
                    <CheckBoxIcon />
                </button>,
                ...(playlist.type === PlaylistType.UPLOADED
                    ? [
                        <label htmlFor="uploadAudio" key="upload" className={styles.upload}>
                            <CirclePlusIcon />
                            <span>Upload new</span>
                        </label>
                    ]
                    : [
                        <button
                            className={styles.upload}
                            key="import"
                            onClick={() => setImportOpen(true)}
                        >
                            <CirclePlusIcon />
                            <span>Add tracks</span>
                        </button>
                    ])
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
            {sortedQueue.length > 0 ? (
                <SelectableList
                    className={styles.trackList}
                    data={sortedQueue.map((qi, idx) => ({
                        id: qi.audio.id,
                        node:
                            playlist.type === PlaylistType.UPLOADED ? (
                                <UploadsPlaylistTrack
                                    key={qi.id ?? idx}
                                    queueItem={qi}
                                    trackNumber={idx + 1}
                                    isInPlaylist={false}
                                    currentPlaylistId={playlist.id}
                                    openEditModal={setAudioFileView}
                                    playing={playingAudioId === qi.audio.id}
                                />
                            ) : (
                                <PlaylistTrack
                                    key={qi.id ?? idx}
                                    queueItem={qi}
                                    trackNumber={idx + 1}
                                    isInPlaylist={false}
                                    currentPlaylistId={playlist.id}
                                    openEditModal={setAudioFileView}
                                    playing={playingAudioId === qi.audio.id}
                                />
                            ),
                    }))}
                    extraActions={[
                        {
                            icon: <TrashIcon />,
                            title: "Remove from playlist",
                            func: (ids) => playlistService.removeEntry(playlist.id, ids),
                            influence: "selected",
                        },
                    ]}
                    selectMode={selectMode}
                    setSelectMode={setSelectMode}
                    trackedItem={playbackState?.entryId}
                    initialVisible={50}
                />
            ) : (
                // Фолбэк: пустой плейлист или ничего не найдено по запросу
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>♪</div>
                    <h2 className={styles.emptyTitle}>
                        {isSearchFilteredEmpty
                            ? `No tracks matching "${searchQuery}"`
                            : "This playlist is empty"}
                    </h2>
                    <p className={styles.emptyDesc}>
                        {isSearchFilteredEmpty
                            ? "Try another keyword or clear the search filter to see all tracks."
                            : "Add tracks from your library or fill it with a random mix to start listening."}
                    </p>

                    <div className={styles.emptyActions}>
                        {isSearchFilteredEmpty ? (
                            <button
                                type="button"
                                className={styles.primaryBtn}
                                onClick={() => setSearchQuery("")}
                            >
                                Clear search
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className={styles.primaryBtn}
                                    onClick={() => setImportOpen(true)}
                                >
                                    <CirclePlusIcon />
                                    <span>Add tracks</span>
                                </button>
                                <button
                                    type="button"
                                    className={styles.secondaryBtn}
                                    onClick={handleAddRandom}
                                    disabled={addingRandom}
                                >
                                    <ShuffleIcon />
                                    <span>{addingRandom ? "Adding..." : "Add random mix"}</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <AudioFileModal audioFile={audioFileView} onClose={() => setAudioFileView(null)} />

            {playlist && (
                <TrackImportModal
                    importPlaylist={playlist}
                    isOpen={importOpen}
                    onClose={() => setImportOpen(false)}
                />
            )}

            <input 
                type="file"
                accept="audio/*"
                id="uploadAudio"
                className={styles.uploadAudio}
                multiple
                onChange={uploadAudios}
            />
        </SearchableLayout>
    );
};

export default PlaylistPage;