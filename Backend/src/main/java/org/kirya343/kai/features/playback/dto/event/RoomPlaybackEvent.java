package org.kirya343.kai.features.playback.dto.event;

import org.kirya343.kai.features.playback.dto.PlaybackStateDTO;
import org.kirya343.kai.infrastructure.security.dto.UserAuthData;

public record RoomPlaybackEvent(
    Long roomId,
    PlaybackStateDTO stateDTO,
    UserAuthData authData
) {
}