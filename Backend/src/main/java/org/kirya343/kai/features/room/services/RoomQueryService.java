package org.kirya343.kai.features.room.services;

import org.kirya343.kai.features.room.datasource.ListeningRoom;
import org.kirya343.kai.features.room.datasource.ListeningRoomRepository;
import org.kirya343.kai.features.room.dto.RoomDTO;
import org.kirya343.kai.infrastructure.security.dto.UserAuthData;
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
