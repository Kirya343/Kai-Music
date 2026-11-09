package org.kirya343.playback.application.service;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.kirya343.playlist.service.PlaylistCommandService;
import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.services.RoomCommandService;
import org.kirya343.playback.application.command.ChangeTrack;
import org.kirya343.playback.domain.enums.PlaybackMode;
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
    private final PlaylistCommandService playlistCommandService;
    private final QueueItemRepository queueItemRepository;
    private final PlaylistRepository playlistRepository;
    
    public void updatePlaybackMode(Long id, PlaybackTargetType type, PlaybackMode mode, UserAuthData authData) {
        playbackStateRepository.updatePlaybackMode(id, type, mode);

        playbackStreamWorkerManager.get(type, id)
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

        try {
            Playlist playlist = playbackState.getPlaylist();

            playlist.getQueue().clear();

            playlistRepository.saveAndFlush(playlist);

            if (playlistId == null) {
                playlistCommandService.addRundomTracks(30, playbackState.getPlaylist().getId(), authData);
            } else {
                playlistCommandService.importPlaylist(playbackState.getPlaylist().getId(), playlistId, authData);
            }

            playlistRepository.flush();
        } catch (Exception e) {
            log.error("Ошибка добавления аудио в плейлист: {}", e.getMessage());
        }

        Playlist updatedPlaylist = playlistRepository.findById(playbackState.getPlaylist().getId()).orElseThrow();

        log.debug(
            "Отправляем плейлист пользователю {}: {}", 
            updatedPlaylist.getId(), 
            updatedPlaylist.getQueue().stream().map(qi -> qi.getAudio().getId()).toList());

        playbackSessionService.subscribe(authData, targetType, targetId);

        QueueItem qi = queueItemRepository.findByPlaylistIdAndAudioId(playbackState.getPlaylist().getId(), audioId).orElse(null);

        playbackStreamWorkerManager.get(targetType, targetId).submit(new ChangeTrack(qi.getId().toString(), authData));
    }
}
