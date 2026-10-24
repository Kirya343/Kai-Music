package org.kirya343.kai.features.playback.dto.results;

import org.kirya343.kai.features.authentication.dto.UserAuthData;

public record TrackChanged(
    Long roomId,
    Long trackId,
    UserAuthData user
) implements PlaybackResult {}
