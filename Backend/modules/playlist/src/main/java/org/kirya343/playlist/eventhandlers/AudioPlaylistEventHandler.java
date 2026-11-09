package org.kirya343.playlist.eventhandlers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.kirya343.audio.event.AudioDeletedEvent;
import org.kirya343.audio.event.AudioUpdatedEvent;
import org.kirya343.common.event.playback.QueueChangedEvent;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class AudioPlaylistEventHandler {

    private final QueueItemRepository queueItemRepository;
    private final ApplicationEventPublisher eventPublisher;
    
    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleDeleted(AudioDeletedEvent event) {

        List<QueueItem> entries = queueItemRepository.findByAudioId(event.audioId());

        Set<Long> playlistsIds = entries.stream()
            .map(qi -> qi.getPlaylist().getId())
            .collect(Collectors.toSet());

        queueItemRepository.deleteAll(entries);

        playlistsIds.forEach(id -> eventPublisher.publishEvent(new QueueChangedEvent(id)));
    }

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleUpdated(AudioUpdatedEvent event) {

        List<QueueItem> entries = queueItemRepository.findByAudioId(event.audioId());

        Set<Long> playlistsIds = entries.stream()
            .map(qi -> qi.getPlaylist().getId())
            .collect(Collectors.toSet());

        playlistsIds.forEach(id -> eventPublisher.publishEvent(new QueueChangedEvent(id)));
    }
}
