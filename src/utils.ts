// useful functions

export const degreesToRadians = (angle: number) => (Math.PI * angle) / 180;


// move [0..100] to [-maxGain..maxGain], be aware of the log scale
export const percentageTodBGain = (maxGain: number) => (percentage: number) => Math.pow(10, (((percentage / 100) * 2 * maxGain - maxGain) / 20));
