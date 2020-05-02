import { degreesToRadians } from "./utils";

export function plotSine(ctx: CanvasRenderingContext2D, xOffset: number, yOffset: number) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const scale = 20;

    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgb(66,44,255)";

    let x = 4;
    let y = 0;
    const amplitude = 40;
    const frequency = 20;
    ctx.moveTo(x, y + yOffset);
    while (x < width) {
        y = amplitude * Math.sin((x + xOffset) / frequency);
        ctx.lineTo(x, y);
        x++;
    }
    ctx.stroke();

}

export function plotCircle(ctx: CanvasRenderingContext2D, radius: number, step: number) {
    const frequency = 12;
    const phase = degreesToRadians(step);
    const shapeFactor = 5;

    // Running wavy circle
    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(66,44,255)";
    const amplitude = angle => Math.cos(angle * frequency) / shapeFactor
    Array.from(Array(360).keys())   // every degree
        .map(degree => degreesToRadians(degree))    // rad
        .map(rad => ({
            x: radius * (amplitude(rad + phase) + 1) * Math.cos(rad),     // radius * (s(t,theta) + const) * polar2cart
            y: radius * (amplitude(rad + phase) + 1) * Math.sin(rad)
        }))
        .forEach(point => ctx.lineTo(point.x, point.y))
    ctx.stroke()

    // Oscillating wavy circle
    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(66,44,255)";
    Array.from(Array(360).keys())   // every degree
        .map(degree => degreesToRadians(degree))    // rad
        .map(rad => ({ theta: rad, fixedShape: Math.cos(4 * rad) }))
        .forEach(coord => {
            ctx.lineTo(
                radius * (Math.cos(phase) * coord.fixedShape / shapeFactor + 1) * Math.cos(coord.theta),     // radius * (f(t) * g(theta) + const) * polar2cart
                radius * (Math.cos(phase) * coord.fixedShape / shapeFactor + 1) * Math.sin(coord.theta)
            )
        })
    ctx.stroke()

    // DEBUG CIRCLE
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.stroke()
}