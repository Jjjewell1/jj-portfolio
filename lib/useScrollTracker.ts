'use client';

import { useEffect } from 'react';
import { useScrollStore } from './scroll-store';

/**
 * Tracks normalized scroll progress (0..1) across the whole document and
 * pushes it into the zustand store every animation frame. Also derives
 * a coarse "active section" index (0..3) used to fade HTML content in/out
 * in sync with the camera stations in <CameraRig />.
 */
export function useScrollTracker(sectionCount: number) {
  useEffect(() => {
    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / maxScroll)) : 0;

      useScrollStore.getState().setProgress(progress);

      const section = Math.min(
        sectionCount - 1,
        Math.floor(progress * sectionCount)
      );
      if (section !== useScrollStore.getState().activeSection) {
        useScrollStore.getState().setActiveSection(section);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [sectionCount]);
}
