package org.kirya343.playlist.service;

import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.dto.PlaylistCreateDTO;
import org.kirya343.user.datasource.User;
import org.kirya343.user.datasource.UserRepository;
import org.kirya343.security.core.dto.UserAuthData;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service 
@Slf4j 
@RequiredArgsConstructor 
public class PlaylistCommandService {

    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;
    private final PlaylistQueueService playlistQueueService;

    @Transactional 
    public Playlist createPlaylist(PlaylistCreateDTO dto, UserAuthData authData) {
        User user = userRepository.getReferenceById(authData.id());

        Playlist playlist = new Playlist(dto.title(), user);

        Playlist saved = playlistRepository.save(playlist);

        if (dto != null && dto.audios() != null && dto.audios().size() > 0) {
            playlistQueueService.addQueueList(dto.audios(), saved.getId(), authData);
        }

        return saved;
    }

    public void deletePlaylist(Long playlistId, UserAuthData authData) {

        // TODO user permission check

        playlistRepository.deleteById(playlistId);
    }
}
