'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import GridScene from './GridScene';

/**
 * Static CSS fallback for phones / low-power devices / reduced-motion users.
 * Same amber+teal-on-near-black "Grid" identity, no WebGL cost.
 */
function StaticGridFallback() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background:
          'radial-gradient(ellipse at 50% 20%, rgba(45,212,191,0.12), transparent 60%), radial-gradient(ellipse at 50% 90%, rgba(245,158,11,0.10), transparent 55%), #05070a',
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(45,212,191,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black 0%, transparent 75%)',
        }}
      />
    </div>
  );
}

export default function Experience() {
  const [useCanvas, setUseCanvas] = useState<boolean | null>(null);

  useEffect(() => {
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowMemory =
      'deviceMemory' in navigator && (navigator as any).deviceMemory < 4;
    setUseCanvas(!(isSmall || reducedMotion || lowMemory));
  }, []);

  // Avoid a flash: render nothing until we know which mode to use.
  if (useCanvas === null) return null;
  if (!useCanvas) return <StaticGridFallback />;

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 2.4, 11], fov: 45, near: 0.1, far: 60 }}
      >
        <Suspense fallback={null}>
          <GridScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
