package org.kirya343.room.dto;

import java.util.List;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.user.dto.ShortUserDTO;

public record ShortRoomDTO(
    Long id,
    String title,
    Long ownerId,
    String code,
    List<ShortUserDTO> listeners
) {

    public static ShortRoomDTO ofRoom(ListeningRoom room) {
        return new ShortRoomDTO(
            room.getId(), 
            room.getTitle() != null ? room.getTitle() : room.getOwner().getName() + "\'s room", 
            room.getOwner().getId(),
            room.getCode(),
            null
        );
    }

    public static ShortRoomDTO updateMembers(ShortRoomDTO room, List<ShortUserDTO> listeners) {
        return new ShortRoomDTO(
            room.id(), 
            room.title(), 
            room.ownerId(),
            room.code(),
            listeners
        );
    }
}
