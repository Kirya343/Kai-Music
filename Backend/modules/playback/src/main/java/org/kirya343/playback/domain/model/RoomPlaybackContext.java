package org.kirya343.playback.domain.model;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.presence.room.RoomPresence;
import org.kirya343.room.dto.ShortRoomDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
public class RoomPlaybackContext {

    public RoomPlaybackContext(
        Long roomId,
        AudioFile currentAudio,
        ShortRoomDTO room
    ) {
        this.currentAudio = currentAudio;
        this.room = room;
    }

    @Setter 
    private AudioFile currentAudio;

    @Setter
    private ShortRoomDTO room;

    private final RoomPresence presence = new RoomPresence();
}