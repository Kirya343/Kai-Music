package org.kirya343.room.services;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.user.datasource.User;
import org.kirya343.user.datasource.UserRepository;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.playlist.dto.PlaylistDTO;
import org.kirya343.playlist.service.PlaylistWebSocketService;
import org.kirya343.room.dto.ShortRoomDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor 
public class RoomCommandService {

    private final ListeningRoomRepository listeningRoomRepository;
    private final UserRepository userRepository;
    private final RoomWebSocketService roomWebSocketService;
    private final EntityManager entityManager;
    private final PlaylistWebSocketService playlistWebSocketService;
    
    @Transactional 
    public ListeningRoom createRoom(UserAuthData authData) {
        listeningRoomRepository.findAllByOwnerId(authData.id())
            .forEach(r -> deleteRoom(r));

        ListeningRoom room = new ListeningRoom(
            entityManager.getReference(User.class, authData.id())
        );

        ListeningRoom saved = listeningRoomRepository.save(room);
        userRepository.updateListeningRoom(authData.id(), saved.getId());

        roomWebSocketService.broadcastRoomInfo(authData.openId(), ShortRoomDTO.ofRoom(saved));

        return saved;
    }

    @Transactional
    public void deleteRoom(ListeningRoom room) {
        for (User member : room.getMembers()) {
            member.setListeningRoom(null);
        }

        listeningRoomRepository.delete(room);
    }
}
