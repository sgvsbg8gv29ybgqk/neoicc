// File: src/lib/store/musicPlayer.ts

import { writable, get } from 'svelte/store';

export const currentTrack = writable<string | null>(null);
export const isPlaying = writable<boolean>(false);

let audio: HTMLAudioElement | null = null;

/**
 * Ensures the global audio element is initialized once (lazy initialization).
 * Sets up default properties and event listeners.
 */
function ensureAudio() {
    if (!audio) {
        audio = new Audio();
        audio.loop = true;
        audio.volume = 0.5;

        audio.onplay = () => isPlaying.set(true);
        audio.onpause = () => isPlaying.set(false);
    }
}

/**
 * Plays a track by its file name.
 * If the same track is requested, it toggles play/pause.
 * If a new track is requested, it starts playing the new track.
 * @param {string} fileName - The name of the audio file in the /music/ directory.
 */
export function playMusic(fileName: string) {
    ensureAudio();
    if (!audio) return;

    const trackSrc = `/music/${fileName}`;
    const currentTrackName = get(currentTrack);

    if (currentTrackName === fileName) {
        // Toggle play/pause for the current track
        if (audio.paused) {
            audio.play().catch(e => console.error("Audio play failed:", e));
        } else {
            audio.pause();
        }
    } else {
        // Play a new track
        audio.src = trackSrc;
        audio.play().catch(e => console.error("Audio play failed:", e));
        currentTrack.set(fileName);
    }
}

/**
 * Toggles the pause state of the current track.
 * Does nothing if no track has been loaded yet.
 */
export function togglePause() {
    ensureAudio();
    if (!audio || !audio.src) return;

    if (audio.paused) {
        audio.play().catch(e => console.error("Audio play failed:", e));
    } else {
        audio.pause();
    }
}

/**
 * Pauses the current track if it is playing.
 * This is useful for UI elements that should only pause, not toggle.
 */
export function pauseCurrentTrack() {
    ensureAudio();
    if (audio && !audio.paused) {
        audio.pause();
    }
}