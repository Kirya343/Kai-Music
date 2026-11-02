package org.kirya343.playback.dto;

import org.kirya343.playback.datasource.model.PlaybackState;

public record PlaybackStateDTO(
    String user,
    Long entryId,
    Double position,
    boolean pause
) {

    public static PlaybackStateDTO ofState(PlaybackState state) {

        if (state == null || state.getEntryId() == null) return null;
        
        return new PlaybackStateDTO(
            state.getInitiatorName(), 
            state.getEntryId(), 
            state.getCurrentPosition(), 
            state.isPaused()
        );
    }
}
