import { useEffect, useState } from "react";
import styles from "./VolumeSlider.module.scss"
import { useRoomPlayback } from "@playback";
import { useGlobal } from "@common";

/**
 * VolumeSlider controls volume
 * 
 * @param visible controls visibility
 */
export default function VolumeSlider({ visible = true }: { visible?: boolean }) {

    const { audioRef } = useRoomPlayback();
    const { isMobile } = useGlobal();

    // on init gets state from localstorage
    const [volume, setVolume] = useState(() => {

        if (isMobile) return 1;

        const saved = localStorage.getItem("audioVolume");
        return saved ? Number(saved) : 0.5;
    });

    // on change volume, it also changes in audio
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
    }, [volume]);

    // void, changes volume and puts it to localStorage
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);
        setVolume(v);
        localStorage.setItem("audioVolume", String(v));
    };

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
        />
    );
}