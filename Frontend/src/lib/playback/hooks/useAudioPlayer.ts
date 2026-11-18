import { useMediaSource } from "./useMediaSource";
import { usePlaybackController } from "./usePlaybackController";

export const useAudioPlayer = () => {

    const mediaResource = useMediaSource();

    const playbackController = usePlaybackController({
        audio: mediaResource.audio,
        audioRef: mediaResource.audioRef,
        createMediaSource: mediaResource.createMediaSource,
        cleanupMediaSource: mediaResource.cleanupMediaSource,
        currentStreamIdRef: mediaResource.currentStreamIdRef,

        setBufferUpdateHandler: mediaResource.setBufferUpdateHandler,
    });

    return {
        ...mediaResource,
        ...playbackController
    };
};