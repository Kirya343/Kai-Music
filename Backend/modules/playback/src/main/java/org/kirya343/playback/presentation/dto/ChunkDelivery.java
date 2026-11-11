package org.kirya343.playback.presentation.dto;

import java.time.Instant;

import org.kirya343.playback.domain.enums.ChunkDeliveryStatus;

public record ChunkDelivery(
    Long sequence,
    ChunkDeliveryStatus status,
    Instant sentAt
) {
}
