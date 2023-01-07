/**
 * Add noise at increasing frequencies then combine the output
 *   This process adds finer details to an otherwise smooth wave.
 */
function generateOctaves(
  x: number,
  y: number,
  total: number,
  getNoise2D: (x: number, y: number) => number,
  currentOctave = 1,
  lastValue = 0,
): number {
  if (currentOctave > total) {
    // because our multiples may result in a number over 1
    //   lets shave off the extra we've added to normalize to a 0-1 value again.
    const extras = [];
    for (let currentHalf = 0; currentHalf < total; currentHalf++) {
      extras.push(0.5 ** currentHalf);
    }
    const divisor = extras.reduce((prev, curr) => prev + curr, 0);
    return lastValue / divisor;
  }
  // Multiple is a continually doubling number starting at 1 - 1,2,4,8...
  const multiple = currentOctave - (currentOctave % 2) * 2;
  // Because we're multiplying x/y, we want to reduce it again in an effort to keep the number small
  const magnitude = 0.5 ** (currentOctave - 1);
  const value = magnitude * getNoise2D(multiple * x, multiple * y);
  return generateOctaves(
    x,
    y,
    total,
    getNoise2D,
    currentOctave + 1,
    value + lastValue,
  );
}

export interface NoiseOptions {
  frequency?: number;
  octaves: number;
  exponent?: number;
  maxHeight: number;
}

const DEFAULT_OPTIONS = {
  exponent: 1,
  maxHeight: 1,
  octaves: 1,
  frequency: 1,
};

export default function getNoiseValueAtCoord(
  getNoise2D: (x: number, y: number) => number,
  x: number,
  y: number,
  width: number,
  height: number,
  options: NoiseOptions = DEFAULT_OPTIONS,
): number {
  // normalize x/y to positive values
  let nx = x / width - 0.5;
  let ny = y / width - 0.5;
  options = {
    ...DEFAULT_OPTIONS,
    ...options,
  };
  if (options.frequency) {
    nx = nx * options.frequency;
    ny = ny * options.frequency;
  }
  let noiseVal =
    generateOctaves(nx, ny, options.octaves, getNoise2D) * options.maxHeight;
  if (options.exponent) {
    noiseVal = noiseVal ** options.exponent;
  }
  return noiseVal;
}
