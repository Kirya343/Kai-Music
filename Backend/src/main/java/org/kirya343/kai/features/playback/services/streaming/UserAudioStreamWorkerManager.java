package org.kirya343.kai.features.playback.services.streaming;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.kai.features.audio.services.AudioQueryService;
import org.kirya343.kai.features.audio.services.storage.AudioStorageService;
import org.kirya343.kai.features.playback.PlaybackWebsocketService;
import io.github.kirya343.terminal.components.commands.DiagnosticCommand;
import io.github.kirya343.terminal.components.DiagnosticComponent;
import io.github.kirya343.terminal.models.CommandResult;
import io.github.kirya343.terminal.models.StreamMode;
import io.github.kirya343.terminal.models.StreamingResult;
import io.github.kirya343.terminal.models.TextResult;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j 
@Component 
@RequiredArgsConstructor 
public class UserAudioStreamWorkerManager 
    implements DiagnosticComponent {

    private final AudioQueryService audioQueryService;
    private final PlaybackWebsocketService playbackWebsocketService;
    private final AudioStorageService audioStorageService;

    private final Map<String, UserAudioStreamWorker> workers =
            new ConcurrentHashMap<>();

    public long countAll() {
        return workers.size();
    }

    public UserAudioStreamWorker getWorker(String userSub) {

        log.debug("Пытаемся получить воркер для пользователя {}", userSub);

        UserAudioStreamWorker worker = workers.get(userSub);

        if (worker == null) {

            log.debug("Создаём новый воркер для пользователя {}", userSub);

            worker = new UserAudioStreamWorker(
                userSub,
                audioQueryService,
                audioStorageService,
                playbackWebsocketService
            );

            log.debug("Кладём к остальным воркер для пользователя {}", userSub);

            workers.putIfAbsent(userSub, worker);
        }

        return worker;
    }

    public void removeWorker(String userSub) {

        UserAudioStreamWorker worker = workers.remove(userSub);

        log.debug("Удаляем воркер {}", userSub);

        log.debug("Воркеры стриминга пользователей {}", workers.keySet());

        if (worker != null) {
            worker.cancelTask();
        }
    }

    public String getComponentId() {
        return "user-workers";
    }

    public List<DiagnosticCommand> getCommands() {

        DiagnosticCommand logsCommand = new DiagnosticCommand() {

            public String getName() {
                return "logs";
            }

            public String getDescription() {
                return "Shows stream worker logs";
            }
            
            public CommandResult execute(String[] args) {

                if (args.length != 1) {
                    throw new IllegalArgumentException(
                        "Usage: room <roomId>"
                    );
                }

                String userSub = args[0];

                UserAudioStreamWorker worker = workers.get(userSub);

                if (worker == null) {
                    return new TextResult(String.format("Worker of user %s is offline", userSub));
                }

                return new StreamingResult(
                    () -> worker.getLogs().getContent(),
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
            
            public CommandResult execute(String[] args) {

                if (args.length != 1) {
                    throw new IllegalArgumentException(
                        "Usage: room <roomId>"
                    );
                }

                String userSub = args[0];

                UserAudioStreamWorker worker = workers.get(userSub);

                if (worker == null) {
                    return new TextResult(String.format("Worker of user %s is offline", userSub));
                }

                return new StreamingResult(
                    () -> worker.getInfo().getContent(),
                    StreamMode.REPLACE
                );
            }
        };

        return List.of(logsCommand, infoCommand);
    }
}
