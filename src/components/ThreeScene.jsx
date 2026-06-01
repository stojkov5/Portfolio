import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars } from '@react-three/drei';

function TorusKnot() {
  const mesh = useRef();

  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.elapsedTime * 0.13;
    mesh.current.rotation.y = clock.elapsedTime * 0.22;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.6}>
      <mesh ref={mesh} scale={1.9}>
        <torusKnotGeometry args={[1, 0.3, 200, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#6d28d9"
          distort={0.38}
          speed={2.5}
          roughness={0.05}
          metalness={0.9}
          emissive="#00e5ff"
          emissiveIntensity={0.22}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[8, 8, 8]} color="#00e5ff" intensity={5} />
      <pointLight position={[-8, -8, -5]} color="#8b5cf6" intensity={3} />
      <pointLight position={[5, -8, 10]} color="#e879f9" intensity={2} />
      <TorusKnot />
      <Stars
        radius={60}
        depth={50}
        count={2000}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />
    </>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
