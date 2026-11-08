package org.kirya343.playback.application.service;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class PlaybackService {

    private final PlaybackStateRepository playbackStateRepository;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    
    public void updatePlaybackMode(Long id, PlaybackTargetType type, PlaybackMode mode, UserAuthData authData) {
        playbackStateRepository.updatePlaybackMode(id, type, mode);

        playbackStreamWorkerManager.get(type, id)
            .broadcast(userWorker -> userWorker.sendPlaybackMode(mode));
    }
}
