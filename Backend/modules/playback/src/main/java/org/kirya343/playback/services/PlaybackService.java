package org.kirya343.playback.services;

import java.util.Set;

import org.kirya343.playback.PlaybackWebsocketService;
import org.kirya343.playback.enums.PlaybackTargetType;
import org.kirya343.playback.datasource.repository.PlaybackStateRepository;
import org.kirya343.playback.enums.PlaybackMode;
import org.kirya343.playback.services.cache.RoomPlaybackContextStore;
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
                
                Set<String> listners = roomPlaybackContextStore.get(targetId).getListeners();

                for (String user : listners) {
                    playbackWebsocketService.sendPlaybackMode(user, mode);
                }

                break;
        
            case USER:

                playbackWebsocketService.sendPlaybackMode(authData.openId(), mode);

                break;
        }
    }
}
