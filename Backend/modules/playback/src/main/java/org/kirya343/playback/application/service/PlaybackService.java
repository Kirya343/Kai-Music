package org.kirya343.playback.application.service;

import java.util.List;

import org.kirya343.playback.domain.enums.PlaybackMode;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.entity.UserPlayback;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.infrastructure.persistence.repository.UserPlaybackRepository;
import org.kirya343.playback.infrastructure.streaming.playback.PlaybackStreamWorkerManager;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.kirya343.playlist.dto.queue.QueueItemCreateDTO;
import org.kirya343.playlist.service.PlaylistQueueService;
import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.services.RoomCommandService;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor 
public class PlaybackService {

    private final PlaybackStateRepository playbackStateRepository;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    private final PlaybackSessionService playbackSessionService;
    private final RoomCommandService roomCommandService;
    private final QueueItemRepository queueItemRepository;
    private final PlaylistRepository playlistRepository;
    private final UserPlaybackRepository userPlaybackRepository;
    private final PlaylistQueueService playlistQueueService;
    
    public void updatePlaybackMode(PlaybackMode mode, UserAuthData authData) {
        UserPlayback userPlayback = userPlaybackRepository.findById(authData.id()).orElseThrow();

        playbackStateRepository.updatePlaybackMode(userPlayback.getTargetId(), userPlayback.getTargetType(), mode);

        playbackStreamWorkerManager.get(userPlayback.getTargetType(), userPlayback.getTargetId())
            .broadcast(userWorker -> userWorker.sendPlaybackMode(mode));
    }
 
    @Transactional 
    public void playTrack(PlaybackTargetType targetType, Long audioId, Long playlistId, UserAuthData authData) {

        Long targetId = authData.id();

        if (targetType == PlaybackTargetType.ROOM) {
            ListeningRoom room = roomCommandService.createRoom(authData);
            targetId = room.getId();
        }

        Long resolvedtargetId = targetId; 

        PlaybackState playbackState = playbackStateRepository
            .findByTargetIdAndTargetType(targetId, targetType)
            .orElseGet(() -> playbackStateRepository.save(
                new PlaybackState(resolvedtargetId, targetType, null)
            ));

        playbackSessionService.subscribe(authData, targetType, targetId);

        Long queuePlaylistId = playbackState.getPlaylist().getId();

        playlistRepository.deleteAllByPlaylistId(queuePlaylistId);

        playlistQueueService.addToQueue(queuePlaylistId, authData.id(), List.of(new QueueItemCreateDTO(audioId, null)));

        if (playlistId == null) {
            playlistQueueService.addRundomTracks(30, queuePlaylistId, authData);
        } else {
            playlistQueueService.importPlaylist(queuePlaylistId, playlistId, authData);
        }

        QueueItem qi = queueItemRepository.findByPlaylistIdAndAudioId(queuePlaylistId, audioId).orElse(null);

        playbackStreamWorkerManager.get(targetType, targetId).changeTrack(qi, authData.name());
    }
}
