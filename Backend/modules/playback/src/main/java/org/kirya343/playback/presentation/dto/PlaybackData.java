package org.kirya343.playback.presentation.dto;

import java.util.List;

import org.kirya343.room.dto.RoomDTO;
import org.kirya343.user.dto.ShortUserDTO;

// TODO DTO для полного плейбэка
public record PlaybackData(
    RoomDTO room,
    List<ShortUserDTO> listeners
) {
}
