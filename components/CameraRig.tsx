'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/lib/scroll-store';

export interface Station {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
}

// Four fixed camera "stations" in The Grid — one per content section.
// Edit positions here to re-block the shot without touching scroll logic.
export const STATIONS: Station[] = [
  // 0. Hero — wide establishing shot down the server-room aisle
  { position: [0, 2.4, 11], lookAt: [0, 1.2, 0], fov: 45 },
  // 1. Projects — camera pushes in between the racks
  { position: [3.5, 1.6, 3.5], lookAt: [0, 1.4, -6], fov: 42 },
  // 2. Stack / Skills — low angle looking up at a floating data column
  { position: [-3, 1.2, -2], lookAt: [0, 2.4, -10], fov: 40 },
  // 3. Contact — close on a terminal / console glow at the end of the row
  { position: [0, 1.5, -13], lookAt: [0, 1.6, -18], fov: 38 },
];

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export default function CameraRig() {
  const target = useRef(new THREE.Vector3());
  const desiredPos = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const progress = useScrollStore.getState().progress;
    const n = STATIONS.length;
    const scaled = progress * (n - 1);
    const idx = Math.min(n - 2, Math.floor(scaled));
    const localT = smoothstep(Math.min(1, Math.max(0, scaled - idx)));

    const a = STATIONS[idx];
    const b = STATIONS[idx + 1];

    desiredPos.current.set(
      THREE.MathUtils.lerp(a.position[0], b.position[0], localT),
      THREE.MathUtils.lerp(a.position[1], b.position[1], localT),
      THREE.MathUtils.lerp(a.position[2], b.position[2], localT)
    );
    target.current.set(
      THREE.MathUtils.lerp(a.lookAt[0], b.lookAt[0], localT),
      THREE.MathUtils.lerp(a.lookAt[1], b.lookAt[1], localT),
      THREE.MathUtils.lerp(a.lookAt[2], b.lookAt[2], localT)
    );

    const cam = state.camera as THREE.PerspectiveCamera;
    // Damped follow so scroll jitter feels cinematic rather than robotic.
    const damp = 1 - Math.pow(0.001, delta);
    cam.position.lerp(desiredPos.current, damp);

    const fov = THREE.MathUtils.lerp(a.fov, b.fov, localT);
    if (Math.abs(cam.fov - fov) > 0.01) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, fov, damp);
      cam.updateProjectionMatrix();
    }

    const currentLook = target.current.clone();
    cam.lookAt(currentLook);
  });

  return null;
}
