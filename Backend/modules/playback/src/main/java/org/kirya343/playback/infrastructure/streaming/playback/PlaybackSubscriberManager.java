package org.kirya343.playback.infrastructure.streaming.playback;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Consumer;

import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.presence.playback.PlaybackPresence;
import org.kirya343.user.dto.ShortUserDTO;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class PlaybackSubscriberManager {

    private final Long targetId;
    private final PlaybackTargetType targetType;

    private volatile PlaybackContext currentPlayback;

    private final Set<UserStreamWorker> userStreamWorkers = new HashSet<>();

    @Getter 
    private final PlaybackPresence presence = new PlaybackPresence();

    public PlaybackSubscriberManager(
        Long targetId,
        PlaybackTargetType targetType,
        PlaybackContext currentPlayback

    ) {
        this.targetId = targetId;
        this.targetType = targetType;
        this.currentPlayback = currentPlayback;
    }
        
    public void broadcast(Consumer<UserStreamWorker> action) {
        userStreamWorkers.forEach(action);
    }

    public void subscribe(UserStreamWorker worker, ShortUserDTO userDto) {
        log.debug("Subscribing user {} to {} id: {}", userDto.name(), targetType, targetId);

        userStreamWorkers.add(worker);
        presence.userConnected(userDto);

        PlaybackContext context = currentPlayback;

        if (context == null) return;

        worker.applyState(context);

        log.debug("Sending playbackData to user {}: {}-{}, {} listeners", userDto.name(), targetType, targetId, presence.countAll());

        broadcast(w -> w.sendPlaybackData(targetType, targetId, presence.getOnlineUsers()));
    }

    public void unsubscribe(UserStreamWorker worker) {
        userStreamWorkers.remove(worker);
        presence.userDisconnected(worker.getUserSub());
        
        broadcast(w -> w.sendPlaybackData(targetType, targetId, presence.getOnlineUsers()));
    }

    public void applyState(PlaybackContext context) {

        PlaybackStateDTO state = context.getState();

        log.debug(
            "START STATE: ({}, {}, {}) subscribers: {}", 
            state.entryId(), 
            state.position(),
            state.pause(),
            userStreamWorkers.size()
        );

        userStreamWorkers.forEach(w -> w.applyState(context));
    }
}
