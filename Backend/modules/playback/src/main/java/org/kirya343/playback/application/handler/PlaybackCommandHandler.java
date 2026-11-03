package org.kirya343.playback.application.handler;

import org.kirya343.playback.application.command.RoomCommand;
import org.kirya343.playback.infrastructure.command.PlaybackCommandWorker;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j 
@RequiredArgsConstructor
public class PlaybackCommandHandler {

    private final PlaybackCommandWorker roomCommandWorker;

    @EventListener
    public void handlePlaybackCommand(RoomCommand command) {
        
        log.debug("Handled RoomCommand {}", command.getClass());

        roomCommandWorker.submit(command);
    }
}
