package org.kirya343.playlist.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.kirya343.audio.datasource.AudioFileRepository;
import org.kirya343.common.event.playback.QueueChangedEvent;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.kirya343.playlist.dto.queue.QueueItemCreateDTO;
import org.kirya343.playlist.enums.PlaylistType;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor 
public class PlaylistQueueService {

    private final QueueItemRepository queueItemRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final PlaylistRepository playlistRepository;
    private final AudioFileRepository audioFileRepository;
    private final ObjectMapper objectMapper;
    private final PlaylistQueryService playlistQueryService;
    
    @Transactional 
    public void importPlaylist(Long targetPlaylistId, Long sourcePlaylistId, UserAuthData authData) {
        int copied = playlistRepository.copyPlaylistItems(sourcePlaylistId, targetPlaylistId);

        log.debug("Скопировано {} аудио в плейлист {}", copied, targetPlaylistId);

        eventPublisher.publishEvent(new QueueChangedEvent(targetPlaylistId));
    }

    @Transactional
    public void setAudiosLiked(List<QueueItemCreateDTO> list, UserAuthData authData) {
        Playlist playlist = playlistQueryService.getOrCreateLikedPlaylist(authData.id());

        addQueueList(list, playlist.getId(), authData);
    }

    @Transactional
    public void unsetAudiosLiked(List<Long> list, UserAuthData authData) {
        Playlist playlist = playlistRepository.findPlaylistByTypeByOwnerId(authData.id(), PlaylistType.LIKED)
            .orElseThrow(); // Exception becouse if user does not have playlist, he can't remove anything

        removeQueueList(list, playlist.getId(), authData);
    }

    @Transactional
    public void addQueueList(List<QueueItemCreateDTO> list, Long playlistId, UserAuthData authData) {
        addToQueue(playlistId, authData.id(), list);

        eventPublisher.publishEvent(
            new QueueChangedEvent(playlistId)
        );
    }

    @Transactional
    public void addRundomTracks(Integer amount, Long playlistId, UserAuthData authData) {

        log.debug("Adding {} rundom tracks to playlist {}", amount, playlistId);

        Pageable pageable = PageRequest.of(0, amount);

        try {
            Slice<Long> audioIds = audioFileRepository.findRandomIds(playlistId, pageable);

            log.debug("selected {} tracks from user {}", audioIds, authData.name());

            List<QueueItemCreateDTO> list = audioIds.stream()
                .map(audioId -> new QueueItemCreateDTO(audioId, null))
                .toList();

            addToQueue(playlistId, authData.id(), list);

            log.debug("Added to queue");

            eventPublisher.publishEvent(
                new QueueChangedEvent(playlistId)
            );
        } catch (Exception e) {
            log.debug("Adding rundom tracks is failed: {}", e);
        }
    }
    
    @Transactional
    public void addToQueue(
        Long playlistId,
        Long addedById,
        List<QueueItemCreateDTO> dtoList
    ) {
        Map<Long, QueueItemCreateDTO> uniqueItems = new LinkedHashMap<>();

        for (QueueItemCreateDTO item : dtoList) {
            uniqueItems.putIfAbsent(item.audioId(), item);
        }

        dtoList = new ArrayList<>(uniqueItems.values());

        List<Long> unpositioned = dtoList.stream()
            .filter(qi -> qi.position() == null)
            .map(QueueItemCreateDTO::audioId)
            .toList();

        List<QueueItemCreateDTO> positioned = dtoList.stream()
            .filter(qi -> qi.position() != null)
            .toList();

        try {
            // 1. Получаем исходную максимальную позицию
            int maxPosition = queueItemRepository.getMaxPosition(playlistId);

            // 2. Нормализуем позиции новых элементов
            List<QueueItemCreateDTO> normalizedPositioned = new ArrayList<>();
            Set<Long> usedPositions = new HashSet<>();

            for (QueueItemCreateDTO item : positioned) {
                Long position = item.position();

                if (position < 0 || position > maxPosition + 1) {
                    throw new IllegalArgumentException(
                        "Position must be between 0 and " + (maxPosition + 1)
                    );
                }

                while (!usedPositions.add(position)) {
                    position++;
                }

                normalizedPositioned.add(
                    new QueueItemCreateDTO(item.audioId(), position)
                );
            }

            // 3. Сдвигаем существующие элементы
            String positionsJson = objectMapper.writeValueAsString(
                normalizedPositioned.stream()
                    .map(QueueItemCreateDTO::position)
                    .sorted()
                    .toList()
            );

            if (!normalizedPositioned.isEmpty()) {
                queueItemRepository.shiftQueueItems(
                    playlistId,
                    positionsJson
                );

                // 4. Добавляем элементы на указанные позиции
                String positionedJson = objectMapper.writeValueAsString(
                    normalizedPositioned
                );

                queueItemRepository.insertQueueItems(
                    playlistId,
                    positionedJson,
                    addedById
                );
            }

            // 5. Добавляем элементы без позиции в конец
            if (!unpositioned.isEmpty()) {
                String unpositionedJson = objectMapper.writeValueAsString(
                    unpositioned
                );

                queueItemRepository.insertQueueItemsAtEnd(
                    playlistId,
                    unpositionedJson,
                    addedById
                );
            }

            eventPublisher.publishEvent(
                new QueueChangedEvent(playlistId)
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void removeQueueList(List<Long> list, Long playlistId, UserAuthData authData) {

        int deleted = queueItemRepository.deleteAllByAudioIdsAndPlaylistId(
            list,
            playlistId
        );

        log.debug("Deleted queue items from playlist {}: {}", playlistId, deleted);

        queueItemRepository.normalizePositions(playlistId);

        log.debug("shifted");

        eventPublisher.publishEvent(
            new QueueChangedEvent(playlistId)
        );
    }
}
