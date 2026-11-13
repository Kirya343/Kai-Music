package org.kirya343.playback.presentation.dto;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;

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

    public String toString() {
        return String.format("(%s, %s, %s, %s)", user(), entryId(), position(), pause());
    }
}
