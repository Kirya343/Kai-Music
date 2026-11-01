package org.kirya343.playback.dto.results;

import org.kirya343.security.core.dto.UserAuthData;

public record Paused(
    Long roomId,
    Long trackId,
    long position,
    UserAuthData user
) implements PlaybackResult {}