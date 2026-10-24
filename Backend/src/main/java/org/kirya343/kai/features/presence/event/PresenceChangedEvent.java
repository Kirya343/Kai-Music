package org.kirya343.kai.features.presence.event;

import org.kirya343.kai.features.presence.UserPresence;

public record PresenceChangedEvent(
    String userOpenId,
    UserPresence presence
) {}
