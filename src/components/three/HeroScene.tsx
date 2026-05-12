"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function MoroccanArch() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#c4532a") },
        uColor2: { value: new THREE.Color("#e8d5b7") },
        uColor3: { value: new THREE.Color("#8b3a1a") },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        varying vec3 vPosition;

        float zelligePattern(vec2 uv) {
          vec2 grid = fract(uv * 8.0) - 0.5;
          float d = length(grid);
          float star = abs(grid.x) + abs(grid.y);
          float pattern = smoothstep(0.45, 0.4, star) + smoothstep(0.2, 0.15, d);
          vec2 grid2 = fract(uv * 16.0) - 0.5;
          float d2 = abs(grid2.x) + abs(grid2.y);
          pattern += smoothstep(0.35, 0.3, d2) * 0.3;
          return clamp(pattern, 0.0, 1.0);
        }

        void main() {
          float pattern = zelligePattern(vUv + uTime * 0.02);
          vec3 baseColor = mix(uColor1, uColor3, vUv.y);
          vec3 patternColor = mix(baseColor, uColor2, pattern * 0.6);
          float shimmer = sin(vUv.x * 20.0 + uTime) * sin(vUv.y * 20.0 + uTime * 0.7) * 0.05;
          patternColor += shimmer;
          float vignette = 1.0 - smoothstep(0.3, 0.8, length(vUv - 0.5));
          patternColor *= 0.7 + vignette * 0.3;
          gl_FragColor = vec4(patternColor, 1.0);
        }
      `,
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  const archGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const w = 2.5;
    const h = 4;
    const archR = w;

    shape.moveTo(-w, -h);
    shape.lineTo(-w, 0);
    shape.absarc(0, 0, archR, Math.PI, 0, false);
    shape.lineTo(w, -h);
    shape.lineTo(-w, -h);

    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={meshRef} geometry={archGeometry} position={[0, 0, 0]}>
        <shaderMaterial ref={materialRef} {...shaderData} side={THREE.DoubleSide} />
      </mesh>
    </Float>
  );
}

function CandleLight({ position, intensity }: { position: [number, number, number]; intensity: number }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const noise = Math.sin(state.clock.elapsedTime * 3 + position[0] * 10) * 0.3 +
        Math.sin(state.clock.elapsedTime * 5 + position[1] * 7) * 0.2;
      lightRef.current.intensity = intensity + noise * intensity * 0.5;
    }
  });

  return <pointLight ref={lightRef} position={position} color="#ff8c42" intensity={intensity} distance={8} />;
}

function SteamParticles() {
  const count = 200;
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const offsets = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * -2 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      speeds[i] = 0.2 + Math.random() * 0.4;
      offsets[i] = Math.random() * Math.PI * 2;
    }

    return { positions, speeds, offsets };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const t = state.clock.elapsedTime;
      let y = particles.positions[i * 3 + 1] + t * particles.speeds[i];
      y = ((y + 2) % 8) - 2;

      const x = particles.positions[i * 3] + Math.sin(t * 0.5 + particles.offsets[i]) * 0.3;
      const z = particles.positions[i * 3 + 2] + Math.cos(t * 0.3 + particles.offsets[i]) * 0.2;

      const progress = (y + 2) / 8;
      const scale = (0.02 + progress * 0.06) * (1 - progress * 0.5);

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#f5efe6" transparent opacity={0.15} />
    </instancedMesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} color="#e8d5b7" />
      <CandleLight position={[-3, 1, 2]} intensity={2} />
      <CandleLight position={[3, 1, 2]} intensity={2} />
      <CandleLight position={[0, 3, 1]} intensity={1.5} />
      <CandleLight position={[-1, -1, 3]} intensity={1} />
      <CandleLight position={[1, -1, 3]} intensity={1} />
      <MoroccanArch />
      <SteamParticles />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
