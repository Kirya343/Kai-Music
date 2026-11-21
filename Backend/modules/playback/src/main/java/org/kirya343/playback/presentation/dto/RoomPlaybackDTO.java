package org.kirya343.playback.presentation.dto;

import org.kirya343.audio.dto.AudioDTO;
import org.kirya343.room.dto.RoomDTO;

public record RoomPlaybackDTO(
    RoomDTO room,
    int listeners,
    AudioDTO audio
) {
}
