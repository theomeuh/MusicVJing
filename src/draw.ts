import { degreesToRadians } from "./utils";


export function plotCircle(ctx: CanvasRenderingContext2D, radius: number, frame: number) {
    // DEBUG CIRCLE
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.stroke()
}

export function runningCircle(ctx: CanvasRenderingContext2D, frame: number, radius = 200, frequencySpace = 12, shapeFactor = 5) {
    const shape: ShapeFunction = (angle, phase) => Math.cos((angle + phase) * frequencySpace) / shapeFactor
    movingCircle(ctx, frame, radius, shape)
}

export function oscillatingCircle(ctx: CanvasRenderingContext2D, frame: number, radius = 200, frequencySpace = 4, shapeFactor = 5) {
    const shape: ShapeFunction = (angle, phase) => Math.cos(phase) * Math.cos(frequencySpace * angle) / shapeFactor
    movingCircle(ctx, frame, radius, shape)
}

function movingCircle(ctx: CanvasRenderingContext2D, frame: number, radius: number, shapeFunction: ShapeFunction) {
    ctx.beginPath()
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(66,44,255)";

    const phase = degreesToRadians(frame);   // As is, 1 degree (over 360) per animation
    Array.from(Array(360).keys())   // every degree
        .map(degree => degreesToRadians(degree))    // rad
        .map(rad => ({
            x: radius * (shapeFunction(rad, phase) + 1) * Math.cos(rad),     // radius * (s(t,theta) + const) * polar2cart
            y: radius * (shapeFunction(rad, phase) + 1) * Math.sin(rad)
        }))
        .forEach(point => ctx.lineTo(point.x, point.y))
    ctx.stroke()
}


// angle defines the shape depending on the position on the curve
// phase is the time dependent part of the shape
type ShapeFunction = (angle: number, phase: number) => number