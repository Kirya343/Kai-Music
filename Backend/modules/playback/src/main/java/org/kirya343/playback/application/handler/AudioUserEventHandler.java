package org.kirya343.playback.application.handler;

import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorkerManager;
import org.kirya343.user.dto.event.UserDisconnectedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j 
@RequiredArgsConstructor
public class AudioUserEventHandler {

    private final UserStreamWorkerManager audioStreamWorkerManager;

    @EventListener
    public void handleDisconnected(UserDisconnectedEvent event) {

        log.debug("Unsubscribing event by disconnected user {}", event.authData().name());

        audioStreamWorkerManager.get(event.authData().sub()).unsubscribe();
        audioStreamWorkerManager.unregister(event.authData().sub());
    }
}
