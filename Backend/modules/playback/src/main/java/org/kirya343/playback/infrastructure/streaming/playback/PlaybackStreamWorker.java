package org.kirya343.playback.infrastructure.streaming.playback;

import java.util.function.Consumer;
import java.util.function.Supplier;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.audio.services.AudioQueryService;
import org.kirya343.audio.services.storage.AudioStorageService;
import org.kirya343.playback.application.command.ChangeTrack;
import org.kirya343.playback.application.event.PlaybackEvent;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.domain.dto.PlaybackTarget;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.user.dto.ShortUserDTO;
import org.springframework.context.ApplicationEventPublisher;

import io.github.kirya343.terminal.api.component.DiagnosticLoggable;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class PlaybackStreamWorker extends DiagnosticLoggable {

    @Getter 
    private final PlaybackTarget target;

    private final ApplicationEventPublisher eventPublisher;

    private final PlaybackSubscriberManager subscriberManager;
    private final PlaybackTrackManager trackManager; 
    private final PlaybackTickScheduler tickScheduler;

    public void applyState(PlaybackStateDTO state) {
        if (state == null) return;

        execute(() -> updatePlayback(
            () -> trackManager.applyState(state)
        ));
    }

    public void changeTrack(QueueItem entry, String initiator) {
        execute(() -> updatePlayback(
            () -> trackManager.changeTrack(entry, initiator)
        ));
    }

    private void execute(Runnable action) {
        try {
            tickScheduler.execute(action);
        } catch (Exception e) {
            log.error("Executing exception: ", e);
            throw e;
        }
    }

    private void updatePlayback(Supplier<PlaybackContext> action) {
        PlaybackContext context = action.get();

        subscriberManager.applyState(context);

        eventPublisher.publishEvent(
            new PlaybackEvent(target, context.getState()));

        tickScheduler.start(this::tickInternal);
    }

    public void broadcast(Consumer<UserStreamWorker> action) {
        subscriberManager.broadcast(action);
    }

    public void subscribe(UserStreamWorker worker, ShortUserDTO userDto) {
        subscriberManager.subscribe(worker, userDto);
    }

    public void unsubscribe(UserStreamWorker worker) {
        subscriberManager.unsubscribe(worker);
    }

    public void shutdown() {
        tickScheduler.shutdown();
    }

    public void stop() {
        tickScheduler.stop();
    }

    private void tickInternal() {
        PlaybackContext context = trackManager.getCurrentPlayback();

        if (context == null) {
            throw new IllegalStateException("PlaybackContext is null");
        }

        if (context.needChangeTrack()) {
            eventPublisher.publishEvent(new ChangeTrack(
                "next", 
                UserAuthData.server(), 
                target
            ));
            return;
        }

        subscriberManager.broadcast(UserStreamWorker::tick);
    }

    public PlaybackStreamWorker(
        PlaybackTarget target,
        ApplicationEventPublisher eventPublisher,
        PlaybackStateDTO currentState,
        QueueService queueService,
        AudioStorageService audioStorageService,
        AudioQueryService audioQueryService
    ) {

        this.target = target;
        this.eventPublisher = eventPublisher;

        this.trackManager = new PlaybackTrackManager(
            target, 
            queueService, 
            audioStorageService, 
            audioQueryService
        );

        this.subscriberManager = new PlaybackSubscriberManager(
            target, 
            trackManager.getCurrentPlayback()
        );

        this.tickScheduler = new PlaybackTickScheduler(target.toString());
            
        if (currentState != null) {
            log.debug("Created PlaybackStreamWorker {}, with state: {}",
                target, 
                currentState.toString()
            );            

            this.applyState(currentState);
        } else {
            log.debug("Created PlaybackStreamWorker {}", target);
        }
    }

    // Diadnostic commands

    public DiagnosticTextBuilder getInfo() {
        return getInfo("");
    }

    public DiagnosticTextBuilder getInfo(String param) {
        
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder(target.toString() + "-streamer:");

        PlaybackContext context = trackManager.getCurrentPlayback();

        builder.addRow("Status: ONLINE")
            .addRow("Listeners: " + subscriberManager.getPresence()
                    .getOnlineUsers()
                    .stream()
                    .map(ShortUserDTO::name)
                    .toList()
            );

        if (context == null) return builder;

        AudioFile audio = context.getAudio();

        builder.addRow( "Playing Audio: " + (audio != null ? audio.getTitle() : null));

        if ("--with-streamers".equals(param)) {
            builder.addSection(subscriberManager.getStreamersInfo());
        }

        return builder;
    }
}
