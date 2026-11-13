package org.kirya343.playback.application.handler;

import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorkerManager;
import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.user.dto.event.UserDisconnectedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AudioUserEventHandler {

    private final ListeningRoomRepository listeningRoomRepository;
    private final UserStreamWorkerManager audioStreamWorkerManager;

    @Async
    @EventListener
    public void handleDisconnected(UserDisconnectedEvent event) {
        
        ListeningRoom room = listeningRoomRepository
            .findRoomByUserId(event.authData().id())
            .orElse(null);

        if (room == null) return;

        audioStreamWorkerManager.get(event.authData().sub()).unsubscribe();
        audioStreamWorkerManager.unregister(event.authData().sub());
    }
}
