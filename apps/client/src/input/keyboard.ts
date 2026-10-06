import { screenToGroundDir } from '../game/cameraMath';
import type { InputManager } from './InputManager';

const MOVE_KEYS: Record<string, { x: number; y: number }> = {
  KeyW: { x: 0, y: 1 },
  KeyA: { x: -1, y: 0 },
  KeyS: { x: 0, y: -1 },
  KeyD: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowDown: { x: 0, y: -1 },
  ArrowRight: { x: 1, y: 0 },
};

const ABILITY_KEYS: Record<string, number> = {
  Digit1: 0,
  Digit2: 1,
  Digit3: 2,
  Digit4: 3,
};

export function attachKeyboard(input: InputManager): () => void {
  const pressed = new Set<string>();

  const applyMove = (): void => {
    let x = 0;
    let y = 0;
    for (const code of pressed) {
      const dir = MOVE_KEYS[code];
      if (dir) {
        x += dir.x;
        y += dir.y;
      }
    }
    const world = screenToGroundDir(x, y);
    input.setMove(world.x, world.z);
  };

  const onKeyDown = (event: KeyboardEvent): void => {
    if (event.repeat) {
      return;
    }
    if (MOVE_KEYS[event.code]) {
      pressed.add(event.code);
      applyMove();
      event.preventDefault();
      return;
    }
    const slot = ABILITY_KEYS[event.code];
    if (slot !== undefined) {
      input.pressAbility(slot);
      event.preventDefault();
    }
  };

  const onKeyUp = (event: KeyboardEvent): void => {
    if (MOVE_KEYS[event.code]) {
      pressed.delete(event.code);
      applyMove();
      event.preventDefault();
    }
  };

  const onBlur = (): void => {
    pressed.clear();
    input.setMove(0, 0);
  };

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);

  return () => {
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('keyup', onKeyUp);
    window.removeEventListener('blur', onBlur);
  };
}
