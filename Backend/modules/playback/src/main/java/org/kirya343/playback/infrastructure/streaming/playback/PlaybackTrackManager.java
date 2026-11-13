package org.kirya343.playback.infrastructure.streaming.playback;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.audio.services.AudioQueryService;
import org.kirya343.audio.services.storage.AudioStorageService;
import org.kirya343.audio.services.util.Fmp4Chunker;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.dto.PlaybackContext;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.QueueItem;

import jakarta.persistence.EntityNotFoundException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
@RequiredArgsConstructor 
public class PlaybackTrackManager {

    private final Long targetId;
    private final PlaybackTargetType targetType;

    private final QueueService queueService;
    private final AudioStorageService audioStorageService;
    private final AudioQueryService audioQueryService;

    @Getter 
    private volatile PlaybackContext currentPlayback;

    public PlaybackContext applyState(PlaybackStateDTO state) {

        log.debug("applyState %s", state.position());

        if (currentPlayback == null) {
            AudioFile audio = audioQueryService.getAudioByQueueItem(state.entryId());
            currentPlayback = createPlaybackContext(audio);
        } 

        PlaybackContext context = currentPlayback;

        context.applyState(state);

        return context;
    }
    
    public  void changeTrack(String initiator) {

        try {
            QueueItem entry = queueService.nextTrack(targetId, targetType);

            log.debug("Found next track: %s", entry.getId());

            changeTrack(entry, initiator);

        } catch (EntityNotFoundException e) {
            PlaybackContext context = currentPlayback;

            if (context == null) return;

            log.debug("Exception while auto-switching track: %s", e);

            PlaybackStateDTO newState = new PlaybackStateDTO(
                initiator,
                context.getState().entryId(),
                (double) context.getAudio().getDuration(),
                true
            );

            applyState(newState);
        }
    }

    public void changeTrack(QueueItem entry, String initiator) {
        currentPlayback = createPlaybackContext(entry.getAudio());

        PlaybackStateDTO newState = new PlaybackStateDTO(
            initiator,
            entry.getId(),
            0.0,
            false
        );

        applyState(newState);
    }

    private PlaybackContext createPlaybackContext(AudioFile audioFile) {
        return new PlaybackContext(
            audioFile,
            loadChunker(audioFile)
        );
    }

    private Fmp4Chunker loadChunker(AudioFile audioFile) {

        if (audioFile == null) {
            throw new IllegalStateException("Audiofile for chunker not found");
        }

        return new Fmp4Chunker(
            audioStorageService,
            audioFile.getPath(),
            audioFile.getChunks()
        ); 
    }
}
