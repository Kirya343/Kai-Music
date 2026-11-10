package org.kirya343.playlist.datasource.repository;

import java.util.List;
import java.util.Optional;

import org.kirya343.playlist.datasource.model.QueueItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface QueueItemRepository extends JpaRepository<QueueItem, Long> {

    @Modifying(
        clearAutomatically = true,
        flushAutomatically = true
    )
    @Query("""
        DELETE FROM QueueItem q
        WHERE q.id = :id
            AND EXISTS (
                SELECT 1
                FROM UserPlayback up
                WHERE up.userId = :userId
                    AND EXISTS (
                        SELECT 1
                        FROM PlaybackState ps
                        WHERE ps.targetId = up.targetId
                            AND ps.targetType = up.targetType
                            AND ps.playlist.id = q.playlist.id
                    )
            )
        """)
    int deleteByIdAndUserPlayback(
        @Param("id") Long id,
        @Param("userId") Long userId
    );

    @Modifying(
        clearAutomatically = true,
        flushAutomatically = true
    )
        @Query("""
        DELETE FROM QueueItem q
        WHERE q.audio.id IN :audioIds
        AND q.playlist.id = :playlistId
        """)
    int deleteAllByAudioIdsAndPlaylistId(
        @Param("audioIds") List<Long> audioIds,
        @Param("playlistId") Long playlistId
    );

    @Query("""
        SELECT q FROM QueueItem q
        JOIN FETCH q.audio
        WHERE q.id = :entryId
        """)
    Optional<QueueItem> findByIdWithAudio(@Param("entryId") Long entryId);

    List<QueueItem> findByAudioId(Long audioId);

    @Query("""
        SELECT q FROM QueueItem q
        JOIN FETCH q.audio
        WHERE q.playlist.id = :playlistId
        AND q.id = :entryId
        """)
    Optional<QueueItem> findByPlaylistIdAndId(
        @Param("playlistId") Long playlistId, 
        @Param("entryId") Long entryId
    );

    @Query("""
        SELECT q FROM QueueItem q
        WHERE q.playlist.id = :playlistId
        AND q.audio.id = :audioId
        """)
    Optional<QueueItem> findByPlaylistIdAndAudioId(
        @Param("playlistId") Long playlistId, 
        @Param("audioId") Long audioId
    );

    @Query("""
        SELECT COALESCE(MAX(q.position), -1)
        FROM QueueItem q
        WHERE q.playlist.id = :playlistId
        """)
    int getMaxPosition(@Param("playlistId") Long playlistId);

    @Query(value = """
        SELECT q.* FROM queue_items q
        JOIN audio_file a ON a.id = q.audio_id
        WHERE q.playlist_id = :playlistId
        AND q.position > (
            SELECT q2.position FROM queue_items q2
            WHERE q2.playlist_id = :playlistId AND q2.id = :entryId
            ORDER BY q2.position ASC
            LIMIT 1
        )
        ORDER BY q.position ASC
        LIMIT 1
    """, nativeQuery = true)
    Optional<QueueItem> findNextTrack(Long playlistId, Long entryId);

    @Query(value = """
        SELECT q.* FROM queue_items q
        JOIN audio_file a ON a.id = q.audio_id
        WHERE q.playlist_id = :playlistId
        AND q.position < (
            SELECT q2.position FROM queue_items q2
            WHERE q2.playlist_id = :playlistId AND q2.id = :entryId
            ORDER BY q2.position ASC
            LIMIT 1
        )
        ORDER BY q.position DESC
        LIMIT 1
    """, nativeQuery = true)
    Optional<QueueItem> findPrevTrack(Long playlistId, Long entryId);

    @Query("""
        SELECT q
        FROM QueueItem q
        JOIN FETCH q.audio
        WHERE q.playlist.id = :playlistId
        ORDER BY q.position ASC
        LIMIT 1
        """)
    Optional<QueueItem> findFirstInPlaylist(
        @Param("playlistId") Long playlistId
    );

    @Query("""
        SELECT q
        FROM QueueItem q
        JOIN FETCH q.audio
        WHERE q.playlist.id = :playlistId
        ORDER BY q.position DESC
        LIMIT 1
        """)
    Optional<QueueItem> findLastInPlaylist(
        @Param("playlistId") Long playlistId
    );

    @Query(value = """
        SELECT * FROM queue_items
        WHERE playlist_id = :playlistId
        ORDER BY RAND()
        LIMIT 1
    """, nativeQuery = true)
    Optional<QueueItem> findRandomTrack(Long playlistId);

    @Modifying(
        clearAutomatically = true,
        flushAutomatically = true
    )
    @Query(value = """
        UPDATE queue_items qi
        SET qi.position = qi.position + (
            SELECT COUNT(*)
            FROM JSON_TABLE(
                :positions,
                '$[*]' COLUMNS (
                    position BIGINT PATH '$'
                )
            ) p
            WHERE p.position <= qi.position
        )
        WHERE qi.playlist_id = :playlistId
        AND EXISTS (
            SELECT 1
            FROM JSON_TABLE(
                :positions,
                '$[*]' COLUMNS (
                    position BIGINT PATH '$'
                )
            ) p
            WHERE p.position <= qi.position
        )
        """, nativeQuery = true)
    int shiftQueueItems(
        @Param("playlistId") Long playlistId,
        @Param("positions") String positions
    );

    @Modifying(
        clearAutomatically = true,
        flushAutomatically = true
    )
    @Transactional
    @Query(value = """
        INSERT INTO queue_items (
            playlist_id,
            audio_id,
            position,
            added_by_id,
            created_at
        )
        SELECT
            :playlistId,
            items.audio_id,
            base.position + items.row_num - 1,
            :addedById,
            CURRENT_TIMESTAMP
        FROM (
            SELECT
                filtered.audio_id,
                ROW_NUMBER() OVER (ORDER BY filtered.ordinal) AS row_num
            FROM (
                SELECT
                    jt.audio_id,
                    MIN(jt.ordinal) AS ordinal
                FROM JSON_TABLE(
                    :audioIds,
                    '$[*]' COLUMNS (
                        ordinal FOR ORDINALITY,
                        audio_id BIGINT PATH '$'
                    )
                ) jt
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM queue_items qi
                    WHERE qi.playlist_id = :playlistId
                    AND qi.audio_id = jt.audio_id
                )
                GROUP BY jt.audio_id
            ) filtered
        ) items
        CROSS JOIN (
            SELECT COALESCE(MAX(position), -1) + 1 AS position
            FROM queue_items
            WHERE playlist_id = :playlistId
        ) base
        """, nativeQuery = true)
    int insertQueueItemsAtEnd(
        @Param("playlistId") Long playlistId,
        @Param("audioIds") String audioIds, // json
        @Param("addedById") Long addedById
    );

    @Modifying(
        clearAutomatically = true,
        flushAutomatically = true
    )
    @Query(value = """
        INSERT INTO queue_items (
            playlist_id,
            audio_id,
            position,
            added_by_id,
            created_at
        )
        SELECT
            :playlistId,
            items.audio_id,
            items.position,
            :addedById,
            CURRENT_TIMESTAMP
        FROM JSON_TABLE(
            :items,
            '$[*]' COLUMNS (
                audio_id BIGINT PATH '$.audioId',
                position BIGINT PATH '$.position'
            )
        ) items
        WHERE NOT EXISTS (
            SELECT 1
            FROM queue_items qi
            WHERE qi.playlist_id = :playlistId
            AND qi.audio_id = items.audio_id
        )
        """, nativeQuery = true)
    int insertQueueItems(
        @Param("playlistId") Long playlistId,
        @Param("items") String items,
        @Param("addedById") Long addedById
    );

    @Modifying(
        clearAutomatically = true,
        flushAutomatically = true
    )
    @Query(value = """
        UPDATE queue_items q
        JOIN (
            SELECT
                id,
                ROW_NUMBER() OVER (
                    PARTITION BY playlist_id
                    ORDER BY position
                ) - 1 AS new_position
            FROM queue_items
            WHERE playlist_id = :playlistId
        ) ordered ON ordered.id = q.id
        SET q.position = ordered.new_position
        WHERE q.playlist_id = :playlistId
        """, nativeQuery = true)
    int normalizePositions(
        @Param("playlistId") Long playlistId
    );
}
