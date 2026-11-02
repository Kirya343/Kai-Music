package org.kirya343.playback.services;

import java.util.Optional;

import org.kirya343.playback.datasource.model.PlaybackState;
import org.kirya343.playback.enums.PlaybackTargetType;
import org.kirya343.playback.datasource.repository.PlaybackStateRepository;
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

    public QueueItem nextTrack(Long roomId) {

        Playlist playlist = playlistRepository.findByRoomId(roomId).orElseThrow(
            () -> new EntityNotFoundException("Playlist by room (%s) not found".formatted(roomId)));

        Optional<PlaybackState> playbackState = playbackStateRepository.findByTargetIdAndTargetType(roomId, PlaybackTargetType.ROOM);

        QueueItem queueItem = null;

        if (playbackState.isPresent()) {

            PlaybackState existingState = playbackState.get();

            Long prevEntryId = existingState.getEntryId();

            queueItem = switch (existingState.getPlaybackMode()) {

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
                            .findFirstByPlaylistIdOrderByPositionAsc(playlist.getId())
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

            log.debug("Режим проигрывания: {}", existingState.getPlaybackMode());
        } else {
            queueItem = queueItemRepository
                .findFirstByPlaylistIdOrderByPositionAsc(playlist.getId())
                .orElse(null);
        }

        if (queueItem == null) {
            throw new EntityNotFoundException("Нет подходящего трека для воспроизведения");
        }

        log.debug("Id следующего трека: {}", queueItem.getId());

        return queueItem;
    }

    public QueueItem prevTrack(Long roomId) {

        Optional<PlaybackState> playbackState = playbackStateRepository.findByTargetIdAndTargetType(roomId, PlaybackTargetType.ROOM);

        QueueItem queueItem = null;
        Playlist playlist = playlistRepository.findByRoomId(roomId).orElseThrow(
            () -> new EntityNotFoundException("Playlist by room (%s) not found".formatted(roomId)));

        if (playbackState.isPresent()) {
            PlaybackState existingState = playbackState.get();

            queueItem = queueItemRepository.findPrevTrack(playlist.getId(), existingState.getEntryId()).orElse(null);
        }

        if (queueItem == null) {
            queueItem = queueItemRepository.findFirstByPlaylistIdOrderByPositionDesc(playlist.getId()).orElse(null);
        }

        if (queueItem == null) {
            throw new EntityNotFoundException("Нет подходящего трека для воспроизведения");
        } 

        return queueItem;
    }
}