package org.kirya343.playback.application.event;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.security.core.dto.UserAuthData;

public record PlaybackEvent(
    Long targetId,
    PlaybackTargetType targetType,
    PlaybackStateDTO stateDTO,
    UserAuthData authData
) {
}