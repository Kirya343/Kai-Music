package org.kirya343.playback.services;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.datasource.ListeningRoomRepository;

import java.util.Optional;

import org.kirya343.playback.datasource.model.PlaybackState;
import org.kirya343.playback.enums.PlaybackTargetType;
import org.kirya343.playback.datasource.repository.PlaybackStateRepository;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.model.QueueItem;
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
    private final ListeningRoomRepository listeningRoomRepository;
    private final PlaybackStateRepository playbackStateRepository;

    public QueueItem nextTrack(Long roomId) {
        ListeningRoom room = listeningRoomRepository.findById(roomId).orElseThrow(
            () -> new EntityNotFoundException("Комната не найдена"));

        Playlist playlist = room.getPlaylist();

        Optional<PlaybackState> playbackState = playbackStateRepository.findByTargetIdAndTargetType(roomId, PlaybackTargetType.ROOM);

        QueueItem queueItem = null;

        if (playbackState.isPresent()) {

            PlaybackState existingState = playbackState.get();

            Long prevEntryId = existingState.getEntryId();

            queueItem = switch (existingState.getPlaybackMode()) {

                case NORMAL ->
                    queueItemRepository
                        .findNextTrack(room.getPlaylist().getId(), prevEntryId)
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
                .findFirstByPlaylistIdOrderByPositionAsc(room.getPlaylist().getId())
                .orElse(null);
        }

        if (queueItem == null) {
            throw new EntityNotFoundException("Нет подходящего трека для воспроизведения");
        }

        log.debug("Id следующего трека: {}", queueItem.getId());

        return queueItem;
    }

    public QueueItem prevTrack(Long roomId) {
        
        ListeningRoom room = listeningRoomRepository.findById(roomId).orElseThrow(
            () -> new EntityNotFoundException("Комната не найдена"));

        Optional<PlaybackState> playbackState = playbackStateRepository.findByTargetIdAndTargetType(roomId, PlaybackTargetType.ROOM);

        QueueItem queueItem = null;
        Playlist playlist = room.getPlaylist();

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