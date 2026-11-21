package org.kirya343.playlist.dto;

import java.util.List;

import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.dto.queue.QueueItemDTO;
import org.kirya343.playlist.enums.PlaylistType;
import org.kirya343.user.dto.ShortUserDTO;

public record PlaylistDTO(
    Long id,
    ShortUserDTO owner,
    Long sourcePlaylistId,
    int saved,
    Long position,
    boolean isPublic,
    PlaylistType type,
    String title,
    List<QueueItemDTO> queue
) {
    public static PlaylistDTO ofPlaylist(Playlist playlist) {

        return new PlaylistDTO(
            playlist.getId(),
            ShortUserDTO.ofUser(playlist.getOwner()),
            playlist.getSourcePlaylistId(),
            playlist.getSavedBy().size(),
            playlist.getPosition(),
            playlist.isPublic(),
            playlist.getType(),
            playlist.getTitle(),
            QueueItemDTO.ofList(playlist.getQueue())
        );
    }

    public static PlaylistDTO ofPlaylistShort(Playlist playlist) {

        return new PlaylistDTO(
            playlist.getId(),
            ShortUserDTO.ofUser(playlist.getOwner()),
            playlist.getSourcePlaylistId(),
            0,
            playlist.getPosition(),
            playlist.isPublic(),
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
