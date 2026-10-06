import { applyDeadzone, clampMagnitude } from '../input/inputMath';
import type { Vec2 } from '../input/inputMath';

export interface JoystickOptions {
  onMove: (x: number, y: number) => void;
}

export interface Joystick {
  element: HTMLElement;
  destroy(): void;
}

const BASE_RADIUS = 64;
const THUMB_RADIUS = 28;
const REACH = 72;

export function createJoystick(options: JoystickOptions): Joystick {
  const zone = document.createElement('div');
  zone.className = 'joystick-zone';

  const base = document.createElement('div');
  base.className = 'joystick-base';
  base.style.width = `${BASE_RADIUS * 2}px`;
  base.style.height = `${BASE_RADIUS * 2}px`;
  base.style.margin = `${-BASE_RADIUS}px 0 0 ${-BASE_RADIUS}px`;

  const thumb = document.createElement('div');
  thumb.className = 'joystick-thumb';
  thumb.style.width = `${THUMB_RADIUS * 2}px`;
  thumb.style.height = `${THUMB_RADIUS * 2}px`;
  thumb.style.margin = `${-THUMB_RADIUS}px 0 0 ${-THUMB_RADIUS}px`;

  zone.append(base, thumb);

  let activePointer: number | null = null;
  let originX = 0;
  let originY = 0;

  const reset = (): void => {
    activePointer = null;
    base.style.display = 'none';
    thumb.style.display = 'none';
    options.onMove(0, 0);
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (event.pointerType === 'mouse' || activePointer !== null) {
      return;
    }
    activePointer = event.pointerId;
    originX = event.clientX;
    originY = event.clientY;
    zone.setPointerCapture(event.pointerId);
    base.style.left = `${originX}px`;
    base.style.top = `${originY}px`;
    thumb.style.left = `${originX}px`;
    thumb.style.top = `${originY}px`;
    base.style.display = 'block';
    thumb.style.display = 'block';
    event.preventDefault();
  };

  const onPointerMove = (event: PointerEvent): void => {
    if (event.pointerId !== activePointer) {
      return;
    }
    const raw: Vec2 = clampMagnitude({
      x: (event.clientX - originX) / REACH,
      y: -(event.clientY - originY) / REACH,
    });
    const deadzoned = applyDeadzone(raw);
    thumb.style.left = `${originX + raw.x * REACH}px`;
    thumb.style.top = `${originY - raw.y * REACH}px`;
    options.onMove(deadzoned.x, deadzoned.y);
  };

  const onPointerEnd = (event: PointerEvent): void => {
    if (event.pointerId !== activePointer) {
      return;
    }
    reset();
  };

  zone.addEventListener('pointerdown', onPointerDown);
  zone.addEventListener('pointermove', onPointerMove);
  zone.addEventListener('pointerup', onPointerEnd);
  zone.addEventListener('pointercancel', onPointerEnd);

  return {
    element: zone,
    destroy: () => {
      zone.removeEventListener('pointerdown', onPointerDown);
      zone.removeEventListener('pointermove', onPointerMove);
      zone.removeEventListener('pointerup', onPointerEnd);
      zone.removeEventListener('pointercancel', onPointerEnd);
      zone.remove();
    },
  };
}
