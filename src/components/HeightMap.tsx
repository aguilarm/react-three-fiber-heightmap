import React, { useEffect, useRef } from 'react';
import { useControls } from 'leva';
import * as THREE from 'three';
import useNoisyVertices from '../hooks/useNoisyVertices';
import { BufferAttribute } from 'three';
import useFlipPlaneOnX from '../hooks/useFlipPlaneOnX';

export const DEFAULT_CONTROL_VALUES = {
  seed: 'react-three-fiber',
  resolution: {
    value: 30,
    min: 1,
    max: 40,
    step: 1,
  },
  maxHeight: {
    value: 3,
    min: 1,
    max: 5,
    step: 0.1,
  },
  frequency: {
    value: 4,
    min: 0.1,
    max: 8,
    step: 0.1,
  },
  exponent: {
    value: 2,
    min: 1,
    max: 4,
    step: 0.25,
  },
  octaves: {
    value: 2,
    min: 1,
    max: 6,
    step: 1,
  },
  wireframe: true,
};

interface HeightMapProps {
  size?: number;
}

const HeightMap: React.FC<HeightMapProps> = ({ size = 200 }) => {
  const controls = useControls(DEFAULT_CONTROL_VALUES);
  const planeMesh = useRef<THREE.Mesh>(null);
  const planeGeo = useRef<THREE.PlaneGeometry>(null);
  useFlipPlaneOnX(planeMesh);

  const vertices = useNoisyVertices(controls, {
    ...controls,
  });

  useEffect(() => {
    if (!planeMesh.current || !planeGeo.current) {
      return;
    }
    planeGeo.current.setAttribute('position', new BufferAttribute(vertices, 3));
    planeGeo.current.attributes.position.needsUpdate = true;
    planeGeo.current.computeVertexNormals();
  }, [vertices, planeMesh, planeGeo]);

  return (
    <mesh ref={planeMesh}>
      <planeGeometry
        args={[size, size, controls.resolution, controls.resolution]}
        ref={planeGeo}
      />
      {controls.wireframe ? (
        <meshLambertMaterial
          wireframe={true}
          color={'red'}
          side={THREE.DoubleSide}
        />
      ) : (
        <meshLambertMaterial color={'red'} side={THREE.DoubleSide} />
      )}
    </mesh>
  );
};

export default HeightMap;
