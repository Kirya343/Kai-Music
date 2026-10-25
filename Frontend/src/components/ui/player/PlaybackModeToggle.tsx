import { RepeatAllIcon, NoRepeatIcon, RepeatOneIcon, ShuffleIcon } from "@/assets/icons";
import { useData } from "@common";
import { PlaybackMode, playlistService } from "@playlist";

/**
 * PlaybackModeToggle is component that switches playbackMode of playlist that playing at the moment
 */
export const PlaybackModeToggle = () => {

    const { roomData } = useData();

    const nextMode = async () => {
        if (!roomData.playlist) return;
        
        const modes = [
            PlaybackMode.NORMAL,
            PlaybackMode.REPEAT_ALL,
            PlaybackMode.SHUFFLE,
            PlaybackMode.REPEAT_ONE
        ];

        const index = modes.indexOf(roomData.playlist.mode);
        const next = modes[(index + 1) % modes.length];

        await playlistService.setPlaylistPlaybackMode(roomData.playlist?.id, next);
    };

    const icon = (() => {
        switch (roomData.playlist?.mode) {
            case PlaybackMode.NORMAL: return <NoRepeatIcon />;
            case PlaybackMode.REPEAT_ALL: return <RepeatAllIcon />;
            case PlaybackMode.SHUFFLE: return <ShuffleIcon />;
            case PlaybackMode.REPEAT_ONE: return <RepeatOneIcon />;
        }
    })();

    return <button onClick={nextMode}>{icon}</button>
};