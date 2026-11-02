package org.kirya343.playback.dto.event;

import org.kirya343.playback.dto.PlaybackStateDTO;
import org.kirya343.security.core.dto.UserAuthData;

public record RoomPlaybackEvent(
    Long roomId,
    PlaybackStateDTO stateDTO,
    UserAuthData authData
) {
}