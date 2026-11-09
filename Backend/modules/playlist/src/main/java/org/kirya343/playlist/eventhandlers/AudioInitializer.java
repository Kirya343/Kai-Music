package org.kirya343.playlist.eventhandlers;

import java.util.List;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.audio.datasource.AudioFileRepository;
import org.kirya343.audio.event.AudioUploadedEvent;
import org.kirya343.user.datasource.User;
import org.kirya343.user.datasource.UserRepository;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j 
@RequiredArgsConstructor
public class AudioInitializer {

    private final UserRepository userRepository;
    private final AudioFileRepository audioFileRepository;
    private final ApplicationEventPublisher eventPublisher;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void fixUploadedTracks() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            log.debug("Uploading... Processing user {}", user.getId());

            List<AudioFile> audios =
                audioFileRepository.findByOwnerId(user.getId());

            for (AudioFile audio : audios) {
                log.debug("Uploading... Processing audio {}", audio.getId());

                eventPublisher.publishEvent(
                    new AudioUploadedEvent(user.getId(), audio.getId())
                );
            }
        }
    }
}