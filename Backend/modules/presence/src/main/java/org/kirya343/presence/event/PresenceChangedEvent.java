package org.kirya343.presence.event;

import org.kirya343.presence.UserPresence;

public record PresenceChangedEvent(
    String userSub,
    UserPresence presence
) {}
