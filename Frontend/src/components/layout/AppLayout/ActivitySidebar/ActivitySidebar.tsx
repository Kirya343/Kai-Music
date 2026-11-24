import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./ActivitySidebar.module.scss";
import { Artwork } from "@/components/ui/Artwork/Artwork";
import { CirclePlusIcon, DoorIcon } from "@/assets/icons";
import { IListeningRoom, roomService } from "@room";
import { playbackService, RoomPlaybackDTO, usePlaybackAudio, usePlaybackControls, usePlaybackPlaylist } from "@playback";
import { useWebSocket } from "@websocket";
import { loggerFactory } from "@common";
import PlaylistQueue from "./PlaylistQueue/PlaylistQueue";

const logger = loggerFactory.getLogger("Components.ActivitySidebar");

export interface FriendActivityItem {
    id: string;
    username: string;
    trackTitle: string;
    artist: string;
    roomTitle?: string;
    roomCode?: string;
    isOnline?: boolean;
}

export interface QueueTrackItem {
    id: string;
    title: string;
    artist: string;
    duration: string;
    addedBy?: string;
    coverUrl?: string | null;
}

interface ActivitySidebarProps {
    rooms?: IListeningRoom[];
    currentRoom?: { title: string; code: string; listenersCount: number } | null;
    friendsActivity?: FriendActivityItem[];
    queue?: QueueTrackItem[];
    nowPlaying?: QueueTrackItem | null;
    onOpenJoinModal?: () => void;
    defaultCollapsed?: boolean;
    className?: string;
}

const MOCK_FRIENDS: FriendActivityItem[] = [
    {
        id: "f-1",
        username: "Kirya",
        trackTitle: "Midnight City",
        artist: "M83",
        roomTitle: "Kirya's room",
        roomCode: "KAI-01",
        isOnline: true,
    },
    {
        id: "f-2",
        username: "Nutellka",
        trackTitle: "After Hours",
        artist: "The Weeknd",
        roomTitle: "Nutellka's room",
        roomCode: "KAI-02",
        isOnline: true,
    },
    {
        id: "f-3",
        username: "Alex",
        trackTitle: "Nights",
        artist: "Frank Ocean",
        isOnline: false,
    },
];

type SidebarTab = "live" | "queue";

function formatListeners(count: number): string {
    return `${count} ${count === 1 ? "person" : "people"}`;
}

