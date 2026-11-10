package org.kirya343.playback.infrastructure.streaming;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.enums.PlaybackTargetType;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.api.component.DiagnosticComponent;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class PlaybackStreamWorkerManager implements DiagnosticComponent {

    private final ApplicationEventPublisher eventPublisher;
    private final PlaybackStateRepository playbackStateRepository;
    private final QueueService queueService;

    private final Map<PlaybackTargetType, Map<Long, PlaybackStreamWorker>> workers =
            new ConcurrentHashMap<>();

    public boolean checkWorker(PlaybackTargetType type, Long id) {
        return workers.get(type).get(id) != null;
    }

    public long countAll() {
        return workers.size();
    }

    public Set<Long> keySet(PlaybackTargetType type) {
        return workers.computeIfAbsent(type, key -> new ConcurrentHashMap<>()).keySet();
    }

    public PlaybackStreamWorker get(PlaybackTargetType type, Long id) {

        log.debug("Пытаемся получить {} воркер для {}", type, id);

        PlaybackStreamWorker worker = workers
            .computeIfAbsent(type, key -> new ConcurrentHashMap<>()).get(id);

        if (worker == null) {

            log.debug("Создаём новый {} воркер {}", type, id);

            PlaybackState state = playbackStateRepository
                .findByTargetIdAndTargetType(id, type)
                .orElse(null);

            try {
                worker = new PlaybackStreamWorker(
                    id,
                    type,
                    eventPublisher, 
                    PlaybackStateDTO.ofState(state),
                    queueService
                );
            } catch (Exception e) {
                log.error("Ошибка создания {} воркера {}", type, id, e);
                throw e;
            }

            log.debug("Кладём к остальным {} воркер {}", type, id);

            workers
                .computeIfAbsent(type, key -> new ConcurrentHashMap<>())
                .putIfAbsent(id, worker);
        }

        return worker;
    }

    public void removeWorker(PlaybackTargetType type, Long id) {

        PlaybackStreamWorker worker = workers
            .computeIfAbsent(type, key -> new ConcurrentHashMap<>()).remove(id);

        if (worker != null) {
            worker.cancelTask();
        }
    }

    // Diagnotsic

    public String getComponentId() {
        return "stream-workers";
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

                if (args.length != 2) {
                    throw new IllegalArgumentException(
                        "Usage: stream-workers logs <type> <id>"
                    );
                }

                PlaybackTargetType type;
                Long id;

                try {
                    type = PlaybackTargetType.valueOf(args[0]);
                    id = Long.parseLong(args[1]);
                } catch (NumberFormatException exception) {
                    throw new IllegalArgumentException(
                        "Target ID must be a number: " + args[0]
                    );
                }

                return new StreamingResult(
                    () -> get(type, id).getLogs().getContent(),
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

                if (args.length != 2) {
                    throw new IllegalArgumentException(
                        "Usage: stream-workers room <type> <id>"
                    );
                }

                PlaybackTargetType type;
                Long id;

                try {
                    type = PlaybackTargetType.valueOf(args[0]);
                    id = Long.parseLong(args[1]);
                } catch (NumberFormatException exception) {
                    throw new IllegalArgumentException(
                        "Target ID must be a number: " + args[0]
                    );
                }

                return new StreamingResult(
                    () -> get(type, id).getInfo().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        return List.of(logsCommand, infoCommand);
    }
}