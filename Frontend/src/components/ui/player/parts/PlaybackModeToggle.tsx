import { RepeatAllIcon, NoRepeatIcon, RepeatOneIcon, ShuffleIcon } from "@/assets/icons";
import { PlaybackMode, playbackService, usePlaybackState } from "@playback";

/**
 * PlaybackModeToggle is component that switches playbackMode of playlist that playing at the moment
 */
export const PlaybackModeToggle = () => {

    const { playbackMode } = usePlaybackState();

    const nextMode = async () => {
        
        const modes = [
            PlaybackMode.NORMAL,
            PlaybackMode.REPEAT_ALL,
            PlaybackMode.SHUFFLE,
            PlaybackMode.REPEAT_ONE
        ];

        const index = modes.indexOf(playbackMode);
        const next = modes[(index + 1) % modes.length];

        // Пока только на комнату
        await playbackService.setPlaylistPlaybackMode(next);
    };

    const icon = (() => {
        switch (playbackMode) {
            case PlaybackMode.NORMAL: return <NoRepeatIcon />;
            case PlaybackMode.REPEAT_ALL: return <RepeatAllIcon />;
            case PlaybackMode.SHUFFLE: return <ShuffleIcon />;
            case PlaybackMode.REPEAT_ONE: return <RepeatOneIcon />;
        }
    })();

    return <button onClick={nextMode}>{icon}</button>
};