import { OrbitControls, Stars } from '@react-three/drei';
import HeightMap from './HeightMap';
import React from 'react';

const MainScene = () => {
  return (
    <scene>
      <OrbitControls autoRotateSpeed={0.5} />
      <ambientLight intensity={0.3} />
      <Stars
        radius={150}
        depth={10}
        count={5000}
        saturation={0}
        factor={0}
        fade={false}
        speed={1}
      />
      <hemisphereLight intensity={0.05} />
      <spotLight
        args={[0xffffff, 0.8]}
        position={[-300, 150, -100]}
        angle={Math.PI / 2.5}
        distance={900}
        intensity={1.7}
        decay={2}
        castShadow={true}
      />
      <HeightMap />
    </scene>
  );
};

export default MainScene;
