package org.kirya343.playback.domain.dto;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.audio.dto.AudioChunkFeedback;
import org.kirya343.audio.services.util.Fmp4Chunker;
import org.kirya343.playback.domain.enums.ChunkDeliveryStatus;
import org.kirya343.playback.presentation.dto.ChunkDelivery;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;

import lombok.Getter;

@Getter 
public class StreamContext {

    private final UUID streamId;
    private final String userSub;
    private final Fmp4Chunker chunker;

    private double bufferedUntil;
    private double playbackStartedAt = System.currentTimeMillis();

    private PlaybackStateDTO currentState;

    private final ConcurrentHashMap<Long, ChunkDelivery> deliveries =
        new ConcurrentHashMap<>();

    public StreamContext(
        UUID streamId,
        String userSub,
        Fmp4Chunker chunker,
        PlaybackStateDTO state
    ) {
        this.streamId = streamId;
        this.userSub = userSub;
        this.chunker = chunker;
        
        this.currentState = state;
        this.bufferedUntil = state.position();
    }

    public void setBufferedUntil(double value) {
        this.bufferedUntil = value;
    }

    public double getCurrentPosition() {
        if (currentState.pause()) {
            return currentState.position();
        }

        double elapsed = (System.currentTimeMillis() - playbackStartedAt) / 1000.0;

        return currentState.position() + elapsed;
    }

    public void chunkRecived(AudioChunkFeedback chunkFeedback) {

        if (!chunkFeedback.streamId().equals(streamId)) return;
        
        long sequence = chunkFeedback.sequence();

        ChunkDelivery delivery = deliveries.get(sequence);

        if (delivery == null) return;

        deliveries.put(
            sequence, 
            new ChunkDelivery(
                sequence, 
                ChunkDeliveryStatus.RECEIVED, 
                delivery.sentAt()
            ));
    }
}