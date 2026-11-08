package org.kirya343.playback.application.command;

import org.kirya343.security.core.dto.UserAuthData;

public sealed interface PlaybackCommand
    permits UpdatePlayback, ChangeTrack {

    UserAuthData user();
}
