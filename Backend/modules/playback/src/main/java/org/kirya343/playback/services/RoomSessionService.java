package org.kirya343.playback.services;

import org.kirya343.playback.PlaybackWebsocketService;
import org.kirya343.playback.dto.PlaybackStateDTO;
import org.kirya343.playback.services.cache.RoomPlaybackContextStore;
import org.kirya343.playback.services.streaming.RoomStreamWorkerManager;
import org.kirya343.playback.services.streaming.UserAudioStreamWorker;
import org.kirya343.playback.services.streaming.UserAudioStreamWorkerManager;
import org.kirya343.playlist.dto.PlaylistDTO;
import org.kirya343.playlist.service.PlaylistWebSocketService;
import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.dto.ShortRoomDTO;
import org.kirya343.room.services.RoomWebSocketService;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.user.datasource.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor
public class RoomSessionService {

    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final UserRepository userRepository;
    private final RoomWebSocketService roomWebSocketService;
    private final PlaybackWebsocketService playbackWebsocketService;
    private final PlaylistWebSocketService playlistWebSocketService;
    private final UserAudioStreamWorkerManager userAudioStreamWorkerManager;
    private final RoomStreamWorkerManager roomStreamWorkerManager;
    
    public void initializeRoom(Long roomId, UserAuthData authData) {

        roomPlaybackContextStore.computeIfAbsent(roomId).getListeners().add(authData.openId());

        roomPlaybackContextStore.listenersUpdated(roomId);
    }

    public void connectUserToRoom(ListeningRoom room, UserAuthData authData) {
        log.debug("Пользователь {} присоединяется к комнате {}", authData.name(), room.getId());
        userRepository.updateListeningRoom(authData.id(), room.getId());

        roomWebSocketService.broadcastRoomInfo(authData.openId(), ShortRoomDTO.ofRoom(room));

        playbackWebsocketService.broadcastPlaybackState(authData.openId(), PlaybackStateDTO.ofState(room.getPlaybackState()));
        playlistWebSocketService.broadcastRoomPlaylist(authData.openId(), PlaylistDTO.ofPlaylist(room.getPlaylist()));

        initializeRoom(room.getId(), authData);

        UserAudioStreamWorker userWorker = userAudioStreamWorkerManager.getWorker(authData.openId());

        // Reloads worker
        roomStreamWorkerManager.getWorker(room.getId()).addUserWorker(userWorker);
    }
}
