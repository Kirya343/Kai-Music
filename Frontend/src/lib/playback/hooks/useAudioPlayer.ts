import { useMediaSource } from "./useMediaSource";
import { usePlayback } from "./usePlayback";

export const useAudioPlayer = (roomId: number | null) => {
    const mediaResource = useMediaSource();

    const playback = usePlayback({
        roomId,

        audio: mediaResource.audio,
        createMediaSource: mediaResource.createMediaSource,
        cleanupMediaSource: mediaResource.cleanupMediaSource,
        currentEntryIdRef: mediaResource.currentEntryIdRef,

        setBufferUpdateHandler: mediaResource.setBufferUpdateHandler,
    });

    return {
        ...mediaResource,
        ...playback
    };
};