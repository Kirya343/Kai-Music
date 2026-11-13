package org.kirya343.playback.infrastructure.streaming.playback;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.RejectedExecutionException;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.api.component.DiagnosticComponent;
import io.github.kirya343.terminal.api.provider.StreamingDataProvider;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class PlaybackTickScheduler
    implements DiagnosticComponent {

    private static final long TICK_INTERVAL_SECONDS = 2;

    private final ScheduledThreadPoolExecutor scheduler;
    private ScheduledFuture<?> task;

    private final String name;

    public PlaybackTickScheduler(String name) {
        this.name = name;

        this.scheduler = new ScheduledThreadPoolExecutor(1, r -> {
            Thread thread = new Thread(r, "playback-" + name);
            thread.setDaemon(true);
            return thread;
        });

        scheduler.setRemoveOnCancelPolicy(true);
    }
    
    public void start(Runnable action) {
        stop();

        try {
            task = scheduler.scheduleAtFixedRate(
                () -> executeSafely(action),
                0,
                TICK_INTERVAL_SECONDS,
                TimeUnit.SECONDS
            );
        } catch (RejectedExecutionException e) {
            log.debug("Scheduler {} is shutting down, cannot start task", name);
        }
    }

    public void stop() {
        if (task != null) {
            task.cancel(false);
            task = null;
        }
    }

    public void shutdown() {
        stop();
        scheduler.shutdown();

        try {
            if (!scheduler.awaitTermination(5, TimeUnit.SECONDS)) {
                scheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
            Thread.currentThread().interrupt();
        }
    }

    public void execute(Runnable action) {
        try {
            scheduler.execute(() -> executeSafely(action));
        } catch (RejectedExecutionException e) {
            log.debug("Scheduler {} is shutting down, cannot execute task", name);
        }
    }

    private void executeSafely(Runnable action) {
        try {
            action.run();
        } catch (Exception e) {
            log.error("Playback worker error: {}", name, e);
        }
    }

    // Diadnostic commands

    public String getComponentId() {
        return "tick-executor " + name;
    }

    public List<DiagnosticCommand> getCommands() {
        
        return List.of(new DiagnosticCommand() {
            public String getName() {
                return "queue";
            }

            public String getDescription() {
                return "Shows sheduler queue";
            }

            public StreamingResult execute(String[] args) {
                return new StreamingResult(getData(), StreamMode.REPLACE);
            }

            private StreamingDataProvider getData() {
                return () -> {
                    DiagnosticTextBuilder builder = new DiagnosticTextBuilder("TickExecuror queue");
                    
                    BlockingQueue<Runnable> queue = scheduler.getQueue();

                    log.debug("Queue size: {}", queue.size());

                    for (Runnable task : queue) {
                        builder.addRow("Scheduled task: " + task);
                    }

                    return builder.toString();
                };
            }
        });
    }
}
