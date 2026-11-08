package org.kirya343.playback.presentation.http;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.infrastructure.streaming.AudioStreamWorkerManager;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playback.application.command.ChangeTrack;
import org.kirya343.playback.application.command.PlaybackCommand;
import org.kirya343.playback.application.command.UpdatePlayback;
import org.kirya343.playback.application.service.PlaybackService;
import org.kirya343.playback.application.service.PlaybackSessionService;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.kirya343.security.core.annotations.controllers.Authenticated;
import org.kirya343.security.core.annotations.parameters.AuthUser;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;

@RestController 
@RequiredArgsConstructor 
@RequestMapping("/playback")
public class PlaybackController {

    private final PlaybackStateRepository playbackStateRepository;
    private final AudioStreamWorkerManager audioStreamWorkerManager;
    private final PlaybackSessionService playbackSessionService;
    private final PlaybackService playbackService;
    private final Map<String, Long> lastUpdate = new ConcurrentHashMap<>();
    private static final long UPDATE_DELAY_MS = 300;
    
    @GetMapping("/{roomId}/playback-state")
    @Authenticated
    public PlaybackStateDTO getPlaybackState(
        @PathVariable Long roomId,
        @AuthUser UserAuthData authData
    ) {

        PlaybackState state = playbackStateRepository
            .findByTargetIdAndTargetType(roomId, PlaybackTargetType.ROOM)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        return PlaybackStateDTO.ofState(state);
    }
    
    @PostMapping("/update-state")
    @Authenticated
    public void updatePlaybackState(
        @RequestBody PlaybackStateDTO state,
        @PathVariable Long roomId,
        @AuthUser UserAuthData authData
    ) {

        if (shouldIgnore(authData.id(), "updatePlayback")) {
            return;
        }

        PlaybackCommand cmd = new UpdatePlayback(state, authData);

        audioStreamWorkerManager.get(authData.sub()).submit(cmd);
    }

    @PostMapping("/change-track")
    @Authenticated
    public void changeTrack(
        @RequestParam String changing,
        @PathVariable Long roomId,
        @AuthUser UserAuthData authData
    ) {

        if (shouldIgnore(authData.id(), "changeTrack")) {
            return;
        }

        PlaybackCommand cmd = new ChangeTrack(changing, authData);

        audioStreamWorkerManager.get(authData.sub()).submit(cmd);
    }

    @PostMapping("/subscribe")
    @Authenticated
    public void subscribe(
        @RequestParam PlaybackTargetType targetType,
        @RequestParam Long targetId,
        @AuthUser UserAuthData authData
    ) {
        playbackSessionService.subscribe(authData, targetType, targetId);
    }

    @PostMapping("/unsubscribe")
    @Authenticated
    public void unsubscribe(
        @AuthUser UserAuthData authData
    ) {
        playbackSessionService.unsubscribe(authData);
    }

    @PostMapping("/{targetId}/mode")
    @Authenticated
    public void updatePlaybackMode(
        @PathVariable Long targetId,
        @RequestParam PlaybackTargetType targetType,
        @RequestParam PlaybackMode mode,
        @AuthUser UserAuthData authData
    ) {
        playbackService.updatePlaybackMode(targetId, targetType, mode, authData);
    }

    private boolean shouldIgnore(Long userId, String action) {
        long now = System.currentTimeMillis();

        String key = userId + ":" + action;

        Long last = lastUpdate.get(key);

        if (last != null && now - last < UPDATE_DELAY_MS) {
            return true;
        }

        lastUpdate.put(key, now);
        return false;
    }
}
