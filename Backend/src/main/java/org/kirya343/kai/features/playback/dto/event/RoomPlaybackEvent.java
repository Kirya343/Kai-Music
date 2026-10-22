package org.kirya343.kai.features.playback.dto.event;

import org.kirya343.kai.features.authentication.dto.UserAuthData;
import org.kirya343.kai.features.playback.dto.PlaybackStateDTO;

public record RoomPlaybackEvent(
    Long roomId,
    PlaybackStateDTO stateDTO,
    UserAuthData authData
) {
}