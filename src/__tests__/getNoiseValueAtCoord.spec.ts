import alea from 'alea';
import { createNoise2D } from 'simplex-noise';
import getNoiseValueAtCoord from '../utils/getNoiseValueAtCoord';
import { describe, it, expect } from 'vitest';

const pRng = alea('test');
const getSeededNoise2D = createNoise2D(pRng);

describe('getNoiseValueAtCoord', () => {
  it(`obtains the next prng value 0 at 0,0 with seed 'test'`, () => {
    expect(getNoiseValueAtCoord(getSeededNoise2D, 0, 0, 100, 100)).toBe(
      0.3071565136272162,
    );
  });
  it(`obtains the next prng value at 1,1 with seed 'test'`, () => {
    expect(getNoiseValueAtCoord(getSeededNoise2D, 1, 1, 100, 100)).toBe(
      0.33760121825531686,
    );
  });
  it(`obtains the next prng value at -1,-1 with seed 'test'`, () => {
    expect(getNoiseValueAtCoord(getSeededNoise2D, -1, -1, 100, 100)).toBe(
      0.2738471156096711,
    );
  });
  it(`obtains the next prng value at 1000,-1000 with seed 'test'`, () => {
    expect(getNoiseValueAtCoord(getSeededNoise2D, 1000, 1000, 100, 100)).toBe(
      0.6329125280548408,
    );
  });
});
