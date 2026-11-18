package org.kirya343.playback.infrastructure.streaming.user.worker;

import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.annotations.Command;
import io.github.kirya343.terminal.api.annotations.CommandGroup;
import io.github.kirya343.terminal.api.annotations.CommandPathParam;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import io.github.kirya343.terminal.result.CommandResult;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import io.github.kirya343.terminal.result.TextResult;
import lombok.RequiredArgsConstructor;

@Component 
@RequiredArgsConstructor 
@CommandGroup("streamers")
public class UserStreamWorkerCommands {

    private final UserStreamWorkerManager userStreamWorkerManager;

    @Command(description = "Shows all streamers")
    public StreamingResult showAll() {

        return new StreamingResult(
            () -> {
                DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Streamers: ");

                userStreamWorkerManager.workers().values().forEach(playback -> {
                    builder.addSection(playback.getInfo());
                });

                return builder.getContent();
            },
            StreamMode.REPLACE
        );
    }
    
    @CommandGroup("{userSub}")
    public class UserStreamWorkerCommandsById {

        @Command(value = "logs", description = "Shows streamer logs")
        public CommandResult getLogs(@CommandPathParam("userSub") String userSub) {

            UserStreamWorker worker = userStreamWorkerManager.workers().get(userSub);

            if (worker == null) {
                return new TextResult(String.format("Worker of user %s is offline", userSub));
            }

            return new StreamingResult(
                () -> worker.getFormattedLogs().getContent(),
                StreamMode.REPLACE
            );
        }

        @Command(value = "info", description = "Shows streamer info")
        public CommandResult getInfo(@CommandPathParam("userSub") String userSub) {

            UserStreamWorker worker = userStreamWorkerManager.workers().get(userSub);

            if (worker == null) {
                return new TextResult(String.format("Streamer %s is offline", userSub));
            }

            return new StreamingResult(
                () -> worker.getInfo().getContent(),
                StreamMode.REPLACE
            );
        }
    }
}
