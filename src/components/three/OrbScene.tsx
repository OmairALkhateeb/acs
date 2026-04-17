import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Orb() {
  const ref = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    const t = s.clock.getElapsedTime();
    if (ref.current) ref.current.rotation.y = t * 0.3;
    if (ring.current) {
      ring.current.rotation.x = t * 0.4;
      ring.current.rotation.z = t * 0.2;
    }
  });
  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshPhysicalMaterial color="#A78850" metalness={1} roughness={0.2} clearcoat={1} envMapIntensity={1.5} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[1.8, 0.02, 16, 100]} />
        <meshStandardMaterial color="#E9CA91" emissive="#A78850" emissiveIntensity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0, Math.PI / 4]}>
        <torusGeometry args={[2.1, 0.015, 16, 100]} />
        <meshStandardMaterial color="#C3AA74" emissive="#674E29" emissiveIntensity={0.3} />
      </mesh>
    </Float>
  );
}

export function OrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }} style={{ width: "100%", height: "100%" }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} intensity={2} color="#E9CA91" />
        <spotLight position={[-5, -3, 4]} intensity={1} color="#A78850" />
        <Orb />
        <Sparkles count={60} scale={5} size={1.5} speed={0.3} color="#E9CA91" />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
