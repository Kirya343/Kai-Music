package org.kirya343.playback.presentation.websocket;

import org.kirya343.audio.dto.AudioChunkFeedback;
import org.kirya343.playback.application.service.PlaybackSessionService;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorkerManager;
import org.kirya343.playback.presentation.dto.SubscribePlaybackRequest;
import org.kirya343.security.core.annotations.controllers.Authenticated;
import org.kirya343.security.core.annotations.parameters.AuthUser;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller 
@Slf4j 
@RequiredArgsConstructor 
public class PlaybackWebSocketController {

    private final PlaybackSessionService playbackSessionService;
    private final UserStreamWorkerManager audioStreamWorkerManager;
    
    @MessageMapping("/playback.reconnect")
    @Authenticated
    public void reconnect(
        @AuthUser UserAuthData authData
    ) {
        log.debug("Перезапуск сессии пользователя {}", authData.name());

        playbackSessionService.restoreSession(authData);
    }

    @MessageMapping("/playback.subscribe")
    @Authenticated
    public void subscribe(
        SubscribePlaybackRequest request,
        @AuthUser UserAuthData authData
    ) {
        playbackSessionService.subscribe(authData, request.type(), request.id());
    }

    @MessageMapping("/audio.feedback")
    @Authenticated
    public void feedback(
        AudioChunkFeedback chunk,
        @AuthUser UserAuthData authData
    ) {
        log.debug("Получили чанк фидбэка {}", chunk.toString());
        audioStreamWorkerManager.get(authData.sub()).chunkRecived(chunk);
    }
}
