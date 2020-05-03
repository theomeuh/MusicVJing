import { plotCircle, oscillatingCircle, runningCircle } from "./draw";

var frame = 0;  // Animation frame
init();

function init() {
    window.requestAnimationFrame(draw);
}

function draw() {
    const canvas = <HTMLCanvasElement>document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const potar1 = (<HTMLInputElement>document.getElementById('potar1')).valueAsNumber

    canvas.style.border = '1px solid #63eccd';
    canvas.width = window.innerWidth * 2 / 3;
    canvas.height = window.innerHeight * 4 / 5;

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    // context.save();

    plotCircle(ctx, 200, frame);

    // Running wavy circle
    runningCircle(ctx, frame)
    // Oscillating wavy circle
    oscillatingCircle(ctx, frame, 200, potar1)

    // context.restore();
    frame++;
    window.requestAnimationFrame(draw);
}
