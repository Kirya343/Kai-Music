package org.kirya343.playback.datasource.model;

import org.kirya343.playback.enums.PlaybackTargetType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_playbacks")
@NoArgsConstructor 
@AllArgsConstructor 
@Getter 
public class UserPlayback {

    @Id
    @Column(unique = true)
    private Long userSub;

    private Long targetId;

    @Enumerated(EnumType.STRING)
    private PlaybackTargetType targetType;
}