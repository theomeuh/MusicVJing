import { getMaxValueInFreqRange, getMicStream, sinWaveSource } from "./audio";
import { runningCircle } from "./draw";
import { audioCtx, canvas, canvasCtx, debugCanvas, debugCanvasCtx } from "./global";
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

    // common const to draw circles
    const minShapeFactor = 3;
    const maxShapeFactor = 20;
    const radius = 0.5 * canvas.height * minShapeFactor / (minShapeFactor + 1);
    const shapeFactor = (freqValue: number) => maxShapeFactor - (maxShapeFactor - minShapeFactor) * freqValue;

    // animation loop
    (function animationLoop() {
        canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        analyserGain.gain.value = gainPotar(potar1.valueAsNumber);
        analyser.getByteFrequencyData(dataArray);

        // At maximum, moving circle have an amplitude of 1/3 of the radius. Min is 1/20
        const shapeFactorBass1 = shapeFactor(getMaxValueInFreqRange(dataArray, 1, 120));
        const shapeFactorBass2 = shapeFactor(getMaxValueInFreqRange(dataArray, 120, 350));
        const shapeFactorMedium1 = shapeFactor(getMaxValueInFreqRange(dataArray, 350, 600));
        const shapeFactorMedium2 = shapeFactor(getMaxValueInFreqRange(dataArray, 600, 1000));
        const shapeFactorHigh = shapeFactor(getMaxValueInFreqRange(dataArray, 1000, 10000));

        runningCircle({ frame, radius, color: 'mediumvioletred', shapeFactor: shapeFactorBass1 })
        runningCircle({ frame, radius, color: 'mediumslateblue', shapeFactor: shapeFactorBass2 })
        runningCircle({ frame, radius, color: 'olivedrab', shapeFactor: shapeFactorMedium1 })
        runningCircle({ frame, radius, color: 'mediumturquoise', shapeFactor: shapeFactorMedium2 })
        runningCircle({ frame, radius, color: 'mediumspringgreen', shapeFactor: shapeFactorHigh })

        // saturation warning
        if (getMaxValueInFreqRange(dataArray, 1, 10000) > 0.9) {
            canvasCtx.beginPath();
            canvasCtx.fillStyle = 'red';
            canvasCtx.arc(0, 0, 2, 0, 2 * Math.PI);
            canvasCtx.fill();
        }

        // bar graph
        debugCanvasCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);
        for (var i = 0; i < analyser.frequencyBinCount; i++) {
            var value = dataArray[i];
            var percent = value / 256;
            var height = debugCanvas.height * percent;
            var offset = debugCanvas.height - height - 1;
            var barWidth = debugCanvas.width / analyser.frequencyBinCount;
            var hue = i / analyser.frequencyBinCount * 360;
            debugCanvasCtx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
            debugCanvasCtx.fillRect(i * barWidth, offset, barWidth, height);
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
        canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        const freq = percentageTofreq(potar.valueAsNumber);
        source.frequency.setValueAtTime(freq, audioCtx.currentTime);
        console.log(freq);

        analyser.getByteFrequencyData(dataArray);

        // At maximum, moving circle have an amplitude of 1/2 of the radius. Min is 1/10
        const shapeFactorBass1 = 10 - 8 * getMaxValueInFreqRange(dataArray, 1, 120)
        const shapeFactorBass2 = 10 - 8 * getMaxValueInFreqRange(dataArray, 120, 350)
        const shapeFactorMedium1 = 10 - 8 * getMaxValueInFreqRange(dataArray, 350, 600)
        const shapeFactorMedium2 = 10 - 8 * getMaxValueInFreqRange(dataArray, 600, 1000)
        const shapeFactorHigh = 10 - 8 * getMaxValueInFreqRange(dataArray, 1000, 10000)

        runningCircle({ frame, color: 'mediumvioletred', shapeFactor: shapeFactorBass1 })
        runningCircle({ frame, color: 'mediumslateblue', shapeFactor: shapeFactorBass2 })
        runningCircle({ frame, color: 'olivedrab', shapeFactor: shapeFactorMedium1 })
        runningCircle({ frame, color: 'mediumturquoise', shapeFactor: shapeFactorMedium2 })
        runningCircle({ frame, color: 'mediumspringgreen', shapeFactor: shapeFactorHigh })

        frame++
        requestAnimationFrame(animationLoop);
    }());
};
