package org.kirya343.kai.features.playback.dto.commands;

import org.kirya343.kai.features.authentication.dto.UserAuthData;
import org.kirya343.kai.features.playback.dto.PlaybackStateDTO;

public record UpdatePlayback(
    Long roomId,
    PlaybackStateDTO state,
    UserAuthData user
) implements RoomCommand {}
