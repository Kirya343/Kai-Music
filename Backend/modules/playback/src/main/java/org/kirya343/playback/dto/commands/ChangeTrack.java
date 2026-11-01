package org.kirya343.playback.dto.commands;

import org.kirya343.security.core.dto.UserAuthData;

public record ChangeTrack(
    Long roomId,
    String changing,
    UserAuthData user
) implements RoomCommand {}