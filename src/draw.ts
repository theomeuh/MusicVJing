// manage visual part of project

import { canvasCtx as ctx, canvas } from "./global";
import { degreesToRadians } from "./utils";


export function plotDebugCircle(radius = 200) {
    // DEBUG CIRCLE
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

export function clearCanvas() {
    // Store the current transformation matrix
    ctx.save();

    // Use the identity matrix
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    ctx.restore();
}

export function runningCircle({
    frame,
    radius = 200,
    color = 'rgb(66,44,255)',
    shapeFactor = 5,
    frequencySpace = 12
}: MovingCircleParams) {
    const shape: ShapeFunction = (angle, phase) => Math.cos((angle + phase) * frequencySpace) / shapeFactor;
    movingCircleFactory(frame, radius, color, shape);
}

export function oscillatingCircle({
    frame,
    radius = 200,
    color = 'rgb(66,44,255)',
    shapeFactor = 5,
    frequencySpace = 4
}: MovingCircleParams) {
    const shape: ShapeFunction = (angle, phase) => Math.cos(phase) * Math.cos(frequencySpace * angle) / shapeFactor;
    movingCircleFactory(frame, radius, color, shape);
}

function movingCircleFactory(frame: number, radius: number, color: string, shapeFunction: ShapeFunction) {
    ctx.beginPath();
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;

    const phase = degreesToRadians(frame);   // As is, 1 degree (over 360) per animation
    Array.from(Array(361).keys())   // every degree
        .map(degree => degreesToRadians(degree))    // rad
        .map(rad => ({
            x: radius * (shapeFunction(rad, phase) + 1) * Math.cos(rad),
            y: radius * (shapeFunction(rad, phase) + 1) * Math.sin(rad)
        }))
        .forEach(point => ctx.lineTo(point.x, point.y));
    ctx.stroke();
}


// angle defines the shape depending on the position (theta polar coordinate) on the curve
// phase is the time dependent part of the shape
type ShapeFunction = (angle: number, phase: number) => number

export interface MovingCircleParams {
    frame: number,
    radius?: number,
    color?: string,
    frequencySpace?: number,
    shapeFactor?: number,
}
