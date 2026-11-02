package org.kirya343.playback.datasource.repository;

import org.kirya343.playback.datasource.model.UserPlayback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPlaybackRepository extends JpaRepository<UserPlayback, Long> {
    
}
