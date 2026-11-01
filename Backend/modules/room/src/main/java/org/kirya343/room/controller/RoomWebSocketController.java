package org.kirya343.room.controller;

import org.kirya343.room.datasource.ListeningRoom;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.room.services.RoomCommandService;
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
public class RoomWebSocketController {

    private final ListeningRoomRepository listeningRoomRepository;
    private final RoomCommandService roomCommandService;
    
    // TODO Разрываем цикл room <-> playback
    @MessageMapping("/room/reconnect")
    @Authenticated
    public void setUserRoom(
        @AuthUser UserAuthData authData
    ) {
        ListeningRoom room = listeningRoomRepository.findRoomByUserId(authData.id()).orElse(null);

        // roomCommandService.connectUserToRoom(room, authData);
    }
}
