package org.kirya343.playback.presentation.dto;

import org.kirya343.playlist.dto.PlaylistDTO;
import org.kirya343.room.dto.RoomDTO;

public record PlaybackData(
    RoomDTO room,
    PlaylistDTO playlist
) {
}
