import { usePlaybackData } from "../contexts";
import * as api from './playback.api';

/**
 * Creates void that changes track in current user room
 */
export const usePlayTrackPersonally = () => {
    const { room } = usePlaybackData();

    return async (audioId: number, playlistId?: number | null) => {
        if (!audioId || playlistId === null) return;

        if (room) {
            const success = confirm(
                "You will leave your room, are you sure?"
            );

            if (!success) return;
        }

        await api.playTrack("USER", audioId, playlistId);
    };
};