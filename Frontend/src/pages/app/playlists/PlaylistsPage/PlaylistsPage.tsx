import styles from "./PlaylistsPage.module.scss"
import { CirclePlusIcon } from "@/assets/icons";
import { useState } from "react";
import PlaylistCreateModal from "@/components/modals/PlaylistCreateModal/PlaylistCreateModal";
import LibraryPlaylist from "@/components/ui/playlist/LibraryPlaylist";
import SearchableLayout from "@/components/layout/SearchableLayout/SearchableLayout";
import { useData, useSearch } from "@common";

const PlaylistsPage = () => {

    const { playlistsData, roomData } = useData();
    
    const { filteredList, searchQuery, setSearchQuery} = useSearch(playlistsData.data);

    const [isOpen, setOpen] = useState(false);

    return (
        <SearchableLayout
            title="Playlists"
            search={{searchQuery, setSearchQuery, filteredList}}
            extraActions={[
                <button className={styles.upload} onClick={() => setOpen(true)}>
                    <CirclePlusIcon />
                    <span>Create new</span>
                </button>
            ]}
        >
            <div className={styles.list}>
                {filteredList.map((p) => (
                    <LibraryPlaylist
                        key={p.id}
                        playlist={p}
                        deletePlaylist={() => playlistsData.deletePlaylist(p)}
                        importToRoom={() => roomData.playlist && playlistsData.importToRoom(roomData.playlist, p)}
                    />
                ))}
            </div>

            <PlaylistCreateModal
                isOpen={isOpen}
                onClose={() => setOpen(false)}
            />
        </SearchableLayout>
    )
}

export default PlaylistsPage;