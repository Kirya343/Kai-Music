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
        SELECT id
        FROM audio_file
        WHERE owner_id = :ownerId
        ORDER BY RAND()
        LIMIT :amount
        """, nativeQuery = true)
    List<Long> findRandomIdsByOwnerId(
        @Param("ownerId") Long ownerId,
        @Param("amount") int amount
    );
}
