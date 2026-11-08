package org.kirya343.presence.playback;

import java.time.Instant;

import org.kirya343.user.dto.ShortUserDTO;

public record UserRuntime(
    ShortUserDTO user,
    Instant joinedAt
) {
}