import type { SkillButton } from './SkillButton';
import { hudStore } from '../state/hudStore';

export interface Hud {
  element: HTMLElement;
  destroy: () => void;
}

export function createHud(buttons: SkillButton[]): Hud {
  const root = document.createElement('div');
  root.className = 'hud-bars';

  const hpBar = document.createElement('div');
  hpBar.className = 'bar hp-bar';
  const hpFill = document.createElement('div');
  hpFill.className = 'fill hp-fill';
  hpBar.appendChild(hpFill);

  const energyBar = document.createElement('div');
  energyBar.className = 'bar energy-bar';
  const energyFill = document.createElement('div');
  energyFill.className = 'fill energy-fill';
  energyBar.appendChild(energyFill);

  root.append(hpBar, energyBar);

  const unsubscribe = hudStore.subscribe((state) => {
    hpFill.style.width = `${(state.hp / state.maxHp) * 100}%`;
    energyFill.style.width = `${(state.energy / state.maxEnergy) * 100}%`;
    state.cooldowns.forEach((fraction, slot) => {
      buttons[slot]?.setCooldown(fraction);
    });
  });

  const initial = hudStore.getState();
  hpFill.style.width = `${(initial.hp / initial.maxHp) * 100}%`;
  energyFill.style.width = `${(initial.energy / initial.maxEnergy) * 100}%`;

  return {
    element: root,
    destroy: () => {
      unsubscribe();
      root.remove();
    },
  };
}
