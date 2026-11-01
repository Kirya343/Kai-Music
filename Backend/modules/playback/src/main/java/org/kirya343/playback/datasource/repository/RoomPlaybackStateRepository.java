package org.kirya343.playback.datasource.repository;

import org.kirya343.playback.datasource.model.RoomPlaybackState;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomPlaybackStateRepository extends JpaRepository<RoomPlaybackState, Long> {
    
}
