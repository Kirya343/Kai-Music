package org.kirya343.kai.features.user.dto.event;

import org.kirya343.kai.features.authentication.dto.UserAuthData;

public record UserConnectedEvent(
    UserAuthData authData
) {
}
