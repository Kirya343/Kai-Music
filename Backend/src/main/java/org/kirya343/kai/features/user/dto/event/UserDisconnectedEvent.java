package org.kirya343.kai.features.user.dto.event;

import org.kirya343.kai.infrastructure.security.dto.UserAuthData;

public record UserDisconnectedEvent(
    UserAuthData authData
) {
}
