import React, { useEffect, useMemo, useRef } from "react";
import alea from "alea";
import { useControls } from "leva";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";
import { BufferAttribute } from "three";

function getNoiseValue(
  getNoise2D: (x: number, y: number) => number,
  x: number,
  y: number,
  frequency: number,
  exponent: number,
  height: number
) {
  if (frequency) {
    x = x * frequency;
    y = y * frequency;
  }
  let noiseVal = getNoise2D(x, y) * height;
  if (exponent) {
    noiseVal = noiseVal ** exponent;
  }
  return noiseVal;
}

const HeightMap = () => {
  const { wireframe, frequency, exponent, seed, resolution, height } =
    useControls({
      seed: "heightmap",
      resolution: {
        value: 20,
        min: 1,
        max: 40,
        step: 1,
      },
      height: {
        value: 4,
        min: 1,
        max: 10,
        step: 0.25,
      },
      frequency: {
        value: 1,
        min: 0.1,
        max: 6,
        step: 0.1,
      },
      exponent: {
        value: 1,
        min: 1,
        max: 3,
        step: 1,
      },
      wireframe: false,
    });
  const planeMesh = useRef<THREE.Mesh>(null);
  const planeGeo = useRef<THREE.PlaneGeometry>(null);
  const getNoise2D = useMemo(() => {
    const pRng = alea(seed);
    return createNoise2D(pRng);
  }, [seed]);

  useEffect(() => {
    if (!planeMesh.current || !planeGeo.current) {
      return;
    }
    const bufferVerts = planeMesh.current.geometry.attributes.position
      .array as Float32Array;
    const nextPos = bufferVerts.map((val, i, src) => {
      // Only edit y values which are offset by 1
      if (i % 3 !== 2) return val;
      return getNoiseValue(
        getNoise2D,
        src[i - 2],
        src[i - 1],
        frequency,
        exponent,
        height
      );
    });
    planeGeo.current.setAttribute("position", new BufferAttribute(nextPos, 3));
    planeGeo.current.attributes.position.needsUpdate = true;
    planeGeo.current.computeVertexNormals();
  }, [seed, frequency, exponent, height, getNoise2D, resolution]);

  useEffect(() => {
    const plane = planeMesh.current;
    if (!plane) return;
    plane.rotation.x = -Math.PI * 0.5;
  }, []);

  return (
    <mesh ref={planeMesh}>
      <planeGeometry args={[100, 100, resolution, resolution]} ref={planeGeo} />
      {wireframe ? (
        <meshLambertMaterial
          wireframe={true}
          color={"red"}
          side={THREE.DoubleSide}
        />
      ) : (
        <meshLambertMaterial color={"red"} side={THREE.DoubleSide} />
      )}
    </mesh>
  );
};

export default HeightMap;
