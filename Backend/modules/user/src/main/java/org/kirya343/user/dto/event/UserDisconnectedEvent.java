package org.kirya343.user.dto.event;

import org.kirya343.security.core.dto.UserAuthData;

public record UserDisconnectedEvent(
    UserAuthData authData
) {
}
