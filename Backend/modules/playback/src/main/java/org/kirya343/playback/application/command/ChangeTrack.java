package org.kirya343.playback.application.command;

import org.kirya343.security.core.dto.UserAuthData;

public record ChangeTrack(
    String changing,
    UserAuthData user
) implements PlaybackCommand {}