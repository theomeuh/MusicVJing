import { degreesToRadians } from "./utils";


export function plotCircle(ctx: CanvasRenderingContext2D, radius = 200) {
    // DEBUG CIRCLE
    ctx.beginPath()
    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";
    ctx.arc(0, 0, radius, 0, 2 * Math.PI)
    ctx.stroke()
}

export function runningCircle({
    ctx,
    frame,
    radius = 200,
    shapeFactor = 5,
    frequencySpace = 12
}: MovingCircleParams) {
    const shape: ShapeFunction = (angle, phase) => Math.cos((angle + phase) * frequencySpace) / shapeFactor
    movingCircleFactory(ctx, frame, radius, shape)
}

export function oscillatingCircle({
    ctx,
    frame,
    radius = 200,
    shapeFactor = 5,
    frequencySpace = 4
}: MovingCircleParams) {
    const shape: ShapeFunction = (angle, phase) => Math.cos(phase) * Math.cos(frequencySpace * angle) / shapeFactor
    movingCircleFactory(ctx, frame, radius, shape)
}

function movingCircleFactory(ctx: CanvasRenderingContext2D, frame: number, radius: number, shapeFunction: ShapeFunction) {
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


// angle defines the shape depending on the position (theta polar coordinate) on the curve
// phase is the time dependent part of the shape
type ShapeFunction = (angle: number, phase: number) => number

export interface MovingCircleParams {
    ctx: CanvasRenderingContext2D,
    frame: number,
    radius?: number,
    frequencySpace?: number,
    shapeFactor?: number,
}