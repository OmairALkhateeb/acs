import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Hourglass() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = t * 0.25;
    const mx = state.mouse.x * 0.3;
    const my = state.mouse.y * 0.2;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, my, 0.05);
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mx, 0.05);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group ref={group} scale={0.8}>
        {/* Top cone (inverted) */}
        <mesh position={[0, 0.9, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[1.1, 1.4, 64, 1, true]} />
          <meshPhysicalMaterial
            color="#A78850"
            metalness={1}
            roughness={0.15}
            side={THREE.DoubleSide}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Bottom cone */}
        <mesh position={[0, -0.9, 0]}>
          <coneGeometry args={[1.1, 1.4, 64, 1, true]} />
          <meshPhysicalMaterial
            color="#A78850"
            metalness={1}
            roughness={0.15}
            side={THREE.DoubleSide}
            envMapIntensity={1.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Glass interior top */}
        <mesh position={[0, 0.9, 0]} rotation={[Math.PI, 0, 0]} scale={0.97}>
          <coneGeometry args={[1.05, 1.35, 48, 1, true]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.2}
            roughness={0.05}
            transmission={1}
            ior={1.4}
            chromaticAberration={0.05}
            color="#E9CA91"
            attenuationColor="#A78850"
            attenuationDistance={1}
          />
        </mesh>
        {/* Center pinch */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.06, 0.04, 32, 64]} />
          <meshPhysicalMaterial color="#C3AA74" metalness={1} roughness={0.1} />
        </mesh>
        {/* Top & bottom plates */}
        {[1.6, -1.6].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <cylinderGeometry args={[1.25, 1.25, 0.08, 64]} />
            <meshPhysicalMaterial color="#674E29" metalness={1} roughness={0.2} />
          </mesh>
        ))}
        {/* Falling sand */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 1.0, 8]} />
          <meshBasicMaterial color="#E9CA91" />
        </mesh>
        {/* Sand pile bottom */}
        <mesh position={[0, -0.78, 0]}>
          <coneGeometry args={[0.45, 0.28, 32]} />
          <meshStandardMaterial color="#C3AA74" roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

export function HourglassScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
      resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 8, 5]} angle={0.3} intensity={2} color="#E9CA91" castShadow />
        <spotLight position={[-5, -3, 4]} angle={0.4} intensity={1.2} color="#A78850" />
        <pointLight position={[0, 0, 3]} intensity={0.6} color="#C3AA74" />
        <Hourglass />
        <Sparkles count={80} scale={6} size={2} speed={0.4} color="#E9CA91" opacity={0.8} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}
