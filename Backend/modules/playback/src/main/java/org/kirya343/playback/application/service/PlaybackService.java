package org.kirya343.playback.application.service;

import java.util.Set;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.kirya343.playback.infrastructure.cache.RoomPlaybackContextStore;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class PlaybackService {

    private final PlaybackStateRepository playbackStateRepository;
    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final PlaybackWebsocketService playbackWebsocketService;
    
    public void updatePlaybackMode(Long targetId, PlaybackTargetType targetType, PlaybackMode mode, UserAuthData authData) {
        playbackStateRepository.updatePlaybackMode(targetId, targetType, mode);

        switch (targetType) {
            case ROOM:
                
                Set<String> listners = roomPlaybackContextStore.get(targetId).getPresence().getSubs();

                for (String user : listners) {
                    playbackWebsocketService.sendPlaybackMode(user, mode);
                }

                break;
        
            case USER:

                playbackWebsocketService.sendPlaybackMode(authData.sub(), mode);

                break;
        }
    }
}
