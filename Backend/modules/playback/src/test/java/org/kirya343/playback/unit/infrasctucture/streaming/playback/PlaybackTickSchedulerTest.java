package org.kirya343.playback.unit.infrasctucture.streaming.playback;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.kirya343.playback.infrastructure.streaming.playback.PlaybackTickScheduler;

class PlaybackTickSchedulerTest {

    private PlaybackTickScheduler scheduler;

    @BeforeEach
    void setUp() {
        scheduler = new PlaybackTickScheduler("test");
    }

    @AfterEach
    void tearDown() {
        scheduler.shutdown();
    }

    @Test
    void shouldExecuteTask() throws InterruptedException {
        CountDownLatch latch = new CountDownLatch(1);

        scheduler.execute(latch::countDown);

        assertTrue(latch.await(2, TimeUnit.SECONDS));
    }

    @Test
    void shouldExecutePeriodicTask() throws InterruptedException {
        AtomicInteger counter = new AtomicInteger();
        CountDownLatch latch = new CountDownLatch(2);

        scheduler.start(() -> {
            counter.incrementAndGet();
            latch.countDown();
        });

        assertTrue(latch.await(5, TimeUnit.SECONDS));
        assertTrue(counter.get() >= 2);
    }

    @Test
    void shouldStopPeriodicTask() throws InterruptedException {
        AtomicInteger counter = new AtomicInteger();

        scheduler.start(counter::incrementAndGet);

        Thread.sleep(200);

        scheduler.stop();

        int countAfterStop = counter.get();

        Thread.sleep(2500);

        assertEquals(countAfterStop, counter.get());
    }
}