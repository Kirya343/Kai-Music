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

    private final UUID streamId = UUID.randomUUID();
    private final String userSub;

    private volatile double bufferedUntil;

    private final PlaybackContext playbackContext;

    private final ConcurrentHashMap<Long, ChunkDelivery> deliveries =
        new ConcurrentHashMap<>();

    public StreamContext(
        PlaybackContext playbackContext,
        String userSub
    ) {
        this.playbackContext = playbackContext;
        this.userSub = userSub;
        
        this.bufferedUntil = playbackContext.getState().position();
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
}