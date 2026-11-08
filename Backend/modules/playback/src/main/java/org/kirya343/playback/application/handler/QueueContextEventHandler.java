package org.kirya343.playback.application.handler;

import org.kirya343.common.event.playback.QueueChangedEvent;
import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class QueueContextEventHandler {

    private final PlaybackStateRepository playbackStateRepository;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleQueueChanged(QueueChangedEvent event) {

        PlaybackState playbackState = playbackStateRepository.findByPlaylistId(event.playlistId()).orElseThrow();

        playbackStreamWorkerManager.get(playbackState.getTargetType(), playbackState.getTargetId())
            .broadcast(userWorker -> userWorker.sendPlaylist(playbackState.getPlaylist()));
    }
}
