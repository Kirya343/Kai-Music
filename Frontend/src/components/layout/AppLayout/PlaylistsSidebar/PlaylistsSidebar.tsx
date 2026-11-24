import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import styles from "./PlaylistsSidebar.module.scss";
import { Artwork } from "@/components/ui/Artwork/Artwork";
import { CirclePlusIcon } from "@/assets/icons";
import { useData, useSearch } from "@common";
import { Playlist, PlaylistType } from "@playlist";
import { useAuth } from "@user";
import { usePlaybackPlaylist } from "@playback";
import PlaylistCreateModal from "@/components/modals/PlaylistCreateModal/PlaylistCreateModal";

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
    activePlaylistId?: string;
    onSelectPlaylist?: (playlist: Playlist) => void;
    onCreatePlaylist?: () => void;
    defaultCollapsed?: boolean;
    className?: string;
}

type FilterTab = "all" | PlaylistCategory;

const FILTER_TABS: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "mine", label: "Mine" },
    { id: "saved", label: "Saved" },
    { id: "audiobook", label: "Books" },
];

export const PlaylistsSidebar: React.FC<PlaylistsSidebarProps> = ({
    activePlaylistId,
    onSelectPlaylist,
    onCreatePlaylist,
    defaultCollapsed = false,
    className,
}) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
    const [isOpen, setOpen] = useState(false);

    const { playlistsData } = useData();
    const { user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const { playbackPlaylist } = usePlaybackPlaylist();

    const { searchQuery, setSearchQuery, filteredList } = useSearch(playlistsData.playlists)

    const filteredPlaylists = useMemo<Playlist[]>(() => {
        return filteredList.filter((playlist) => {

            let matchesTab = false;

            switch (activeFilter) {
                case "all": 
                    matchesTab = true;
                    break;
                case "mine":
                    matchesTab = (playlist.owner.sub === user?.sub)
                    break;
                case "saved": 
                    matchesTab = (playlist.owner.sub !== user?.sub)
            }

            return matchesTab;
        });
    }, [filteredList, activeFilter, searchQuery, user]);

    const handleSelect = (item: Playlist) => {
        if (onSelectPlaylist) {
            onSelectPlaylist(item);
            return;
        }
        navigate(`/app/playlists/${item.id}`);
    };

    const handleCreate = () => {
        setOpen(true)
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

                {filteredPlaylists
                    .toSorted((a, b) => {
                        if (a.position == null) return 1;
                        if (b.position == null) return -1;

                        return a.position - b.position;
                    })
                    .map((item) => {
                    
                        const isActive = location.pathname.endsWith(`/${item.id}`);

                        return (
                            <button
                                key={item.id}
                                type="button"
                                className={clsx(
                                    styles.playlistItem,
                                    isActive && styles.activeItem
                                )}
                                onClick={() => handleSelect(item)}
                                title={collapsed ? `${item.title} — ${item.queue.length || 0} tracks` : item.title}
                            >
                                <Artwork
                                    src={item.title}
                                    title={item.title}
                                    seed={item.title}
                                    size="sm"
                                    rounded="md"
                                    isPlaying={playbackPlaylist?.id === item.id}
                                />

                                {!collapsed && (
                                    <div className={styles.meta}>
                                        <div className={styles.titleRow}>
                                            <span className={styles.title}>{item.title}</span>
                                            {item.position !== null && (
                                                <span className={styles.pinDot} title="Pinned" />
                                            )}
                                        </div>
                                        <span className={styles.subtitle}>{`by ${item.owner.name} • ${item.queue.length} tracks`}</span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
            </div>

            <PlaylistCreateModal
                isOpen={isOpen}
                onClose={() => setOpen(false)}
            />
        </aside>
    );
};

export default PlaylistsSidebar;