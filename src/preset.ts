import { maxPercentInFreqRange, getMicStream, sinWaveSource } from "./audio";
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
    const freqArray = new Uint8Array(bufferLength);

    // audio send to analyser is amplified up to maxGain
    const maxGain = 4
    const gainPotar = percentageToGain(maxGain);
    potar1.value = (100 / maxGain).toString();    // initial gain is 1

    // set up nodes and connections
    analyserGain.gain.value = gainPotar(potar1.valueAsNumber);
    analyser.fftSize = 2048;
    source.connect(analyserGain)
    analyserGain.connect(analyser);

    // animation loop
    (function animationLoop() {
        // clear canvas
        canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        debugCanvasCtx.clearRect(0, 0, debugCanvas.width, debugCanvas.height);

        // read / write required data for animations
        analyserGain.gain.value = gainPotar(potar1.valueAsNumber);
        analyser.getByteFrequencyData(freqArray);

        // animate according to above data
        mainAnimation(freqArray, frame);
        saturationWarning(freqArray);
        debugSpectrum(analyser, freqArray);

        // increase frame count and request next animation
        frame++
        requestAnimationFrame(animationLoop);
    }());
};
function mainAnimation(freqArray: Uint8Array, frame: number) {
    // common const to draw circles
    const minShapeFactor = 3;
    const maxShapeFactor = 20;
    const radius = 0.5 * canvas.height * minShapeFactor / (minShapeFactor + 1);
    const shapeFactor = (freqValue: number) => maxShapeFactor - (maxShapeFactor - minShapeFactor) * freqValue;

    // At maximum, running circles have an amplitude of 1/3 of the radius. Min is 1/20
    const shapeFactorBass1 = shapeFactor(maxPercentInFreqRange(freqArray, 1, 120));
    const shapeFactorBass2 = shapeFactor(maxPercentInFreqRange(freqArray, 120, 350));
    const shapeFactorMedium1 = shapeFactor(maxPercentInFreqRange(freqArray, 350, 600));
    const shapeFactorMedium2 = shapeFactor(maxPercentInFreqRange(freqArray, 600, 1000));
    const shapeFactorHigh = shapeFactor(maxPercentInFreqRange(freqArray, 1000, 10000));

    runningCircle({ frame, radius, color: 'mediumvioletred', shapeFactor: shapeFactorBass1 })
    runningCircle({ frame, radius, color: 'mediumslateblue', shapeFactor: shapeFactorBass2 })
    runningCircle({ frame, radius, color: 'olivedrab', shapeFactor: shapeFactorMedium1 })
    runningCircle({ frame, radius, color: 'mediumturquoise', shapeFactor: shapeFactorMedium2 })
    runningCircle({ frame, radius, color: 'mediumspringgreen', shapeFactor: shapeFactorHigh })
}
function saturationWarning(freqArray: Uint8Array) {
    if (maxPercentInFreqRange(freqArray, 1, 10000) > 0.9) {
        // saturation warning
        canvasCtx.beginPath();
        canvasCtx.fillStyle = 'red';
        canvasCtx.arc(0, 0, 2, 0, 2 * Math.PI);
        canvasCtx.fill();
    }
}
function debugSpectrum(analyser: AnalyserNode, freqArray: Uint8Array) {
    const barCount = 32; // power of 2
    const freqCount = analyser.frequencyBinCount;
    const freqPerBar = freqCount / barCount;

    const barInterspace = 1; // px
    const barWidth = (debugCanvas.width - ((barCount - 1) * barInterspace)) / barCount;

    const blockCount = 12;
    const blockInterspace = 2; // px
    const blockHeight = (debugCanvas.height - ((blockCount - 1) * blockInterspace)) / blockCount;

    // bar drawing
    for (let iBar = 0; iBar < barCount; iBar++) {
        const value = Math.max(...freqArray.slice(iBar * freqPerBar, (iBar + 1) * freqPerBar));
        const percent = value / 256;    // [0..1]

        // block drawing
        let iBlock = 0;
        while (percent > iBlock / blockCount) {
            const height = blockHeight + iBlock * (blockInterspace + blockHeight);
            const offset = debugCanvas.height - height;

            let color: string;
            const blockPercent = iBlock / blockCount
            if (blockPercent > 0.75) {
                color = "#ff2b19"   // red
            } else if (blockPercent > 0.5) {
                color = "#ffac19"   // orange
            } else {
                color = "#0ff"  // cyan
            }
            // shadow may slow the animation
            debugCanvasCtx.shadowBlur = 10;
            debugCanvasCtx.shadowColor = color;
            debugCanvasCtx.fillStyle = color;
            debugCanvasCtx.fillRect(iBar * (barWidth + barInterspace), offset, barWidth, blockHeight);
            // do not forget to remove blur so other draw can ignore shadow settings
            debugCanvasCtx.shadowBlur = 0;
            iBlock++;
        }
    }
}

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
        const shapeFactorBass1 = 10 - 8 * maxPercentInFreqRange(dataArray, 1, 120)
        const shapeFactorBass2 = 10 - 8 * maxPercentInFreqRange(dataArray, 120, 350)
        const shapeFactorMedium1 = 10 - 8 * maxPercentInFreqRange(dataArray, 350, 600)
        const shapeFactorMedium2 = 10 - 8 * maxPercentInFreqRange(dataArray, 600, 1000)
        const shapeFactorHigh = 10 - 8 * maxPercentInFreqRange(dataArray, 1000, 10000)

        runningCircle({ frame, color: 'mediumvioletred', shapeFactor: shapeFactorBass1 })
        runningCircle({ frame, color: 'mediumslateblue', shapeFactor: shapeFactorBass2 })
        runningCircle({ frame, color: 'olivedrab', shapeFactor: shapeFactorMedium1 })
        runningCircle({ frame, color: 'mediumturquoise', shapeFactor: shapeFactorMedium2 })
        runningCircle({ frame, color: 'mediumspringgreen', shapeFactor: shapeFactorHigh })

        frame++
        requestAnimationFrame(animationLoop);
    }());
};
