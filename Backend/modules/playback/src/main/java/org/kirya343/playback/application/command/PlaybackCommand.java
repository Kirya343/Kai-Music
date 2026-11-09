package org.kirya343.playback.application.command;

import org.kirya343.playback.domain.enums.PlaybackTargetType;
import org.kirya343.security.core.dto.UserAuthData;

public sealed interface PlaybackCommand
    permits UpdatePlayback, ChangeTrack {

    UserAuthData user();
    Long targetId();
    PlaybackTargetType targetType();
}
