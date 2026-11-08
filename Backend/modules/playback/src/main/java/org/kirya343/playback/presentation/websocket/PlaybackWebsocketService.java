package org.kirya343.playback.presentation.websocket;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.kirya343.audio.dto.AudioChunk;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.dto.PlaylistDTO;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j
@RequiredArgsConstructor 
public class PlaybackWebsocketService {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendPlaybackState(String userSub, PlaybackStateDTO state, UUID streamId) {

        if (state == null) return;

        Map<String, Object> headers = new HashMap<>();

        headers.put("stream-id", streamId);

        log.debug("Sending state info to user {}, pos {}, qi {}", userSub, state.position(), state.entryId());

        messagingTemplate.convertAndSendToUser(
            userSub,
            "/queue/playback.state",
            state,
            headers
        );
    }
    
    public void sendChunk(String userSub, AudioChunk chunk, Long entryId, UUID streamId) {
        
        Map<String, Object> headers = new HashMap<>();

        log.debug(
            "Sending {} chunk to {}: chunk={}, audio={}", 
            chunk.initialization() ? "initialization" : "media", 
            userSub, 
            chunk.sequence());

        headers.put("content-type", "audio/mp4");
        headers.put("sequence", chunk.sequence());
        headers.put("duration", chunk.durationMs());
        headers.put("entry-id", entryId);
        headers.put("initialization", chunk.initialization());

        headers.put("stream-id", streamId);

        messagingTemplate.convertAndSendToUser(
            userSub,
            "/queue/audio",
            chunk.data(),
            headers
        );
    }

    public void sendPlaybackMode(String userSub, PlaybackMode mode) {
        messagingTemplate.convertAndSendToUser(
            userSub, 
            "/queue/playback.mode", 
            mode
        );
    }

    public void sendPlaybackPlaylist(String userSub, Playlist playlist) {

        if (playlist == null) return;

        messagingTemplate.convertAndSendToUser(
            userSub,
            "/queue/playback.playlist",
            PlaylistDTO.ofPlaylist(playlist)
        );
    }
}
