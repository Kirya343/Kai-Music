package org.kirya343.playback.services;

import java.util.Optional;

import org.kirya343.playback.PlaybackWebsocketService;
import org.kirya343.playback.datasource.model.PlaybackState;
import org.kirya343.playback.datasource.model.UserPlayback;
import org.kirya343.playback.enums.PlaybackTargetType;
import org.kirya343.playback.datasource.repository.PlaybackStateRepository;
import org.kirya343.playback.datasource.repository.UserPlaybackRepository;
import org.kirya343.playback.dto.PlaybackStateDTO;
import org.kirya343.playback.services.cache.RoomPlaybackContextStore;
import org.kirya343.playback.services.streaming.RoomStreamWorkerManager;
import org.kirya343.playback.services.streaming.UserAudioStreamWorker;
import org.kirya343.playback.services.streaming.UserAudioStreamWorkerManager;
import org.kirya343.user.datasource.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor
public class RoomSessionService {

    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final PlaybackWebsocketService playbackWebsocketService;
    private final UserAudioStreamWorkerManager userAudioStreamWorkerManager;
    private final RoomStreamWorkerManager roomStreamWorkerManager;
    private final PlaybackStateRepository playbackStateRepository;  
    private final UserPlaybackRepository userPlaybackRepository;
    private final UserRepository userRepository;
    
    public void initializeRoom(Long roomId, String userOpenId) {

        roomPlaybackContextStore.computeIfAbsent(roomId).getListeners().add(userOpenId);

        roomPlaybackContextStore.listenersUpdated(roomId);
    }

    public void connectUserToRoom(Long roomId, String userOpenId) {
        log.debug("Пользователь {} присоединяется к комнате {}", userOpenId, roomId);

        //TODO Убрать, перенеделать на простую модель

        Long userId = userRepository.findByOpenId(userOpenId).orElseThrow().getId();

        userPlaybackRepository.save(new UserPlayback(userId, roomId, PlaybackTargetType.ROOM));

        Optional<PlaybackState> playbackState = playbackStateRepository.findByTargetIdAndTargetType(roomId, PlaybackTargetType.ROOM);

        if (playbackState.isPresent()) {
            playbackWebsocketService.broadcastPlaybackState(userOpenId, PlaybackStateDTO.ofState(playbackState.get()));
        }

        initializeRoom(roomId, userOpenId);

        UserAudioStreamWorker userWorker = userAudioStreamWorkerManager.getWorker(userOpenId);

        // Reloads worker
        roomStreamWorkerManager.getWorker(roomId).addUserWorker(userWorker);
    }
}
