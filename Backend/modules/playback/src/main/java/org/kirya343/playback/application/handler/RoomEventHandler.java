package org.kirya343.playback.application.handler;

import org.kirya343.common.event.room.RoomConnectedEvent;
import org.kirya343.common.event.room.RoomDisconnectedEvent;
import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.application.event.RoomPlaybackEvent;
import org.kirya343.playback.application.service.RoomSessionService;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
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
    private final RoomSessionService roomSessionService;

    @Async
    @EventListener
    @Transactional
    public void handlePlayback(RoomPlaybackEvent event) {
        
        PlaybackState state = playbackStateRepository.findByTargetIdAndTargetType(event.roomId(), PlaybackTargetType.ROOM)
            .orElse(new PlaybackState(event.roomId(), PlaybackTargetType.ROOM));

        state.setPosition(event.stateDTO().position());
        state.setEntryId(event.stateDTO().entryId());
        state.setPaused(event.stateDTO().pause());
        state.setInitiatorName(event.authData().name());
        
        playbackStateRepository.save(state);
    }

    @Async
    @EventListener
    public void handleRoomConnected(RoomConnectedEvent event) {
        roomSessionService.connectUserToRoom(event.roomId(), event.userSub());
    }

    @Async
    @EventListener
    public void handleRoomDisconnected(RoomDisconnectedEvent event) {

    }
}
