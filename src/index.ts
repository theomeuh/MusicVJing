// entrypoint

import { canvas, canvasCtx, debugCanvas, potar1, potar2 } from "./global";
import { runningCircleFrequencySweepViz, runningCircleMicViz } from "./preset";

canvas.style.border = '1px solid #63eccd';
canvas.width = window.innerWidth * 9 / 10;
canvas.height = window.innerHeight * 16 / 20;
canvasCtx.translate(canvas.width / 2, canvas.height / 2)

debugCanvas.style.border = '1px solid red';
debugCanvas.width = window.innerWidth * 9 / 10;
debugCanvas.height = window.innerHeight * 3 / 20;

var frame = 0;  // Animation frame

runningCircleMicViz(frame, potar1);
// runningCircleFrequencySweepViz(frame, potar2);