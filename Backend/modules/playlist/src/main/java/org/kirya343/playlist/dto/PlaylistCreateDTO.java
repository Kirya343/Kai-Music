package org.kirya343.playlist.dto;

import java.util.List;

import org.kirya343.playlist.dto.queue.QueueItemCreateDTO;

public record PlaylistCreateDTO(
    String title,
    List<QueueItemCreateDTO> audios
) {
}
