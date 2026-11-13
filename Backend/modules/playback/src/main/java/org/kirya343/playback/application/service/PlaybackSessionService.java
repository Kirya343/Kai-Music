package org.kirya343.playback.application.service;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.entity.UserPlayback;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.infrastructure.persistence.repository.UserPlaybackRepository;
import org.kirya343.playback.infrastructure.streaming.playback.PlaybackStreamWorker;
import org.kirya343.playback.infrastructure.streaming.playback.PlaybackStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorker;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorkerManager;
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

        PlaybackState state = playbackStateRepository
            .findWithPlaylistByTargetIdAndTargetType(resolvedTargetId, targetType)
            .orElseGet(() -> playbackStateRepository.save(new PlaybackState(resolvedTargetId, targetType, null)));
        
        log.debug(
            "Отправляем плейлист пользователю {}: {} треков", 
            state.getPlaylist().getId(), 
            state.getPlaylist().getQueue().size());

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
