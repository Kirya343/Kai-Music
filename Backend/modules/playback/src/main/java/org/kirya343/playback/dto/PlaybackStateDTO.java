package org.kirya343.playback.dto;

import org.kirya343.playback.datasource.model.RoomPlaybackState;

public record PlaybackStateDTO(
    String user,
    Long entryId,
    Double position,
    boolean pause
) {

    public static PlaybackStateDTO ofState(RoomPlaybackState state) {

        if (state == null || state.getCurrentQueueEntryId() == null) return null;
        
        return new PlaybackStateDTO(
            state.getUser(), 
            state.getCurrentQueueEntryId(), 
            state.getCurrentPosition(), 
            state.isPaused()
        );
    }
}
