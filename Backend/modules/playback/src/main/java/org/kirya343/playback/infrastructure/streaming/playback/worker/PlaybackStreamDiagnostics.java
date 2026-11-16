package org.kirya343.playback.infrastructure.streaming.playback.worker;

import java.util.List;

import org.kirya343.playback.domain.dto.PlaybackTarget;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.api.component.DiagnosticComponent;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class PlaybackStreamDiagnostics implements DiagnosticComponent {

    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    
    public String getComponentId() {
        return "playbacks";
    }

    public List<DiagnosticCommand> getCommands() {

        DiagnosticCommand logsCommand = new DiagnosticCommand() {

            public String getName() {
                return "logs";
            }

            public String getDescription() {
                return "Shows stream worker logs";
            }
            
            public StreamingResult execute(String[] args) {

                PlaybackTarget target = getTargetFromArgs(args);

                return new StreamingResult(
                    () -> playbackStreamWorkerManager.get(target).getFormattedLogs().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        DiagnosticCommand infoCommand = new DiagnosticCommand() {

            public String getName() {
                return "info";
            }

            public String getDescription() {
                return "Shows playback worker info";
            }
            
            public StreamingResult execute(String[] args) {

                PlaybackTarget target = getTargetFromArgs(args);

                return new StreamingResult(
                    () -> playbackStreamWorkerManager.get(target).getInfo().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        DiagnosticCommand indexCommand = new DiagnosticCommand() {

            public String getName() {
                return "index";
            }

            public String getDescription() {
                return "Shows all playback workers";
            }
            
            public StreamingResult execute(String[] args) {

                String param = "";

                if (args.length == 1) {
                    param = args[0];
                }

                String resolved = param;

                return new StreamingResult(
                    () -> {
                        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Playbacks: ");

                        playbackStreamWorkerManager.getAll().forEach(playback -> {
                            builder.addSection(playback.getInfo(resolved));
                        });

                        return builder.getContent();
                    },
                    StreamMode.REPLACE
                );
            }
        };

        return List.of(logsCommand, infoCommand, indexCommand);
    }

    private PlaybackTarget getTargetFromArgs(String[] args) {
        if (args.length != 2) {
            throw new IllegalArgumentException(
                "Usage: stream-workers logs <type> <id>"
            );
        }

        try {
            PlaybackTargetType type = PlaybackTargetType.valueOf(args[0]);
            Long id = Long.parseLong(args[1]);

            return new PlaybackTarget(type, id);
        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException(
                "Target ID must be a number: " + args[0]
            );
        }
    }
}
