package org.kirya343.infrastructure.diagnostics.commands;


import java.lang.management.ManagementFactory;

import org.kirya343.features.playback.services.streaming.RoomStreamWorkerManager;
import org.kirya343.features.playback.services.streaming.UserAudioStreamWorkerManager;
import org.kirya343.features.presence.services.PresenceService;
import org.kirya343.terminal.commands.DiagnosticCommand;
import org.kirya343.terminal.core.DiagnosticTextBuilder;
import org.kirya343.terminal.models.StreamMode;
import org.kirya343.terminal.models.StreamingResult;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
public class StatsCommand implements DiagnosticCommand {

    private final PresenceService presenceService;
    private final RoomStreamWorkerManager roomsWorkers;
    private final UserAudioStreamWorkerManager userWorkers;

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

                builder.addRow("Online users: " + presenceService.countAll());

                builder.addRow("Uptime: " + getUptime());

                DiagnosticTextBuilder streaming = new DiagnosticTextBuilder("Streaming");

                streaming.addRow("Online room workers: " + roomsWorkers.countAll());
                streaming.addRow("Online user workers: " + userWorkers.countAll());

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
