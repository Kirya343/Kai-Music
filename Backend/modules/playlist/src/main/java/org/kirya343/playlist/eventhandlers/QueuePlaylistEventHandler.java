package org.kirya343.playlist.eventhandlers;

import org.kirya343.common.event.playback.QueueChangedEvent;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.dto.PlaylistDTO;
import org.kirya343.playlist.service.PlaylistWebSocketService;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class QueuePlaylistEventHandler {

    private final PlaylistRepository playlistRepository;
    private final PlaylistWebSocketService playlistWebSocketService;
    
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void handleQueueChanged(QueueChangedEvent event) {

        log.debug("Обновлён плейлист: {}", event.playlistId());

        Playlist playlist = playlistRepository.findById(event.playlistId()).orElseThrow();

        playlistWebSocketService.broadcastPlaylist(playlist.getOwner().getSub(), PlaylistDTO.ofPlaylist(playlist));
    }
}
