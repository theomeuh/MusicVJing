// manage audio part of project

import { audioCtx, canvasCtx, canvas } from "./global";


export function handleMicStream(callback: MicCallback) {
    // handle the query of the microphone and apply the callback funtion if ok
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => callback(audioCtx.createMediaStreamSource(stream)))
        .catch(err => console.log("getUserMedia error: " + err))
}

// export function setSinWave() {
//     var oscillator = audioCtx.createOscillator();
//     oscillator.type = 'square';
//     oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // value in hertz
//     oscillator.start();

//     visualize(oscillator)
// }

export function getMaxFrequencyRange(freqArray: Uint8Array, minFreq: number, maxFreq: number) {
    const maxFreqSample = audioCtx.sampleRate / 2;
    const minIndex = Math.round(minFreq / maxFreqSample * freqArray.length);
    const maxIndex = Math.round(maxFreq / maxFreqSample * freqArray.length);

    return Math.max(...freqArray.slice(minIndex, maxIndex)) / 256
}

type MicCallback = (audioNode: AudioNode) => void;