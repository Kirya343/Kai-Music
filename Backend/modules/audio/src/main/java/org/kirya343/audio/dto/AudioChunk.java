package org.kirya343.audio.dto;

public record AudioChunk(
    byte[] data,
    long sequence,
    long durationMs,
    boolean initialization
) {
}