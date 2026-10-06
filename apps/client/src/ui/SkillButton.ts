export interface SkillButtonOptions {
  label: string;
  onPress: () => void;
}

export interface SkillButton {
  element: HTMLButtonElement;
  setCooldown: (fraction: number) => void;
  destroy: () => void;
}

export function createSkillButton(options: SkillButtonOptions): SkillButton {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'skill-button';
  button.setAttribute('aria-label', `Skill ${options.label}`);

  const cooldown = document.createElement('span');
  cooldown.className = 'cooldown';

  const label = document.createElement('span');
  label.className = 'label';
  label.textContent = options.label;

  button.append(cooldown, label);

  const onPress = (event: PointerEvent): void => {
    event.preventDefault();
    navigator.vibrate?.(15);
    options.onPress();
  };

  button.addEventListener('pointerdown', onPress);

  return {
    element: button,
    setCooldown: (fraction: number) => {
      const clamped = Math.min(Math.max(fraction, 0), 1);
      button.style.setProperty('--cooldown', String(clamped));
    },
    destroy: () => {
      button.removeEventListener('pointerdown', onPress);
      button.remove();
    },
  };
}
