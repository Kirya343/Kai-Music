package org.kirya343.kai.features.playback.dto.commands;

import org.kirya343.kai.features.authentication.dto.UserAuthData;

public record ChangeTrack(
    Long roomId,
    String changing,
    UserAuthData user
) implements RoomCommand {}