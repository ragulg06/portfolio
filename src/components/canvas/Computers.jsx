import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, Sphere, TorusKnot, Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

import CanvasLoader from "../Loader";

const AiBrain = ({ isMobile }) => {
  const brainRef = React.useRef();
  const particlesRef = React.useRef();

  useFrame((state, delta) => {
    if (brainRef.current) {
      brainRef.current.rotation.y += delta * 0.3;
      brainRef.current.rotation.x += delta * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= delta * 0.1;
    }
  });
  
  const [sphereParticles] = useState(() => {
    const positions = random.inSphere(new Float32Array(1000), { radius: isMobile ? 1.8 : 2.5 });
    // Create a new array with only valid numbers, filtering out NaN and infinite values
    const validPositions = new Float32Array(
      Array.from(positions).map(val => {
        return isNaN(val) || !isFinite(val) ? 0 : val;
      })
    );
    return validPositions;
  });

  return (
    <group ref={brainRef}>
      <hemisphereLight intensity={0.6} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.2}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1.2} color="#804dee" />

      <Sphere args={[isMobile ? 0.8 : 1.2, 32, 32]} position={[0, isMobile ? -1.5 : -2.2, 0]}>
        <meshStandardMaterial
          color="#6366f1"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.6}
          wireframe={true}
          wireframeLinewidth={isMobile ? 1 : 2}
        />
      </Sphere>
      
      <TorusKnot args={[isMobile ? 1.2 : 1.8, isMobile ? 0.2 : 0.3, 128, 16]} position={[0, isMobile ? -1.5 : -2.2, 0]}>
         <meshStandardMaterial 
            color="#804dee" 
            roughness={0.1} 
            metalness={0.8} 
            emissive="#3b82f6"
            emissiveIntensity={0.4}
          />
      </TorusKnot>

      <Points ref={particlesRef} positions={sphereParticles} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#f272c8"
          size={isMobile ? 0.015 : 0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <AiBrain isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;