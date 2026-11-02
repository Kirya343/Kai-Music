package org.kirya343.playback.datasource.repository;

import java.util.Optional;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.playback.enums.PlaybackTargetType;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

@Repository 
@RequiredArgsConstructor 
public class PlaybackRepository {
    
    private final EntityManager entityManager;

    @Transactional(readOnly = true)
    public Optional<AudioFile> findCurrentAudio(
        Long targetId,
        PlaybackTargetType targetType
    ) {
        return entityManager.createQuery("""
            SELECT a
            FROM QueueItem q
            JOIN q.audio a
            JOIN ListeningRoom r ON r.playlist.id = q.playlist.id
            JOIN PlaybackState ps
                ON ps.entryId = q.id
                AND ps.targetId = :targetId
                AND ps.targetType = :targetType
            """, AudioFile.class)
            .setParameter("targetId", targetId)
            .setParameter("targetType", targetType)
            .getResultStream()
            .findFirst();
    }

}
