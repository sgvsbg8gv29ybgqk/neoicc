// src/lib/store/musicPlayer.ts

import { writable, get } from 'svelte/store';
// Using SvelteKit's built-in module for the base path
import { base } from '$app/paths'; 

export const currentTrack = writable<string | null>(null);
export const isPlaying = writable<boolean>(false);

let audio: HTMLAudioElement | null = null;

// This function lazily creates the <audio> element if it doesn't already exist
function ensureAudio() {
    if (!audio) {
        audio = new Audio();
        audio.loop = true;
        audio.volume = 0.5;
 
        audio.onplay = () => isPlaying.set(true);
        audio.onpause = () => isPlaying.set(false);
    }
}

// For "Start Music" cards
export function playMusic(fileName: string) {
    ensureAudio();
    if (!audio) return;
 
    const trackSrc = `${base}/music/${fileName}`;

    const currentTrackName = get(currentTrack);

    // If the same card is clicked
    if (currentTrackName === fileName) {
        if (audio.paused) {
            audio.play().catch(e => console.error("Audio play failed:", e));
        } else {
            audio.pause();
        }
    } 
    // If a new music card is clicked
    else {
        // Set the new source and play it
        audio.src = trackSrc;
        audio.play().catch(e => console.error("Audio play failed:", e));
        currentTrack.set(fileName);
    }
}

// For "Pause" cards. Simply toggles the playback state
export function togglePause() {
    ensureAudio();
    // Do nothing if no music has been loaded yet
    if (!audio || !audio.src) return;

    if (audio.paused) {
        audio.play().catch(e => console.error("Audio play failed:", e));
    } else {
        audio.pause();
    }
}


// For deactivating a "Start Music" card. Only pauses the current track.
export function pauseCurrentTrack() {
    ensureAudio();
    if(audio && !audio.paused) {
        audio.pause();
    }
}