// manage audio part of project

import { audioCtx } from "./global";


export const getMicStream = () => navigator.mediaDevices.getUserMedia({ audio: true });


export function maxPercentInFreqRange(freqArray: Uint8Array, minFreq: number, maxFreq: number) {
    const maxFreqSample = audioCtx.sampleRate / 2;
    const minIndex = Math.round(minFreq / maxFreqSample * freqArray.length);
    const maxIndex = Math.round(maxFreq / maxFreqSample * freqArray.length);

    return Math.max(...freqArray.slice(minIndex, Math.max(minIndex + 1, maxIndex))) / 256   // if slice has 2 times the same indexes, it returns an empty list
}
