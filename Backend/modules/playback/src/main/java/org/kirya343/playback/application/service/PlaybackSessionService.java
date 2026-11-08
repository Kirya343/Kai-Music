package org.kirya343.playback.application.service;

import org.kirya343.playback.infrastructure.persistence.entity.UserPlayback;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.UserPlaybackRepository;
import org.kirya343.playback.infrastructure.streaming.AudioStreamWorker;
import org.kirya343.playback.infrastructure.streaming.AudioStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorker;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
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

    private final AudioStreamWorkerManager audioStreamWorkerManager;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    private final UserPlaybackRepository userPlaybackRepository;
    private final UserRepository userRepository;

    public void subscribe(UserAuthData authData, PlaybackTargetType targetType, Long targetId) {

        if (targetType == PlaybackTargetType.USER) {
            targetId = authData.id();
        }

        PlaybackStreamWorker playbackWorker = playbackStreamWorkerManager.get(targetType, targetId);
        AudioStreamWorker userWorker = audioStreamWorkerManager.get(authData.sub());

        User user = userRepository.findById(authData.id()).orElseThrow();

        userWorker.subscribe(playbackWorker, ShortUserDTO.ofUser(user));

        userPlaybackRepository.save(new UserPlayback(authData.id(), targetId, targetType));
    }

    public void restoreSession(UserAuthData authData) {
        log.debug("Пользователь {} восстанавливает сессию", authData.sub());

        UserPlayback userPlayback = userPlaybackRepository.findById(authData.id()).orElseThrow();

        subscribe(authData, userPlayback.getTargetType(), userPlayback.getTargetId());
    }
}
