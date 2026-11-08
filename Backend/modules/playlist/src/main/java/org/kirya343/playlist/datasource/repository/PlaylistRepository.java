package org.kirya343.playlist.datasource.repository;

import java.util.List;
import java.util.Optional;

import org.kirya343.playlist.datasource.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query("""
        SELECT ps.playlist
        FROM PlaybackState ps
        WHERE ps.id = :stateId
    """)
    Optional<Playlist> findByPlaybackStateId(@Param("stateId") Long stateId);

    @Query("""
        SELECT p
        FROM Playlist p
        WHERE p.owner.id = :userId
        AND p.type = org.kirya343.playlist.enums.PlaylistType.LIKED
        """)
    Optional<Playlist> findLikedPlaylistByOwnerId(
        @Param("userId") Long userId
    );

    @Query("""
        SELECT p
        FROM Playlist p
        WHERE p.owner.id = :userId
        AND NOT EXISTS (
            SELECT ps
            FROM PlaybackState ps
            WHERE ps.playlist = p
        )
    """)
    List<Playlist> findUserPlaylists(@Param("userId") Long userId);

    @Modifying
    @Transactional 
    @Query(value = """
        INSERT INTO playlist (owner_id, type, name)
        SELECT :userId, 'LIKED', 'Liked Songs'
        WHERE NOT EXISTS (
            SELECT 1
            FROM playlist
            WHERE owner_id = :userId
            AND type = 'LIKED'
        )
        """, nativeQuery = true)
    int getOrCreateLikedPlaylistIfNotExists(@Param("userId") Long userId);
}
