package org.kirya343.kai.features.playback.services;

import org.kirya343.kai.features.authentication.dto.UserAuthData;
import org.kirya343.kai.features.playback.services.cache.RoomPlaybackContextStore;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor
public class RoomSessionService {

    private final RoomPlaybackContextStore roomPlaybackContextStore;
    
    public void initializeRoom(Long roomId, UserAuthData authData) {

        roomPlaybackContextStore.computeIfAbsent(roomId).getListeners().add(authData.openId());

        roomPlaybackContextStore.listenersUpdated(roomId);
    }
}
