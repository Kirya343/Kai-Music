package org.kirya343.playback.application.command;

import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.security.core.dto.UserAuthData;

public record UpdatePlayback(
    Long roomId,
    PlaybackStateDTO state,
    UserAuthData user
) implements RoomCommand {}
