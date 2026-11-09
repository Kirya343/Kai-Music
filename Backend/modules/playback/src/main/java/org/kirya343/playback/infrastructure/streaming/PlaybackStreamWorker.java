package org.kirya343.playback.infrastructure.streaming;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;
import java.util.function.Consumer;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.playback.application.command.ChangeTrack;
import org.kirya343.playback.application.command.PlaybackCommand;
import org.kirya343.playback.application.command.UpdatePlayback;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.presence.playback.PlaybackPresence;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.user.dto.ShortUserDTO;
import org.springframework.context.ApplicationEventPublisher;

import io.github.kirya343.terminal.api.component.DiagnosticLoggable;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.Getter;
import lombok.Setter;
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

    @Setter 
    @Getter 
    private AudioFile currentAudio;

    private static final int CHUNK_INTERVAL_SECONDS = 2;

    private final Set<AudioStreamWorker> userStreamWorkers =
        ConcurrentHashMap.newKeySet();

    @Getter 
    private final PlaybackPresence presence = new PlaybackPresence();

    private PlaybackStateDTO currentState;
    private ScheduledFuture<?> task;

    public PlaybackStreamWorker(
        Long targetId,
        PlaybackTargetType targetType,
        ApplicationEventPublisher eventPublisher,
        PlaybackStateDTO currentState,
        QueueService queueService
    ) {

        this.targetId = targetId;
        this.targetType = targetType;
        this.eventPublisher = eventPublisher;
        this.queueService = queueService;

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

    public void submit(PlaybackCommand cmd) {
        eventPublisher.publishEvent(cmd);
    }

    public void broadcast(Consumer<AudioStreamWorker> action) {
        userStreamWorkers.forEach(action);
    }

    public void applyState(PlaybackStateDTO state) {

        if (state == null) return;

        addLog("applyState %s", state.position());

        currentState = state;

        userStreamWorkers.forEach(w -> w.applyState(state));

        addLog("START STATE: entryId=%s, position=%s", state.entryId(), state.position());

        if (task == null || task.isCancelled()) {
            task = scheduler.scheduleAtFixedRate(
                () -> {
                    try {
                        streamTick();
                    } catch (Exception e) {
                        log.error("Ошибка обработки тика комнаты: ", e.getMessage());
                    }
                },
                0,
                CHUNK_INTERVAL_SECONDS,
                TimeUnit.SECONDS
            );
        }
    }

    public void streamTick() {

        addLog("Streamer tick %s", targetId);

        /**
         * if current playback position is after than audio duration - cancel task and send Next command
         */
        if (currentAudio != null && currentState.position() > currentAudio.getDuration()) {

            addLog("Sending NEXT event: room=%s, becouse position(%s) is after audioDuration(%s)", 
                targetId,
                currentState.position(),
                currentAudio.getDuration()
            );

            cancelTask();

            try {
                QueueItem entry = queueService.nextTrack(targetId, targetType);

                addLog("Found next track: %s", entry.getId());

                submit(new ChangeTrack(
                    entry.getId().toString(), 
                    UserAuthData.server(),
                    targetId,
                    targetType
                ));
            } catch (Exception e) {

                addLog("Exception while auto-switching track  %s", e);

                submit(
                    new UpdatePlayback(
                        new PlaybackStateDTO(
                            UserAuthData.server().name(), 
                            currentState.entryId(), 
                            Double.valueOf(currentAudio.getDuration()), 
                            true
                        ), 
                        UserAuthData.server(),
                        targetId,
                        targetType
                    ));
            }
            
            return;
        }

        try {
            userStreamWorkers.forEach(AudioStreamWorker::tick);
        } catch (Exception e) {
            log.error("Ошибка обработки тика юзеров: {}", e);
        }

        if (!currentState.pause()) {
            currentState = new PlaybackStateDTO(
                currentState.user(), 
                currentState.entryId(), 
                currentState.position() + CHUNK_INTERVAL_SECONDS, 
                currentState.pause()
            );
        }
    }

    public void cancelTask() {
        if (task != null && !task.isCancelled()) {
            task.cancel(false);
            task = null;
        }
    }

    public void subscribe(AudioStreamWorker worker, ShortUserDTO userDto) {
        worker.applyState(currentState);
        presence.userConnected(userDto);

        userStreamWorkers.add(worker);
    }

    public void unsubscribe(AudioStreamWorker worker) {
        userStreamWorkers.remove(worker);
        presence.userDisconnected(worker.getUserSub());
    }

    // Diadnostic commands

    public DiagnosticTextBuilder getInfo() {
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Stream worker of " + targetId);

        DiagnosticTextBuilder stateSection = new DiagnosticTextBuilder("Playback state: ")
            .addRow("position: " + currentState.position())
            .addRow("entryId: " + currentState.entryId())
            .addRow("pause: " + currentState.pause())
            .addRow("user: " + currentState.user());

        builder.addSection(stateSection);

        return builder;
    }
}
