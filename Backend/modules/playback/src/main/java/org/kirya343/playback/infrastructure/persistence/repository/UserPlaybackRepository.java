package org.kirya343.playback.infrastructure.persistence.repository;

import org.kirya343.playback.infrastructure.persistence.entity.UserPlayback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserPlaybackRepository extends JpaRepository<UserPlayback, Long> {
    
}
