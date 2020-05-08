// useful functions

export const degreesToRadians = (angle: number) => (Math.PI * angle) / 180;

// percentageTofreq(100) => 20 000 ; percentageTofreq(0) => 1
export const percentageTofreq = (percentage: number) => Math.pow(1.1041, percentage);