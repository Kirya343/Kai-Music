package org.kirya343.audio.datasource;

import java.util.List;
import java.util.Optional;

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

    @Query(value = """
        SELECT af.id
        FROM audio_file af
        WHERE af.owner_id = :ownerId
        AND NOT EXISTS (
            SELECT 1
            FROM queue_items qi
            WHERE qi.audio_id = af.id
            AND qi.playlist_id = :playlistId
        )
        ORDER BY RAND()
        LIMIT :amount
        """, nativeQuery = true)
    List<Long> findRandomIdsByOwnerId(
        @Param("ownerId") Long ownerId,
        @Param("playlistId") Long playlistId,
        @Param("amount") int amount
    );

    @Query(value = """
        SELECT af.id
        FROM audio_file af
        WHERE NOT EXISTS (
            SELECT 1
            FROM queue_items qi
            WHERE qi.audio_id = af.id
            AND qi.playlist_id = :playlistId
        )
        ORDER BY RAND()
        LIMIT :amount
        """, nativeQuery = true)
    List<Long> findRandomIds(
        @Param("playlistId") Long playlistId,
        @Param("amount") int amount
    );
}
