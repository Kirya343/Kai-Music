package org.kirya343.kai.features.playback.dto.results;

import org.kirya343.kai.infrastructure.security.dto.UserAuthData;

public record Resumed(
    Long roomId,
    Long trackId,
    long position,
    UserAuthData user
) implements PlaybackResult {}