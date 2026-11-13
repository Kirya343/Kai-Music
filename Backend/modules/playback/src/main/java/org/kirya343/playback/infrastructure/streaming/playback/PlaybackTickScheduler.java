package org.kirya343.playback.infrastructure.streaming.playback;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class PlaybackTickScheduler {

    private static final long TICK_INTERVAL_SECONDS = 2;

    private final ScheduledExecutorService scheduler;
    private ScheduledFuture<?> task;

    public PlaybackTickScheduler(String threadName) {
        this.scheduler = Executors.newSingleThreadScheduledExecutor(r -> {
            Thread thread = new Thread(r, threadName);
            thread.setDaemon(true);
            return thread;
        });
    }
    
    public void start(Runnable action) {
        stop();

        task = scheduler.scheduleAtFixedRate(
            action,
            0,
            TICK_INTERVAL_SECONDS,
            TimeUnit.SECONDS
        );
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
        scheduler.execute(() -> {
            try {
                action.run();
            } catch (Exception e) {
                log.error("Playback worker error", e);
            }
        });
    }
}
