import { createContext, useContext, useEffect } from "react";
import { Playlist, usePlaylistsData } from "@playlist";
import { IAudio, useAudioData } from "@audio";

/**
 * Defines the acpplication data context.
 */
interface DataContextType {
    playlistsData: IPlaylistsData;
    audiosData: IAudiosData;
}


/**
 * Defines the playlist data and available operations.
 */
interface IPlaylistsData {
    /** List of available playlists. */
    playlists: Playlist[];

    liked: Playlist | null

    /** Synchronizes playlists with the server. */
    syncPlaylists: () => void;
}

/**
 * Defines the audio data and available operations.
 */
interface IAudiosData {
    /** List of available audio tracks. */
    data: IAudio[];

    /** Synchronizes audio tracks with the server. */
    syncAudios: () => void;

    /** Deletes audio */
    deleteAudio: (audio: IAudio) => void;

    /** Updates audio metadata */
    updateAudio: (audio: IAudio) => void;
}

/**
 * Context for accessing application-wide data.
 *
 * Provides access to audio and playlist data managed by their respective hooks.
 */
const DataContext = createContext<DataContextType | null>(null);

/**
 * Returns the application data context.
 *
 * @throws {Error} If called outside DataProvider.
 */
export const useData = () => {
    const ctx = useContext(DataContext);
    if (!ctx) {
        throw new Error("useGlobal must be used inside GlobalProvider");
    }
    return ctx;
}

/**
 * Provides access to application-wide data through DataContext.
 *
 * Initializes audio and playlist synchronization when mounted.
 */
export const DataProvider = ({ children }: { children?: React.ReactNode }) => {

    const audiosData = useAudioData();
    const playlistsData = usePlaylistsData();

    useEffect(() => {
        playlistsData.syncPlaylists();
        audiosData.syncAudios();
    }, [playlistsData.syncPlaylists, audiosData.syncAudios]);

    return (
        <DataContext.Provider value={{
            audiosData,
            playlistsData
         }}>
            {children}
        </DataContext.Provider>
    );
};