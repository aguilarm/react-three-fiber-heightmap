import * as THREE from 'three';
import { useEffect, useState } from 'react';

export default function useFlipPlaneOnX(
  planeMeshRef: React.RefObject<THREE.Mesh>,
) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const plane = planeMeshRef.current;
    if (!plane || done) return;
    plane.rotation.x = -Math.PI * 0.5;
    setDone(true);
  }, [planeMeshRef, done]);
}
