package org.kirya343.playback.infrastructure.streaming.playback;

import java.util.function.Consumer;

import org.kirya343.audio.services.AudioQueryService;
import org.kirya343.audio.services.storage.AudioStorageService;
import org.kirya343.playback.application.event.PlaybackEvent;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.user.dto.ShortUserDTO;
import org.springframework.context.ApplicationEventPublisher;

import io.github.kirya343.terminal.api.component.DiagnosticLoggable;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class PlaybackStreamWorker extends DiagnosticLoggable {

    @Getter 
    private final Long targetId;

    @Getter 
    private final PlaybackTargetType targetType;

    private final ApplicationEventPublisher eventPublisher;

    private final PlaybackSubscriberManager subscriberManager;
    private final PlaybackTrackManager trackManager; 
    private final PlaybackTickScheduler tickScheduler;

    private void execute(Runnable action) {
        tickScheduler.execute(action);
    }

    public void applyState(PlaybackStateDTO state) {
        if (state == null) return;

        execute(() -> {
            PlaybackContext context = trackManager.applyState(state);

            subscriberManager.applyState(context);

            tickScheduler.start(this::tickInternal);

            publishPlaybackEvent(state);
        });
    }

    public void changeTrack(QueueItem entry, String initiator) {
        execute(() -> {
            trackManager.changeTrack(entry, initiator);

            PlaybackContext context = trackManager.getCurrentPlayback();

            subscriberManager.applyState(context);

            publishPlaybackEvent(context.getState());

            tickScheduler.start(this::tickInternal);
        });
    }

    public void broadcast(Consumer<UserStreamWorker> action) {
        execute(() -> subscriberManager.broadcast(action));
    }

    public void subscribe(UserStreamWorker worker, ShortUserDTO userDto) {
        execute(() -> subscriberManager.subscribe(worker, userDto));
    }

    public void unsubscribe(UserStreamWorker worker) {
        execute(() -> subscriberManager.unsubscribe(worker));
    }

    public void shutdown() {
        tickScheduler.shutdown();
    }

    private void publishPlaybackEvent(PlaybackStateDTO state) {
        eventPublisher.publishEvent(
            new PlaybackEvent(targetId, targetType, state));
    }

    private void tickInternal() {
        PlaybackContext context = trackManager.getCurrentPlayback();

        if (context == null) return;

        if (context.needChangeTrack()) {
            trackManager.changeTrack("Server");
            return;
        }

        subscriberManager.broadcast(UserStreamWorker::tick);
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

        this.trackManager = new PlaybackTrackManager(
            targetId, targetType, 
            queueService, 
            audioStorageService, 
            audioQueryService
        );

        this.subscriberManager = new PlaybackSubscriberManager(
            targetId, 
            targetType, 
            trackManager.getCurrentPlayback()
        );

        this.tickScheduler = new PlaybackTickScheduler("playback" + targetType + "-" + targetId);
            
        if (currentState != null) {
            log.debug("Created PlayStreamWorker {}-{}, with state: {}",
                targetType,
                targetId, 
                currentState.toString()
            );            

            this.applyState(currentState);
        } else {
            log.debug("Created PlayStreamWorker {}-{}", targetType, targetId);
        }
    }

    // Diadnostic commands

    public DiagnosticTextBuilder getInfo() {
        
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Stream worker of " + targetId);

        PlaybackContext context = trackManager.getCurrentPlayback();

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
