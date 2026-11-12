package org.kirya343.diagnostics.commands;


import java.lang.management.ManagementFactory;

import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.UserStreamWorkerManager;
import org.kirya343.presence.global.services.PresenceService;
import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.api.command.TerminalCommand;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
@TerminalCommand 
public class StatsCommand implements DiagnosticCommand {

    private final PresenceService presenceService;
    private final PlaybackStreamWorkerManager playbackworkers;
    private final UserStreamWorkerManager audioWorkers;

    public String getName() {
        return "stats";
    }
    
    public String getDescription() {
        return "Shows application live stats";
    }

    public StreamingResult execute(String[] args) {

        return new StreamingResult(
            () -> {
                DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Application is running");

                builder.addRow("");

                builder.addRow(String.format("Memory usage: %.2f MB%n", getUsedMemory()));

                builder.addRow("Online users: " + presenceService.countOnline());

                builder.addRow("Uptime: " + getUptime());

                DiagnosticTextBuilder streaming = new DiagnosticTextBuilder("Streaming");

                streaming.addRow("Online playback workers: " + playbackworkers.countAll());
                streaming.addRow("Online user workers: " + audioWorkers.countAll());

                builder.addSection(streaming);

                return builder.getContent();
            },
            StreamMode.REPLACE
        );
    }

    private double getUsedMemory() {

        Runtime runtime = Runtime.getRuntime();

        long usedMemory = runtime.totalMemory() - runtime.freeMemory();

        return usedMemory / (1024.0 * 1024.0);
    }

    public String getUptime() {
        long uptime = ManagementFactory
            .getRuntimeMXBean()
            .getUptime();

        long seconds = uptime / 1000;

        long days = seconds / 86400;
        long hours = (seconds % 86400) / 3600;
        long minutes = (seconds % 3600) / 60;
        long remainingSeconds = seconds % 60;

        return String.format(
            "%dd %02dh %02dm %02ds",
            days,
            hours,
            minutes,
            remainingSeconds
        );
    }
}
