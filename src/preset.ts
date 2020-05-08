import { getMaxFrequencyRange, getMicStream, sinWaveSource } from "./audio";
import { runningCircle } from "./draw";
import { audioCtx, canvas, canvasCtx, potar1 } from "./global";
import { percentageTofreq } from "./utils";

export async function runningCircleMicViz(frame: number) {
    let audioSource: AudioNode;
    await getMicStream()
        .then(micStream => audioSource = audioCtx.createMediaStreamSource(micStream))
        .catch(() => console.log("GUM error"))

    const source = audioSource;
    const analyser = audioCtx.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.fftSize = 2048;
    source.connect(analyser);

    // defines and immediately calls draw
    (function animationLoop() {
        canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
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

export const runningCircleFrequencySweepViz = (frame: number, potar: HTMLInputElement) => {
    const sourceFrequency = percentageTofreq(potar1.valueAsNumber);
    const source = sinWaveSource(sourceFrequency);

    const analyser = audioCtx.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    analyser.fftSize = 2048;
    source.connect(analyser);
    source.connect(audioCtx.destination);

    // defines and immediately calls draw
    (function animationLoop() {
        const freq = percentageTofreq(potar1.valueAsNumber);
        source.frequency.setValueAtTime(freq, audioCtx.currentTime);
        console.log(freq);

        canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
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
