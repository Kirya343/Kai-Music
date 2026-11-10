package org.kirya343.playlist.eventhandlers;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.kirya343.audio.event.AudioDeletedEvent;
import org.kirya343.audio.event.AudioUpdatedEvent;
import org.kirya343.audio.event.AudioUploadedEvent;
import org.kirya343.common.event.playback.QueueChangedEvent;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.kirya343.playlist.dto.queue.QueueItemCreateDTO;
import org.kirya343.playlist.enums.PlaylistType;
import org.kirya343.playlist.service.PlaylistCommandService;
import org.kirya343.user.datasource.UserRepository;
import org.springframework.context.ApplicationEventPublisher;
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
public class AudioPlaylistEventHandler {

    private final QueueItemRepository queueItemRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;
    private final PlaylistCommandService playlistCommandService;
    
    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleDeleted(AudioDeletedEvent event) {

        log.debug("deleting entries by audio {}", event.audioId());

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

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void handleUploaded(AudioUploadedEvent event) {

        log.debug("AudioUploadedEvent handle: {}", event.audioId());

        Playlist playlist = playlistRepository.findPlaylistByTypeByOwnerId(event.userId(), PlaylistType.UPLOADED)
            .orElseGet(() -> 
                playlistRepository.save(
                    new Playlist(
                        "Uploaded songs", 
                        userRepository.getReferenceById(event.userId()), 
                        PlaylistType.UPLOADED
                    )));

        playlistCommandService.addToQueue(
            playlist.getId(), 
            event.userId(), 
            List.of(new QueueItemCreateDTO(event.audioId(), null))
        );
    }
}
