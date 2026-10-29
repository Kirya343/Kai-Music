package org.kirya343.kai.features.playback.dto.commands;

import org.kirya343.kai.infrastructure.security.dto.UserAuthData;

public sealed interface RoomCommand
    permits UpdatePlayback, ChangeTrack {

    Long roomId();
    UserAuthData user();
}
