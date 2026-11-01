package org.kirya343.playback.services.streaming;

import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import org.kirya343.playback.dto.PlaybackStateDTO;
import org.kirya343.playback.dto.commands.ChangeTrack;
import org.kirya343.playback.dto.commands.UpdatePlayback;
import org.kirya343.playback.services.QueueService;
import org.kirya343.playback.services.cache.RoomPlaybackContext;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.security.core.dto.UserAuthData;

import io.github.kirya343.terminal.components.DiagnosticLoggable;
import io.github.kirya343.terminal.core.DiagnosticTextBuilder;
import org.springframework.context.ApplicationEventPublisher;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RoomStreamWorker
    extends DiagnosticLoggable {

    private final ScheduledExecutorService scheduler =
        Executors.newSingleThreadScheduledExecutor();
    private final ApplicationEventPublisher eventPublisher;
    private final QueueService queueService;

    private final RoomPlaybackContext roomContext;

    private final Long roomId;

    private static final int CHUNK_INTERVAL_SECONDS = 2;

    private final Set<UserAudioStreamWorker> userStreamWorkers =
        ConcurrentHashMap.newKeySet();

    private PlaybackStateDTO currentState;
    private ScheduledFuture<?> task;

    public RoomStreamWorker(
        Long roomId,
        ApplicationEventPublisher eventPublisher,
        PlaybackStateDTO currentState,
        RoomPlaybackContext roomContext,
        QueueService queueService
    ) {

        this.roomId = roomId;
        this.eventPublisher = eventPublisher;
        this.roomContext = roomContext;
        this.queueService = queueService;

        if (currentState != null) {
            addLog("Created RoomStreamWorker for %s, with state: %s, %s, %s",
                roomId, currentState.entryId(), currentState.position(), currentState.pause());

            this.applyState(currentState);
        } else {
            addLog("Created RoomStreamWorker for %s", roomId);
        }
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
                        log.error("Ошибка обработки тика комнаты: {}", e);
                    }
                },
                0,
                CHUNK_INTERVAL_SECONDS,
                TimeUnit.SECONDS
            );
        }
    }

    public void streamTick() {

        addLog("Room tick %s", roomId);

        /**
         * if current playback position is after than audio duration - cancel task and send Next command
         */
        if (currentState.position() > roomContext.getCurrentAudio().getDuration()) {

            addLog("Sending NEXT event: room=%s, becouse position(%s) is after audioDuration(%s)", 
                roomId,
                currentState.position(),
                roomContext.getCurrentAudio().getDuration()
            );

            try {
                QueueItem entry = queueService.nextTrack(roomId);

                eventPublisher.publishEvent(new ChangeTrack(roomId, entry.getId().toString(), UserAuthData.server()));
            } catch (Exception e) {
                eventPublisher.publishEvent(
                    new UpdatePlayback(
                        roomId, 
                        new PlaybackStateDTO(
                            UserAuthData.server().name(), 
                            currentState.entryId(), 
                            Double.valueOf(roomContext.getCurrentAudio().getDuration()), 
                            true
                        ), 
                        UserAuthData.server()
                    ));
            }

            cancelTask();
            
            return;
        }

        try {
            userStreamWorkers.forEach(UserAudioStreamWorker::tick);
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

    public void addUserWorker(UserAudioStreamWorker worker) {
        worker.applyState(currentState);

        userStreamWorkers.add(worker);
    }

    public void removeUserWorker(UserAudioStreamWorker worker) {
        userStreamWorkers.remove(worker);
    }

    // Diadnostic commands

    public DiagnosticTextBuilder getInfo() {
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Stream worker of " + roomId);

        DiagnosticTextBuilder stateSection = new DiagnosticTextBuilder("Playback state: ")
            .addRow("position: " + currentState.position())
            .addRow("entryId: " + currentState.entryId())
            .addRow("pause: " + currentState.pause())
            .addRow("user: " + currentState.user());

        builder.addSection(stateSection);

        return builder;
    }
}