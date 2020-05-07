// entrypoint

import { visualizeMicrophone, getMaxFrequencyRange } from "./audio";
import { oscillatingCircle, plotDebugCircle, runningCircle } from "./draw";
import { canvas, canvasCtx, potar1, potar2, audioCtx } from "./global";

canvas.style.border = '1px solid #63eccd';
canvas.width = window.innerWidth * 2 / 3;
canvas.height = window.innerHeight * 4 / 5;

canvasCtx.translate(canvas.width / 2, canvas.height / 2)

var frame = 0;  // Animation frame
// window.requestAnimationFrame(draw);

// function draw() {
//     canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
//     // context.save();

//     // Debug circle
//     plotDebugCircle();

//     // Running wavy circle
//     runningCircle({ frame })
//     // Oscillating wavy circle
//     oscillatingCircle({
//         frame,
//         frequencySpace: potar1.valueAsNumber,
//         shapeFactor: potar2.valueAsNumber
//     })
//     // context.restore();
//     frame++;
//     window.requestAnimationFrame(draw);
// }

visualizeMicrophone(visualize)

function visualize(audioNode: AudioNode) {
    var source = audioNode;
    var analyser = audioCtx.createAnalyser();
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    analyser.fftSize = 2048;
    source.connect(analyser);

    draw()
    function draw() {
        canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        // At maximum, moving circle have an amplitude of 1/2 of the radius. Min is 1/10
        var shapeFactorBass1 = 10 - 8 * getMaxFrequencyRange(dataArray, 1, 120)
        var shapeFactorBass2 = 10 - 8 * getMaxFrequencyRange(dataArray, 120, 350)
        var shapeFactorMedium1 = 10 - 8 * getMaxFrequencyRange(dataArray, 350, 600)
        var shapeFactorMedium2 = 10 - 8 * getMaxFrequencyRange(dataArray, 600, 1000)
        var shapeFactorHigh = 10 - 8 * getMaxFrequencyRange(dataArray, 1000, 10000)

        runningCircle({ frame, color: 'mediumvioletred', shapeFactor: shapeFactorBass1 })
        runningCircle({ frame, color: 'mediumslateblue', shapeFactor: shapeFactorBass2 })
        runningCircle({ frame, color: 'olivedrab', shapeFactor: shapeFactorMedium1 })
        runningCircle({ frame, color: 'mediumturquoise', shapeFactor: shapeFactorMedium2 })
        runningCircle({ frame, color: 'mediumspringgreen', shapeFactor: shapeFactorHigh })

        frame++
        requestAnimationFrame(draw);
    }
}