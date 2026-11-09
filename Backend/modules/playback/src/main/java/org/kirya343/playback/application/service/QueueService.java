package org.kirya343.playback.application.service;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j 
public class QueueService {

    private final QueueItemRepository queueItemRepository;
    private final PlaybackStateRepository playbackStateRepository;
    private final PlaylistRepository playlistRepository;

    public QueueItem nextTrack(Long id, PlaybackTargetType type) {

        PlaybackState playbackState = playbackStateRepository
            .findByTargetIdAndTargetType(id, type)
            .orElseThrow();

        QueueItem queueItem = null;
        Playlist playlist = playlistRepository.findByPlaybackStateId(playbackState.getId()).orElseThrow(
            () -> new EntityNotFoundException("Playlist by playbackState (%s) not found".formatted(playbackState.getId())));

        if (playbackState.getEntryId() != null) {

            Long prevEntryId = playbackState.getEntryId();

            log.debug("prevEntryId: {}, playlistId: {}", prevEntryId, playlist.getId());

            queueItem = switch (playbackState.getPlaybackMode()) {

                case NORMAL ->
                    queueItemRepository
                        .findNextTrack(playlist.getId(), prevEntryId)
                        .orElse(null);

                case REPEAT_ALL -> {
                    QueueItem next = queueItemRepository
                        .findNextTrack(playlist.getId(), prevEntryId)
                        .orElse(null);

                    if (next == null) {
                        next = queueItemRepository
                            .findFirstInPlaylist(playlist.getId())
                            .orElse(null);
                    }

                    yield next;
                }

                case REPEAT_ONE ->
                    queueItemRepository
                        .findByPlaylistIdAndId(playlist.getId(), prevEntryId)
                        .orElse(null);

                case SHUFFLE ->
                    queueItemRepository
                        .findRandomTrack(playlist.getId())
                        .orElse(null);
                
            };

            log.debug("Режим проигрывания: {}", playbackState.getPlaybackMode());
        } else {
            queueItem = queueItemRepository
                .findFirstInPlaylist(playlist.getId())
                .orElse(null);
        }

        if (queueItem == null) {
            throw new EntityNotFoundException("Нет подходящего трека для воспроизведения");
        }

        log.debug("Id следующего трека: {}", queueItem.getId());

        return queueItem;
    }

    public QueueItem prevTrack(Long id, PlaybackTargetType type) {

        PlaybackState playbackState = playbackStateRepository
            .findByTargetIdAndTargetType(id, type)
            .orElseThrow();

        QueueItem queueItem = null;
        Playlist playlist = playlistRepository.findByPlaybackStateId(playbackState.getId()).orElseThrow(
            () -> new EntityNotFoundException("Playlist by playbackState (%s) not found".formatted(playbackState.getId())));

        if (playbackState.getEntryId() != null) {

            queueItem = queueItemRepository.findPrevTrack(playlist.getId(), playbackState.getEntryId()).orElse(null);
        }

        if (queueItem == null) {
            queueItem = queueItemRepository.findLastInPlaylist(playlist.getId()).orElse(null);
        }

        if (queueItem == null) {
            throw new EntityNotFoundException("Нет подходящего трека для воспроизведения");
        } 

        return queueItem;
    }
}