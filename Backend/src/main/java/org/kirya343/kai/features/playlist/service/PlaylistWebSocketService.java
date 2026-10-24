package org.kirya343.kai.features.playlist.service;

import org.kirya343.kai.features.playlist.dto.PlaylistDTO;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j 
@RequiredArgsConstructor
public class PlaylistWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void broadcastPlaylist(String userOpenId, PlaylistDTO playlist) {
        messagingTemplate.convertAndSendToUser(
            userOpenId, 
            "/queue/playlists", 
            playlist
        );
    }

    public void broadcastRoomPlaylist(String userOpenId, PlaylistDTO playlist) {
        messagingTemplate.convertAndSendToUser(
            userOpenId, 
            "/queue/playlist.room", 
            playlist
        );
    }
}