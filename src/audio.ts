// manage audio part of project

import { audioCtx, canvasCtx, canvas } from "./global";


export function visualizeMicrophone(visualize: ((audioNode: AudioNode) => void)) {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => visualize(audioCtx.createMediaStreamSource(stream)))
        .catch(err => console.log("getUserMedia error: " + err))
}

// export function setSinWave() {
//     var oscillator = audioCtx.createOscillator();
//     oscillator.type = 'square';
//     oscillator.frequency.setValueAtTime(1000, audioCtx.currentTime); // value in hertz
//     oscillator.start();

//     visualize(oscillator)
// }

// function visualize(audioNode: AudioNode) {
//     const source = audioNode;
//     const analyser = audioCtx.createAnalyser();
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);

//     analyser.fftSize = 2048;
//     source.connect(analyser);

//     draw()
//     function draw() {
//         const WIDTH = canvas.width
//         const HEIGHT = canvas.height;

//         requestAnimationFrame(draw);

//         analyser.getByteTimeDomainData(dataArray);

//         canvasCtx.fillStyle = 'rgb(200, 200, 200)';
//         canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

//         canvasCtx.lineWidth = 2;
//         canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
//         canvasCtx.beginPath();

//         let sliceWidth = WIDTH * 1.0 / bufferLength;
//         let x = 0;
//         for (let i = 0; i < bufferLength; i++) {
//             let v = dataArray[i] / 128.0;
//             let y = v * HEIGHT / 2;
//             if (i === 0) { canvasCtx.moveTo(x, y); }
//             else { canvasCtx.lineTo(x, y); }
//             x += sliceWidth;
//         }
//         canvasCtx.lineTo(canvas.width, canvas.height / 2);
//         canvasCtx.stroke();
//     }
// }

export function getMaxFrequencyRange(freqArray: Uint8Array, minFreq: number, maxFreq: number) {
    const maxFreqSample = audioCtx.sampleRate / 2;
    const minIndex = Math.round(minFreq / maxFreqSample * freqArray.length);
    const maxIndex = Math.round(maxFreq / maxFreqSample * freqArray.length);

    return Math.max(...freqArray.slice(minIndex, maxIndex)) / 256
}