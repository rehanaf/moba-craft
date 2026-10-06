import { createStore } from 'zustand/vanilla';

export interface HudState {
  hp: number;
  maxHp: number;
  energy: number;
  maxEnergy: number;
  cooldowns: number[];
  setHp: (hp: number) => void;
  setEnergy: (energy: number) => void;
  setCooldown: (slot: number, fraction: number) => void;
}

export const hudStore = createStore<HudState>()((set) => ({
  hp: 100,
  maxHp: 100,
  energy: 100,
  maxEnergy: 100,
  cooldowns: [0, 0, 0, 0],
  setHp: (hp) => {
    set({ hp });
  },
  setEnergy: (energy) => {
    set({ energy });
  },
  setCooldown: (slot, fraction) => {
    set((state) => {
      const cooldowns = state.cooldowns.slice();
      cooldowns[slot] = Math.min(Math.max(fraction, 0), 1);
      return { cooldowns };
    });
  },
}));
