package org.kirya343.room.services;

import org.kirya343.room.dto.ShortRoomDTO;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j 
@RequiredArgsConstructor
public class RoomWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void broadcastRoomInfo(String userSub, ShortRoomDTO dto) {
        
        if (dto == null) return;

        log.debug("Sending room({}) info to user {}", dto.id(), userSub);

        messagingTemplate.convertAndSendToUser(
            userSub,
            "/queue/room",
            dto
        );
    }
}