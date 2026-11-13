package org.kirya343.playback.infrastructure.streaming.user;

import java.util.List;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.locks.ReentrantLock;

import org.kirya343.audio.dto.AudioChunkFeedback;
import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.domain.dto.StreamContext;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.streaming.playback.PlaybackStreamWorker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.user.dto.ShortUserDTO;

import io.github.kirya343.terminal.api.component.DiagnosticLoggable;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
public class UserStreamWorker
    extends DiagnosticLoggable {

    @Getter 
    private PlaybackStreamWorker subscribedWorker;

    @Getter 
    private final String userSub;

    private ScheduledFuture<?> task;

    private final PlaybackWebsocketService playbackWebsocketService;
    private final AudioStreamService audioStreamService;
    private final ReentrantLock streamLock = new ReentrantLock();

    private volatile StreamContext currentStream;

    public UserStreamWorker(
        String userSub,
        PlaybackWebsocketService playbackWebsocketService,
        AudioStreamService audioStreamService
    ) {
        this.userSub = userSub;
        this.playbackWebsocketService = playbackWebsocketService;
        this.audioStreamService = audioStreamService;

        addLog("Created UserAudioStreamWorker for %s", userSub);
    }

    public void subscribe(PlaybackStreamWorker worker, ShortUserDTO userDTO) {
        if (subscribedWorker == worker) return;
        
        unsubscribe();

        subscribedWorker = worker;
        worker.subscribe(this, userDTO);
    }

    public void unsubscribe() {
        if (subscribedWorker != null) {
            subscribedWorker.unsubscribe(this);
        }
    }

    public void applyState(PlaybackContext context) {
        if (context == null) return;

        streamLock.lock();
        try {
            currentStream = createStreamContext(context);

            audioStreamService.initializeUser(currentStream);

            tick(currentStream);
        } finally {
            streamLock.unlock();
        }
    }

    public void tick() {
        streamLock.lock();
        try {
            StreamContext context = currentStream;

            if (context == null) return;

            tick(context);
        } finally {
            streamLock.unlock();
        }
    }

    private void tick(StreamContext context) {
        addLog("Tick to user %s", userSub);
        
        audioStreamService.fillBuffer(context);
    }

    public void chunkRecived(AudioChunkFeedback chunkFeedback) {

        StreamContext context = currentStream;

        if (context == null) return;

        context.chunkRecived(chunkFeedback);
    }

    public void cancelTask() {
        if (task != null && !task.isCancelled()) {
            task.cancel(false);
            task = null;
        }
    }

    public void sendPlaybackMode(PlaybackMode mode) {
        playbackWebsocketService.sendPlaybackMode(userSub, mode);
    }

    public void sendPlaylist(Playlist playlist) {
        playbackWebsocketService.sendPlaybackPlaylist(userSub, playlist);
    }

    public void sendPlaybackData(PlaybackTargetType type, Long id, List<ShortUserDTO> listeners) {
        playbackWebsocketService.sendPlaybackData(userSub, type, id, listeners);
    }

    public StreamContext createStreamContext(PlaybackContext playbackContext) {
        return new StreamContext(playbackContext, userSub);
    }

    // Diadnostic voids

    public DiagnosticTextBuilder getInfo() {
        
        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Stream worker of " + userSub);

        StreamContext context = currentStream;

        if (context == null) return builder;

        PlaybackStateDTO state = context.getPlaybackContext().getState();

        DiagnosticTextBuilder stateSection = new DiagnosticTextBuilder("Playback state: ")
            .addRow("position: " + state.position())
            .addRow("entryId: " + state.entryId())
            .addRow("pause: " + state.pause())
            .addRow("user: " + state.user())
            .addRow("buffered until: " + context.getBufferedUntil());

        builder.addSection(stateSection);

        return builder;
    }
}