export const ActivitySidebar: React.FC<ActivitySidebarProps> = ({
    rooms,
    currentRoom = null,
    friendsActivity,
    onOpenJoinModal,
    defaultCollapsed = false,
    className,
}) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [activeTab, setActiveTab] = useState<SidebarTab>("live");
    const [quickCode, setQuickCode] = useState("");
    const [copiedCode, setCopiedCode] = useState(false);

    const navigate = useNavigate();
    const { client } = useWebSocket();
    const { autoPlay, setAutoPlay, resyncPlayback } = usePlaybackControls();
    const { currentPlaybackState } = usePlaybackAudio();
    const { playingAudio, playbackPlaylist } = usePlaybackPlaylist();

    const [activity, setActivity] = useState<RoomPlaybackDTO[] | null>(null)

    const friends = friendsActivity ?? MOCK_FRIENDS;
    const queueItems = playbackPlaylist?.queue || [];

    useEffect(() => {
        async function loadActiveRooms() {

            const res = await playbackService.getActiveRooms();
            
            setActivity(res.data)
        }

        loadActiveRooms()
    }, [])

    const handleCreateRoom = async () => {
        try {
            await roomService.createRoom();
            navigate("/app/room");
        } catch (e) {
            logger.error(e);
        }
    };

    const handleJoinRoom = async (code: string) => {
        if (!code.trim()) return;
        try {
            if (!autoPlay) setAutoPlay(true);
            await roomService.joinRoom(code.trim());
            navigate("/app/room");
        } catch (e) {
            logger.error(e);
        } finally {
            resyncPlayback(client, true);
        }
    };

    const handleQuickJoin = (e: React.FormEvent) => {
        e.preventDefault();
        handleJoinRoom(quickCode);
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard?.writeText(code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 1600);
    };

    return (
        <aside
            className={clsx(
                styles.sidebar,
                collapsed && styles.collapsed,
                className
            )}
            aria-label="Live activity and queue sidebar"
        >
            {/* Шапка с переключателем вкладок */}
            <div className={styles.header}>
                {!collapsed && (
                    <div className={styles.tabs} role="tablist" aria-label="Right sidebar tabs">
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === "live"}
                            className={clsx(styles.tabBtn, activeTab === "live" && styles.activeTab)}
                            onClick={() => setActiveTab("live")}
                        >
                            Rooms & Live
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected={activeTab === "queue"}
                            className={clsx(styles.tabBtn, activeTab === "queue" && styles.activeTab)}
                            onClick={() => setActiveTab("queue")}
                        >
                            Queue
                            {queueItems.length > 0 && (
                                <span className={styles.tabCount}>{queueItems.length}</span>
                            )}
                        </button>
                    </div>
                )}

                <button
                    type="button"
                    className={styles.collapseBtn}
                    onClick={() => setCollapsed((prev) => !prev)}
                    title={collapsed ? "Развернуть панель" : "Свернуть панель"}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    <span className={styles.chevron}>{collapsed ? "«" : "»"}</span>
                </button>
            </div>

            {/* Компактный режим (только аватарки/обложки) */}
            {collapsed ? (
                <div className={styles.collapsedContent}>
                    <button
                        type="button"
                        className={styles.collapsedAction}
                        onClick={handleCreateRoom}
                        title="Create New Room"
                    >
                        <CirclePlusIcon />
                    </button>

                    <div className={styles.divider} />

                    {friends.map((friend) => (
                        <button
                            key={friend.id}
                            type="button"
                            className={styles.collapsedAvatar}
                            onClick={() =>
                                friend.roomCode ? handleJoinRoom(friend.roomCode) : setCollapsed(false)
                            }
                            title={`${friend.username}: ${friend.artist} — ${friend.trackTitle}`}
                        >
                            <Artwork
                                title={friend.username}
                                seed={friend.username}
                                size="sm"
                                rounded="full"
                                isPlaying={friend.isOnline}
                            />
                        </button>
                    ))}
                </div>
            ) : (
                <div className={styles.scrollArea}>
                    {activeTab === "live" ? (
                        <>
                            {/* Текущая комната или быстрые действия */}
                            {currentRoom ? (
                                <section className={styles.activeSessionCard}>
                                    <div className={styles.sessionTop}>
                                        <span className={styles.liveBadge}>In Room</span>
                                        <button
                                            type="button"
                                            className={styles.copyCodeBtn}
                                            onClick={() => handleCopyCode(currentRoom.code)}
                                        >
                                            {copiedCode ? "Copied!" : currentRoom.code}
                                        </button>
                                    </div>
                                    <strong className={styles.sessionTitle}>{currentRoom.title}</strong>
                                    <span className={styles.sessionSub}>
                                        {formatListeners(currentRoom.listenersCount)} listening together
                                    </span>
                                    <button
                                        type="button"
                                        className={styles.returnBtn}
                                        onClick={() => navigate("/app/room")}
                                    >
                                        Open Room
                                    </button>
                                </section>
                            ) : (
                                <section className={styles.quickActions}>
                                    <div className={styles.actionRow}>
                                        <button
                                            type="button"
                                            className={styles.primaryAction}
                                            onClick={handleCreateRoom}
                                        >
                                            <CirclePlusIcon />
                                            <span>New Room</span>
                                        </button>

                                        {onOpenJoinModal && (
                                            <button
                                                type="button"
                                                className={styles.secondaryAction}
                                                onClick={onOpenJoinModal}
                                                title="Join by modal"
                                            >
                                                <DoorIcon />
                                                <span>Join</span>
                                            </button>
                                        )}
                                    </div>

                                    <form className={styles.codeForm} onSubmit={handleQuickJoin}>
                                        <input
                                            type="text"
                                            value={quickCode}
                                            onChange={(e) => setQuickCode(e.target.value)}
                                            placeholder="Room code..."
                                            className={styles.codeInput}
                                        />
                                        <button
                                            type="submit"
                                            className={styles.codeBtn}
                                            disabled={!quickCode.trim()}
                                        >
                                            Go
                                        </button>
                                    </form>
                                </section>
                            )}

                            {/* Публичные комнаты (если переданы) */}
                            {rooms && rooms.length > 0 && (
                                <section className={styles.block}>
                                    <div className={styles.blockHeader}>
                                        <h3>Public Rooms</h3>
                                        <span className={styles.badge}>{rooms.length}</span>
                                    </div>

                                    <div className={styles.itemsList}>
                                        {rooms.map((room) => (
                                            <button
                                                key={room.id}
                                                type="button"
                                                className={styles.rowCard}
                                                onClick={() => handleJoinRoom(room.code)}
                                            >
                                                <Artwork
                                                    title={room.title}
                                                    seed={room.title}
                                                    size="xs"
                                                    rounded="md"
                                                    isPlaying={true}
                                                />
                                                <div className={styles.rowMeta}>
                                                    <strong>{room.title}</strong>
                                                    <span>Click to join session</span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Активность друзей / сообщества */}
                            <section className={styles.block}>
                                <div className={styles.blockHeader}>
                                    <h3>Activity</h3>
                                    <span className={styles.onlineCount}>
                                        {activity?.length || 0} rooms online
                                    </span>
                                </div>

                                <div className={styles.itemsList}>
                                    {activity?.map((item) => item.room && (
                                        <div key={item.room.id} className={styles.friendCard}>
                                            <div className={styles.avatarWrap}>
                                                <Artwork
                                                    title={item.room.title}
                                                    seed={item.room.title}
                                                    size="xs"
                                                    rounded="full"
                                                />
                                                {/* <span
                                                    className={clsx(
                                                        styles.statusDot,
                                                        friend.isOnline && styles.isOnline
                                                    )}
                                                /> */}
                                            </div>

                                            <div className={styles.rowMeta}>
                                                <div className={styles.friendTop}>
                                                    <strong>{item.room.title}</strong>
                                                    {item.room.title && item.room.code && (
                                                        <button
                                                            type="button"
                                                            className={styles.roomLink}
                                                            onClick={() =>
                                                                handleJoinRoom(item.room.code!)
                                                            }
                                                            title={`Join ${item.room.title}`}
                                                        >
                                                            {item.room.title}
                                                        </button>
                                                    )}
                                                </div>
                                                <span>
                                                    {item.audio.artist} — {item.audio.title}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </>
                    ) : (
                        /* Вкладка Queue */
                        <>
                            {playingAudio && (
                                <section className={styles.block}>
                                    <div className={styles.blockHeader}>
                                        <h3>Now Playing</h3>
                                    </div>

                                    <div className={styles.nowPlayingCard}>
                                        <Artwork
                                            src={playingAudio.coverUrl}
                                            title={playingAudio.title}
                                            seed={playingAudio.title}
                                            size="sm"
                                            rounded="md"
                                            isPlaying={!currentPlaybackState?.pause}
                                        />
                                        <div className={styles.rowMeta}>
                                            <strong>{playingAudio.title}</strong>
                                            <span>{playingAudio.artist}</span>
                                            {playingAudio.addedBy && (
                                                <small>Queued by {playingAudio.addedBy}</small>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}

                            <section className={styles.block}>
                                <div className={styles.blockHeader}>
                                    <h3>Next in Queue</h3>
                                    <span className={styles.badge}>{queueItems.length}</span>
                                </div>

                                <PlaylistQueue />
                            </section>
                        </>
                    )}
                </div>
            )}
        </aside>
    );
};

export default ActivitySidebar;