'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import CameraRig from './CameraRig';

const AMBER = '#f59e0b';
const TEAL = '#2dd4bf';

/** A single low-poly server rack: a dark box with a glowing accent strip. */
function Rack({
  position,
  color,
  height = 2.2,
}: {
  position: [number, number, number];
  color: string;
  height?: number;
}) {
  const strip = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (strip.current) {
      const mat = strip.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.1 + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.4;
    }
  });

  return (
    <group position={position}>
      <mesh castShadow receiveShadow position={[0, height / 2, 0]}>
        <boxGeometry args={[0.9, height, 0.9]} />
        <meshStandardMaterial color="#0b0f16" roughness={0.85} metalness={0.2} />
      </mesh>
      <mesh ref={strip} position={[0.46, height / 2, 0]}>
        <boxGeometry args={[0.02, height * 0.82, 0.5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/** Two facing rows of racks receding away from the camera down the +/-z aisle. */
function RackRows() {
  const rows = useMemo(() => {
    const items: { pos: [number, number, number]; color: string }[] = [];
    for (let i = 0; i < 7; i++) {
      const z = -i * 2.6 + 4;
      items.push({ pos: [-2.6, 0, z], color: i % 2 === 0 ? AMBER : TEAL });
      items.push({ pos: [2.6, 0, z], color: i % 2 === 0 ? TEAL : AMBER });
    }
    return items;
  }, []);

  return (
    <>
      {rows.map((r, i) => (
        <Rack key={i} position={r.pos} color={r.color} height={2 + (i % 3) * 0.3} />
      ))}
    </>
  );
}

/** A floating column of thin glowing panels — the "Stack" station centerpiece. */
function DataColumn() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.elapsedTime * 0.15;
    }
  });

  const panels = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        y: i * 0.55,
        color: i % 2 === 0 ? TEAL : AMBER,
        rot: (i * Math.PI) / 5,
      })),
    []
  );

  return (
    <group ref={group} position={[0, 1, -10]}>
      {panels.map((p, i) => (
        <mesh key={i} position={[0, p.y, 0]} rotation={[0, p.rot, 0]}>
          <boxGeometry args={[1.4, 0.06, 1.4]} />
          <meshStandardMaterial
            color={p.color}
            emissive={p.color}
            emissiveIntensity={0.9}
            toneMapped={false}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function GridScene() {
  return (
    <>
      <color attach="background" args={['#05070a']} />
      <fog attach="fog" args={['#05070a', 6, 26]} />

      <ambientLight intensity={0.25} />
      <pointLight position={[0, 5, 6]} intensity={20} color={AMBER} distance={20} />
      <pointLight position={[-4, 3, -8]} intensity={18} color={TEAL} distance={20} />
      <pointLight position={[4, 3, -14]} intensity={16} color={AMBER} distance={20} />

      <Grid
        position={[0, 0, -4]}
        args={[40, 40]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#14232b"
        sectionSize={4}
        sectionThickness={1.2}
        sectionColor={TEAL}
        fadeDistance={26}
        fadeStrength={1.5}
        infiniteGrid
      />

      <RackRows />
      <DataColumn />

      <Sparkles
        count={80}
        scale={[14, 6, 26]}
        position={[0, 3, -8]}
        size={2}
        speed={0.3}
        color={TEAL}
        opacity={0.5}
      />

      <CameraRig />
    </>
  );
}
