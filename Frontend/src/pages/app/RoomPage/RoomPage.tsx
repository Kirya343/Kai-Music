import { useMemo, useState } from "react";
import { IRoomUpdate, roomService } from "@room";
import styles from "./RoomPage.module.scss";
import AudioMiniPlayer from "@/components/ui/player/MobileAudioMiniPlayer/MobileAudioMiniPlayer";
import { useGlobal } from "@common";
import { useWebSocket } from "@websocket";
import KebabMenu from "@/components/ui/KebabMenu/KebabMenu";
import { ArrowIcon, CheckBoxIcon, LeftIcon, PlusIcon, ShuffleIcon } from "@/assets/icons";
import Loader from "@/components/ui/Loader/Loader";
import { playlistService } from "@playlist";
import TrackImportModal from "@/components/modals/TrackImportModal/TrackImportModal";
import PlaybackQueueTrack from "@/components/ui/track/variations/PlaybackQueueTrack";
import { loggerFactory } from "@common";
import SelectableList from "@/components/ui/SelectableList/SelectableList";
import AvatarStack from "@/components/ui/AvatarStack/AvatarStack";
import { usePlaybackData, usePlaybackPlaylist, usePlaybackState } from "@playback";
import { Artwork } from "@/components/ui/Artwork/Artwork";
import clsx from "clsx";

const logger = loggerFactory.getLogger("Pages.Room");

const FALLBACK_LISTENERS = [
    { id: "mock-1", name: "Kirya" },
    { id: "mock-2", name: "Masha" },
    { id: "mock-3", name: "Alex" },
];

const VIBE_TAGS = ["Late night lo-fi", "Synth & Indie", "Chill mix", "High energy"];

