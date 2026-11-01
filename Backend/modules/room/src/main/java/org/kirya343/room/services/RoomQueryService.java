package org.kirya343.room.services;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.room.dto.RoomDTO;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class RoomQueryService {

    private final ListeningRoomRepository listeningRoomRepository;
    
    public RoomDTO getCurrentRoom(UserAuthData authData) {
        ListeningRoom room = listeningRoomRepository.findRoomByUserId(authData.id()).orElseThrow();

        return RoomDTO.ofRoom(room);
    }

    public ListeningRoom findByPlaylistId(Long playlistId) {
        return listeningRoomRepository.findByPlaylistId(playlistId).orElse(null);
    }
}
