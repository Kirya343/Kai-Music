package org.kirya343.playback.infrastructure.streaming.user.worker;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.ReentrantLock;

import org.kirya343.audio.dto.AudioChunkFeedback;
import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.domain.dto.PlaybackTarget;
import org.kirya343.playback.domain.dto.StreamContext;
import org.kirya343.playback.domain.enums.ChunkDeliveryStatus;
import org.kirya343.playback.domain.enums.PlaybackEventType;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.kirya343.playback.infrastructure.streaming.playback.worker.PlaybackStreamWorker;
import org.kirya343.playback.infrastructure.streaming.user.AudioStreamService;
import org.kirya343.playback.presentation.dto.ChunkDelivery;
import org.kirya343.playback.presentation.dto.PlaybackEvent;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.user.dto.ShortUserDTO;

import io.github.kirya343.terminal.api.components.DiagnosticLoggable;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class UserStreamWorker
    extends DiagnosticLoggable {

    @Getter 
    private PlaybackStreamWorker subscribedWorker;

    @Getter 
    private final String userSub;

    private ScheduledFuture<?> task;

    private final PlaybackWebsocketService playbackWebsocketService;
    private final AudioStreamService audioStreamService;
    private final ReentrantLock streamLock = new ReentrantLock();

    private volatile StreamContext currentStream;

    public UserStreamWorker(
        String userSub,
        PlaybackWebsocketService playbackWebsocketService,
        AudioStreamService audioStreamService
    ) {
        this.userSub = userSub;
        this.playbackWebsocketService = playbackWebsocketService;
        this.audioStreamService = audioStreamService;

        log.debug("Created UserAudioStreamWorker for {}", userSub);
    }

    public void subscribe(PlaybackStreamWorker worker, ShortUserDTO userDTO) {
        if (subscribedWorker == worker) return;
        
        unsubscribe();

        subscribedWorker = worker;
        worker.subscribe(this, userDTO);
    }

    public void unsubscribe() {
        if (subscribedWorker != null) {
            log.debug(
                "Unubscribing user {} from {}", 
                userSub, 
                subscribedWorker.getTarget()
            );

            subscribedWorker.unsubscribe(userSub);
        }
    }

    public void finishStream() {
        playbackWebsocketService.sendPlaybackEvent(
            userSub, 
            new PlaybackEvent(PlaybackEventType.UNSUBSCRIBED)
        );
    }

    public void applyState(PlaybackContext context) {
        if (context == null) {
            throw new IllegalStateException("PlaybackContext is null");
        }

        replaceStream(context);

        audioStreamService.initializeUser(currentStream);

        tick(currentStream);
    }

    private void replaceStream(PlaybackContext context) {
        streamLock.lock();

        try {
            StreamContext previous = currentStream;

            currentStream = createStreamContext(context);

            if (previous != null) {
                previous.close();
            }
        } finally {
            streamLock.unlock();
        }
    }

    public void tick() {
        StreamContext context = currentStream;

        if (context == null) {
            throw new IllegalStateException("StreamContext of " + userSub + " is null");
        }

        streamLock.lock();

        try {
            tick(context);
        } finally {
            streamLock.unlock();
        }
    }

    private void tick(StreamContext context) {
        log.trace("Tick to user {}, stream: {}", userSub, context.getStreamId());
        
        audioStreamService.fillBuffer(context);
    }

    public void chunkRecived(AudioChunkFeedback chunkFeedback) {

        StreamContext context = currentStream;

        if (context == null) return;

        context.chunkRecived(chunkFeedback);
    }

    public void cancelTask() {
        if (task != null && !task.isCancelled()) {
            task.cancel(false);
            task = null;
        }
    }

    public void sendPlaybackMode(PlaybackMode mode) {
        playbackWebsocketService.sendPlaybackMode(userSub, mode);
    }

    public void sendPlaylist(Playlist playlist) {
        playbackWebsocketService.sendPlaybackPlaylist(userSub, playlist);
    }

    public void sendPlaybackData(PlaybackTarget target, List<ShortUserDTO> listeners) {
        playbackWebsocketService.sendPlaybackData(userSub, target, listeners);
    }

    public StreamContext createStreamContext(PlaybackContext playbackContext) {
        return new StreamContext(playbackContext, userSub);
    }

    // Diadnostic voids

    public DiagnosticTextBuilder getInfo() {
        
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Stream worker of " + userSub);

        StreamContext context = currentStream;

        if (context == null || context.getPlaybackContext() == null) return builder;

        int chunksCount = context.getPlaybackContext()
            .getChunker()
            .getChunkCount();

        Map<Long, ChunkDelivery> deliveries = context.getDeliveries();

        StringBuilder chunks = new StringBuilder();

        for (long i = 0; i < chunksCount; i++) {
            ChunkDelivery chunk = deliveries.get(i);

            if (chunk == null) {
                chunks.append("░");
                continue;
            }

            ChunkDeliveryStatus status = chunk.status();

            if (status == ChunkDeliveryStatus.SENT) {
                chunks.append("▒");
            } else if (status == ChunkDeliveryStatus.RECEIVED) {
                chunks.append("█");
            } else {
                chunks.append("░");
            }
        }

        builder.addRow("Chunks:   [" + chunks + "]");

        PlaybackStateDTO state = context.getPlaybackContext().getCurrentState();

        if (chunksCount > 0) {

            int offset = (int) Math.ceil(state.position() / 5.0);
            offset = Math.clamp(offset, 0, chunksCount - 1);

            String position = " ".repeat(offset)
                + "↑"
                + " ".repeat(chunksCount - offset - 1);

            builder.addRow("Position: [" + position + "]");
        }

        DiagnosticTextBuilder stateSection = new DiagnosticTextBuilder("Playback state: ")
            .addRow("position: " + state.position())
            .addRow("entryId: " + state.entryId())
            .addRow("pause: " + state.pause())
            .addRow("user: " + state.user())
            .addRow("buffered until: " + context.getBufferedUntil());

        builder.addSection(stateSection);

        return builder;
    }
}