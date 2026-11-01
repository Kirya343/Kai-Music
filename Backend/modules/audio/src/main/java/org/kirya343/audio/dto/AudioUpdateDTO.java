package org.kirya343.audio.dto;

public record AudioUpdateDTO(
    String title,
    String artist,
    String album,
    String coverUrl
) {}
