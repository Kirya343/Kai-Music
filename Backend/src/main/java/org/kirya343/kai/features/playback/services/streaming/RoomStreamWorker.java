package org.kirya343.kai.features.playback.services.streaming;

import java.util.Set;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import org.kirya343.kai.features.authentication.dto.UserAuthData;
import org.kirya343.kai.features.playback.dto.PlaybackStateDTO;
import org.kirya343.kai.features.playback.dto.commands.ChangeTrack;
import org.kirya343.kai.features.playback.services.cache.RoomPlaybackContext;
import org.kirya343.kai.features.presence.UserPresence;
import org.kirya343.kai.features.presence.services.PresenceService;
import org.kirya343.terminal.core.DiagnosticLoggable;
import org.kirya343.terminal.core.DiagnosticTextBuilder;
import org.springframework.context.ApplicationEventPublisher;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class RoomStreamWorker
    extends DiagnosticLoggable {

    private final ScheduledExecutorService scheduler =
        Executors.newSingleThreadScheduledExecutor();
    private final ApplicationEventPublisher eventPublisher;
    private final UserAudioStreamWorkerManager userAudioStreamWorkerManager;
    private final PresenceService presenceService;

    private final RoomPlaybackContext roomContext;

    private final Long roomId;

    private static final int CHUNK_INTERVAL_SECONDS = 2;

    private PlaybackStateDTO currentState;
    private ScheduledFuture<?> task;

    public RoomStreamWorker(
        Long roomId,
        ApplicationEventPublisher eventPublisher,
        UserAudioStreamWorkerManager userAudioStreamWorkerManager,
        PlaybackStateDTO currentState,
        RoomPlaybackContext roomContext,
        PresenceService presenceService
    ) {

        this.roomId = roomId;
        this.eventPublisher = eventPublisher;
        this.roomContext = roomContext;
        this.presenceService = presenceService;
        this.userAudioStreamWorkerManager = userAudioStreamWorkerManager;

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

        roomContext.getListeners().forEach(user -> {
            if (presenceService.getPresence(user) == UserPresence.ONLINE) {
                userAudioStreamWorkerManager.getWorker(user, state).applyState(state);
            }
        });

        addLog("START STATE: entryId=%s, position=%s", state.entryId(), state.position());

        if (task == null || task.isCancelled()) {
            task = scheduler.scheduleAtFixedRate(
                () -> {
                    try {
                        streamTick();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                },
                0,
                CHUNK_INTERVAL_SECONDS,
                TimeUnit.SECONDS
            );
        }
    }

    public void streamTick() {

        Set<String> listeners = roomContext.getListeners();

        addLog("Room tick %s, %s", roomId, listeners);

        /**
         * if current playback position is after than audio duration - cancel task and send Next command
         */
        if (currentState.position() > roomContext.getCurrentAudio().getDuration()) {

            addLog("Sending NEXT event: room=%s, becouse position(%s) is after audioDuration(%s)", 
                roomId,
                currentState.position(),
                roomContext.getCurrentAudio().getDuration()
            );

            eventPublisher.publishEvent(new ChangeTrack(roomId, "next", UserAuthData.server()));
            return;
        }

        try {
            listeners.forEach(user -> {
                try {
                    if (presenceService.getPresence(user) == UserPresence.ONLINE) {
                        userAudioStreamWorkerManager.getWorker(user, currentState).tick();
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });
        } catch (Exception e) {
            e.printStackTrace();
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