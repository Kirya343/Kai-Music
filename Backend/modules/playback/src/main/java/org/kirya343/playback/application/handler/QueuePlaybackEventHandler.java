package org.kirya343.playback.application.handler;

import java.util.Optional;

import org.kirya343.common.event.playback.QueueChangedEvent;
import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class QueuePlaybackEventHandler {

    private final PlaybackStateRepository playbackStateRepository;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional (propagation = Propagation.REQUIRES_NEW)
    public void handleQueueChanged(QueueChangedEvent event) {

        log.debug("handle queue changed: ", event.playlistId());

        Optional<PlaybackState> playbackState = playbackStateRepository.findByPlaylistId(event.playlistId());

        if (playbackState.isPresent()) {

            PlaybackState existing = playbackState.get();

            log.debug("send playlist: ", event.playlistId());

            playbackStreamWorkerManager.get(existing.getTargetType(), existing.getTargetId())
                .broadcast(userWorker -> userWorker.sendPlaylist(existing.getPlaylist()));
        }
    }
}
