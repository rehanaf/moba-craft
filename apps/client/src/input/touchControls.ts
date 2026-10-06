import { screenToGroundDir } from '../game/cameraMath';
import { createJoystick } from '../ui/Joystick';
import type { Joystick } from '../ui/Joystick';
import { createSkillButton } from '../ui/SkillButton';
import type { SkillButton } from '../ui/SkillButton';
import type { InputManager } from './InputManager';

export interface TouchControls {
  element: HTMLElement;
  buttons: SkillButton[];
  destroy: () => void;
}

export function createTouchControls(input: InputManager): TouchControls {
  const root = document.createElement('div');
  root.id = 'touch-controls';

  const joystick: Joystick = createJoystick({
    onMove: (x, y) => {
      const world = screenToGroundDir(x, y);
      input.setMove(world.x, world.z);
      input.setAim(world.x, world.z);
    },
  });

  const skillBar = document.createElement('div');
  skillBar.id = 'skill-bar';

  const buttons = [0, 1, 2, 3].map((slot) =>
    createSkillButton({
      label: String(slot + 1),
      onPress: () => input.pressAbility(slot),
    }),
  );

  for (const button of buttons) {
    skillBar.appendChild(button.element);
  }

  root.append(joystick.element, skillBar);

  return {
    element: root,
    buttons,
    destroy: () => {
      joystick.destroy();
      for (const button of buttons) {
        button.destroy();
      }
      root.remove();
    },
  };
}
