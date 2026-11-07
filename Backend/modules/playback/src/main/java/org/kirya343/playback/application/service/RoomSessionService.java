package org.kirya343.playback.application.service;

import org.kirya343.playback.infrastructure.persistence.entity.UserPlayback;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.UserPlaybackRepository;
import org.kirya343.playback.infrastructure.cache.RoomPlaybackContextStore;
import org.kirya343.playback.infrastructure.streaming.RoomStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.UserAudioStreamWorker;
import org.kirya343.playback.infrastructure.streaming.UserAudioStreamWorkerManager;
import org.kirya343.user.datasource.User;
import org.kirya343.user.datasource.UserRepository;
import org.kirya343.user.dto.ShortUserDTO;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor
public class RoomSessionService {

    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final UserAudioStreamWorkerManager userAudioStreamWorkerManager;
    private final RoomStreamWorkerManager roomStreamWorkerManager;
    private final UserPlaybackRepository userPlaybackRepository;
    private final UserRepository userRepository;
    
    public void initializeRoom(Long roomId, ShortUserDTO user) {

        roomPlaybackContextStore.computeIfAbsent(roomId).getPresence().userConnected(user);

        roomPlaybackContextStore.listenersUpdated(roomId);
    }

    public void connectUserToRoom(Long roomId, String userSub) {
        log.debug("Пользователь {} присоединяется к комнате {}", userSub, roomId);

        //TODO Убрать, перенеделать на простую модель

        User user = userRepository.findBySub(userSub).orElseThrow();

        userPlaybackRepository.save(new UserPlayback(user.getId(), roomId, PlaybackTargetType.ROOM));

        initializeRoom(roomId, ShortUserDTO.ofUser(user));

        UserAudioStreamWorker userWorker = userAudioStreamWorkerManager.getWorker(userSub);

        // Reloads worker
        roomStreamWorkerManager.getWorker(roomId).addUserWorker(userWorker);
    }
}
