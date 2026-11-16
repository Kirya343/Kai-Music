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

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class PlaybackStreamWorkerManager {

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
}