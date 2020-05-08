// entrypoint

import { canvas, canvasCtx, potar1 } from "./global";
import { runningCircleFrequencySweepViz, runningCircleMicViz } from "./preset";

canvas.style.border = '1px solid #63eccd';
canvas.width = window.innerWidth * 2 / 3;
canvas.height = window.innerHeight * 4 / 5;

canvasCtx.translate(canvas.width / 2, canvas.height / 2)

var frame = 0;  // Animation frame

runningCircleMicViz(frame);
// runningCircleFrequencySweepViz(frame, potar1);