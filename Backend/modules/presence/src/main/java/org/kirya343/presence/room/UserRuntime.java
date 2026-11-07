package org.kirya343.presence.room;

import java.time.Instant;

import org.kirya343.user.dto.ShortUserDTO;

public record UserRuntime(
    ShortUserDTO user,
    Instant joinedAt
) {
}