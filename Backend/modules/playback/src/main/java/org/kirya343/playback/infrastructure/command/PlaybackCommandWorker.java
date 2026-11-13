package org.kirya343.playback.infrastructure.command;

import org.kirya343.playback.application.command.ChangeTrack;
import org.kirya343.playback.application.command.PlaybackCommand;
import org.kirya343.playback.application.command.UpdatePlayback;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.streaming.playback.PlaybackStreamWorker;
import org.kirya343.playback.infrastructure.streaming.playback.PlaybackStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.user.UserStreamWorkerManager;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class PlaybackCommandWorker {

    private final QueueService queueService;
    private final QueueItemRepository queueItemRepository;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    private final UserStreamWorkerManager audioStreamWorkerManager;

    @EventListener 
    public void handle(PlaybackCommand cmd) {

        UserAuthData authData = cmd.user();

        PlaybackStreamWorker playbackWorker;
        
        if (cmd.targetId() != null && cmd.targetType() != null) {
            playbackWorker = playbackStreamWorkerManager.get(cmd.targetType(), cmd.targetId());
        } else {
            playbackWorker = audioStreamWorkerManager
                .get(authData.sub())
                .getSubscribedWorker();
        }

        switch (cmd) {
            case UpdatePlayback c -> { 

                playbackWorker.applyState(c.state());
            }
            case ChangeTrack c -> {

                try {
                    QueueItem entry = getSuitableTrack(
                        c, 
                        playbackWorker.getTargetId(), 
                        playbackWorker.getTargetType()
                    );

                    playbackWorker.changeTrack(entry, cmd.user().name());

                } catch (EntityNotFoundException e) {
                    log.warn("No suitable track found. Stopping playback scheduler.");
                    playbackWorker.stop();
                }

            }
            default -> throw new RuntimeException("Введена неверная команда");
        };
    }

    private QueueItem getSuitableTrack(
        ChangeTrack cmd, 
        Long id, 
        PlaybackTargetType type
    ) throws IllegalStateException {

        QueueItem entry = null;

        switch (cmd.changing()) {
            case "prev":

                entry = queueService.prevTrack(id, type);

                break;

            case "next":

                entry = queueService.nextTrack(id, type);
                
                break;
        
            default:

                try {

                    log.debug("Getting QueueEntry by {}", cmd.changing());

                    Long entryId = Long.parseLong(cmd.changing());

                    entry = queueItemRepository.findByIdWithAudio(entryId).orElseThrow();

                } catch (NumberFormatException e) {
                    throw e;
                }
                
                break;
        }

        return entry;
    }
}
