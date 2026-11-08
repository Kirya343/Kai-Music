package org.kirya343.room.services;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.user.datasource.User;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.common.event.room.RoomDeletedEvent;
import org.kirya343.room.dto.PlaybackSubscribeEvent;
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

        eventPublisher.publishEvent(new PlaybackSubscribeEvent(authData, "ROOM", room.getId()));

        return saved;
    }

    @Transactional
    public void deleteRoom(ListeningRoom room) {
        eventPublisher.publishEvent(new RoomDeletedEvent(room.getId()));

        listeningRoomRepository.delete(room);
    }
}
