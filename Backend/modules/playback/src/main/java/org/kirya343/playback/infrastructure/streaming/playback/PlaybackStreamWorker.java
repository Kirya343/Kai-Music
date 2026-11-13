package org.kirya343.playback.infrastructure.streaming.playback;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.audio.services.AudioQueryService;
import org.kirya343.audio.services.storage.AudioStorageService;
import org.kirya343.audio.services.util.Fmp4Chunker;
import org.kirya343.playback.application.event.PlaybackEvent;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.presence.playback.PlaybackPresence;
import org.kirya343.user.dto.ShortUserDTO;
import org.springframework.context.ApplicationEventPublisher;

import io.github.kirya343.terminal.api.component.DiagnosticLoggable;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import jakarta.persistence.EntityNotFoundException;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class PlaybackStreamWorker extends DiagnosticLoggable {

    @Getter 
    private final Long targetId;

    @Getter 
    private final PlaybackTargetType targetType;

    private final ScheduledExecutorService scheduler;
    private final ApplicationEventPublisher eventPublisher;
    private final QueueService queueService;
    private final AudioStorageService audioStorageService;
    private final AudioQueryService audioQueryService;

    private volatile PlaybackContext currentPlayback;

    private static final int CHUNK_INTERVAL_SECONDS = 2;


    @Getter 
    private final PlaybackPresence presence = new PlaybackPresence();

    private ScheduledFuture<?> task;

    public void changeTrack(QueueItem entry, String initiator) {
        scheduler.execute(() -> changeTrackInternal(entry, initiator));
    }

    public void broadcast(Consumer<UserStreamWorker> action) {
        scheduler.execute(() -> broadcastInternal(action));
    }

    public void subscribe(UserStreamWorker worker, ShortUserDTO userDto) {
        scheduler.execute(() -> subscribeInternal(worker, userDto));
    }

    public void unsubscribe(UserStreamWorker worker) {
        scheduler.execute(() -> unsubscribeInternal(worker));
    }

    public void changeTrack() {
        scheduler.execute(this::changeTrackInternal);
    }

    public void applyState(PlaybackStateDTO state) {
        if (state == null) return;

        scheduler.execute(() -> applyStateInternal(state));
    }

    private void tickInternal() {

        PlaybackContext context = currentPlayback;

        if (context == null) return;

        addLog("Streamer tick %s", targetId);

        /**
         * if current playback position is after than audio duration - cancel task and send Next command
         */
        if (context.needChangeTrack()) {

            changeTrackInternal();            
            return;
        }

        userStreamWorkers.forEach(UserStreamWorker::tick);
    }

    private void changeTrackInternal() {
        String initiator = "Server";

        try {
            QueueItem entry = queueService.nextTrack(targetId, targetType);

            addLog("Found next track: %s", entry.getId());

            changeTrackInternal(entry, initiator);

        } catch (EntityNotFoundException e) {
            PlaybackContext context = currentPlayback;

            if (context == null) return;

            addLog("Exception while auto-switching track: %s", e);

            PlaybackStateDTO newState = new PlaybackStateDTO(
                initiator,
                context.getState().entryId(),
                (double) context.getAudio().getDuration(),
                true
            );

            applyStateInternal(newState);
        }
    }

    private void changeTrackInternal(QueueItem entry, String initiator) {
        currentPlayback = createPlaybackContext(entry.getAudio());

        PlaybackStateDTO newState = new PlaybackStateDTO(
            initiator,
            entry.getId(),
            0.0,
            false
        );

        applyStateInternal(newState);
    }

    private PlaybackContext createPlaybackContext(AudioFile audioFile) {
        return new PlaybackContext(
            audioFile,
            loadChunker(audioFile)
        );
    }

    private Fmp4Chunker loadChunker(AudioFile audioFile) {

        if (audioFile == null) {
            throw new IllegalStateException("Audiofile for chunker not found");
        }

        return new Fmp4Chunker(
            audioStorageService,
            audioFile.getPath(),
            audioFile.getChunks()
        ); 
    }

    private void restartTickTask() {
        cancelTask();

        task = scheduler.scheduleAtFixedRate(
            () -> {
                try {
                    tickInternal();
                } catch (Exception e) {
                    log.error("Ошибка обработки тика комнаты: ", e);
                }
            },
            0,
            CHUNK_INTERVAL_SECONDS,
            TimeUnit.SECONDS
        );
    }

    public void cancelTask() {
        if (task != null && !task.isCancelled()) {
            task.cancel(false);
            task = null;
        }
    }

    public PlaybackStreamWorker(
        Long targetId,
        PlaybackTargetType targetType,
        ApplicationEventPublisher eventPublisher,
        PlaybackStateDTO currentState,
        QueueService queueService,
        AudioStorageService audioStorageService,
        AudioQueryService audioQueryService
    ) {

        this.targetId = targetId;
        this.targetType = targetType;
        this.eventPublisher = eventPublisher;
        this.queueService = queueService;
        this.audioStorageService = audioStorageService;
        this.audioQueryService = audioQueryService;

        this.scheduler =
            Executors.newSingleThreadScheduledExecutor(r -> {
                Thread thread = new Thread(r);
                thread.setName(
                    "playback-worker-" + targetType + "-" + targetId
                );
                return thread;
            });

        if (currentState != null) {
            addLog("Created RoomStreamWorker for %s, with state: %s, %s, %s",
                targetId, currentState.entryId(), currentState.position(), currentState.pause());            

            this.applyState(currentState);
        } else {
            addLog("Created StreamWorker for %s", targetId);
        }
    }

    // Diadnostic commands

    public DiagnosticTextBuilder getInfo() {
        
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Stream worker of " + targetId);

        PlaybackContext context = this.currentPlayback;

        if (context == null) return builder;

        PlaybackStateDTO state = context.getState();

        DiagnosticTextBuilder stateSection = new DiagnosticTextBuilder("Playback state: ")
            .addRow("position: " + state.position())
            .addRow("entryId: " + state.entryId())
            .addRow("pause: " + state.pause())
            .addRow("user: " + state.user());

        builder.addSection(stateSection);

        return builder;
    }
}
