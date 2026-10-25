import { useCallback } from "react"
import { playbackService } from ".";
import { useData } from "@common";

/**
 * Creates void that changes track in current user room
 */
export const usePlayTrack = () => {

    const { room } = useData().roomData;

    const playTrack = useCallback(async (track: "next" | "prev" | number) => {
        if (!room?.id) return;

        await playbackService.playTrack(room?.id, track)
    }, [room?.id])

    return playTrack;
}