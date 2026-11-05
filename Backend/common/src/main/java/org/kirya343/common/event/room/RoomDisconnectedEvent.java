package org.kirya343.common.event.room;

public record RoomDisconnectedEvent(
    String userSub,
    Long roomId
) {
}
