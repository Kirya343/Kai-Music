package org.kirya343.playback.domain.dto;

import org.kirya343.audio.datasource.AudioFile;
import org.kirya343.audio.services.util.Fmp4Chunker;
import org.kirya343.playback.presentation.dto.PlaybackStateDTO;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Getter 
@Slf4j 
public class PlaybackContext {
    
    private AudioFile audio;
    private Fmp4Chunker chunker;

    private PlaybackStateDTO state;

    private double playbackStartedAt = System.nanoTime();

    public PlaybackContext(
        AudioFile audio,
        Fmp4Chunker chunker
    ) {
        this.audio = audio;
        this.chunker = chunker;
    }

    public void seekChunker(double position) {

        log.debug("Перематываем чанкер на позицию: {}", state.position());

        chunker.seek(position);
    }

    public void applyState(PlaybackStateDTO state) {
        this.state = state;

        seekChunker(state.position());
    }

    public PlaybackStateDTO getState() {
        return state;
    }

    public PlaybackStateDTO getCurrentState() {
        if (state == null) return null;

        return new PlaybackStateDTO(
            state.user(),
            state.entryId(),
            getCurrentPosition(),
            state.pause()
        );
    }

    public double getCurrentPosition() {

        if (state.pause()) {
            return state.position();
        }

        double elapsed = (System.nanoTime() - playbackStartedAt) / 1_000_000_000.0;

        return state.position() + elapsed;
    }

    public boolean needChangeTrack() {
        Long audioDuration = audio.getDuration();

        boolean needChange = audio != null && getCurrentPosition() > audioDuration;

        if (needChange) {
            log.debug("Sending NEXT event: becouse position({}) is after audioDuration({})",
                getCurrentPosition(),
                audioDuration
            );
        }

        return needChange;
    }
}
