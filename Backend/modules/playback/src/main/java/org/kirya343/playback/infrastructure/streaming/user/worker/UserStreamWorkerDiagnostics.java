package org.kirya343.playback.infrastructure.streaming.user.worker;

import java.util.List;

import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.api.component.DiagnosticComponent;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import io.github.kirya343.terminal.result.CommandResult;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import io.github.kirya343.terminal.result.TextResult;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
public class UserStreamWorkerDiagnostics
    implements DiagnosticComponent {

    private final UserStreamWorkerManager userStreamWorkerManager;
    
    public String getComponentId() {
        return "streamers";
    }

    public List<DiagnosticCommand> getCommands() {

        DiagnosticCommand logsCommand = new DiagnosticCommand() {

            public String getName() {
                return "logs";
            }

            public String getDescription() {
                return "Shows streamer logs";
            }
            
            public CommandResult execute(String[] args) {

                String userSub = getSubFromArgs(args);

                UserStreamWorker worker = userStreamWorkerManager.workers().get(userSub);

                if (worker == null) {
                    return new TextResult(String.format("Worker of user %s is offline", userSub));
                }

                return new StreamingResult(
                    () -> worker.getFormattedLogs().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        DiagnosticCommand infoCommand = new DiagnosticCommand() {

            public String getName() {
                return "info";
            }

            public String getDescription() {
                return "Shows streamer info";
            }
            
            public CommandResult execute(String[] args) {

                String userSub = getSubFromArgs(args);

                UserStreamWorker worker = userStreamWorkerManager.workers().get(userSub);

                if (worker == null) {
                    return new TextResult(String.format("Streamer %s is offline", userSub));
                }

                return new StreamingResult(
                    () -> worker.getInfo(false).getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        DiagnosticCommand indexCommand = new DiagnosticCommand() {

            public String getName() {
                return "index";
            }

            public String getDescription() {
                return "Shows all streamers";
            }
            
            public StreamingResult execute(String[] args) {

                return new StreamingResult(
                    () -> {
                        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Streamers: ");

                        userStreamWorkerManager.workers().values().forEach(playback -> {
                            builder.addSection(playback.getInfo(false));
                        });

                        return builder.getContent();
                    },
                    StreamMode.REPLACE
                );
            }
        };

        return List.of(logsCommand, infoCommand, indexCommand);
    }

    private String getSubFromArgs(String[] args) {
        if (args.length != 1) {
            throw new IllegalArgumentException(
                "Usage: streamer <userSub>"
            );
        }

        return args[0];
    }
}
