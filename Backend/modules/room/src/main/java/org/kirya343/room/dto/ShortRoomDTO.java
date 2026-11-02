package org.kirya343.room.dto;

import org.kirya343.room.datasource.ListeningRoom;

public record ShortRoomDTO(
    Long id,
    String title,
    Long ownerId,
    String code,
    Long membersCount,
    Long playlistId
) {

    public static ShortRoomDTO ofRoom(ListeningRoom room) {
        return new ShortRoomDTO(
            room.getId(), 
            room.getTitle() != null ? room.getTitle() : room.getOwner().getName() + "\'s room", 
            room.getOwner().getId(),
            room.getCode(),
            0L,
            room.getPlaylist().getId()
        );
    }
}
