import { getMaxFrequencyRange, getMicStream, sinWaveSource } from "./audio";
import { clearCanvas, runningCircle } from "./draw";
import { audioCtx, canvasCtx } from "./global";
import { percentageTofreq, percentageToGain } from "./utils";

export async function runningCircleMicViz(frame: number, potar1: HTMLInputElement) {
    // get audio input stream  (mic or speakers)
    let audioSource: AudioNode;
    await getMicStream()
        .then(micStream => audioSource = audioCtx.createMediaStreamSource(micStream))
        .catch(() => console.log("GUM error"))

    // create audio graph nodes
    const source = audioSource;
    const analyserGain = audioCtx.createGain();
    const analyser = audioCtx.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // audio send to analyser is amplified up to 4
    const maxGain = 4
    const gainPotar = percentageToGain(maxGain);
    potar1.value = (100 / maxGain).toString();    // initial, gain is one

    // set up nodes and connections
    analyserGain.gain.value = gainPotar(potar1.valueAsNumber);
    analyser.fftSize = 2048;
    source.connect(analyserGain)
    analyserGain.connect(analyser);

    (function animationLoop() {
        analyserGain.gain.value = gainPotar(potar1.valueAsNumber);
        clearCanvas();
        analyser.getByteFrequencyData(dataArray);

        // At maximum, moving circle have an amplitude of 1/2 of the radius. Min is 1/10
        const shapeFactorBass1 = 10 - 8 * getMaxFrequencyRange(dataArray, 1, 120)
        const shapeFactorBass2 = 10 - 8 * getMaxFrequencyRange(dataArray, 120, 350)
        const shapeFactorMedium1 = 10 - 8 * getMaxFrequencyRange(dataArray, 350, 600)
        const shapeFactorMedium2 = 10 - 8 * getMaxFrequencyRange(dataArray, 600, 1000)
        const shapeFactorHigh = 10 - 8 * getMaxFrequencyRange(dataArray, 1000, 10000)

        runningCircle({ frame, color: 'mediumvioletred', shapeFactor: shapeFactorBass1 })
        runningCircle({ frame, color: 'mediumslateblue', shapeFactor: shapeFactorBass2 })
        runningCircle({ frame, color: 'olivedrab', shapeFactor: shapeFactorMedium1 })
        runningCircle({ frame, color: 'mediumturquoise', shapeFactor: shapeFactorMedium2 })
        runningCircle({ frame, color: 'mediumspringgreen', shapeFactor: shapeFactorHigh })

        // saturation warning
        if (getMaxFrequencyRange(dataArray, 1, 10000) > 0.9) {
            canvasCtx.beginPath();
            canvasCtx.fillStyle = 'red';
            canvasCtx.arc(0, 0, 1, 0, 2 * Math.PI);
            canvasCtx.fill();
        }

        frame++
        requestAnimationFrame(animationLoop);
    }());
};

export const runningCircleFrequencySweepViz = (frame: number, potar: HTMLInputElement) => {
    const sourceFrequency = percentageTofreq(potar.valueAsNumber);
    const source = sinWaveSource(sourceFrequency);

    const analyser = audioCtx.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.fftSize = 2048;
    source.connect(analyser);
    source.connect(audioCtx.destination);

    // defines and immediately calls
    (function animationLoop() {
        const freq = percentageTofreq(potar.valueAsNumber);
        source.frequency.setValueAtTime(freq, audioCtx.currentTime);
        console.log(freq);

        clearCanvas();
        analyser.getByteFrequencyData(dataArray);

        // At maximum, moving circle have an amplitude of 1/2 of the radius. Min is 1/10
        const shapeFactorBass1 = 10 - 8 * getMaxFrequencyRange(dataArray, 1, 120)
        const shapeFactorBass2 = 10 - 8 * getMaxFrequencyRange(dataArray, 120, 350)
        const shapeFactorMedium1 = 10 - 8 * getMaxFrequencyRange(dataArray, 350, 600)
        const shapeFactorMedium2 = 10 - 8 * getMaxFrequencyRange(dataArray, 600, 1000)
        const shapeFactorHigh = 10 - 8 * getMaxFrequencyRange(dataArray, 1000, 10000)

        runningCircle({ frame, color: 'mediumvioletred', shapeFactor: shapeFactorBass1 })
        runningCircle({ frame, color: 'mediumslateblue', shapeFactor: shapeFactorBass2 })
        runningCircle({ frame, color: 'olivedrab', shapeFactor: shapeFactorMedium1 })
        runningCircle({ frame, color: 'mediumturquoise', shapeFactor: shapeFactorMedium2 })
        runningCircle({ frame, color: 'mediumspringgreen', shapeFactor: shapeFactorHigh })

        frame++
        requestAnimationFrame(animationLoop);
    }());
};
