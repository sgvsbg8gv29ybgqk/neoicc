// Файл: src/lib/store/musicPlayer.ts

import { writable } from 'svelte/store';

// Этот стор будет хранить имя текущего трека
export const currentTrack = writable<string | null>(null);

let audio: HTMLAudioElement | null = null;

// Функция для запуска музыки
export function playMusic(fileName: string) {
    if (!fileName) return;

    const trackSrc = `/music/${fileName}`;

    // Если аудио еще не создано, создаем его
    if (!audio) {
        audio = new Audio();
        audio.loop = true; // Зацикливаем музыку
        audio.volume = 0.5; // Установим громкость по умолчанию
    }

    // Если уже играет тот же трек, ничего не делаем
    if (audio.src.endsWith(trackSrc)) {
        if (audio.paused) {
            audio.play().catch(e => console.error("Audio play failed:", e));
        }
        return;
    }

    // Устанавливаем новый источник и запускаем
    audio.src = trackSrc;
    audio.play().catch(e => console.error("Audio play failed:", e));
    currentTrack.set(fileName);
}

// Функция для остановки музыки
export function stopMusic() {
    if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0; // Сбрасываем трек
        currentTrack.set(null);
    }
}