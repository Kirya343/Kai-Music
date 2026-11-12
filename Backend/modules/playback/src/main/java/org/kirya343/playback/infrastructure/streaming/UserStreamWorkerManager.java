package org.kirya343.playback.infrastructure.streaming;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.audio.services.storage.AudioStorageService;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;
import org.springframework.stereotype.Component;

import io.github.kirya343.terminal.api.command.DiagnosticCommand;
import io.github.kirya343.terminal.api.component.DiagnosticComponent;
import io.github.kirya343.terminal.result.CommandResult;
import io.github.kirya343.terminal.result.StreamMode;
import io.github.kirya343.terminal.result.StreamingResult;
import io.github.kirya343.terminal.result.TextResult;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component 
@Slf4j 
@RequiredArgsConstructor 
public class UserStreamWorkerManager 
    implements DiagnosticComponent {

    private final PlaybackWebsocketService playbackWebsocketService;
    private final AudioStorageService audioStorageService;
    private final AudioStreamService audioStreamService;

    private final Map<String, UserStreamWorker> workers =
        new ConcurrentHashMap<>();

    public UserStreamWorker get(String userSub) {

        log.debug("Пытаемся получить воркер для пользователя {}", userSub);

        UserStreamWorker worker = workers.get(userSub);

        if (worker == null) {

            log.debug("Создаём новый воркер для пользователя {}", userSub);

            worker = new UserStreamWorker(
                userSub,
                audioStorageService,
                playbackWebsocketService,
                audioStreamService
            );

            log.debug("Кладём к остальным воркер для пользователя {}", userSub);

            workers.putIfAbsent(userSub, worker);
        }

        return worker;
    }

    public void register(UserStreamWorker worker) {
        workers.put(worker.getUserSub(), worker);
    }

    public void unregister(String userSub) {
        UserStreamWorker worker = workers.remove(userSub);

        log.debug("Удаляем воркер {}", userSub);

        if (worker != null) {
            worker.unsubscribe();
            worker.cancelTask();
        }
    }

    public long countAll() {
        return workers.size();
    }

    public String getComponentId() {
        return "audio-workers";
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
                        "Usage: audio-workers <userSub>"
                    );
                }

                String userSub = args[0];

                UserStreamWorker worker = workers.get(userSub);

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

                UserStreamWorker worker = workers.get(userSub);

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