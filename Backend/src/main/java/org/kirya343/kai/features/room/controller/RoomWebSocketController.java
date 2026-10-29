package org.kirya343.kai.features.room.controller;

import org.kirya343.kai.features.room.datasource.ListeningRoom;
import org.kirya343.kai.features.room.datasource.ListeningRoomRepository;
import org.kirya343.kai.features.room.services.RoomCommandService;
import org.kirya343.kai.infrastructure.security.annotations.controllers.Authenticated;
import org.kirya343.kai.infrastructure.security.annotations.parameters.AuthUser;
import org.kirya343.kai.infrastructure.security.dto.UserAuthData;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller 
@Slf4j 
@RequiredArgsConstructor 
public class RoomWebSocketController {

    private final ListeningRoomRepository listeningRoomRepository;
    private final RoomCommandService roomCommandService;
    
    @MessageMapping("/room/reconnect")
    @Authenticated
    public void setUserRoom(
        @AuthUser UserAuthData authData
    ) {
        ListeningRoom room = listeningRoomRepository.findRoomByUserId(authData.id()).orElse(null);

        roomCommandService.connectUserToRoom(room, authData);
    }
}
