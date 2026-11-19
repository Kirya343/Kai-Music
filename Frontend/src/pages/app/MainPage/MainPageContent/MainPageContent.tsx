import { DiscIcon, UserGroupIcon } from "@/assets/icons";
import styles from "./MainPageContent.module.scss";
import clsx from "clsx";
import { Artwork } from "@/components/ui/Artwork/Artwork";
import { roomService } from "@room";
import { useNavigate } from "react-router-dom";
import { loggerFactory } from "@common";

function formatListeners(count: number): string {
    return `${count} ${count === 1 ? "person" : "people"}`;
}

const logger = loggerFactory.getLogger("Pages.Main.Content");

const VIBE_PRESETS = [
    { title: "Late Night Lo-Fi", desc: "Спокойный фон для кода и учебы", seed: "late-night-lofi" },
    { title: "Night Drive", desc: "Электроника и синти-поп в дорогу", seed: "night-drive" },
    { title: "Discovery Session", desc: "Кидаем друг другу редкие находки", seed: "discovery-session" },
];

const MOOD_PLAYLISTS = [
    { title: "Deep Focus", vibe: "Ambient & Synth", tracksCount: 28, seed: "mood-deep-focus" },
    { title: "Rainy Window", vibe: "Acoustic & Chill", tracksCount: 19, seed: "mood-rainy-window" },
    { title: "High Energy", vibe: "Electronic & Rock", tracksCount: 34, seed: "mood-high-energy" },
];

const RECENT_TRACKS = [
    { title: "BABY SAID", artist: "Måneskin", duration: "2:44", uploadedAgo: "12m ago", seed: "BABY SAID" },
    { title: "Midnight City", artist: "M83", duration: "4:03", uploadedAgo: "38m ago", seed: "Midnight City" },
    { title: "Chamber of Reflection", artist: "Mac DeMarco", duration: "3:51", uploadedAgo: "1h ago", seed: "Chamber of Reflection" },
    { title: "Nights", artist: "Frank Ocean", duration: "5:07", uploadedAgo: "2h ago", seed: "Nights" },
];

const USER_PLAYLISTS = [
    { title: "Kirya's Night Rotation", author: "Kirya", tracksCount: 42, seed: "user-kirya-night" },
    { title: "Sugar & Bass", author: "Nutellka", tracksCount: 25, seed: "user-nutellka-bass" },
    { title: "Weekend Queue", author: "Community", tracksCount: 61, seed: "user-weekend-queue" },
];

const AUDIOBOOKS = [
    { title: "Project Hail Mary", author: "Andy Weir", meta: "16h 10m • Ch. 1–18", seed: "book-hail-mary" },
    { title: "The Pragmatic Programmer", author: "David Thomas", meta: "9h 45m • Audio edition", seed: "book-pragmatic" },
];

