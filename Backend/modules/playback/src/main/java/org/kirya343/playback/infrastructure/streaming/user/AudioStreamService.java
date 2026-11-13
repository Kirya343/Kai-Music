package org.kirya343.playback.infrastructure.streaming.user;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.kirya343.audio.dto.AudioChunk;
import org.kirya343.audio.services.util.Fmp4Chunker;
import org.kirya343.playback.domain.dto.StreamContext;
import org.kirya343.playback.domain.enums.ChunkDeliveryStatus;
import org.kirya343.playback.presentation.dto.ChunkDelivery;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
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

        if (context.isClosed()) {
            throw new IllegalStateException("Stream " + context.getStreamId() + " is closed");
        }

        PlaybackStateDTO state = context.getPlaybackContext().getState();

        log.debug("initializing user {}", context.getUserSub());

        playbackWebsocketService.sendPlaybackState(
            context.getUserSub(), 
            state,
            context.getStreamId()
        );

        try {
            playbackWebsocketService.sendChunk(
                context.getUserSub(), 
                context.getPlaybackContext()
                    .getChunker()
                    .initializationChunk(), 
                state.entryId(),
                context.getStreamId()
            );

        } catch (IOException e) {
            log.debug("Exception while initializing user: {}", e);
        }
    }
    
    public void fillBuffer(StreamContext context) {

        if (context.isClosed()) {
            throw new IllegalStateException("Stream " + context.getStreamId() + " is closed");
        }

        Fmp4Chunker chunker = context.getPlaybackContext().getChunker();

        try {

            double buffered = context.getBufferedUntil();
            double target = context.getPlaybackContext().getCurrentPosition() + BUFFER_SECONDS;

            List<String> chunks = new ArrayList<>();

            while (
                buffered < target &&
                chunker.hasNext(context.getNextSequence()) &&
                context.canSendChunk()
            ) {
                AudioChunk chunk = chunker.getAudioChunk(context.getNextSequence());

                if (chunk == null) {
                    break;
                }

                sendChunk(chunk, context);
                context.advanceSequence();
                
                chunks.addLast(String.valueOf(chunk.sequence()));

                buffered = (chunk.sequence() + 1) * (chunk.durationMs() / 1000.0);
            }

            if (chunks.size() > 0) {
                log.debug("fillBuffer to user {} {} -> {}: {}", 
                    context.getUserSub(), 
                    context.getBufferedUntil(), 
                    buffered, 
                    chunks
                );
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
            context.getPlaybackContext()
                .getState()
                .entryId(),
            context.getStreamId()
        );
    }

    private void resendChunk(ChunkDelivery chunkDelivery, StreamContext context) {

        try {
            AudioChunk chunk = context.getPlaybackContext()
                .getChunker()
                .getAudioChunk(chunkDelivery.sequence());

            sendChunk(chunk, context);
        } catch (IOException e) {

            log.debug("Exception while downloading audio chunk: %s", e);
            throw new RuntimeException(e);
        }
    }
}
