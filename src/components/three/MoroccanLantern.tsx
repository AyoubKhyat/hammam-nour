"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 20 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const positions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 4,
        y: (Math.random() - 0.5) * 4,
        z: (Math.random() - 0.5) * 4,
        speed: 0.2 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();
    positions.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.5,
        p.y + Math.cos(t * p.speed * 0.8 + p.offset) * 0.5,
        p.z + Math.sin(t * p.speed * 0.6 + p.offset + 1) * 0.3
      );
      const s = 0.02 + Math.sin(t * 2 + p.offset) * 0.01;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffcc88" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function Lantern() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={group}>
        {/* Octagonal body wireframe */}
        <mesh>
          <cylinderGeometry args={[0.75, 0.85, 1.8, 8, 1, true]} />
          <meshStandardMaterial
            color="#c4532a"
            wireframe
            transparent
            opacity={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Top dome */}
        <mesh position={[0, 1.15, 0]}>
          <coneGeometry args={[0.78, 0.7, 8]} />
          <meshStandardMaterial
            color="#c4532a"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>

        {/* Top finial */}
        <mesh position={[0, 1.7, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color="#8b3a1a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Bottom ring */}
        <mesh position={[0, -0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.85, 0.04, 8, 8]} />
          <meshStandardMaterial color="#8b3a1a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Top ring */}
        <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.75, 0.04, 8, 8]} />
          <meshStandardMaterial color="#8b3a1a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Middle ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.82, 0.03, 8, 8]} />
          <meshStandardMaterial color="#8b3a1a" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Glass panels */}
        <mesh>
          <cylinderGeometry args={[0.7, 0.8, 1.7, 8, 1, true]} />
          <meshStandardMaterial
            color="#ffeecc"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Inner glow sphere */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshBasicMaterial color="#ffcc88" transparent opacity={0.9} />
        </mesh>

        {/* Warm light */}
        <pointLight color="#ffaa44" intensity={4} distance={8} decay={2} />
      </group>

      <Particles count={15} />
    </Float>
  );
}

export default function MoroccanLanternScene() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <Canvas
        camera={{ position: [0, 0.3, 4.5], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[3, 5, 4]} intensity={0.4} color="#faf7f2" />
        <Lantern />
      </Canvas>
    </div>
  );
}
