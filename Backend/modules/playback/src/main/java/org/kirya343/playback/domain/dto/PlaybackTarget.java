package org.kirya343.playback.domain.dto;

import java.util.Objects;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.playback.infrastructure.persistence.entity.PlaybackState;
import org.kirya343.playback.infrastructure.persistence.entity.UserPlayback;

public record PlaybackTarget(
    PlaybackTargetType type,
    Long id
) {

    public PlaybackTarget {
        Objects.requireNonNull(type, "Playback target type cannot be null");
        Objects.requireNonNull(id, "Playback target id cannot be null");
    }

    @Override
    public String toString() {
        return type + "-" + id;
    }

    public static PlaybackTarget ofUserPlayback(UserPlayback playback) {
        return new PlaybackTarget(playback.getTargetType(), playback.getTargetId());
    }

    public static PlaybackTarget ofPlaybackState(PlaybackState state) {
        return new PlaybackTarget(state.getTargetType(), state.getTargetId());
    }

    public PlaybackTarget validate(Long userId) {
        Long resolvedTargetId = type == PlaybackTargetType.USER
            ? userId
            : id;

        return new PlaybackTarget(type, resolvedTargetId);
    }
}