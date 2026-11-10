package org.kirya343.playback.infrastructure.command;

import org.kirya343.playback.application.command.ChangeTrack;
import org.kirya343.playback.application.command.PlaybackCommand;
import org.kirya343.playback.application.command.UpdatePlayback;
import org.kirya343.playback.application.event.PlaybackEvent;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.infrastructure.streaming.AudioStreamWorkerManager;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorker;
import org.kirya343.playback.infrastructure.streaming.PlaybackStreamWorkerManager;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class PlaybackCommandWorker {

    private final ApplicationEventPublisher publisher;
    private final QueueService queueService;
    private final QueueItemRepository queueItemRepository;
    private final PlaybackStreamWorkerManager playbackStreamWorkerManager;
    private final AudioStreamWorkerManager audioStreamWorkerManager;

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

        PlaybackStateDTO state = null;

        try {
            switch (cmd) {
                case UpdatePlayback c -> { 
                    
                    state = c.state();
                }
                case ChangeTrack c -> {

                    QueueItem entry = null;
                    
                    switch (c.changing()) {
                        case "prev":

                            entry = queueService.prevTrack(
                                playbackWorker.getTargetId(),
                                playbackWorker.getTargetType()
                            );

                            break;

                        case "next":

                            entry = queueService.nextTrack(
                                playbackWorker.getTargetId(),
                                playbackWorker.getTargetType()
                            );
                            
                            break;
                    
                        default:

                            try {

                                log.debug("Getting QueueEntry by {}", c.changing());

                                Long entryId = Long.parseLong(c.changing());

                                entry = queueItemRepository.findByIdWithAudio(entryId).orElseThrow();

                            } catch (NumberFormatException e) {
                                throw e;
                            }
                            
                            break;
                    }

                    state = new PlaybackStateDTO(
                        cmd.user().name(), 
                        entry.getId(), 
                        0.0, 
                        false
                    );


                    playbackWorker.setCurrentAudio(entry.getAudio());

                }
                default -> throw new RuntimeException("Введена неверная команда");
            };

            playbackWorker.applyState(state);

            publisher.publishEvent(
                new PlaybackEvent(
                    playbackWorker.getTargetId(),
                    playbackWorker.getTargetType(), 
                    state, 
                    authData
                ));

        } catch (Exception e) {
            log.debug("Ошибка обработки команды комнаты: {}", e);
        }
    }
}
