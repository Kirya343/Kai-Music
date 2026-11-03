package org.kirya343.playback.application.event;

import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.security.core.dto.UserAuthData;

public record RoomPlaybackEvent(
    Long roomId,
    PlaybackStateDTO stateDTO,
    UserAuthData authData
) {
}