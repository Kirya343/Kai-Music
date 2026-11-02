package org.kirya343.common.event.room;

public record RoomDisconnectedEvent(
    String userOpenId,
    Long roomId
) {
}
