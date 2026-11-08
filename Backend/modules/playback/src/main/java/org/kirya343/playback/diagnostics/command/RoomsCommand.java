package org.kirya343.playback.diagnostics.command;

import java.util.Set;
import java.util.stream.Collectors;

import org.kirya343.playback.diagnostics.PlaybackDiagnosticService;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;

import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
public class RoomsCommand implements DiagnosticCommand {

    private final PlaybackDiagnosticService diagnosticService;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;

    @Override
    public String getName() {
        return "rooms";
    }

    @Override
    public String getDescription() {
        return "Lists active room streamers";
    }

    @Override
    public StreamingResult execute(String[] args) {
        return new StreamingResult(
            this::getRoomsData, 
            StreamMode.REPLACE
        );
    }

    private String getRoomsData() {

        Set<Long> keys = playbackStreamWorkerManager.keySet(PlaybackTargetType.ROOM);

        if (keys.size() == 0) return "No rooms online";

        return keys.stream()
            .map(key -> renderRoomData(key))
            .collect(Collectors.joining("\n"));
    }

    private String renderRoomData(Long roomId) {
        boolean isOnline = playbackStreamWorkerManager.checkWorker(PlaybackTargetType.ROOM, roomId);

        DiagnosticTextBuilder builder = null;

        if (isOnline) {
            builder = diagnosticService.renderOnlineRoom(PlaybackTargetType.ROOM, roomId);
        } else {
            builder = diagnosticService.renderOfflineRoom(PlaybackTargetType.ROOM, roomId);
        }

        return builder.getContent();
    }
}