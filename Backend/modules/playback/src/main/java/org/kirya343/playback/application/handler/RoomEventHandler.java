package org.kirya343.playback.application.handler;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.application.event.UpdatePlaybackEvent;
import org.kirya343.playback.application.service.PlaybackSessionService;
import org.kirya343.playback.domain.dto.PlaybackTarget;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.room.dto.PlaybackSubscribeEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoomEventHandler {

    private final PlaybackStateRepository playbackStateRepository;
    private final PlaybackSessionService sessionService;

    @Async
    @EventListener
    @Transactional
    public void handlePlayback(UpdatePlaybackEvent event) {

        PlaybackTarget target = event.target();
        
        PlaybackState state = playbackStateRepository
            .findByTargetIdAndTargetType(target.id(), target.type())
            .orElse(new PlaybackState(target, event.stateDTO()));

        state.setPosition(event.stateDTO().position());
        state.setEntryId(event.stateDTO().entryId());
        state.setPaused(event.stateDTO().pause());
        state.setInitiatorName(event.stateDTO().user());
        
        playbackStateRepository.save(state);
    }

    @Async
    @EventListener
    public void handlePlaybackSubscribe(PlaybackSubscribeEvent event) {
        PlaybackTarget target = new PlaybackTarget(
            PlaybackTargetType.valueOf(event.type()), 
            event.id()
        );
        sessionService.subscribe(event.authData(), target);
    }
}
