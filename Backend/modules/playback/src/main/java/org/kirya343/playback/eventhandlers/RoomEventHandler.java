package org.kirya343.playback.eventhandlers;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.playback.datasource.model.RoomPlaybackState;
import org.kirya343.playback.datasource.repository.RoomPlaybackStateRepository;
import org.kirya343.playback.dto.event.RoomPlaybackEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomEventHandler {

    private final RoomPlaybackStateRepository roomPlaybackStateRepository;
    private final EntityManager entityManager;

    @Async
    @EventListener
    @Transactional
    public void handlePlayback(RoomPlaybackEvent event) {
        
        RoomPlaybackState state = roomPlaybackStateRepository.findById(event.roomId())
            .orElse(new RoomPlaybackState(
                entityManager.getReference(ListeningRoom.class, event.roomId())
            ));

        state.setPosition(event.stateDTO().position());
        state.setCurrentQueueEntryId(event.stateDTO().entryId());
        state.setPaused(event.stateDTO().pause());
        state.setUser(event.authData().name());
        
        roomPlaybackStateRepository.save(state);
    }
}