export default function MainPageContent({
    stat,
}: {
    stat: { activeListners: number; activeRooms: number } | null;
}) {
    const activeListenersCount = stat?.activeListners ?? 0;
    const activeRoomsCount = Number(stat?.activeRooms) || 0;
    const navigate = useNavigate();

    const createRoom = async () => {
        try {
            await roomService.createRoom();
            navigate("/app/room");
        } catch (e) {
            logger.error(e);
        }
    };

    return (
        <div className={styles.mainColumn}>
            {/* <section className={styles.welcome}>
                <div className={styles.welcomeBadge}>Live Listening Spaces</div>
                <h1>Welcome to Kai Music</h1>
                <p>
                    Kai Music connects friends through shared music experiences. Create rooms,
                    listen together, and find new tracks with your community.
                </p>
            </section> */}

            {/* Статистика + текущий акцент */}
            <div className={styles.middleGrid}>
                <section className={styles.community}>
                    <div className={styles.sectionHeader}>
                        <h2>Community Buzz</h2>
                        <span className={styles.liveDot}>Live</span>
                    </div>

                    <div className={styles.statsRow}>
                        <div className={styles.statItem}>
                            <UserGroupIcon className={styles.icon} />
                            <div>
                                <span className={styles.statLabel}>Currently Listening</span>
                                <strong className={styles.statValue}>
                                    {formatListeners(activeListenersCount)}
                                </strong>
                            </div>
                        </div>

                        <div className={styles.statItem}>
                            <DiscIcon
                                className={clsx(
                                    styles.icon,
                                    activeRoomsCount > 0 && "spin"
                                )}
                            />
                            <div>
                                <span className={styles.statLabel}>Total Rooms Active</span>
                                <strong className={styles.statValue}>{activeRoomsCount}</strong>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.spotlight}>
                    <div className={styles.sectionHeader}>
                        <h2>Now Spinning</h2>
                        <span className={styles.metaTag}>Alt Rock</span>
                    </div>

                    <div className={styles.spotlightCard}>
                        <Artwork
                            title="BABY SAID"
                            seed="BABY SAID"
                            size="lg"
                            rounded="lg"
                        />
                        <div className={styles.spotlightInfo}>
                            <span className={styles.genrePill}>Synced Room Pick</span>
                            <strong className={styles.trackTitle}>BABY SAID</strong>
                            <span className={styles.trackArtist}>Måneskin</span>
                            <span className={styles.trackSub}>
                                Совместное прослушивание доступно в комнатах
                            </span>
                        </div>
                    </div>
                </section>
            </div>

            {/* Идеи комнат */}
            <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                    <h2>Room Ideas</h2>
                    <button
                        type="button"
                        className={styles.sectionAction}
                        onClick={createRoom}
                    >
                        Start room
                    </button>
                </div>

                <div className={styles.vibesGrid}>
                    {VIBE_PRESETS.map((preset) => (
                        <button
                            type="button"
                            key={preset.seed}
                            className={styles.vibeCard}
                            onClick={createRoom}
                            title="Создать комнату с этим настроением"
                        >
                            <Artwork
                                title={preset.title}
                                seed={preset.seed}
                                size="sm"
                                rounded="md"
                            />
                            <div className={styles.vibeText}>
                                <strong>{preset.title}</strong>
                                <span>{preset.desc}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* Плейлисты по настроению */}
            <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                    <h2>Mood Playlists</h2>
                    <button
                        type="button"
                        className={styles.sectionAction}
                        onClick={() => navigate("/app/playlists")}
                    >
                        All playlists
                    </button>
                </div>

                <div className={styles.cardsGrid3}>
                    {MOOD_PLAYLISTS.map((item) => (
                        <div
                            key={item.seed}
                            className={styles.mediaCard}
                            onClick={() => navigate("/app/playlists")}
                        >
                            <Artwork
                                title={item.title}
                                seed={item.seed}
                                size="md"
                                rounded="lg"
                            />
                            <div className={styles.mediaMeta}>
                                <strong>{item.title}</strong>
                                <span>{item.vibe}</span>
                                <small>{item.tracksCount} tracks</small>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Последние загруженные треки + Аудиокниги */}
            <div className={styles.bottomSplit}>
                <section className={styles.sectionBlock}>
                    <div className={styles.sectionHeader}>
                        <h2>Recent Tracks</h2>
                        <button
                            type="button"
                            className={styles.sectionAction}
                            onClick={() => navigate("/app/library")}
                        >
                            Library
                        </button>
                    </div>

                    <div className={styles.tracksList}>
                        {RECENT_TRACKS.map((track) => (
                            <div key={track.seed} className={styles.trackRow}>
                                <Artwork
                                    title={track.title}
                                    seed={track.seed}
                                    size="xs"
                                    rounded="md"
                                />
                                <div className={styles.trackRowMain}>
                                    <strong>{track.title}</strong>
                                    <span>{track.artist}</span>
                                </div>
                                <div className={styles.trackRowRight}>
                                    <span>{track.duration}</span>
                                    <small>{track.uploadedAgo}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.sectionBlock}>
                    <div className={styles.sectionHeader}>
                        <h2>Audiobooks</h2>
                        <button
                            type="button"
                            className={styles.sectionAction}
                            onClick={() => navigate("/app/library")}
                        >
                            Explore
                        </button>
                    </div>

                    <div className={styles.booksList}>
                        {AUDIOBOOKS.map((book) => (
                            <div key={book.seed} className={styles.bookCard}>
                                <Artwork
                                    title={book.title}
                                    seed={book.seed}
                                    size="md"
                                    rounded="lg"
                                />
                                <div className={styles.mediaMeta}>
                                    <strong>{book.title}</strong>
                                    <span>{book.author}</span>
                                    <small>{book.meta}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Плейлисты от пользователей */}
            <section className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                    <h2>User Playlists</h2>
                    <button
                        type="button"
                        className={styles.sectionAction}
                        onClick={() => navigate("/app/playlists")}
                    >
                        Browse all
                    </button>
                </div>

                <div className={styles.cardsGrid3}>
                    {USER_PLAYLISTS.map((pl) => (
                        <div
                            key={pl.seed}
                            className={styles.mediaCard}
                            onClick={() => navigate("/app/playlists")}
                        >
                            <Artwork
                                title={pl.title}
                                seed={pl.seed}
                                size="md"
                                rounded="lg"
                            />
                            <div className={styles.mediaMeta}>
                                <strong>{pl.title}</strong>
                                <span>by {pl.author}</span>
                                <small>{pl.tracksCount} tracks</small>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}