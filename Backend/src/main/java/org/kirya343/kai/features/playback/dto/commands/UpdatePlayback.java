package org.kirya343.kai.features.playback.dto.commands;

import org.kirya343.kai.features.playback.dto.PlaybackStateDTO;
import org.kirya343.kai.infrastructure.security.dto.UserAuthData;

public record UpdatePlayback(
    Long roomId,
    PlaybackStateDTO state,
    UserAuthData user
) implements RoomCommand {}
