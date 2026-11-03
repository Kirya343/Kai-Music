package org.kirya343.playback.domain.result;

public sealed interface PlaybackResult
    permits Paused, Resumed, TrackChanged, NoOp {
}