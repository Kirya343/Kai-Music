package org.kirya343.room.services;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.user.datasource.User;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.common.event.room.RoomConnectedEvent;
import org.kirya343.common.event.room.RoomDeletedEvent;
import org.kirya343.common.event.room.RoomDisconnectedEvent;
import org.kirya343.room.dto.ShortRoomDTO;
import org.springframework.context.ApplicationEventPublisher;
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
    private final RoomWebSocketService roomWebSocketService;
    private final EntityManager entityManager;
    private final ApplicationEventPublisher eventPublisher;
    
    @Transactional 
    public ListeningRoom createRoom(UserAuthData authData) {
        listeningRoomRepository.findAllByOwnerId(authData.id())
            .forEach(r -> deleteRoom(r));

        ListeningRoom room = new ListeningRoom(
            entityManager.getReference(User.class, authData.id())
        );

        ListeningRoom saved = listeningRoomRepository.save(room);

        eventPublisher.publishEvent(new RoomConnectedEvent(authData.openId(), room.getId()));
        
        roomWebSocketService.broadcastRoomInfo(authData.openId(), ShortRoomDTO.ofRoom(saved));

        return saved;
    }

    @Transactional
    public void deleteRoom(ListeningRoom room) {
        eventPublisher.publishEvent(new RoomDeletedEvent(room.getId()));

        listeningRoomRepository.delete(room);
    }

    public void joinRoom(String code, UserAuthData authData) {
        ListeningRoom prevRoom = listeningRoomRepository.findRoomByUserId(authData.id()).orElse(null);

        if (prevRoom != null) {
            eventPublisher.publishEvent(new RoomDisconnectedEvent(authData.openId(), prevRoom.getId()));
        }

        ListeningRoom newRoom = listeningRoomRepository.findByCode(code).orElseThrow();

        eventPublisher.publishEvent(new RoomConnectedEvent(authData.openId(), newRoom.getId()));

        roomWebSocketService.broadcastRoomInfo(authData.openId(), ShortRoomDTO.ofRoom(newRoom));
    }

    public void leaveRoom(UserAuthData authData) {
        ListeningRoom room = listeningRoomRepository.findRoomByUserId(authData.id()).orElseThrow();

        eventPublisher.publishEvent(new RoomDisconnectedEvent(authData.openId(), room.getId()));
    }
}
