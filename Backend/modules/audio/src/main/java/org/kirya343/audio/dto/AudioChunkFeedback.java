package org.kirya343.audio.dto;

import java.util.UUID;

public record AudioChunkFeedback(
    UUID streamId,
    long sequence,
    boolean initialization
) {
}