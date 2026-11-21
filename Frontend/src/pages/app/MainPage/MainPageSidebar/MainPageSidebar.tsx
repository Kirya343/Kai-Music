import { CirclePlusIcon, DoorIcon } from "@/assets/icons";
import clsx from "clsx";
import styles from "./MainPageSidebar.module.scss";
import { useNavigate } from "react-router-dom";
import { IListeningRoom, roomService } from "@room";
import { loggerFactory } from "@common";
import { SubmitEvent, useState } from "react";
import { useWebSocket } from "@websocket";
import { usePlaybackControls } from "@playback";
import { Artwork } from "@/components/ui/Artwork/Artwork";

interface RoomMockMeta {
    currentTrack: string;
    artist: string;
    genre: string;
    listeners: number;
}

const FALLBACK_TRACKS: RoomMockMeta[] = [
    { currentTrack: "Midnight City", artist: "M83", genre: "Synthwave", listeners: 4 },
    { currentTrack: "Chamber of Reflection", artist: "Mac DeMarco", genre: "Indie / Chill", listeners: 2 },
    { currentTrack: "After Hours", artist: "The Weeknd", genre: "Dark Pop", listeners: 6 },
    { currentTrack: "Nights", artist: "Frank Ocean", genre: "R&B", listeners: 3 },
];

const logger = loggerFactory.getLogger("Pages.Main.Sidebar");

function formatListeners(count: number): string {
    return `${count} ${count === 1 ? "person" : "people"}`;
}

export default function MainPageSidebar({ rooms }: { rooms: IListeningRoom[] | null }) {

    const navigate = useNavigate();
    const { client } = useWebSocket();
    const { autoPlay, setAutoPlay, resyncPlayback } = usePlaybackControls();
    const [quickCode, setQuickCode] = useState<string>("");

    const createRoom = async () => {
        try {
            await roomService.createRoom();
            navigate("/app/room");
        } catch (e) {
            logger.error(e);
        }
    };

    const joinRoom = async (code: string) => {
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

    const handleQuickJoin = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        joinRoom(quickCode);
    };

    return (
        <aside className={clsx(styles.box, styles.sidebar)}>
            <section className={styles.actions}>
                <button
                    type="button"
                    className={clsx(styles.actionBtn, styles.primaryBtn)}
                    onClick={createRoom}
                >
                    <CirclePlusIcon />
                    <span>Create New Room</span>
                </button>

                {/* Быстрый ввод кода комнаты (заглушка / быстрый вход) */}
                <form className={styles.quickCodeForm} onSubmit={handleQuickJoin}>
                    <input
                        type="text"
                        value={quickCode}
                        onChange={(e) => setQuickCode(e.target.value)}
                        placeholder="Enter room code..."
                        className={styles.codeInput}
                        aria-label="Room code"
                    />
                    <button
                        type="submit"
                        className={styles.codeSubmit}
                        disabled={!quickCode.trim()}
                    >
                        Go
                    </button>
                </form>
            </section>

            <section className={styles.publicRooms}>
                <div className={styles.sectionHeader}>
                    <h3>Public rooms to join</h3>
                    {rooms && <span className={styles.countBadge}>{rooms.length}</span>}
                </div>

                <div className={styles.roomsList} data-testid="rooms-list">
                    {!rooms && <div className={styles.emptyState}>Loading rooms...</div>}
                    
                    {rooms !== null && rooms.length === 0 && (
                        <div className={styles.emptyState}>
                            No public rooms right now. Create the first one!
                        </div>
                    )}

                    {rooms?.map((r, index) => {
                        const mock = FALLBACK_TRACKS[index % FALLBACK_TRACKS.length];
                        return (
                            <div
                                role="button"
                                tabIndex={0}
                                data-testid={r.title}
                                className={styles.room}
                                key={r.id}
                                onClick={() => joinRoom(r.code)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        joinRoom(r.code);
                                    }
                                }}
                            >
                                <Artwork
                                    title={r.title}
                                    seed={r.title}
                                    size="sm"
                                    rounded="md"
                                />

                                <div className={styles.meta}>
                                    <div className={styles.roomTopLine}>
                                        <span className={styles.roomName}>{r.title}</span>
                                        <span className={styles.genreBadge}>{mock.genre}</span>
                                    </div>
                                    <span className={styles.audioName}>
                                        {mock.artist} — {mock.currentTrack}
                                    </span>
                                    <span className={styles.listnersCount}>
                                        {formatListeners(mock.listeners)} in room
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </aside>
    )
}