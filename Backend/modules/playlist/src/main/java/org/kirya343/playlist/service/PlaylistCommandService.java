package org.kirya343.playlist.service;

import java.util.ArrayList;
import java.util.List;

import org.kirya343.audio.datasource.AudioFileRepository;
import org.kirya343.common.event.playback.QueueChangedEvent;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.model.QueueItem;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.datasource.repository.QueueItemRepository;
import org.kirya343.playlist.dto.PlaylistCreateDTO;
import org.kirya343.playlist.dto.PlaylistDTO;
import org.kirya343.playlist.dto.queue.QueueItemCreateDTO;
import org.kirya343.user.datasource.User;
import org.kirya343.security.core.dto.UserAuthData;
import org.kirya343.security.services.UserAuthDataService;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor 
public class PlaylistCommandService {

    private final QueueItemRepository queueItemRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final UserAuthDataService userAuthDataService;
    private final PlaylistRepository playlistRepository;
    private final AudioFileRepository audioFileRepository;

    public PlaylistDTO createPlaylist(PlaylistCreateDTO dto, UserAuthData authData) {
        User user = userAuthDataService.parse(authData);

        if (user == null) throw new ResponseStatusException(HttpStatus.FORBIDDEN);

        Playlist playlist = new Playlist(dto.title(), user);

        Playlist saved = playlistRepository.save(playlist);

        if (dto.audios() != null && dto.audios().size() > 0) {
            addQueueList(dto.audios(), saved.getId(), authData);
        }

        return PlaylistDTO.ofPlaylistShort(saved);
    }

    @Transactional
    public void importPlaylist(Long targetPlaylistId, Long playlistId, UserAuthData authData) {
        Playlist playlist = playlistRepository.findById(playlistId).orElseThrow();

        List<QueueItemCreateDTO> list = new ArrayList<>();

        for (QueueItem qi : playlist.getQueue()) {
            list.add(new QueueItemCreateDTO(qi.getAudio().getId(), qi.getPosition()));
        }

        if (list.size() > 0) {
            addQueueList(list, targetPlaylistId, authData);
        }
    }

    @Transactional
    public void addQueueList(List<QueueItemCreateDTO> list, Long playlistId, UserAuthData authData) {
        for (QueueItemCreateDTO dto : list) {
            addToQueue(playlistId, authData.id(), dto);
        }

        eventPublisher.publishEvent(
            new QueueChangedEvent(playlistId)
        );
    }

    @Transactional
    public void addRundomTracks(Integer amount, Long playlistId, UserAuthData authData) {

        log.debug("Adding {} rundom tracks to playlist {}", amount, playlistId);

        try {
            List<Long> audioIds = audioFileRepository
                .findRandomIdsByOwnerId(authData.id(), amount);

            log.debug("selected {} tracks from user {}", audioIds, authData.name());

            List<QueueItemCreateDTO> list = audioIds.stream()
                .map(audioId -> new QueueItemCreateDTO(audioId, null))
                .toList();

            for (QueueItemCreateDTO dto : list) {
                addToQueue(playlistId, authData.id(), dto);
            }

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
        QueueItemCreateDTO dto
    ) {
        if (dto.position() == null) {
            queueItemRepository.insertQueueItemAtEnd(
                playlistId,
                dto.audioId(),
                addedById
            );

            return;
        }

        int maxPosition = queueItemRepository.getMaxPosition(playlistId);

        if (dto.position() < 0 || dto.position() > maxPosition + 1) {
            throw new IllegalArgumentException(
                "Position must be between 0 and " + (maxPosition + 1)
            );
        }

        queueItemRepository.shiftQueueItems(
            playlistId,
            dto.position()
        );

        queueItemRepository.insertQueueItem(
            playlistId,
            dto.audioId(),
            dto.position(),
            addedById
        );
    }

    @Transactional
    public void removeQueueList(List<Long> list, Long playlistId, UserAuthData authData) {

        for (Long queueItemId : list) {

            removeFromQueue(playlistId, queueItemId, authData);
        }

        eventPublisher.publishEvent(
            new QueueChangedEvent(playlistId)
        );
    }

    @Transactional 
    public void removeFromQueue(Long playlistId, Long queueItemId, UserAuthData authData) {
        queueItemRepository.deleteByIdAndUserRoom(queueItemId, authData.id());

        log.debug("deleted");

        queueItemRepository.normalizePositions(playlistId);

        log.debug("shifted");
    }
}
