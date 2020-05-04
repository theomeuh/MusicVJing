import { plotCircle, oscillatingCircle, runningCircle } from "./draw";

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const potar1 = <HTMLInputElement>document.getElementById('potar1')
const potar2 = <HTMLInputElement>document.getElementById('potar2')

canvas.style.border = '1px solid #63eccd';
canvas.width = window.innerWidth * 2 / 3;
canvas.height = window.innerHeight * 4 / 5;

ctx.translate(canvas.width / 2, canvas.height / 2)

var frame = 0;  // Animation frame
init();

function init() {
    window.requestAnimationFrame(draw);
}

function draw() {
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // context.save();

    const radius = 200;
    // Debug circle
    plotCircle(ctx);

    // Running wavy circle
    runningCircle({ ctx, frame })
    // Oscillating wavy circle
    oscillatingCircle({
        ctx,
        frame,
        frequencySpace: potar1.valueAsNumber,
        shapeFactor: potar2.valueAsNumber
    })
    // context.restore();
    frame++;
    window.requestAnimationFrame(draw);
}
