package org.kirya343.playback.diagnostics.command;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.playback.diagnostics.PlaybackDiagnosticService;
import org.kirya343.playback.domain.model.RoomPlaybackContext;
import org.kirya343.playback.infrastructure.cache.RoomPlaybackContextStore;
import org.kirya343.playback.infrastructure.streaming.RoomStreamWorkerManager;

import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
public class RoomCommand implements DiagnosticCommand {

    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final RoomStreamWorkerManager roomStreamWorkerManager;
    private final PlaybackDiagnosticService diagnosticService;

    @Override
    public String getName() {
        return "room";
    }

    @Override
    public String getDescription() {
        return "Inspects a room streamer by room ID";
    }

    @Override
    public StreamingResult execute(String[] args) {

        if (args.length != 1) {
            throw new IllegalArgumentException(
                "Usage: room <roomId>"
            );
        }

        long roomId;

        try {
            roomId = Long.parseLong(args[0]);
        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException(
                "Room ID must be a number: " + args[0]
            );
        }

        return new StreamingResult(
            () -> getRoomStreamerData(roomId), 
            StreamMode.REPLACE
        );
    }

    private String getRoomStreamerData(Long roomId) {
        boolean isOnline = roomStreamWorkerManager.checkWorker(roomId);

        DiagnosticTextBuilder builder = null;

        if (isOnline) {

            RoomPlaybackContext context = roomPlaybackContextStore.get(roomId);

            AudioFile audio = context.getCurrentAudio();

            builder = diagnosticService.renderOnlineRoom(roomId);

            builder.addSection(diagnosticService.renderAudioData(audio));
            builder.addSection(diagnosticService.renderStreamWorker(roomId));
        } else {
            builder = diagnosticService.renderOfflineRoom(roomId);
        }

        return builder.getContent();
    }
}