package org.kirya343.room.controller;

import org.kirya343.common.event.room.RoomConnectedEvent;
import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.security.core.annotations.controllers.Authenticated;
import org.kirya343.security.core.annotations.parameters.AuthUser;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller 
@Slf4j 
@RequiredArgsConstructor 
public class RoomWebSocketController {

    private final ListeningRoomRepository listeningRoomRepository;
    private final ApplicationEventPublisher eventPublisher;
    
    @MessageMapping("/room/reconnect")
    @Authenticated
    public void setUserRoom(
        @AuthUser UserAuthData authData
    ) {
        ListeningRoom room = listeningRoomRepository.findRoomByUserId(authData.id()).orElse(null);

        eventPublisher.publishEvent(new RoomConnectedEvent(authData.sub(), room.getId()));
    }
}
