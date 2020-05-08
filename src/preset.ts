import { handleMicStream, getMaxFrequencyRange } from "./audio";
import { canvasCtx, canvas, audioCtx } from "./global";
import { runningCircle } from "./draw";

export const runningCircleMicViz = ((frame: number) => {
    // wrap 
    handleMicStream(audioSource => {
        const source = audioSource;
        const analyser = audioCtx.createAnalyser();
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        analyser.fftSize = 2048;
        source.connect(analyser);

        // defines and immediately calls draw
        (function draw(){
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
            requestAnimationFrame(draw);
         }());
    })
});
