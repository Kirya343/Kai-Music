package org.kirya343.playback.application.command;

import org.kirya343.security.core.dto.UserAuthData;

public sealed interface RoomCommand
    permits UpdatePlayback, ChangeTrack {

    Long roomId();
    UserAuthData user();
}
