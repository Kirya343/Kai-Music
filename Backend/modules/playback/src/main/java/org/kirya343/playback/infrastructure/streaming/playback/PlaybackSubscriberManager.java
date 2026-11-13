package org.kirya343.playback.infrastructure.streaming.playback;

import java.util.HashSet;

import org.kirya343.playback.application.event.PlaybackEvent;
import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.user.dto.ShortUserDTO;

public class PlaybackSubscriberManager {

    private final Set<UserStreamWorker> userStreamWorkers = new HashSet<>();
    
    public void broadcast(Consumer<UserStreamWorker> action) {
        userStreamWorkers.forEach(action);
    }

    private void subscribe(UserStreamWorker worker, ShortUserDTO userDto) {
        log.debug("Subscribing user {} to {} id: {}", userDto.name(), targetType, targetId);

        PlaybackContext context = currentPlayback;

        if (context == null) return;

        userStreamWorkers.add(worker);
        presence.userConnected(userDto);

        log.debug("Sending playbackData to user {}: {}-{}, {} listeners", userDto.name(), targetType, targetId, presence.countAll());

        worker.applyState(context);

        broadcast(w -> w.sendPlaybackData(targetType, targetId, presence.getOnlineUsers()));
    }

    private void unsubscribe(UserStreamWorker worker) {
        userStreamWorkers.remove(worker);
        presence.userDisconnected(worker.getUserSub());
        
        broadcast(w -> w.sendPlaybackData(targetType, targetId, presence.getOnlineUsers()));
    }

    private void applyState(PlaybackStateDTO state) {

        addLog("applyState %s", state.position());

        if (currentPlayback == null) {
            AudioFile audio = audioQueryService.getAudioByQueueItem(state.entryId());
            currentPlayback = createPlaybackContext(audio);
        } 

        PlaybackContext context = currentPlayback;

        context.applyState(state);

        userStreamWorkers.forEach(w -> w.applyState(context));

        addLog("START STATE: entryId=%s, position=%s", state.entryId(), state.position());

        restartTickTask();

        eventPublisher.publishEvent(
            new PlaybackEvent(targetId, targetType, state));
    }
}
