package org.kirya343.audio.services.util;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.kirya343.audio.dto.AudioChunk;
import org.kirya343.audio.services.storage.AudioStorageService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Fmp4Chunker {

    private static final int CHUNK_DURATION_SECONDS = 5;

    private final AudioStorageService audioStorageService;
    private final String audioDirectory;
    private final int chunkCount;

    private final Map<Integer, AudioChunk> cache = new ConcurrentHashMap<>();

    private volatile AudioChunk initializationChunk;

    public Fmp4Chunker(
        AudioStorageService audioStorageService,
        String audioDirectory,
        int chunkCount
    ) {
        this.audioStorageService = audioStorageService;
        this.audioDirectory = audioDirectory;
        this.chunkCount = chunkCount;
    }

    public AudioChunk getAudioChunk(long sequence) throws IOException {
        if (sequence < 0 || sequence >= chunkCount) {
            return null;
        }

        try {
            return cache.computeIfAbsent((int) sequence, key -> {
                try {
                    log.debug("Loading chunk {} from storage", key);

                    return audioStorageService.getMediaChunk(
                        audioDirectory,
                        key
                    );
                } catch (IOException e) {
                    throw new UncheckedIOException(e);
                }
            });
        } catch (UncheckedIOException e) {
            throw e.getCause();
        }
    }

    public AudioChunk initializationChunk() throws IOException {
        AudioChunk chunk = initializationChunk;

        if (chunk != null) {
            return chunk;
        }

        synchronized (this) {
            if (initializationChunk == null) {
                initializationChunk =
                    audioStorageService.getInitializationChunk(audioDirectory);
            }

            return initializationChunk;
        }
    }

    public boolean hasNext(long sequence) {
        return sequence < chunkCount;
    }

    public int getSequenceByPosition(double positionSeconds) {
        if (positionSeconds <= 4) {
            positionSeconds = 0;
        } else {
            positionSeconds -= 3;
        }

        return (int) Math.floor(
            positionSeconds / CHUNK_DURATION_SECONDS
        );
    }

    public int getChunkCount() {
        return chunkCount;
    }
}