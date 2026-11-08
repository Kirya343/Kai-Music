package org.kirya343.room.datasource;

import java.util.List;
import java.util.Optional;

import org.kirya343.room.dto.RoomDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ListeningRoomRepository extends JpaRepository<ListeningRoom, Long> {
    
    @Query("""
        SELECT DISTINCT r
        FROM ListeningRoom r
        LEFT JOIN FETCH r.owner
        JOIN UserPlayback up ON up.targetId = r.id
        WHERE up.userId = :userId
            AND up.targetType =
                org.kirya343.playback.domain.enums.PlaybackTargetType.ROOM
        """)
    Optional<ListeningRoom> findRoomByUserId(@Param("userId") Long userId);

    @Query("""
        SELECT r FROM ListeningRoom r
        LEFT JOIN FETCH r.owner
        WHERE r.id = :roomId
    """)
    Optional<ListeningRoom> findFullRoomById(@Param("roomId") Long roomId);

    boolean existsByOwnerId(Long ownerId);
    void deleteByOwnerId(Long ownerId);

    List<ListeningRoom> findAllByOwnerId(Long ownerId);
    Optional<ListeningRoom> findByCode(String code);

    @Query(value = """
        SELECT
            r.id,
            COALESCE(r.title, CONCAT(u.name, '''s room')) AS title,
            r.owner_id AS ownerId,
            r.code,
            null
        FROM listening_room r
        JOIN users u ON u.id = r.owner_id
        LEFT JOIN user_playbacks up
            ON up.target_id = r.id
            AND up.target_type = 'ROOM'
        GROUP BY
            r.id,
            r.title,
            u.name,
            r.owner_id,
            r.code
        """, nativeQuery = true)
    List<RoomDTO> findAllShortDTOs();

    @Query(value = """
        SELECT
            r.id,
            COALESCE(r.title, CONCAT(u.name, '''s room')) AS title,
            r.owner_id AS ownerId,
            r.code,
            null
        FROM listening_room r
        JOIN users u ON u.id = r.owner_id
        LEFT JOIN user_playbacks up
            ON up.target_id = r.id
            AND up.target_type = 'ROOM'
        WHERE r.id = :roomId
        GROUP BY
            r.id,
            r.title,
            u.name,
            r.owner_id,
            r.code
        """, nativeQuery = true)
    Optional<RoomDTO> findShortRoomById(
        @Param("roomId") Long roomId
    );
}
