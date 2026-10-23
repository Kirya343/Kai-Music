package org.kirya343.kai.features.playback.services.streaming;

import static org.kirya343.terminal.components.DiagnosticLoggable.log;

import java.io.IOException;
import java.util.concurrent.ScheduledFuture;

import org.kirya343.kai.features.audio.datasource.AudioFile;
import org.kirya343.kai.features.audio.dto.AudioChunk;
import org.kirya343.kai.features.audio.services.AudioQueryService;
import org.kirya343.kai.features.audio.services.storage.AudioStorageService;
import org.kirya343.kai.features.audio.services.util.Fmp4Chunker;
import org.kirya343.kai.features.playback.PlaybackWebsocketService;
import org.kirya343.kai.features.playback.dto.PlaybackStateDTO;
import org.kirya343.terminal.components.DiagnosticLoggable;
import org.kirya343.terminal.core.DiagnosticTextBuilder;

import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class UserAudioStreamWorker
    extends DiagnosticLoggable {

    private final String user;
    private Double bufferedUntil = 0.0;
    private PlaybackStateDTO currentState;
    private long playbackStartedAt;

    private static final int BUFFER_SECONDS = 20;

    private ScheduledFuture<?> task;

    private Fmp4Chunker chunker;

    private final AudioStorageService audioStorageService;
    private final PlaybackWebsocketService playbackWebsocketService;
    private final AudioQueryService audioQueryService;

    public UserAudioStreamWorker(
        String user,
        AudioQueryService audioQueryService,
        AudioStorageService audioStorageService,
        PlaybackWebsocketService playbackWebsocketService,
        PlaybackStateDTO currentState
    ) {
        this.user = user;
        this.audioQueryService = audioQueryService;
        this.audioStorageService = audioStorageService;
        this.playbackWebsocketService = playbackWebsocketService;

        addLog("Created UserAudioStreamWorker for %s, with state: %s, %s, %s", 
            user, currentState.entryId(), currentState.position(), currentState.pause());

        playbackWebsocketService.broadcastPlaybackState(user, currentState);
        applyState(currentState);
    }

    public void applyState(PlaybackStateDTO state) {

        addLog("applyState state=%s", state == null);

        if (state == null) return;

        updateState(state);

        addLog("START STATE: entryId=%s, position=%s", state.entryId(), state.position());

        try {
            tick();
        } catch (IOException e) {
            log.error("Ошибка обработки тика юзера {}: {}", user, e);
        }

    }

    public void tick() throws IOException {

        addLog("Tick to user %s", user);

        if (chunker.hasNext()) {
            fillBuffer();
        }
    }

    private void fillBuffer() throws IOException {

        addLog("fillBuffer to user %s", user);

        double buffered = bufferedUntil;
        double target = getCurrentPosition() + BUFFER_SECONDS;

        while (
            buffered < target &&
            chunker.hasNext()
        ) {
            addLog("buffered %s, target %s", buffered, target);

            AudioChunk chunk = chunker.nextAudioChunk();

            playbackWebsocketService.sendChunk(
                user,
                chunk,
                currentState.entryId()
            );

            buffered += chunk.durationMs() / 1000.0;
        }

        bufferedUntil = buffered;
    }

    public void updateState(PlaybackStateDTO state) {

        PlaybackStateDTO previousState = currentState;

        boolean trackChanged =
            currentState == null || (
                currentState != null &&
                !currentState.entryId().equals(state.entryId())
            );
        
        boolean positionChanged =
            currentState == null || (
                currentState != null &&
                !currentState.position().equals(state.position())
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
            try {
                initializeUser();
                fillBuffer();
            } catch (Exception e) {
                log.error("Ошибка заполнения буфера пользователя {}: {}", user, e);
            }
        }

        if (positionChanged && !trackChanged) {
            addLog(
                "SEEK POSITION: %s => %s",
                previousState != null ? previousState.position() : "null",
                currentState.position()
            );

            chunker.seek(currentState.position());
            bufferedUntil = currentState.position();
        }
    }

    private void initializeUser() throws IOException {

        playbackWebsocketService.sendChunk(
            user, 
            chunker.initializationChunk(), 
            currentState.entryId());

        bufferedUntil = currentState.position();
    }

    private void reloadChunker(PlaybackStateDTO stateDTO) {

        AudioFile audioFile = audioQueryService.getAudioByQueueItem(stateDTO.entryId());

        chunker = new Fmp4Chunker(
            audioStorageService,
            audioFile.getPath(),
            audioFile.getChunks()
        );
        addLog("Перематываем чанкер для пользователя %s на позицию: %s", user, stateDTO.position());

        chunker.seek(stateDTO.position());
    }

    private double getCurrentPosition() {
        if (currentState.pause()) {
            return currentState.position();
        }

        double elapsed =
            (System.currentTimeMillis() - playbackStartedAt) / 1000.0;

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
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Stream worker of " + user);

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