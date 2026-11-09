package org.kirya343.audio.event;

public record AudioUploadedEvent(
    Long userId,
    Long audioId
) {
}
