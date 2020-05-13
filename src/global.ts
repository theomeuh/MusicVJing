// export global variable across all the project

// viz
export const canvas = <HTMLCanvasElement>document.getElementById('canvas');
export const canvasCtx = canvas.getContext('2d');

export const debugCanvas = <HTMLCanvasElement>document.getElementById('debug-canvas');
export const debugCanvasCtx = debugCanvas.getContext('2d');

// control
// range is [0..100]. Their values should be wrapped 
export const potar1 = <HTMLInputElement>document.getElementById('potar1');
export const potar2 = <HTMLInputElement>document.getElementById('potar2');

// audio
export var audioCtx = new window.AudioContext();
