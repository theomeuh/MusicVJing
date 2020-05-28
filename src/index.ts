// entrypoint

import { canvas, canvasCtx, debugCanvas, potar1 } from "./global";
import { runningCircleMicViz } from "./preset";
import { config } from "./global";

canvas.width = window.innerWidth * 9 / 10;
canvas.height = window.innerHeight * 16 / 20;
canvasCtx.translate(canvas.width / 2, canvas.height / 2)

debugCanvas.width = window.innerWidth * 9 / 10;
debugCanvas.height = window.innerHeight * 3 / 20;

var frame = 0;  // Animation frame

runningCircleMicViz(frame, potar1);

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'd':
            // show debug canvas
            config.DEBUG = !config.DEBUG;
            if (config.DEBUG) {
                debugCanvas.style.visibility = 'visible';
            } else {
                debugCanvas.style.visibility = 'hidden';
            }
            break;
        case 'b':
            // show border
            config.BORDER = !config.BORDER;
            if (config.BORDER) {
                canvas.style.border = '1px solid #63eccd';
                debugCanvas.style.border = '1px solid red';
            } else {
                canvas.style.border = '';
                debugCanvas.style.border = '';
            }
            break;
        case 'p':
            // show potar
            config.POTAR = !config.POTAR;
            if (config.POTAR) {
                potar1.style.visibility = 'visible';
            } else {
                potar1.style.visibility = 'hidden';
            }
            break;
        case 'h':
            console.log('press d to show debug sound meter');
            console.log('press b to show canvas borders');
            console.log('press p to show potar');
            break;
    }
});