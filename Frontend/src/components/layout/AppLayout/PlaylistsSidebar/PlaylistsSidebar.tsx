import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./PlaylistsSidebar.module.scss";
import { Artwork } from "@/components/ui/Artwork/Artwork";
import { CirclePlusIcon } from "@/assets/icons";

export type PlaylistCategory = "mine" | "saved" | "audiobook";

export interface SidebarPlaylistItem {
    id: string;
    title: string;
    subtitle: string;
    category: PlaylistCategory;
    coverUrl?: string | null;
    pinned?: boolean;
    isPlaying?: boolean;
}

interface PlaylistsSidebarProps {
    playlists?: SidebarPlaylistItem[];
    activePlaylistId?: string;
    onSelectPlaylist?: (playlist: SidebarPlaylistItem) => void;
    onCreatePlaylist?: () => void;
    defaultCollapsed?: boolean;
    className?: string;
}

const MOCK_PLAYLISTS: SidebarPlaylistItem[] = [
    {
        id: "liked-songs",
        title: "Liked Songs",
        subtitle: "Playlist • 48 tracks",
        category: "mine",
        pinned: true,
        isPlaying: true,
    },
    {
        id: "kirya-night",
        title: "Kirya's Night Rotation",
        subtitle: "by Kirya • 42 tracks",
        category: "mine",
    },
    {
        id: "sugar-bass",
        title: "Sugar & Bass",
        subtitle: "by Nutellka • 25 tracks",
        category: "saved",
    },
    {
        id: "deep-focus",
        title: "Deep Focus",
        subtitle: "Mood • 28 tracks",
        category: "saved",
    },
    {
        id: "late-night-lofi",
        title: "Late Night Lo-Fi",
        subtitle: "by Kirya • 19 tracks",
        category: "mine",
    },
    {
        id: "project-hail-mary",
        title: "Project Hail Mary",
        subtitle: "Audiobook • Ch. 4",
        category: "audiobook",
    },
];

type FilterTab = "all" | PlaylistCategory;

const FILTER_TABS: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "mine", label: "Mine" },
    { id: "saved", label: "Saved" },
    { id: "audiobook", label: "Books" },
];

export const PlaylistsSidebar: React.FC<PlaylistsSidebarProps> = ({
    playlists,
    activePlaylistId,
    onSelectPlaylist,
    onCreatePlaylist,
    defaultCollapsed = false,
    className,
}) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const items = playlists ?? MOCK_PLAYLISTS;

    const filteredPlaylists = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return items.filter((item) => {
            const matchesTab =
                activeFilter === "all" || item.category === activeFilter;
            const matchesQuery =
                !query ||
                item.title.toLowerCase().includes(query) ||
                item.subtitle.toLowerCase().includes(query);

            return matchesTab && matchesQuery;
        });
    }, [items, activeFilter, searchQuery]);

    const handleSelect = (item: SidebarPlaylistItem) => {
        if (onSelectPlaylist) {
            onSelectPlaylist(item);
            return;
        }
        navigate(`/app/playlists/${item.id}`);
    };

    const handleCreate = () => {
        if (onCreatePlaylist) {
            onCreatePlaylist();
            return;
        }
        navigate("/app/playlists");
    };

    return (
        <aside
            className={clsx(
                styles.sidebar,
                collapsed && styles.collapsed,
                className
            )}
            aria-label="Playlists sidebar"
        >
            {/* Шапка сайдбара */}
            <div className={styles.header}>
                <button
                    type="button"
                    className={styles.collapseBtn}
                    onClick={() => setCollapsed((prev) => !prev)}
                    title={collapsed ? "Развернуть библиотеку" : "Свернуть библиотеку"}
                >
                    <span className={styles.libraryIcon} aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                    {!collapsed && <span className={styles.headerTitle}>Your Library</span>}
                </button>

                {!collapsed && (
                    <button
                        type="button"
                        className={styles.createBtn}
                        onClick={handleCreate}
                        title="Создать плейлист"
                    >
                        <CirclePlusIcon />
                    </button>
                )}
            </div>

            {/* Фильтры и поиск (скрываются в компактном режиме) */}
            {!collapsed && (
                <div className={styles.controls}>
                    <div className={styles.filters} role="tablist" aria-label="Library filters">
                        {FILTER_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeFilter === tab.id}
                                className={clsx(
                                    styles.filterPill,
                                    activeFilter === tab.id && styles.activePill
                                )}
                                onClick={() => setActiveFilter(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Filter playlists..."
                            className={styles.searchInput}
                            aria-label="Filter playlists"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className={styles.clearBtn}
                                onClick={() => setSearchQuery("")}
                                aria-label="Clear filter"
                            >
                                ×
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Список плейлистов */}
            <div className={styles.list}>
                {filteredPlaylists.length === 0 && !collapsed && (
                    <div className={styles.emptyState}>
                        Nothing found for «{searchQuery}»
                    </div>
                )}

                {filteredPlaylists.map((item) => {
                    const isActive =
                        activePlaylistId === item.id ||
                        location.pathname.endsWith(`/${item.id}`);

                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={clsx(
                                styles.playlistItem,
                                isActive && styles.activeItem
                            )}
                            onClick={() => handleSelect(item)}
                            title={collapsed ? `${item.title} — ${item.subtitle}` : item.title}
                        >
                            <Artwork
                                src={item.coverUrl}
                                title={item.title}
                                seed={item.id}
                                size="sm"
                                rounded="md"
                                isPlaying={item.isPlaying}
                            />

                            {!collapsed && (
                                <div className={styles.meta}>
                                    <div className={styles.titleRow}>
                                        <span className={styles.title}>{item.title}</span>
                                        {item.pinned && (
                                            <span className={styles.pinDot} title="Pinned" />
                                        )}
                                    </div>
                                    <span className={styles.subtitle}>{item.subtitle}</span>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>
        </aside>
    );
};

export default PlaylistsSidebar;