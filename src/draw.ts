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
    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(66,44,255)";

    const frequency = 3;
    const phase = degreesToRadians(step);
    const amplitude = angle => (radius / 5) * Math.cos(angle * frequency)
    Array.from(Array(360).keys())   // every degree
        .map(degree => degreesToRadians(degree))    // rad
        .map(rad => ({
            x: amplitude(rad + phase) + radius * Math.cos(rad),
            y: amplitude(rad + phase) + radius * Math.sin(rad)
        }))
        .forEach(point => ctx.lineTo(point.x, point.y))

    ctx.stroke()
}