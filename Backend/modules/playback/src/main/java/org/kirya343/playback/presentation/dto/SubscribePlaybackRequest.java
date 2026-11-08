package org.kirya343.playback.presentation.dto;

import org.kirya343.playback.domain.enums.PlaybackTargetType;

public record SubscribePlaybackRequest(
    PlaybackTargetType type,
    Long id
) {
}
