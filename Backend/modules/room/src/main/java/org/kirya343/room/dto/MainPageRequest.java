package org.kirya343.room.dto;

import java.util.List;

public record MainPageRequest(
    List<RoomDTO> publicRooms,
    long activeListners,
    long activeRooms
) {
}
