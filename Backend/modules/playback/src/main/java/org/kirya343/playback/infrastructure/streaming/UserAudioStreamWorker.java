package org.kirya343.playback.infrastructure.streaming;

import java.io.IOException;
import java.util.UUID;
import java.util.concurrent.ScheduledFuture;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.audio.dto.AudioChunk;
import org.kirya343.audio.services.AudioQueryService;
import org.kirya343.audio.services.storage.AudioStorageService;
import org.kirya343.audio.services.util.Fmp4Chunker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;

import io.github.kirya343.terminal.api.component.DiagnosticLoggable;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class UserAudioStreamWorker
    extends DiagnosticLoggable {

    @Getter 
    private final String userSub;
    private Double bufferedUntil = 0.0;
    private PlaybackStateDTO currentState;
    private long playbackStartedAt;

    private static final int BUFFER_SECONDS = 20;

    private ScheduledFuture<?> task;

    private Fmp4Chunker chunker;

    private UUID streamId = UUID.randomUUID();

    private final AudioStorageService audioStorageService;
    private final PlaybackWebsocketService playbackWebsocketService;
    private final AudioQueryService audioQueryService;

    public UserAudioStreamWorker(
        String userSub,
        AudioQueryService audioQueryService,
        AudioStorageService audioStorageService,
        PlaybackWebsocketService playbackWebsocketService
    ) {
        this.userSub = userSub;
        this.audioQueryService = audioQueryService;
        this.audioStorageService = audioStorageService;
        this.playbackWebsocketService = playbackWebsocketService;

        addLog("Created UserAudioStreamWorker for %s", userSub);
    }

    public void applyState(PlaybackStateDTO state) {

        addLog("applyState state=%s", state == null);

        if (state == null) return;

        streamId = UUID.randomUUID();

        playbackWebsocketService.sendPlaybackState(userSub, state, streamId);

        updateState(state);

        addLog("START STATE: entryId=%s, position=%s", state.entryId(), state.position());

        initializeUser();

        tick();
    }

    public void tick() {

        addLog("Tick to user %s", userSub);

        if (chunker.hasNext()) {
            fillBuffer();
        }
    }

    private void fillBuffer() {
        try {

            addLog("fillBuffer to user %s", userSub);

            double buffered = bufferedUntil;
            double target = getCurrentPosition() + BUFFER_SECONDS;

            while (
                buffered < target &&
                chunker.hasNext()
            ) {
                addLog("buffered %s, target %s", buffered, target);

                AudioChunk chunk;

                chunk = chunker.nextAudioChunk();

                playbackWebsocketService.sendChunk(
                    userSub,
                    chunk,
                    currentState.entryId(),
                    streamId
                );

                buffered += chunk.durationMs() / 1000.0;
            }

            bufferedUntil = buffered;

        } catch (IOException e) {

            addLog("Exception while downloading audio chunk: %s", e);
            throw new RuntimeException(e);
        }
    }

    public void updateState(PlaybackStateDTO state) {

        PlaybackStateDTO previousState = currentState;

        boolean trackChanged =
            currentState == null || (
                currentState != null &&
                !currentState.entryId().equals(state.entryId())
            );

        currentState = state;

        if (!currentState.pause()) {
            playbackStartedAt = System.currentTimeMillis();
        }

        /**
         * if track is changed - clear all users and user chunkers,
         * becouse for new track audioStreamWorker have to create new parser with new track
         * and recreate all user chunkers with new parser
         */
        if (trackChanged) {
            addLog(
                "SWITCH TRACK: %s => %s",
                previousState != null ? previousState.entryId() : "null",
                currentState.entryId()
            );

            bufferedUntil = 0.0;
            reloadChunker(currentState);
        }

        addLog(
            "SEEK POSITION: %s => %s",
            previousState != null ? previousState.position() : "null",
            currentState.position()
        );

        chunker.seek(currentState.position());
        bufferedUntil = currentState.position();
    }

    private void initializeUser() {

        try {
            playbackWebsocketService.sendChunk(
                userSub, 
                chunker.initializationChunk(), 
                currentState.entryId(),
                streamId
            );

            bufferedUntil = currentState.position();
        } catch (IOException e) {
            addLog("Exception while initializing user: %s", e);
        }
    }

    private void reloadChunker(PlaybackStateDTO stateDTO) {

        AudioFile audioFile = audioQueryService.getAudioByQueueItem(stateDTO.entryId());

        chunker = new Fmp4Chunker(
            audioStorageService,
            audioFile.getPath(),
            audioFile.getChunks()
        );
        
        addLog("Перематываем чанкер для пользователя %s на позицию: %s", userSub, stateDTO.position());

        chunker.seek(stateDTO.position());
    }

    private double getCurrentPosition() {
        if (currentState.pause()) {
            return currentState.position();
        }

        double elapsed = (System.currentTimeMillis() - playbackStartedAt) / 1000.0;

        return currentState.position() + elapsed;
    }

    public void cancelTask() {
        if (task != null && !task.isCancelled()) {
            task.cancel(false);
            task = null;
        }
    }

    // Diadnostic voids

    public DiagnosticTextBuilder getInfo() {
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Stream worker of " + userSub);

        DiagnosticTextBuilder stateSection = new DiagnosticTextBuilder("Playback state: ")
            .addRow("position: " + currentState.position())
            .addRow("entryId: " + currentState.entryId())
            .addRow("pause: " + currentState.pause())
            .addRow("user: " + currentState.user())
            .addRow("buffered until: " + bufferedUntil);

        builder.addSection(stateSection);

        return builder;
    }
}