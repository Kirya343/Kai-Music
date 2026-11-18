package org.kirya343.playback.infrastructure.streaming.playback.worker;

import org.kirya343.playback.domain.dto.PlaybackTarget;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.annotations.Command;
import io.github.kirya343.terminal.api.annotations.CommandGroup;
import io.github.kirya343.terminal.api.annotations.CommandParam;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import io.github.kirya343.terminal.result.CommandResult;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
@CommandGroup("playbacks")
public class PlaybackStreamDiagnostics {

    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;

    @Command(value = "logs", description = "Shows stream worker logs")
    public CommandResult getLogs(
        @CommandParam("type") String type,
        @CommandParam("id") String id
    ) {

        PlaybackTarget target = getTargetFromArgs(type, id);

        return new StreamingResult(
            () -> playbackStreamWorkerManager.get(target).getFormattedLogs().getContent(),
            StreamMode.REPLACE
        );
    }

    @Command(value = "info", description = "Shows playback worker info")
    public StreamingResult getInfo(
        @CommandParam("type") String type,
        @CommandParam("id") String id
    ) {

        PlaybackTarget target = getTargetFromArgs(type, id);

        return new StreamingResult(
            () -> playbackStreamWorkerManager.get(target).getInfo().getContent(),
            StreamMode.REPLACE
        );
    }
    
    @Command(description = "Shows all playback workers")
    public StreamingResult showAll(@CommandParam(optional = true, value = "with-streamers") boolean withStreamers) {
        
        return new StreamingResult(
            () -> {
                DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Playbacks: ");

                playbackStreamWorkerManager.getAll().forEach(playback -> {
                    builder.addSection(playback.getInfo(withStreamers));
                });

                return builder.getContent();
            },
            StreamMode.REPLACE
        );
    }

    private PlaybackTarget getTargetFromArgs(String type, String id) {

        try {
            PlaybackTargetType targetType = PlaybackTargetType.valueOf(type);
            Long targetId = Long.parseLong(id);

            return new PlaybackTarget(targetType, targetId);
        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException(
                "Target ID must be a number: " + id
            );
        }
    }
}
