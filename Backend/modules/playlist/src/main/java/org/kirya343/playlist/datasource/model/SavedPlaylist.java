package org.kirya343.playlist.datasource.model;

import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.kirya343.user.datasource.User;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor 
@Table(
    uniqueConstraints = @UniqueConstraint(
        columnNames = {"user_id", "playlist_id"}
    )
)
public class SavedPlaylist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private Playlist playlist;

    @CreationTimestamp
    private Instant savedAt;

    public SavedPlaylist(User user, Playlist playlist) {
        this.user = user;
        this.playlist = playlist;
    }
}