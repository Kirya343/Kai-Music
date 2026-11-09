package org.kirya343.playback.application.command;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.security.core.dto.UserAuthData;

public record UpdatePlayback(
    PlaybackStateDTO state,
    UserAuthData user,
    Long targetId,
    PlaybackTargetType targetType
) implements PlaybackCommand {}
