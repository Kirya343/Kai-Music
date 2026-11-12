package org.kirya343.playback.application.service;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.entity.UserPlayback;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.infrastructure.persistence.repository.UserPlaybackRepository;
import org.kirya343.playback.infrastructure.streaming.UserStreamWorker;
import org.kirya343.playback.infrastructure.streaming.UserStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorker;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.room.dto.RoomDTO;
import org.kirya343.room.services.RoomWebSocketService;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.user.datasource.User;
import org.kirya343.user.datasource.UserRepository;
import org.kirya343.user.dto.ShortUserDTO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor
public class PlaybackSessionService {

    private final UserStreamWorkerManager audioStreamWorkerManager;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    private final UserPlaybackRepository userPlaybackRepository;
    private final UserRepository userRepository;
    private final RoomWebSocketService roomWebSocketService;
    private final ListeningRoomRepository listeningRoomRepository;
    private final PlaybackStateRepository playbackStateRepository;

    public void subscribe(UserAuthData authData, PlaybackTargetType targetType, Long targetId) {

        log.debug("Subscribing user to {} id: {}", targetType, targetId);

        Long resolvedTargetId = targetType == PlaybackTargetType.USER
            ? authData.id()
            : targetId;

        PlaybackStreamWorker playbackWorker = playbackStreamWorkerManager.get(targetType, resolvedTargetId);
        UserStreamWorker userWorker = audioStreamWorkerManager.get(authData.sub());

        User user = userRepository.findById(authData.id()).orElseThrow();

        userWorker.subscribe(playbackWorker, ShortUserDTO.ofUser(user));

        userPlaybackRepository.save(new UserPlayback(authData.id(), resolvedTargetId, targetType));

        // broadcasting

        switch (targetType) {
            case ROOM:
                
                ListeningRoom room = listeningRoomRepository.findById(resolvedTargetId).orElseThrow();
                roomWebSocketService.broadcastRoomInfo(authData.sub(), RoomDTO.ofRoom(room));
                break;
        
            default:
                break;
        }

        PlaybackState state = playbackStateRepository
            .findWithPlaylistByTargetIdAndTargetType(resolvedTargetId, targetType)
            .orElseGet(() -> playbackStateRepository.save(new PlaybackState(resolvedTargetId, targetType, null)));
        
        log.debug(
            "Отправляем плейлист пользователю {}: {}", 
            state.getPlaylist().getId(), 
            state.getPlaylist().getQueue().stream().map(qi -> qi.getAudio().getId()).toList());

        userWorker.sendPlaylist(state.getPlaylist());
        userWorker.sendPlaybackMode(state.getPlaybackMode());
    }

    public void unsubscribe(UserAuthData authData) {
        audioStreamWorkerManager.unregister(authData.sub());
    }

    public void restoreSession(UserAuthData authData) {
        log.debug("Пользователь {} восстанавливает сессию", authData.sub());

        UserPlayback userPlayback = userPlaybackRepository.findById(authData.id()).orElseThrow();

        subscribe(authData, userPlayback.getTargetType(), userPlayback.getTargetId());
    }
}
