package org.kirya343.playlist.dto;

import java.util.List;

import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.dto.queue.QueueItemDTO;
import org.kirya343.playlist.enums.PlaylistType;

public record PlaylistDTO(
    Long id,
    Long ownerId,
    PlaylistType type,
    String title,
    List<QueueItemDTO> queue
) {
    public static PlaylistDTO ofPlaylist(Playlist playlist) {

        return new PlaylistDTO(
            playlist.getId(),
            playlist.getOwner() != null ? playlist.getOwner().getId() : null,
            playlist.getType(),
            playlist.getTitle(),
            QueueItemDTO.ofList(playlist.getQueue())
        );
    }

    public static PlaylistDTO ofPlaylistShort(Playlist playlist) {

        return new PlaylistDTO(
            playlist.getId(),
            playlist.getOwner().getId(),
            playlist.getType(),
            playlist.getTitle(),
            null
        );
    }

    public static List<PlaylistDTO> ofListShort(List<Playlist> playlists) {
        return playlists.stream().map(p -> PlaylistDTO.ofPlaylistShort(p)).toList();
    }

    public static List<PlaylistDTO> ofList(List<Playlist> playlists) {
        return playlists.stream().map(p -> PlaylistDTO.ofPlaylist(p)).toList();
    }
}
