package org.kirya343.playback.infrastructure.streaming.user.worker;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.playback.infrastructure.streaming.user.AudioStreamService;
import org.kirya343.playback.presentation.websocket.PlaybackWebsocketService;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component 
@Slf4j 
@RequiredArgsConstructor 
public class UserStreamWorkerManager {

    private final PlaybackWebsocketService playbackWebsocketService;
    private final AudioStreamService audioStreamService;

    private final Map<String, UserStreamWorker> workers =
        new ConcurrentHashMap<>();

    public boolean exist(String userSub) {
        return workers.containsKey(userSub);
    }

    public Map<String, UserStreamWorker> workers() {
        return workers;
    }

    public UserStreamWorker get(String userSub) {

        UserStreamWorker worker = workers.get(userSub);

        if (worker == null) {

            log.debug("Создаём новый воркер для пользователя {}", userSub);

            worker = new UserStreamWorker(
                userSub,
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

    public UserStreamWorker unregister(String userSub) {
        UserStreamWorker worker = workers.remove(userSub);

        log.debug("Удаляем воркер {}", userSub);

        if (worker != null) {
            worker.unsubscribe();
            worker.cancelTask();
        }

        return worker;
    }

    public long countAll() {
        return workers.size();
    }
}