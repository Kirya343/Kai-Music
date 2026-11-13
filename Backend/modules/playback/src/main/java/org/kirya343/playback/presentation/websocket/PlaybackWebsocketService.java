package org.kirya343.playback.presentation.websocket;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.kirya343.audio.dto.AudioChunk;
import org.kirya343.playback.presentation.dto.PlaybackData;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.dto.PlaylistDTO;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.room.dto.RoomDTO;
import org.kirya343.user.dto.ShortUserDTO;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j
@RequiredArgsConstructor 
public class PlaybackWebsocketService {

    private final SimpMessagingTemplate messagingTemplate;
    private final ListeningRoomRepository listeningRoomRepository;

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
            chunk.sequence(),
            entryId
        );

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

    public void sendPlaybackData(String userSub, PlaybackTargetType type, Long id, List<ShortUserDTO> listeners) {

        PlaybackData playbackData;

        if (type.equals(PlaybackTargetType.ROOM)) {
            playbackData = new PlaybackData(
                RoomDTO.ofRoom(listeningRoomRepository.findById(id).orElse(null)), 
                listeners
            );
        } else if (type.equals(PlaybackTargetType.USER)) {
            playbackData = new PlaybackData(
                null,
                null
            );
        } else {
            playbackData = new PlaybackData(
                null,
                listeners
            );
        }

        messagingTemplate.convertAndSendToUser(
            userSub,
            "/queue/playback.data",
            playbackData
        );
    }
}
