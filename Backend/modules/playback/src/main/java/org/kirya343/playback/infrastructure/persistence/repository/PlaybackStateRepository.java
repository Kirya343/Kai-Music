package org.kirya343.playback.infrastructure.persistence.repository;

import java.util.Optional;

import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PlaybackStateRepository extends JpaRepository<PlaybackState, Long> {
    Optional<PlaybackState> findByTargetIdAndTargetType(
        Long targetId,
        PlaybackTargetType targetType
    );

    @Query("""
        SELECT DISTINCT ps
        FROM PlaybackState ps
        LEFT JOIN FETCH ps.playlist p
        LEFT JOIN FETCH p.queue q
        LEFT JOIN FETCH q.audio
        WHERE ps.targetId = :targetId
        AND ps.targetType = :targetType
        """)
    Optional<PlaybackState> findWithPlaylistByTargetIdAndTargetType(
        @Param("targetId") Long targetId,
        @Param("targetType") PlaybackTargetType targetType
    );

    @Query("""
        SELECT DISTINCT ps
        FROM PlaybackState ps
        LEFT JOIN FETCH ps.playlist p
        LEFT JOIN FETCH p.queue q
        LEFT JOIN FETCH q.audio
        WHERE p.id = :playlistId
        """)
    Optional<PlaybackState> findByPlaylistId(
        @Param("playlistId") Long playlistId
    );

    @Transactional 
    @Modifying 
    @Query("""
        UPDATE PlaybackState ps
        SET ps.playbackMode = :playbackMode
        WHERE ps.targetId = :targetId
        AND ps.targetType = :targetType
    """)
    int updatePlaybackMode(
        @Param("targetId") Long targetId, 
        @Param("targetType") PlaybackTargetType targetType, 
        @Param("playbackMode") PlaybackMode playbackMode
    );
}
