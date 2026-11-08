package org.kirya343.playback.application.handler;

import org.kirya343.common.event.room.RoomDisconnectedEvent;
import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.application.event.PlaybackEvent;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomEventHandler {

    private final PlaybackStateRepository playbackStateRepository;

    @Async
    @EventListener
    @Transactional
    public void handlePlayback(PlaybackEvent event) {
        
        PlaybackState state = playbackStateRepository
            .findByTargetIdAndTargetType(event.targetId(), event.targetType())
            .orElse(new PlaybackState(event.targetId(), event.targetType(), event.stateDTO()));

        state.setPosition(event.stateDTO().position());
        state.setEntryId(event.stateDTO().entryId());
        state.setPaused(event.stateDTO().pause());
        state.setInitiatorName(event.authData().name());
        
        playbackStateRepository.save(state);
    }

    @Async
    @EventListener
    public void handleRoomDisconnected(RoomDisconnectedEvent event) {

    }
}
