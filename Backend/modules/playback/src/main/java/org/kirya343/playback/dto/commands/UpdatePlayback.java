package org.kirya343.playback.dto.commands;

import org.kirya343.playback.dto.PlaybackStateDTO;
import org.kirya343.security.core.dto.UserAuthData;

public record UpdatePlayback(
    Long roomId,
    PlaybackStateDTO state,
    UserAuthData user
) implements RoomCommand {}
