package org.kirya343.playback.presentation.websocket;

import org.kirya343.playback.application.service.PlaybackSessionService;
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
    
    @MessageMapping("/playback.reconnect")
    @Authenticated
    public void reconnect(
        @AuthUser UserAuthData authData
    ) {
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
}
