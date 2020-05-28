// useful functions

export const degreesToRadians = (angle: number) => (Math.PI * angle) / 180;


// move [0..100] to [0..max]
export const percentageToGain = (max: number) => (percentage: number) => max * percentage / 100;
