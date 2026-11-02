package org.kirya343.playback.datasource.repository;

import java.util.Optional;

import org.kirya343.playback.datasource.model.PlaybackState;
import org.kirya343.playback.enums.PlaybackTargetType;
import org.kirya343.playback.enums.PlaybackMode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface PlaybackStateRepository extends JpaRepository<PlaybackState, Long> {
    Optional<PlaybackState> findByTargetIdAndTargetType(Long targetId, PlaybackTargetType targetType);

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
