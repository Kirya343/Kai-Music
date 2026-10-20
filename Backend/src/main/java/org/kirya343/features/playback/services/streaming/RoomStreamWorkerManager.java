package org.kirya343.features.playback.services.streaming;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.features.playback.datasource.model.RoomPlaybackState;
import org.kirya343.features.playback.datasource.repository.RoomPlaybackStateRepository;
import org.kirya343.features.playback.dto.PlaybackStateDTO;
import org.kirya343.features.playback.services.cache.RoomPlaybackContext;
import org.kirya343.features.playback.services.cache.RoomPlaybackContextStore;
import org.kirya343.features.presence.services.PresenceService;
import org.kirya343.infrastructure.diagnostics.commands.DiagnosticCommand;
import org.kirya343.infrastructure.diagnostics.core.DiagnosticComponent;
import org.kirya343.infrastructure.diagnostics.models.StreamMode;
import org.kirya343.infrastructure.diagnostics.models.StreamingResult;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class RoomStreamWorkerManager implements DiagnosticComponent {

    private final RoomPlaybackContextStore roomPlaybackContextStore;
    private final ApplicationEventPublisher eventPublisher;
    private final RoomPlaybackStateRepository roomPlaybackStateRepository;
    private final UserAudioStreamWorkerManager userAudioStreamWorkerManager;
    private final PresenceService presenceService;

    private final Map<Long, RoomStreamWorker> workers =
            new ConcurrentHashMap<>();

    public boolean checkWorker(Long roomId) {
        return workers.get(roomId) != null;
    }

    public RoomStreamWorker getWorker(Long roomId) {

        log.debug("Пытаемся получить воркер для комнаты {}", roomId);

        RoomStreamWorker worker = workers.get(roomId);

        if (worker == null) {

            log.debug("Создаём новый воркер для комнаты {}", roomId);

            RoomPlaybackState state = roomPlaybackStateRepository.findById(roomId).orElse(null);

            RoomPlaybackContext context = roomPlaybackContextStore.computeIfAbsent(roomId);

            try {
                worker = new RoomStreamWorker(
                    roomId,
                    eventPublisher, 
                    userAudioStreamWorkerManager,
                    PlaybackStateDTO.ofState(state),
                    context,
                    presenceService
                );
            } catch (Exception e) {
                log.error("Ошибка создания воркера для комнаты {}", roomId, e);
                throw e;
            }

            log.debug("Кладём к остальным воркер для комнаты {}", roomId);

            workers.putIfAbsent(roomId, worker);
        }

        return worker;
    }

    public void removeWorker(Long roomId) {

        RoomStreamWorker worker = workers.remove(roomId);

        if (worker != null) {
            worker.cancelTask();
        }
    }

    public String getComponentId() {
        return "room-workers";
    }

    public List<DiagnosticCommand> getCommands() {

        DiagnosticCommand logsCommand = new DiagnosticCommand() {

            public String getName() {
                return "logs";
            }

            public String getDescription() {
                return "Shows stream worker logs";
            }
            
            public StreamingResult execute(String[] args) {

                if (args.length != 1) {
                    throw new IllegalArgumentException(
                        "Usage: room <roomId>"
                    );
                }

                Long roomId;

                try {
                    roomId = Long.parseLong(args[0]);
                } catch (NumberFormatException exception) {
                    throw new IllegalArgumentException(
                        "Room ID must be a number: " + args[0]
                    );
                }

                return new StreamingResult(
                    () -> getWorker(roomId).getLogs().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        DiagnosticCommand infoCommand = new DiagnosticCommand() {

            public String getName() {
                return "info";
            }

            public String getDescription() {
                return "Shows stream worker info";
            }
            
            public StreamingResult execute(String[] args) {

                if (args.length != 1) {
                    throw new IllegalArgumentException(
                        "Usage: room <roomId>"
                    );
                }

                Long roomId;

                try {
                    roomId = Long.parseLong(args[0]);
                } catch (NumberFormatException exception) {
                    throw new IllegalArgumentException(
                        "Room ID must be a number: " + args[0]
                    );
                }

                return new StreamingResult(
                    () -> getWorker(roomId).getInfo().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        return List.of(logsCommand, infoCommand);
    }
}