package org.kirya343.room.dto;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.user.dto.ShortUserDTO;

import java.util.List;

import org.kirya343.audio.datasource.AudioFile;


public record RoomDTO(
    Long id,
    String title,
    Long ownerId,
    String code,
    List<ShortUserDTO> listeners
) {
    public static RoomDTO ofRoom(ListeningRoom room, AudioFile audio) {
        return new RoomDTO(
            room.getId(),
            room.getTitle() != null ? room.getTitle() : room.getOwner().getName() + "\'s room",
            room.getOwner().getId(),
            room.getCode(),
            null
        );
    }

    public static RoomDTO byContext(RoomDTO r, AudioFile audio, Integer listeners) {
        return new RoomDTO(
            r.id(),
            r.title(),
            r.ownerId(),
            r.code(),
            null
        );
    }

    public static RoomDTO ofRoom(ListeningRoom room) {

        return new RoomDTO(
            room.getId(),
            room.getTitle() != null ? room.getTitle() : room.getOwner().getName() + "\'s room",
            room.getOwner().getId(),
            room.getCode(),
            null
        );
    }
}