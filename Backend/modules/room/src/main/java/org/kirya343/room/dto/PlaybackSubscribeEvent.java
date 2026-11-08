package org.kirya343.room.dto;

import org.kirya343.security.core.dto.UserAuthData;

public record PlaybackSubscribeEvent(
    UserAuthData authData,
    String type,
    Long id
) {
}
