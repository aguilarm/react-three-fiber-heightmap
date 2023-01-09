import { Canvas } from '@react-three/fiber';
import React from 'react';
import MainScene from './components/MainScene';

function App() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Canvas camera={{ position: [150, 120, 0.75], rotation: [0, 0, 45] }}>
        <MainScene />
      </Canvas>
    </div>
  );
}

export default App;
