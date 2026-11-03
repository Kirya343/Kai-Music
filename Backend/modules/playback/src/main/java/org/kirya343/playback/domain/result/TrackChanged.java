package org.kirya343.playback.domain.result;

import org.kirya343.security.core.dto.UserAuthData;

public record TrackChanged(
    Long roomId,
    Long trackId,
    UserAuthData user
) implements PlaybackResult {}
