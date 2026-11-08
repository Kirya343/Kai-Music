package org.kirya343.playback.application.service;

import org.kirya343.playback.infrastructure.persistence.entity.UserPlayback;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.UserPlaybackRepository;
import org.kirya343.playback.infrastructure.streaming.AudioStreamWorker;
import org.kirya343.playback.infrastructure.streaming.AudioStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorker;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.room.dto.ShortRoomDTO;
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

    private final AudioStreamWorkerManager audioStreamWorkerManager;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    private final UserPlaybackRepository userPlaybackRepository;
    private final UserRepository userRepository;
    private final RoomWebSocketService roomWebSocketService;
    private final ListeningRoomRepository listeningRoomRepository;

    public void subscribe(UserAuthData authData, PlaybackTargetType targetType, Long targetId) {

        if (targetType == PlaybackTargetType.USER) {
            targetId = authData.id();
        }

        PlaybackStreamWorker playbackWorker = playbackStreamWorkerManager.get(targetType, targetId);
        AudioStreamWorker userWorker = audioStreamWorkerManager.get(authData.sub());

        User user = userRepository.findById(authData.id()).orElseThrow();

        userWorker.subscribe(playbackWorker, ShortUserDTO.ofUser(user));

        switch (targetType) {
            case ROOM:
                
                ListeningRoom room = listeningRoomRepository.findById(targetId).orElseThrow();
                roomWebSocketService.broadcastRoomInfo(authData.sub(), ShortRoomDTO.ofRoom(room));
                break;
        
            default:
                break;
        }

        userPlaybackRepository.save(new UserPlayback(authData.id(), targetId, targetType));
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