const RoomPage = () => {
    const [selectMode, setSelectMode] = useState<boolean>(false);

    const { playbackState } = usePlaybackState();
    const { playbackPlaylist } = usePlaybackPlaylist();
    const playbackData = usePlaybackData();

    const { isMobile } = useGlobal();

    const room = playbackData.room;

    const { started } = useGlobal();
    const { error } = useWebSocket();
    const [newRoomName, setNewRoomName] = useState<string>(room?.title || "");
    const [editMode, setEditMode] = useState<boolean>(false);
    const [copiedCode, setCopiedCode] = useState<boolean>(false);
    const [activeTag, setActiveTag] = useState<string>(VIBE_TAGS[0]);
    const [addingRandom, setAddingRandom] = useState<boolean>(false);

    const [importOpen, setImportOpen] = useState<boolean>(false);

    const [queueVisible, setQueueVisible] = useState<boolean>(false);

    const saveRoom = async () => {
        if (!room) return;

        const trimmed = newRoomName.trim();
        if (!trimmed) {
            setNewRoomName(room.title || "");
            setEditMode(false);
            return;
        }

        const roomUpdate: IRoomUpdate = {
            title: trimmed,
        };

        try {
            await roomService.updateRoom(room.id, roomUpdate);
            setEditMode(false);
        } catch (e) {
            logger.error(e);
        }
    };

    const handleCopyCode = async () => {
        const code = room?.code;
        if (!code) return;
        try {
            await navigator.clipboard?.writeText(code);
            setCopiedCode(true);
            setTimeout(() => setCopiedCode(false), 1600);
        } catch {
            logger.warn("Clipboard copy failed");
        }
    };

    const handleAddRandom = async () => {
        if (!playbackPlaylist || addingRandom) return;
        setAddingRandom(true);
        try {
            await playlistService.addRandomTracks(playbackPlaylist.id, 15);
        } catch (e) {
            logger.error(e);
        } finally {
            setAddingRandom(false);
        }
    };

    const listeners = useMemo(() => {
        if (playbackData?.listeners && playbackData.listeners.length > 0) {
            return playbackData.listeners;
        }
        return FALLBACK_LISTENERS;
    }, [playbackData?.listeners]);

    const sortedQueue = useMemo(() => {
        return (playbackPlaylist?.queue ?? []).toSorted((a, b) => a.position - b.position);
    }, [playbackPlaylist?.queue]);

    const currentItem = useMemo(() => {
        if (!sortedQueue.length) return null;
        return sortedQueue.find((qi) => qi.id === playbackState?.entryId) ?? sortedQueue[0];
    }, [sortedQueue, playbackState?.entryId]);

    const totalDurationSec = useMemo(() => {
        return sortedQueue.reduce((acc, item) => acc + (item.audio?.duration || 0), 0);
    }, [sortedQueue]);

    const formattedTotalTime = useMemo(() => {
        if (!totalDurationSec) return "42m";
        const mins = Math.round(totalDurationSec / 60);
        if (mins < 60) return `${mins}m`;
        const h = Math.floor(mins / 60);
        const rem = mins % 60;
        return `${h}h ${rem}m`;
    }, [totalDurationSec]);

    return (
        <>
            <div className={styles.page}>
                <Loader loadingActive={!room}>
                    {error && (
                        <div className={styles.errorBanner} role="alert">
                            <span>Connection lost — reconnecting to live room…</span>
                        </div>
                    )}

                    <div className={clsx(styles.layout, queueVisible && styles.queueActive)}>
                        {/* Левая колонка: карточка комнаты, статус и слушатели */}
                        {(!isMobile || (isMobile && !queueVisible)) && (
                            <aside className={styles.roomCard}>
                                <div className={styles.roomTopRow}>
                                    <span className={styles.liveBadge}>
                                        <span className={styles.liveDot} />
                                        LIVE ROOM #{room?.id ?? "—"}
                                    </span>

                                    <button
                                        type="button"
                                        className={styles.codePill}
                                        onClick={handleCopyCode}
                                        title="Copy room invite code"
                                    >
                                        <span className={styles.codeLabel}>CODE</span>
                                        <span className={styles.codeValue}>{room?.code || "3005DU"}</span>
                                        <span className={styles.copyHint}>
                                            {copiedCode ? "Copied" : "Copy"}
                                        </span>
                                    </button>
                                </div>

                                <div className={styles.titleBlock}>
                                    {editMode ? (
                                        <div className={styles.editRow}>
                                            <input
                                                className={styles.roomInput}
                                                value={newRoomName}
                                                onChange={(e) => setNewRoomName(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") saveRoom();
                                                    if (e.key === "Escape") {
                                                        setNewRoomName(room?.title || "");
                                                        setEditMode(false);
                                                    }
                                                }}
                                                placeholder={room?.title || "Room title"}
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                className={styles.saveBtn}
                                                onClick={saveRoom}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={styles.titleDisplay}>
                                            <h1
                                                onDoubleClick={() => {
                                                    setNewRoomName(room?.title || "");
                                                    setEditMode(true);
                                                }}
                                                className={styles.roomTitle}
                                                title="Double-click to rename"
                                            >
                                                {room?.title || "Kirya's room"}
                                            </h1>
                                            <button
                                                type="button"
                                                className={styles.renameBtn}
                                                onClick={() => {
                                                    setNewRoomName(room?.title || "");
                                                    setEditMode(true);
                                                }}
                                            >
                                                Rename
                                            </button>
                                        </div>
                                    )}

                                    <p className={styles.roomSubtitle}>
                                        Shared queue synced in real time. Drop tracks in or pick a mood tag.
                                    </p>
                                </div>

                                {/* Теги настроения (заглушка для живости интерфейса) */}
                                <div className={styles.tagsRow}>
                                    {VIBE_TAGS.map((tag) => (
                                        <button
                                            key={tag}
                                            type="button"
                                            onClick={() => setActiveTag(tag)}
                                            className={`${styles.vibeTag} ${
                                                activeTag === tag ? styles.vibeTagActive : ""
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>

                                {/* Сейчас звучит / главный акцент комнаты */}
                                <div className={styles.nowPlayingBox} onClick={() => isMobile && setQueueVisible(true)}>
                                    <div className={styles.nowPlayingHeader}>
                                        <span className={styles.sectionLabel}>ON AIR</span>
                                        <span className={styles.queueStat}>
                                            {sortedQueue.length} tracks · {formattedTotalTime}
                                        </span>
                                    </div>

                                    <div className={styles.nowPlayingContent}>
                                        <Artwork
                                            src={currentItem?.audio.coverUrl}
                                            title={`${currentItem?.audio.title}-${currentItem?.audio.artist}`}
                                            size="sm"
                                            rounded="md"
                                        />
                                        <div className={styles.trackMeta}>
                                            <div className={styles.trackName}>
                                                {currentItem?.audio?.title || "The Less I Know The Better"}
                                            </div>
                                            <div className={styles.trackArtist}>
                                                {currentItem?.audio?.artist || "Tame Impala · Currents"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Слушатели */}
                                <div className={styles.listenersBox}>
                                    <div className={styles.listenersInfo}>
                                        <AvatarStack users={listeners} />
                                        <div>
                                            <div className={styles.listenersCount}>
                                                {playbackData?.listeners?.length ?? listeners.length}{" "}
                                                listeners in room
                                            </div>
                                            <div className={styles.listenersHint}>
                                                Everyone can queue &amp; vote next
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Быстрые действия */}
                                <div className={styles.quickActions}>
                                    <button
                                        type="button"
                                        className={styles.primaryAction}
                                        onClick={() => setImportOpen(true)}
                                    >
                                        <PlusIcon />
                                        <span>Add tracks</span>
                                    </button>
                                    <button
                                        type="button"
                                        className={styles.secondaryAction}
                                        onClick={handleAddRandom}
                                        disabled={addingRandom}
                                    >
                                        <ShuffleIcon />
                                        <span>{addingRandom ? "Adding..." : "Random mix"}</span>
                                    </button>
                                </div>
                            </aside>
                        )}

                        {/* Правая колонка: очередь воспроизведения */}
                        {(!isMobile || (isMobile && queueVisible)) && (
                            <section className={styles.queueCard}>
                                <div className={styles.queueHeader}>
                                    <div className={styles.queueTitleGroup}>
                                        <ArrowIcon direction="left" onClick={() => isMobile && setQueueVisible(false)}/>
                                        <h2>Playback queue</h2>
                                        <span className={styles.countBadge}>{sortedQueue.length}</span>
                                    </div>

                                    <div className={styles.queueControls}>
                                        <button
                                            type="button"
                                            className={`${styles.ghostBtn} ${
                                                selectMode ? styles.ghostBtnActive : ""
                                            }`}
                                            onClick={() => setSelectMode((prev) => !prev)}
                                        >
                                            {selectMode ? "Done" : "Select"}
                                        </button>

                                        <KebabMenu
                                            actions={[
                                                {
                                                    icon: <CheckBoxIcon />,
                                                    title: "Select tracks",
                                                    func: () => setSelectMode((prev) => !prev),
                                                },
                                                {
                                                    icon: <PlusIcon />,
                                                    title: "Add tracks",
                                                    func: () => setImportOpen(true),
                                                },
                                                {
                                                    icon: <ShuffleIcon />,
                                                    title: "Add random (30)",
                                                    func: async () => {
                                                        if (playbackPlaylist) {
                                                            await playlistService.addRandomTracks(
                                                                playbackPlaylist.id,
                                                                30
                                                            );
                                                        }
                                                    },
                                                },
                                            ]}
                                        />
                                    </div>
                                </div>

                                {sortedQueue.length > 0 ? (
                                    <SelectableList
                                        className={styles.trackList}
                                        data={sortedQueue.map((qi) => ({
                                            id: qi.audio.id,
                                            node: (
                                                <PlaybackQueueTrack
                                                    key={qi.id}
                                                    queueItem={qi}
                                                    playing={playbackState?.entryId === qi.id}
                                                />
                                            ),
                                        }))}
                                        extraActions={[
                                            {
                                                title: "Remove from queue",
                                                func: (ids) =>
                                                    playlistService.removeEntry(
                                                        playbackPlaylist?.id,
                                                        ids
                                                    ),
                                                influence: "selected",
                                            },
                                        ]}
                                        selectMode={selectMode}
                                        setSelectMode={setSelectMode}
                                        trackedItem={playbackState?.entryId}
                                        initialVisible={"all"}
                                    />
                                ) : (
                                    <div className={styles.emptyQueue}>
                                        <div className={styles.emptyTitle}>Queue is empty right now</div>
                                        <p className={styles.emptyDesc}>
                                            Add tracks from your library or fill it with a random mix to
                                            get the room going.
                                        </p>
                                        <div className={styles.emptyActions}>
                                            <button
                                                type="button"
                                                className={styles.primaryAction}
                                                onClick={() => setImportOpen(true)}
                                            >
                                                Add tracks
                                            </button>
                                            <button
                                                type="button"
                                                className={styles.secondaryAction}
                                                onClick={handleAddRandom}
                                            >
                                                Fill random tracks
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </section>
                        )}
                    </div>
                </Loader>

                {started && <AudioMiniPlayer />}
            </div>

            {playbackPlaylist && (
                <TrackImportModal
                    importPlaylist={playbackPlaylist}
                    isOpen={importOpen}
                    onClose={() => setImportOpen(false)}
                />
            )}
        </>
    );
};

export default RoomPage;