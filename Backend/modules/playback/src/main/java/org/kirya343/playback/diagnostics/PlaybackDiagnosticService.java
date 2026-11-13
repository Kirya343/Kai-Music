package org.kirya343.playback.diagnostics;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.streaming.playback.PlaybackStreamWorkerManager;
import org.springframework.stereotype.Service;

import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class PlaybackDiagnosticService {

    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    
    public DiagnosticTextBuilder renderOfflineRoom(PlaybackTargetType type, Long id) {
        return new DiagnosticTextBuilder()
            .setTitle(type + "-streamer: " + id)
            .addRow("Status: OFFLINE");
    }

    public DiagnosticTextBuilder renderOnlineRoom(PlaybackTargetType type, Long id) {

        //PlaybackStreamWorker playbackWorker = playbackStreamWorkerManager.get(type, id);

        //AudioFile audio = playbackWorker.getCurrentPlayback().getAudio();

        return new DiagnosticTextBuilder()
            .setTitle(type + "-streamer: " + id)
            .addRow("Status: ONLINE");
            // .addRow("Listeners: " + playbackWorker.getPresence()
            //         .getOnlineUsers()
            //         .stream()
            //         .map(ShortUserDTO::name)
            //         .toList()
            // )
            //.addRow( "Playing Audio: " + (audio != null ? audio.getName() : null));
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

    public DiagnosticTextBuilder renderStreamWorker(PlaybackTargetType type, Long id) {

        DiagnosticTextBuilder builder = playbackStreamWorkerManager.get(type, id)
            .getInfo();

        builder.setTitle("Stream worker:");

        return builder;
    }
}
