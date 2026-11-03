package org.kirya343.playback.application.handler;

import org.kirya343.common.event.playback.RoomContextChangedEvent;
import org.kirya343.playback.domain.model.RoomPlaybackContext;
import org.kirya343.playback.infrastructure.cache.RoomPlaybackContextStore;
import org.kirya343.room.services.RoomWebSocketService;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class RoomContextEventHandler {

    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final RoomWebSocketService roomWebSocketService;
    
    @EventListener
    public void handleContextChanged(RoomContextChangedEvent event) {      

        RoomPlaybackContext roomContext = roomPlaybackContextStore.get(event.roomId());

        for (String user : roomContext.getListeners()) {
            roomWebSocketService.broadcastRoomInfo(user, roomContext.getRoom());
        }
    }
}
