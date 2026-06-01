import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── Shared materials ─────────────────────────────────── */
const RED_BRIGHT  = { color: '#cc0000', emissive: '#ff2200', emissiveIntensity: 1.4, roughness: 0.04, metalness: 0.8 };
const RED_MID     = { color: '#990000', emissive: '#dd1100', emissiveIntensity: 0.9, roughness: 0.1,  metalness: 0.7 };
const RED_DIM     = { color: '#660000', emissive: '#aa0000', emissiveIntensity: 0.6 };
const PUPIL       = { color: '#030000', emissive: '#550000', emissiveIntensity: 0.45, roughness: 0.1, metalness: 0.95 };
const CROW_COLOR  = { color: '#050000', emissive: '#2a0000', emissiveIntensity: 0.4 };

/* ── Tomoe (comma-shape) ─────────────────────────────── */
function Tomoe({ angle, r = 1.32 }) {
  const bx = Math.cos(angle) * r;
  const by = Math.sin(angle) * r;
  // tail: offset slightly inward from the ball
  const tx = bx + Math.cos(angle + Math.PI) * 0.28;
  const ty = by + Math.sin(angle + Math.PI) * 0.28;

  return (
    <group>
      <mesh position={[bx, by, 0]}>
        <sphereGeometry args={[0.21, 20, 20]} />
        <meshStandardMaterial {...RED_BRIGHT} />
      </mesh>
      <mesh position={[tx, ty, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
        <torusGeometry args={[0.19, 0.075, 8, 14, Math.PI * 1.15]} />
        <meshStandardMaterial {...RED_BRIGHT} emissiveIntensity={1.0} />
      </mesh>
    </group>
  );
}

/* ── Six crows orbiting the eye ──────────────────────── */
function OrbitingCrows() {
  const groupRef = useRef();

  const data = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        radius: 3.4 + (i % 3) * 0.75,
        speed:  0.22 + (i % 4) * 0.08,
        offset: (i / 6) * Math.PI * 2,
        h:      -1.4 + i * 0.55,
        phase:  i * 1.1,
      })),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    groupRef.current.children.forEach((crow, i) => {
      const d = data[i];
      const angle = d.offset + t * d.speed;
      crow.position.set(
        Math.cos(angle) * d.radius,
        d.h + Math.sin(t * 2.2 + d.phase) * 0.28,
        Math.sin(angle) * d.radius * 0.45
      );
      crow.rotation.y = -angle + Math.PI / 2;
      // flap wings
      const flap = Math.sin(t * 9 + d.phase) * 0.38 + 0.22;
      crow.children[0].rotation.z =  flap;
      crow.children[1].rotation.z = -flap;
    });
  });

  return (
    <group ref={groupRef}>
      {data.map((_, i) => (
        <group key={i} scale={0.55}>
          <mesh position={[-0.26, 0, 0]} rotation={[Math.PI / 2, 0, 0.25]}>
            <coneGeometry args={[0.16, 0.52, 3]} />
            <meshStandardMaterial {...CROW_COLOR} />
          </mesh>
          <mesh position={[0.26, 0, 0]} rotation={[Math.PI / 2, 0, -0.25]}>
            <coneGeometry args={[0.16, 0.52, 3]} />
            <meshStandardMaterial {...CROW_COLOR} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ── Crimson particle cloud (dark chakra / feather ash) ─ */
function CrimsonAura() {
  const ref = useRef();
  const count = 700;

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const rr = 9 + Math.random() * 38;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = rr * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = rr * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = rr * Math.cos(phi);
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.045;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.025) * 0.12;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#bb1100" size={0.11} sizeAttenuation transparent opacity={0.65} />
    </points>
  );
}

/* ── Main Sharingan eye ──────────────────────────────── */
function SharinganEye() {
  const outerRingRef = useRef();
  const tomoeRef     = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    outerRingRef.current.rotation.z =  t * 0.38;
    tomoeRef.current.rotation.z     = -t * 0.72;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.22} floatIntensity={0.55}>
      <group>
        {/* ── Outer decorative spinning ring + 8 tick marks ── */}
        <group ref={outerRingRef}>
          <mesh>
            <torusGeometry args={[2.18, 0.065, 8, 60]} />
            <meshStandardMaterial {...RED_DIM} />
          </mesh>
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return (
              <mesh key={i} position={[Math.cos(a) * 2.18, Math.sin(a) * 2.18, 0]}>
                <boxGeometry args={[0.07, 0.22, 0.04]} />
                <meshStandardMaterial {...RED_MID} />
              </mesh>
            );
          })}
        </group>

        {/* ── Main iris ring ── */}
        <mesh>
          <torusGeometry args={[1.88, 0.17, 16, 100]} />
          <meshStandardMaterial {...RED_BRIGHT} />
        </mesh>

        {/* ── Inner ring ── */}
        <mesh>
          <torusGeometry args={[0.88, 0.11, 16, 80]} />
          <meshStandardMaterial {...RED_BRIGHT} emissiveIntensity={1.1} />
        </mesh>

        {/* ── Iris fill (dark red disc) ── */}
        <mesh>
          <circleGeometry args={[1.88, 64]} />
          <meshStandardMaterial
            color="#0d0000"
            emissive="#3a0000"
            emissiveIntensity={0.35}
            transparent
            opacity={0.92}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* ── Center pupil ── */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial {...PUPIL} />
        </mesh>

        {/* ── 3 Spinning Tomoe ── */}
        <group ref={tomoeRef}>
          {[0, 1, 2].map((i) => (
            <Tomoe key={i} angle={(i / 3) * Math.PI * 2} />
          ))}
        </group>
      </group>
    </Float>
  );
}

/* ── Scene root ──────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.07} />
      <pointLight position={[0, 0, 6]}  color="#ff1100" intensity={6}  distance={22} />
      <pointLight position={[5, 4, 2]}  color="#880000" intensity={3}  distance={28} />
      <pointLight position={[-5, -4, 0]} color="#550000" intensity={2} distance={22} />
      <SharinganEye />
      <OrbitingCrows />
      <CrimsonAura />
    </>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
