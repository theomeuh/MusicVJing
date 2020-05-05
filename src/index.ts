// entrypoint

import { oscillatingCircle, plotDebugCircle, runningCircle } from "./draw";
import { canvas, canvasCtx, potar1, potar2 } from "./global";

canvas.style.border = '1px solid #63eccd';
canvas.width = window.innerWidth * 2 / 3;
canvas.height = window.innerHeight * 4 / 5;

canvasCtx.translate(canvas.width / 2, canvas.height / 2)

var frame = 0;  // Animation frame
window.requestAnimationFrame(draw);

function draw() {
    canvasCtx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // context.save();

    // Debug circle
    plotDebugCircle();

    // Running wavy circle
    runningCircle({ frame })
    // Oscillating wavy circle
    oscillatingCircle({
        frame,
        frequencySpace: potar1.valueAsNumber,
        shapeFactor: potar2.valueAsNumber
    })
    // context.restore();
    frame++;
    window.requestAnimationFrame(draw);
}
