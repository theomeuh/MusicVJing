import { degreesToRadians } from "./utils";


export function plotCircle(ctx: CanvasRenderingContext2D, radius: number, step: number) {
    // Running wavy circle
    runningCircle(ctx, step)

    // Oscillating wavy circle
    oscillatingCircle(ctx, step)

    // DEBUG CIRCLE
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.stroke()
}

export function runningCircle(ctx: CanvasRenderingContext2D, step: number, radius = 200, frequencySpace = 12, shapeFactor = 5) {
    // phase is the time dependent part of the shape
    // angle defines the shape depending on the position on the curve
    const phase = degreesToRadians(step);   // As is, 1 degree (over 360) per animation
    const shape = (angle, phase) => Math.cos((angle + phase) * frequencySpace) / shapeFactor

    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(66,44,255)";

    Array.from(Array(360).keys())   // every degree
        .map(degree => degreesToRadians(degree))    // rad
        .map(rad => ({
            x: radius * (shape(rad, phase) + 1) * Math.cos(rad),     // radius * (s(t,theta) + const) * polar2cart
            y: radius * (shape(rad, phase) + 1) * Math.sin(rad)
        }))
        .forEach(point => ctx.lineTo(point.x, point.y))
    ctx.stroke()
}

export function oscillatingCircle(ctx: CanvasRenderingContext2D, step: number, radius = 200, frequencySpace = 4, shapeFactor = 5) {
    // phase is the time dependent part of the shape
    // angle defines the shape depending on the position on the curve
    const phase = degreesToRadians(step);   // As is, 1 degree (over 360) per animation
    const shape = (angle, phase) => Math.cos(phase) * Math.cos(frequencySpace * angle) / shapeFactor

    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(66,44,255)";

    Array.from(Array(360).keys())   // every degree
        .map(degree => degreesToRadians(degree))    // rad
        .map(rad => ({
            x: radius * (shape(rad, phase) + 1) * Math.cos(rad),     // radius * (s(t,theta) + const) * polar2cart
            y: radius * (shape(rad, phase) + 1) * Math.sin(rad)
        }))
        .forEach(point => ctx.lineTo(point.x, point.y))
    ctx.stroke()
}
