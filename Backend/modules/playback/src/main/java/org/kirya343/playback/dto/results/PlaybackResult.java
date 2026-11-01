package org.kirya343.playback.dto.results;

public sealed interface PlaybackResult
    permits Paused, Resumed, TrackChanged, NoOp {
}