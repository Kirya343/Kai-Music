package org.kirya343.playback.diagnostics;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.playback.domain.model.RoomPlaybackContext;
import org.kirya343.playback.infrastructure.cache.RoomPlaybackContextStore;
import org.kirya343.playback.infrastructure.streaming.RoomStreamWorkerManager;
import org.kirya343.user.dto.ShortUserDTO;
import org.springframework.stereotype.Service;

import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class PlaybackDiagnosticService {

    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final RoomStreamWorkerManager roomStreamWorkerManager;
    
    public DiagnosticTextBuilder renderOfflineRoom(Long roomId) {
        return new DiagnosticTextBuilder()
            .setTitle("Room: " + roomId)
            .addRow("Status: OFFLINE");
    }

    public DiagnosticTextBuilder renderOnlineRoom(Long roomId) {

        RoomPlaybackContext context = roomPlaybackContextStore.get(roomId);

        AudioFile audio = context.getCurrentAudio();

        return new DiagnosticTextBuilder()
            .setTitle("Room: " + roomId)
            .addRow("Status: ONLINE")
            .addRow("Listeners: " + context.getPresence()
                    .getOnlineUsers()
                    .stream()
                    .map(ShortUserDTO::name)
                    .toList()
            )
            .addRow( "Playing Audio: " + (audio != null ? audio.getName() : null));
    }

    public DiagnosticTextBuilder renderAudioData(AudioFile audio) {
        return new DiagnosticTextBuilder()
            .setTitle("Playing Audio:")
            .addRow("Id: " + audio.getId())
            .addRow("Name: " + audio.getName())
            .addRow("Title: " + audio.getTitle())
            .addRow("Path: " + audio.getPath())
            .addRow("Duration: " +  audio.getDuration() + "s")
            .addRow("Chunks: " + audio.getChunks());
    }

    public DiagnosticTextBuilder renderStreamWorker(Long roomId) {

        DiagnosticTextBuilder builder = roomStreamWorkerManager.getWorker(roomId)
            .getInfo();

        builder.setTitle("Stream worker:");

        return builder;
    }
}
