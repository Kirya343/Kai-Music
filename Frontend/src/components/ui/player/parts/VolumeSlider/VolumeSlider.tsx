import { useEffect, useState } from "react";
import styles from "./VolumeSlider.module.scss"
import { useGlobal } from "@common";
import { usePlaybackAudio } from "@playback";

/**
 * VolumeSlider controls volume
 * 
 * @param visible controls visibility
 */
export default function VolumeSlider({ visible = true }: { visible?: boolean }) {

    const { audio } = usePlaybackAudio();
    const { isMobile } = useGlobal();

    // on init gets state from localstorage
    const [volume, setVolume] = useState(() => {
        if (isMobile) return 1;

        const saved = localStorage.getItem("audioVolume");
        const parsed = saved === null ? 0.5 : Number(saved);

        return Number.isFinite(parsed)
            ? Math.min(1, Math.max(0, parsed))
            : 0.5;
    });

    // on change volume, it also changes in audio
    useEffect(() => {
        if (!audio) return;

        audio.volume = volume;
    }, [volume, audio]);

    // void, changes volume and puts it to localStorage
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);
        setVolume(v);
        localStorage.setItem("audioVolume", String(v));
    };

    const progress = `${volume * 100}%`;

    // input is visible only if state id "true", if not, conponent just controls the volume
    return visible && (
        <input
            className={styles.volumeSlider}
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleChange}
            style={{ "--progress": progress } as React.CSSProperties}
            aria-label="Volume"
        />
    );
}