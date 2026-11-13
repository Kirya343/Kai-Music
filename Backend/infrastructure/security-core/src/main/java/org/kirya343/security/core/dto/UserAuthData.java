package org.kirya343.security.core.dto;

import java.util.Objects;

import org.kirya343.security.core.enums.UserStatus;
import org.springframework.lang.NonNull;

public record UserAuthData(
    @NonNull Long id,
    @NonNull String sub,
    String name,
    @NonNull UserStatus status
) {
    public UserAuthData {
        Objects.requireNonNull(id, "id must not be null");
        Objects.requireNonNull(sub, "sub must not be null");
        Objects.requireNonNull(status, "status must not be null");
    }
}