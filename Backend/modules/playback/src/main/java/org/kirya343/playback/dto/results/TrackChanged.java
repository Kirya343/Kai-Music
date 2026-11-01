package org.kirya343.playback.dto.results;

import org.kirya343.security.core.dto.UserAuthData;

public record TrackChanged(
    Long roomId,
    Long trackId,
    UserAuthData user
) implements PlaybackResult {}
