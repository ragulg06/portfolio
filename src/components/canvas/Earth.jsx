import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Preload, Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

import CanvasLoader from "../Loader";

const Earth = () => {
  const earthRef = useRef();
  const dataPointsRef = useRef();

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.1;
    }
    if (dataPointsRef.current) {
      dataPointsRef.current.rotation.y -= delta * 0.05;
      dataPointsRef.current.rotation.x += delta * 0.02;
    }
  });

  const [dataSphere] = React.useState(() => {
    const positions = random.inSphere(new Float32Array(2000), { radius: 1.3 });
    // Create a new array with only valid numbers, replacing NaN and infinite values with 0
    const validPositions = new Float32Array(
      Array.from(positions).map(val => {
        return isNaN(val) || !isFinite(val) ? 0 : val;
      })
    );
    return validPositions;
  });

  return (
    <group ref={earthRef}>
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial 
          color="#1e3a8a"
          emissive="#3b82f6"
          emissiveIntensity={0.3}
          roughness={0.4}
          metalness={0.2}
          wireframe={true}
          wireframeLinewidth={0.5}
        />
      </Sphere>

      <Points ref={dataPointsRef} positions={dataSphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#93c5fd"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.5}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 2]} intensity={0.8} />
        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;