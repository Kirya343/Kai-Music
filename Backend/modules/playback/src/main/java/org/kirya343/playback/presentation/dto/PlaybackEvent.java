package org.kirya343.playback.presentation.dto;

import org.kirya343.playback.domain.enums.PlaybackEventType;

public record PlaybackEvent(
    PlaybackEventType type
) {
}
