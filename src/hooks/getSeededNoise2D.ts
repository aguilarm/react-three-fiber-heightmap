import alea from 'alea';
import { createNoise2D } from 'simplex-noise';
import { useMemo } from 'react';

export default function useGetSeededNoise2D(seed: string | number) {
  return useMemo(() => {
    const pRng = alea(seed);
    const generator = createNoise2D(pRng);
    // Normalize our value between 0 and 1 instead of -1 and -1
    return (x: number, y: number) => generator(x, y) / 2 + 0.5;
  }, [seed]);
}
