package org.kirya343.playlist.datasource.repository;

import java.util.List;
import java.util.Optional;

import org.kirya343.playlist.datasource.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query("""
        SELECT r.playlist
        FROM ListeningRoom r
        WHERE r.id = :roomId
    """)
    Optional<Playlist> findByRoomId(@Param("roomId") Long roomId);

    @Query("""
        SELECT p
        FROM Playlist p
        WHERE p.owner.id = :userId
        AND NOT EXISTS (
            SELECT r
            FROM ListeningRoom r
            WHERE r.playlist = p
        )
    """)
    List<Playlist> findUserPlaylists(@Param("userId") Long userId);
}
