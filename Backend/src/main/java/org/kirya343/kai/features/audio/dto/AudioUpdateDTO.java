package org.kirya343.kai.features.audio.dto;

public record AudioUpdateDTO(
    String title,
    String artist,
    String album,
    String coverUrl
) {}
