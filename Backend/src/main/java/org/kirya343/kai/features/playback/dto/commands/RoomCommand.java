package org.kirya343.kai.features.playback.dto.commands;

import org.kirya343.kai.features.authentication.dto.UserAuthData;

public sealed interface RoomCommand
    permits UpdatePlayback, ChangeTrack {

    Long roomId();
    UserAuthData user();
}
