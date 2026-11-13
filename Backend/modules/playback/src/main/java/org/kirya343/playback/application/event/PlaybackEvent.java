package org.kirya343.playback.application.event;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;

public record PlaybackEvent(
    Long targetId,
    PlaybackTargetType targetType,
    PlaybackStateDTO stateDTO
) {
}