package org.kirya343.playback.dto.results;

import org.kirya343.security.core.dto.UserAuthData;

public record Resumed(
    Long roomId,
    Long trackId,
    long position,
    UserAuthData user
) implements PlaybackResult {}