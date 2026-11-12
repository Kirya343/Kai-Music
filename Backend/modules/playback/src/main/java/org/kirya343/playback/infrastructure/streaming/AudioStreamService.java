package org.kirya343.playback.infrastructure.streaming;

import java.io.IOException;
import java.time.Instant;

import org.kirya343.audio.dto.AudioChunk;
import org.kirya343.playback.domain.dto.StreamContext;
import org.kirya343.playback.domain.enums.ChunkDeliveryStatus;
import org.kirya343.playback.presentation.dto.ChunkDelivery;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component 
@Slf4j 
@RequiredArgsConstructor 
public class AudioStreamService {

    private final PlaybackWebsocketService playbackWebsocketService;

    private static final int BUFFER_SECONDS = 20;

    public void initializeUser(StreamContext context) {

        playbackWebsocketService.sendPlaybackState(
            context.getUserSub(), 
            context.getCurrentState(), 
            context.getStreamId()
        );

        try {
            playbackWebsocketService.sendChunk(
                context.getUserSub(), 
                context.getChunker().initializationChunk(), 
                context.getCurrentState().entryId(),
                context.getStreamId()
            );

        } catch (IOException e) {
            log.debug("Exception while initializing user: {}", e);
        }
    }
    
    public void fillBuffer(StreamContext context) {

        try {

            log.debug("fillBuffer to user {}", context.getUserSub());

            double buffered = context.getBufferedUntil();
            double target = context.getCurrentPosition() + BUFFER_SECONDS;

            while (
                buffered < target &&
                context.getChunker().hasNext()
            ) {
                log.debug("buffered {}, target {}", buffered, target);

                AudioChunk chunk = context.getChunker().nextAudioChunk();

                sendChunk(chunk, context);

                buffered += chunk.durationMs() / 1000.0;
            }

            context.setBufferedUntil(buffered);

            context.getDeliveries().values().stream()
                .filter(delivery ->
                    delivery.status() == ChunkDeliveryStatus.SENT &&
                    delivery.sentAt().isBefore(Instant.now().minusSeconds(2))
                )
                .forEach(cd -> resendChunk(cd, context));

        } catch (IOException e) {

            log.debug("Exception while downloading audio chunk: {}", e);
            throw new RuntimeException(e);
        }
    }

    private void sendChunk(AudioChunk chunk, StreamContext context) {
        context.getDeliveries().put(
            chunk.sequence(), 
            new ChunkDelivery(chunk.sequence(), ChunkDeliveryStatus.SENT, Instant.now())
        );

        playbackWebsocketService.sendChunk(
            context.getUserSub(),
            chunk,
            context.getCurrentState().entryId(),
            context.getStreamId()
        );
    }

    private void resendChunk(ChunkDelivery chunkDelivery, StreamContext context) {

        try {
            AudioChunk chunk = context.getChunker().getAudioChunk(chunkDelivery.sequence());

            sendChunk(chunk, context);
        } catch (IOException e) {

            log.debug("Exception while downloading audio chunk: %s", e);
            throw new RuntimeException(e);
        }
    }
}
