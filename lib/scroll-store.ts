import { create } from 'zustand';

interface ScrollState {
  progress: number; // 0..1 across the whole page
  setProgress: (p: number) => void;
  activeSection: number;
  setActiveSection: (i: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (p) => set({ progress: p }),
  activeSection: 0,
  setActiveSection: (i) => set({ activeSection: i }),
}));
