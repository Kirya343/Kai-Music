package org.kirya343.audio.services;

import java.util.List;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.audio.datasource.AudioFileRepository;
import org.kirya343.audio.datasource.AudioFileSpecification;
import org.kirya343.audio.dto.AudioDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AudioQueryService {

    private final AudioFileRepository audioFileRepository;

    public List<AudioDTO> getUserLibrary(Long userId) {
        List<AudioFile> audios = audioFileRepository.findByOwnerId(userId);
        return AudioDTO.ofList(audios);
    }

    public Page<AudioDTO> getLibrary(int page, int size, String query) {
        Page<AudioFile> result = audioFileRepository.findAll(
            AudioFileSpecification.search(query),
            PageRequest.of(page, size, Sort.by("title").ascending())
        );

        return result.map(a -> AudioDTO.ofAudioFile(a));
    }

    public AudioFile getAudioByQueueItem(Long entryId) {
        AudioFile audioFile = audioFileRepository
            .findAudioByQueueItem(entryId).orElse(null);

        return audioFile;
    }
}
