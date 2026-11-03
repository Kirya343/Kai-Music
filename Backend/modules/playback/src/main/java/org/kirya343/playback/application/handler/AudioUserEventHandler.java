package org.kirya343.playback.application.handler;

import org.kirya343.playback.domain.model.RoomPlaybackContext;
import org.kirya343.playback.infrastructure.cache.RoomPlaybackContextStore;
import org.kirya343.playback.infrastructure.streaming.RoomStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.UserAudioStreamWorker;
import org.kirya343.playback.infrastructure.streaming.UserAudioStreamWorkerManager;
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
    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final UserAudioStreamWorkerManager userAudioStreamWorkerManager;
    private final RoomStreamWorkerManager roomStreamWorkerManager;

    @Async
    @EventListener
    public void handleDisconnected(UserDisconnectedEvent event) {
        
        ListeningRoom room = listeningRoomRepository
            .findRoomByUserId(event.authData().id())
            .orElse(null);

        if (room == null) return;

        RoomPlaybackContext context = roomPlaybackContextStore.get(room.getId());

        UserAudioStreamWorker userWorker = userAudioStreamWorkerManager.getWorker(event.authData().openId());

        if (context != null) {
            context.getListeners().remove(event.authData().openId());
            roomPlaybackContextStore.listenersUpdated(room.getId());

            roomStreamWorkerManager.getWorker(room.getId()).removeUserWorker(userWorker);

            if (context.getListeners().size() == 0) {
                roomStreamWorkerManager.removeWorker(room.getId());
            }
        }

        userAudioStreamWorkerManager.removeWorker(event.authData().openId());
    }
}
