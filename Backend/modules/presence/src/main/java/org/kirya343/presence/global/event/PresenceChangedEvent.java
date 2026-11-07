package org.kirya343.presence.global.event;

import org.kirya343.presence.global.UserPresence;

public record PresenceChangedEvent(
    String userSub,
    UserPresence presence
) {}
