package org.kirya343.playback.infrastructure.streaming.playback.management;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.domain.dto.PlaybackTarget;
import org.kirya343.playback.infrastructure.streaming.user.worker.UserStreamWorker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.presence.playback.PlaybackPresence;
import org.kirya343.user.dto.ShortUserDTO;

import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class PlaybackSubscriberManager {

    private final PlaybackTarget target;

    private volatile PlaybackContext currentPlayback;

    private final Map<String, UserStreamWorker> userStreamWorkers =
        new ConcurrentHashMap<>();

    @Getter 
    private final PlaybackPresence presence = new PlaybackPresence();

    public PlaybackSubscriberManager(
        PlaybackTarget target,
        PlaybackContext currentPlayback

    ) {
        this.target = target;
        this.currentPlayback = currentPlayback;
    }
        
    public void broadcast(Consumer<UserStreamWorker> action) {
        userStreamWorkers.values().forEach(action);
    }

    public void subscribe(UserStreamWorker worker, ShortUserDTO userDto) {
        log.debug("Subscribing user {} to {}", userDto.name(), target.toString());

        userStreamWorkers.put(userDto.sub(), worker);
        presence.userConnected(userDto);

        log.debug("Sending playbackData to user {}: {}, {} listeners", userDto.name(), target.toString(), presence.countAll());

        broadcast(w -> w.sendPlaybackData(target, presence.getOnlineUsers()));

        resync(worker);
    }

    public void resync(UserStreamWorker worker) {
        PlaybackContext context = currentPlayback;

        if (context != null) {
            log.error("Appling state to: ", worker.getUserSub());

            try {
                worker.synchronizeState(context);
            } catch (Exception e) {
                log.error("Appling state exception: ", e);
                throw e;
            }
        }
    }

    public void unsubscribe(String userSub) {
        userStreamWorkers.remove(userSub);
        presence.userDisconnected(userSub);
        
        broadcast(w -> w.sendPlaybackData(target, presence.getOnlineUsers()));
    }

    public void applyState(PlaybackContext context) {

        currentPlayback = context;

        PlaybackStateDTO state = context.getState();

        log.debug(
            "START STATE: ({}, {}, {}) subscribers: {}", 
            state.entryId(), 
            state.position(),
            state.pause(),
            userStreamWorkers.size()
        );

        broadcast(w -> w.applyState(context));
    }

    public DiagnosticTextBuilder getStreamersInfo() {
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Streamers:");

        userStreamWorkers.values().forEach(worker -> {
            builder.addSection(worker.getInfo());
        });

        return builder;
    }
}
