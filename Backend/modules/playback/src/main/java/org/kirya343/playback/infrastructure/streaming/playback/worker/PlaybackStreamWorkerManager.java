package org.kirya343.playback.infrastructure.streaming.playback.worker;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.repository.PlaybackStateRepository;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.audio.services.AudioQueryService;
import org.kirya343.audio.services.storage.AudioStorageService;
import org.kirya343.playback.application.service.QueueService;
import org.kirya343.playback.domain.dto.PlaybackTarget;
import org.kirya343.playback.domain.enums.PlaybackTargetType;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.api.component.DiagnosticComponent;
import io.github.kirya343.terminal.formatting.DiagnosticTextBuilder;
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
    private final AudioQueryService audioQueryService;
    private final AudioStorageService audioStorageService;

    private final Map<PlaybackTargetType, Map<Long, PlaybackStreamWorker>> workers =
            new ConcurrentHashMap<>();

    public boolean checkWorker(PlaybackTargetType type, Long id) {
        return workers.get(type).get(id) != null;
    }

    public long countAll() {
        return workers.size();
    }

    public List<PlaybackStreamWorker> getAll() {
        return workers.values()
            .stream()
            .flatMap(map -> map.values().stream())
            .toList();
    }

    public Set<Long> keySet(PlaybackTargetType type) {
        return workers.computeIfAbsent(type, key -> new ConcurrentHashMap<>()).keySet();
    }

    public PlaybackStreamWorker get(PlaybackTarget target) {

        log.debug("Пытаемся получить {} воркер для {}", target);

        PlaybackStreamWorker worker = workers
            .computeIfAbsent(target.type(), key -> new ConcurrentHashMap<>())
            .computeIfAbsent(target.id(), key -> createWorker(target));

        if (worker == null) {

            createWorker(target);
        }

        return worker;
    }

    private PlaybackStreamWorker createWorker(PlaybackTarget target) {

        log.debug("Создаём новый воркер {}", target);

        PlaybackState state = playbackStateRepository
                .findByTargetIdAndTargetType(target.id(), target.type())
                .orElse(null);

        try {
            PlaybackStreamWorker worker = new PlaybackStreamWorker(
                target,
                eventPublisher, 
                PlaybackStateDTO.ofState(state),
                queueService,
                audioStorageService,
                audioQueryService
            );

            log.debug("Успешно создан воркер {}", target);

            return worker;
        } catch (Exception e) {
            log.error("Ошибка создания {} воркера {}", target, e);
            throw e;
        }
    }

    public void removeWorker(PlaybackTargetType type, Long id) {

        PlaybackStreamWorker worker = workers
            .computeIfAbsent(type, key -> new ConcurrentHashMap<>())
            .remove(id);

        if (worker != null) {
            worker.shutdown();
        }
    }

    // Diagnotsic

    public String getComponentId() {
        return "playbacks";
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

                PlaybackTarget target = getTargetFromArgs(args);

                return new StreamingResult(
                    () -> get(target).getFormattedLogs().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        DiagnosticCommand infoCommand = new DiagnosticCommand() {

            public String getName() {
                return "info";
            }

            public String getDescription() {
                return "Shows playback worker info";
            }
            
            public StreamingResult execute(String[] args) {

                PlaybackTarget target = getTargetFromArgs(args);

                return new StreamingResult(
                    () -> get(target).getInfo().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        DiagnosticCommand indexCommand = new DiagnosticCommand() {

            public String getName() {
                return "index";
            }

            public String getDescription() {
                return "Shows all playback workers";
            }
            
            public StreamingResult execute(String[] args) {

                String param = "";

                if (args.length == 1) {
                    param = args[0];
                }

                String resolved = param;

                return new StreamingResult(
                    () -> {
                        DiagnosticTextBuilder builder = new DiagnosticTextBuilder("Playbacks: ");

                        getAll().forEach(playback -> {
                            builder.addSection(playback.getInfo(resolved));
                        });

                        return builder.getContent();
                    },
                    StreamMode.REPLACE
                );
            }
        };

        return List.of(logsCommand, infoCommand, indexCommand);
    }

    private PlaybackTarget getTargetFromArgs(String[] args) {
        if (args.length != 2) {
            throw new IllegalArgumentException(
                "Usage: stream-workers logs <type> <id>"
            );
        }

        try {
            PlaybackTargetType type = PlaybackTargetType.valueOf(args[0]);
            Long id = Long.parseLong(args[1]);

            return new PlaybackTarget(type, id);
        } catch (NumberFormatException exception) {
            throw new IllegalArgumentException(
                "Target ID must be a number: " + args[0]
            );
        }
    }
}