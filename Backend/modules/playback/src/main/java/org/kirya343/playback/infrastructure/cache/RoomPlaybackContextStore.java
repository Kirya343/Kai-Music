package org.kirya343.playback.infrastructure.cache;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.audio.datasource.AudioFileRepository;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackRepository;
import org.kirya343.playback.domain.model.RoomPlaybackContext;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.room.datasource.ListeningRoomRepository;
import org.kirya343.room.dto.ShortRoomDTO;
import org.kirya343.room.services.RoomWebSocketService;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
public class RoomPlaybackContextStore {

    private final RoomWebSocketService roomWebSocketService;
    private final Map<Long, RoomPlaybackContext> rooms = new ConcurrentHashMap<>();
    private final ListeningRoomRepository listeningRoomRepository;
    private final PlaybackRepository playbackRepository;
    private final AudioFileRepository audioFileRepository;

    public RoomPlaybackContext get(Long roomId) {
        return rooms.get(roomId);
    }

    public Map<Long, RoomPlaybackContext> getAll() {
        return rooms;
    }

    public RoomPlaybackContext computeIfAbsent(Long roomId) {

        return rooms.computeIfAbsent(
            roomId,
            this::createRoomPlaybackState
        );
    }

    public Set<Long> roomIds() {
        return rooms.keySet();
    }

    private RoomPlaybackContext createRoomPlaybackState(Long roomId) {

        ShortRoomDTO room = listeningRoomRepository.findShortRoomById(roomId).orElseThrow();

        AudioFile audioFile = playbackRepository.findCurrentAudio(roomId, PlaybackTargetType.ROOM).orElse(null);

        return new RoomPlaybackContext(
            room.id(),
            audioFile,
            room
        );
    }

    public void updateRoomAudio(Long roomId, PlaybackStateDTO state) {

        AudioFile audioFile = audioFileRepository
            .findAudioByQueueItem(state.entryId())
            .orElse(null);

        if (audioFile != null) {
            this.computeIfAbsent(roomId).setCurrentAudio(audioFile);
        }   
    }

    public void listenersUpdated(Long roomId) {

        RoomPlaybackContext roomContext = rooms.get(roomId);

        for (String user : roomContext.getListeners()) {
            roomWebSocketService.broadcastRoomInfo(user, roomContext.getRoom());
        }
    }
}
