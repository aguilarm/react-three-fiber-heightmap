import { describe, expect, it } from 'vitest';
import { calculateNoisyVertices } from './../hooks/useNoisyVertices';
import {
  fourBy100,
  fourtyBy100,
  oneBy100,
  threeBy100,
} from './__generated__/planevertices';

// Zero out our seed - we're testing that vertices position correctly on x/y
//   seed generation tested in getNoiseValueAtCoord
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSeededNoise2D = (x: number, y: number) => 0;

describe('useNoisyVertices', () => {
  it('should return the correct vertices for a plane sized 100 units with 1 resolution', () => {
    expect(calculateNoisyVertices(getSeededNoise2D, 1, 100)).toStrictEqual(
      oneBy100,
    );
  });
  it('should return the correct vertices for a plane sized 100 units with 3 resolution', () => {
    expect(calculateNoisyVertices(getSeededNoise2D, 3, 100)).toStrictEqual(
      threeBy100,
    );
  });
  it('should return the correct vertices for a plane sized 100 units with 4 resolution', () => {
    expect(calculateNoisyVertices(getSeededNoise2D, 4, 100)).toStrictEqual(
      fourBy100,
    );
  });
  it('should return the correct vertices for a plane sized 40 units with 100 resolution', () => {
    expect(calculateNoisyVertices(getSeededNoise2D, 40, 100)).toStrictEqual(
      fourtyBy100,
    );
  });
});
