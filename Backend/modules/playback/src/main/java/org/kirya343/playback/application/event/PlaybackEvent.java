package org.kirya343.playback.application.event;

import org.kirya343.playback.domain.dto.PlaybackTarget;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;

public record PlaybackEvent(
    PlaybackTarget target,
    PlaybackStateDTO stateDTO
) {
}