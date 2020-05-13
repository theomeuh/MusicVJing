// manage audio part of project

import { audioCtx, canvasCtx, canvas } from "./global";


export const getMicStream = () => navigator.mediaDevices.getUserMedia({ audio: true });


export function sinWaveSource(frequency: number) {
    var oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // value in hertz
    oscillator.start();

    return oscillator
}


export function getMaxValueInFreqRange(freqArray: Uint8Array, minFreq: number, maxFreq: number) {
    const maxFreqSample = audioCtx.sampleRate / 2;
    const minIndex = Math.round(minFreq / maxFreqSample * freqArray.length);
    const maxIndex = Math.round(maxFreq / maxFreqSample * freqArray.length);

    return Math.max(...freqArray.slice(minIndex, maxIndex)) / 256
}

type AudioSourceCallback = (audioNode: AudioNode) => void;