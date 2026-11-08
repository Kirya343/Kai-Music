package org.kirya343.playlist.service;

import org.kirya343.playlist.dto.PlaylistDTO;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j 
@RequiredArgsConstructor
public class PlaylistWebSocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void broadcastPlaylist(String userSub, PlaylistDTO playlist) {
        messagingTemplate.convertAndSendToUser(
            userSub, 
            "/queue/playlists", 
            playlist
        );
    }
}