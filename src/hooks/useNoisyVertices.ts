import { useMemo } from 'react';
import useGetSeededNoise2D from './getSeededNoise2D';
import getNoiseValueAtCoord, {
  NoiseOptions,
} from '../utils/getNoiseValueAtCoord';

export function calculateNoisyVertices(
  getSeededNoise2D: (x: number, y: number) => number,
  resolution: number,
  planeSize: number,
  noiseOptions?: NoiseOptions,
): Float32Array {
  const verticesCount = (resolution + 1) ** 2;
  // 3 data points (x,y,z) for each point in the plane
  const bufferSize = verticesCount * 3;
  const nextVertBuffer = new Float32Array(bufferSize);
  const offset = planeSize / 2;
  // build array of vertices clockwise
  // Mutate with for loop instead of cloning with map because we need to reference prev x/y in z calc
  for (let index = 0; index < nextVertBuffer.length; index++) {
    const pos = index + 1;
    if (pos % 3 === 1) {
      // x value
      // total columns is total x values (length/3) divided by length of columns - res+1
      //   so we want the remainder of the index/3 on total columns (res+1)
      const column = (index / 3) % (resolution + 1);
      // great the column informs how many times we multiply resolution
      // we actually multiply by the totalsize/resolution
      const rawX = (planeSize / resolution) * column;
      // now we add the offset - which is going to be half of the size
      // console.log("X values", index, column, rawX, resolution + 1);
      // todo we have an opportunity for dp here because we can memo the x/y values on row
      nextVertBuffer[index] = rawX - offset;
    } else if (pos % 3 === 2) {
      // y
      // for rows, we still have res+1 number of rows
      //   however, we want to use the same row for a chunk of columns
      //   this means, one row for every resolution+1 points
      const row = Math.floor((index - 1) / 3 / (resolution + 1));
      // we'll default to rows going down negative y and then add our offset
      const rawY = (planeSize / resolution) * row * -1;
      nextVertBuffer[index] = rawY + offset;
    } else {
      nextVertBuffer[index] = getNoiseValueAtCoord(
        getSeededNoise2D,
        nextVertBuffer[index - 2],
        nextVertBuffer[index - 1],
        planeSize,
        planeSize,
        noiseOptions,
      );
    }
  }
  return nextVertBuffer;
}

interface NoisyVerticesControls {
  seed: string | number;
  resolution: number;
}

/**
 * Output a Float32Array to be used as threeJS vertices.
 *   Such an array is one dimensional and every 1st value = x, 2nd = y, and 3rd = z.
 */
export default function useNoisyVertices(
  { seed, resolution }: NoisyVerticesControls,
  noiseOptions: NoiseOptions,
  planeSize = 200,
) {
  const getSeededNoise2D = useGetSeededNoise2D(seed);
  // the number of points in our float32 array are going to be
  // size/resolution^2 is the number per
  return useMemo(
    () =>
      calculateNoisyVertices(
        getSeededNoise2D,
        resolution,
        planeSize,
        noiseOptions,
      ),
    [resolution, planeSize, getSeededNoise2D, noiseOptions],
  );
}
