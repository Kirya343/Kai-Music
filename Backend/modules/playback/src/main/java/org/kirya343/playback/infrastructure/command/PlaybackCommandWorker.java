package org.kirya343.playback.infrastructure.command;

import java.util.concurrent.ThreadPoolExecutor;

import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playback.application.command.ChangeTrack;
import org.kirya343.playback.application.command.RoomCommand;
import org.kirya343.playback.application.command.UpdatePlayback;
import org.kirya343.playback.application.event.RoomPlaybackEvent;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.model.RoomPlaybackContext;
import org.kirya343.playback.infrastructure.cache.RoomPlaybackContextStore;
import org.kirya343.playback.infrastructure.streaming.RoomStreamWorker;
import org.kirya343.playback.infrastructure.streaming.RoomStreamWorkerManager;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class PlaybackCommandWorker {

    private final ApplicationEventPublisher publisher;
    private final RoomPlaybackContextStore rooms;
    private final QueueService queueService;
    private final PlaybackWebsocketService webSocketService;
    private final PlaybackExecutorRegistry executorRegistry;
    private final RoomStreamWorkerManager roomStreamWorkerManager;
    private final QueueItemRepository queueItemRepository;

    public void submit(RoomCommand cmd) {

        ThreadPoolExecutor executor = executorRegistry.get(cmd.roomId());

        log.debug("Submit command {}", cmd.getClass());
        
        executor.submit(() -> handle(cmd));
    }

    private void handle(RoomCommand cmd) {
        RoomPlaybackContext roomContext = rooms.computeIfAbsent(cmd.roomId());

        UserAuthData authData = cmd.user();
        Long roomId = roomContext.getRoom().id();

        RoomStreamWorker streamWorker = roomStreamWorkerManager.getWorker(roomContext.getRoom().id());

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

                            entry = queueService.prevTrack(roomId);

                            break;

                        case "next":

                            entry = queueService.nextTrack(roomId);
                            
                            break;
                    
                        default:

                            try {

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

                    roomContext.setCurrentAudio(
                        entry.getAudio()
                    );

                }
                default -> throw new RuntimeException("Введена неверная команда");
            };

            streamWorker.applyState(state);

            publisher.publishEvent(
                new RoomPlaybackEvent(
                    roomContext.getRoom().id(), 
                    state, 
                    authData
                ));

            for (String user : roomContext.getListeners()) {
                webSocketService.broadcastPlaybackState(user, state);
            }   
        } catch (Exception e) {
            log.debug("Ошибка обработки команды комнаты: {}", e);
        }
    }
}
