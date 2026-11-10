package org.kirya343.audio.datasource;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AudioFileRepository extends 
    JpaRepository<AudioFile, Long>,
    JpaSpecificationExecutor<AudioFile>  {

    @Query("""
        SELECT a
        FROM QueueItem q
        JOIN q.audio a
        WHERE q.id = :queueItemId
    """)
    Optional<AudioFile> findAudioByQueueItem(
        Long queueItemId
    );

    List<AudioFile> findByOwnerId(Long ownerId);

    @Query("""
        SELECT af.id
        FROM AudioFile af
        WHERE af.owner.id = :ownerId
        AND NOT EXISTS (
            SELECT qi.id
            FROM QueueItem qi
            WHERE qi.audio.id = af.id
            AND qi.playlist.id = :playlistId
        )
        ORDER BY FUNCTION('RAND')
        """)
    Slice<Long> findRandomIdsByOwnerId(
        @Param("ownerId") Long ownerId,
        @Param("playlistId") Long playlistId,
        Pageable pageable
    );

    @Query("""
        SELECT af.id
        FROM AudioFile af
        WHERE NOT EXISTS (
            SELECT qi.id
            FROM QueueItem qi
            WHERE qi.audio.id = af.id
            AND qi.playlist.id = :playlistId
        )
        ORDER BY FUNCTION('RAND')
        """)
    Slice<Long> findRandomIds(
        @Param("playlistId") Long playlistId,
        Pageable pageable
    );
}
