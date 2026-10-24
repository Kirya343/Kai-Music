package org.kirya343.kai.features.playback.dto.results;

import org.kirya343.kai.features.authentication.dto.UserAuthData;

public record Paused(
    Long roomId,
    Long trackId,
    long position,
    UserAuthData user
) implements PlaybackResult {}