/**
 * Formats a duration in seconds as a human-readable time string (e.g., 123 → "2:03").
 *
 * @param position - Audio position in seconds.
 * @returns Formatted time string in minutes and seconds.
 */
export function countPosition(position: number) {
    return `${Math.floor(position / 60)}:${Math.floor(position % 60).toString().padStart(2, '0')}`
}

export function getRandomColor() {
    const hue = 200 + Math.random() * 80;
    return `hsl(${hue}, 85%, 60%)`;
};