package org.kirya343.playback.datasource.model;

import java.time.Duration;
import java.time.Instant;

import org.hibernate.annotations.UpdateTimestamp;
import org.kirya343.playback.enums.PlaybackMode;
import org.kirya343.playback.enums.PlaybackTargetType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PlaybackState {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Double position = 0.0;

    @JoinColumn(name = "audio_id")
    private Long entryId;

    @Column(nullable = false)
    private boolean paused = true;

    @UpdateTimestamp
    private Instant lastUpdate;

    private String initiatorName;

    private Long targetId;

    private PlaybackTargetType targetType;

    private PlaybackMode playbackMode;

    public PlaybackState(Long targetId, PlaybackTargetType targetType, Long entryId, Double position, boolean paused, String userName) {
        this.targetId = targetId;
        this.targetType = targetType;
        this.entryId = entryId;
        this.position = position;
        this.paused = paused;
        this.initiatorName = userName;
    }

    public PlaybackState(Long targetId, PlaybackTargetType targetType) {
        this.targetId = targetId;
        this.targetType = targetType;
    }

    public double getCurrentPosition() {
        if (paused) {
            return position;
        }
        double elapsed = Duration.between(lastUpdate, Instant.now()).toSeconds();
        return position + elapsed;
    }
}
