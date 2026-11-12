package org.kirya343.playlist.service;

import java.util.Optional;

import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.datasource.repository.PlaylistRepository;
import org.kirya343.playlist.enums.PlaylistType;
import org.kirya343.user.datasource.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor 
@Service 
public class PlaylistQueryService {

    private final PlaylistRepository playlistRepository;
    private final UserRepository userRepository;
    
    public Playlist getOrCreatePlaylistByType(Long ownerId, PlaylistType type, String playlistName) {
        Optional<Playlist> playlist = playlistRepository.findPlaylistByTypeByOwnerId(ownerId, PlaylistType.LIKED);

        if (playlist.isEmpty()) {
            return playlistRepository.save(
                new Playlist(
                    "Liked songs", 
                    userRepository.getReferenceById(ownerId), 
                    PlaylistType.LIKED
                ));
        }

        return playlist.get();
    }

    public Playlist getOrCreateLikedPlaylist(Long ownerId) {
        return getOrCreatePlaylistByType(ownerId, PlaylistType.LIKED, "Liked songs");
    }

    public Playlist getOrCreateUploadedPlaylist(Long ownerId) {
        return getOrCreatePlaylistByType(ownerId, PlaylistType.UPLOADED, "Uploaded songs");
    }
}
