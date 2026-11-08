package org.kirya343.playback.infrastructure.persistence.entity;

import java.time.Duration;
import java.time.Instant;

import org.hibernate.annotations.UpdateTimestamp;
import org.kirya343.playback.domain.enums.PlaybackMode;
import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;
import org.kirya343.playlist.datasource.model.Playlist;
import org.kirya343.playlist.enums.PlaylistType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table (
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_playback_target",
            columnNames = {"target_id", "target_type"}
        )
    }
)
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

    @Enumerated(EnumType.STRING)
    private PlaybackTargetType targetType;

    @Enumerated(EnumType.STRING)
    private PlaybackMode playbackMode = PlaybackMode.NORMAL;

    @ManyToOne(
        cascade = {CascadeType.PERSIST, CascadeType.REMOVE},
        optional = false
    )
    @JoinColumn(nullable = false)
    private Playlist playlist = new Playlist(targetType + "-" + targetId + " state-playlist", PlaylistType.PLAYBACK_QUEUE);

    public PlaybackState(Long targetId, PlaybackTargetType targetType, PlaybackStateDTO state) {
        this.targetId = targetId;
        this.targetType = targetType;

        if (state != null) {
            this.entryId = state.entryId();
            this.position = state.position();
            this.paused = state.pause();
            this.initiatorName = state.user();
        }

        this.playlist = new Playlist(targetType + "-" + targetId + " state-playlist", PlaylistType.PLAYBACK_QUEUE);
    }

    public double getCurrentPosition() {
        if (paused) {
            return position;
        }
        double elapsed = Duration.between(lastUpdate, Instant.now()).toSeconds();
        return position + elapsed;
    }
}
