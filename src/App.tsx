import { Canvas } from "@react-three/fiber";
import React from "react";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import HeightMap from "./components/HeightMap";

function App() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <Canvas camera={{ position: [70, 70, 70], rotation: [0, 0, 45] }}>
        <scene>
          <OrbitControls autoRotateSpeed={0.5} />
          <Environment preset={"sunset"} />
          <ambientLight intensity={0.3} />
          <Stars />
          <pointLight args={[0xffffff, 0.8]} position={[-1, 2, 8]} />
          <HeightMap />
        </scene>
      </Canvas>
    </div>
  );
}

export default App;
