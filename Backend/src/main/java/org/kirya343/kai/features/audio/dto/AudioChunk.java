package org.kirya343.kai.features.audio.dto;

public record AudioChunk(
    byte[] data,
    long sequence,
    long durationMs,
    boolean initialization
) {
}
