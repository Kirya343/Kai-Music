package org.kirya343.playback.domain.dto;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.audio.dto.AudioChunkFeedback;
import org.kirya343.playback.domain.enums.ChunkDeliveryStatus;
import org.kirya343.playback.presentation.dto.ChunkDelivery;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter 
@Slf4j 
public class StreamContext {

    private final UUID streamId;
    private final String userSub;

    private volatile double bufferedUntil;

    private final PlaybackContext playbackContext;

    private final ConcurrentHashMap<Long, ChunkDelivery> deliveries =
        new ConcurrentHashMap<>();

    private long nextSequence;
    private boolean isClosed = false;

    private static final int MAX_IN_FLIGHT_CHUNKS = 2;

    public StreamContext(
        PlaybackContext playbackContext,
        String userSub
    ) {
        this.playbackContext = playbackContext;
        this.userSub = userSub;

        Double position = playbackContext.getState().position();
        
        this.bufferedUntil = position;

        this.nextSequence = playbackContext
            .getChunker()
            .getSequenceByPosition(position);

        seek(position);

        streamId = UUID.randomUUID();

        log.debug("Creating new StreamContext: {}, bufferedUntil", streamId, bufferedUntil);
    }

    public void setBufferedUntil(double value) {
        this.bufferedUntil = value;
    }

    public void chunkRecived(AudioChunkFeedback chunkFeedback) {

        if (!streamId.equals(chunkFeedback.streamId())) {
            return;
        }

        log.debug("Получили чанк фидбэка: {}", chunkFeedback.sequence());
        
        long sequence = chunkFeedback.sequence();

        deliveries.computeIfPresent(
            sequence, 
            (key, delivery) -> new ChunkDelivery(
                sequence, 
                ChunkDeliveryStatus.RECEIVED, 
                delivery.sentAt()
            ));
    }

    public void seek(double position) {
        nextSequence = playbackContext
            .getChunker()
            .getSequenceByPosition(position);

        bufferedUntil = position;
        deliveries.clear();
    }

    public long getNextSequence() {
        return nextSequence;
    }

    public void advanceSequence() {
        nextSequence++;
    }

    public long getInFlightCount() {
        return deliveries.values().stream()
            .filter(d -> d.status() == ChunkDeliveryStatus.SENT)
            .count();
    }

    public boolean canSendChunk() {
        return getInFlightCount() < MAX_IN_FLIGHT_CHUNKS;
    }

    public void close() {
        isClosed = true;
    }
}