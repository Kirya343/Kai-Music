package org.kirya343.common.event.room;

public record RoomConnectedEvent(
    String userSub,
    Long roomId
) {
}
