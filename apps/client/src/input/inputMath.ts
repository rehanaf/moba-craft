export interface Vec2 {
  x: number;
  y: number;
}

export const JOYSTICK_DEADZONE = 0.15;

export function magnitude(v: Vec2): number {
  return Math.hypot(v.x, v.y);
}

export function normalize(v: Vec2): Vec2 {
  const m = magnitude(v);
  if (m < 1e-6) {
    return { x: 0, y: 0 };
  }
  return { x: v.x / m, y: v.y / m };
}

export function clampMagnitude(v: Vec2, max = 1): Vec2 {
  const m = magnitude(v);
  if (m <= max || m < 1e-6) {
    return { x: v.x, y: v.y };
  }
  const scale = max / m;
  return { x: v.x * scale, y: v.y * scale };
}

export function applyDeadzone(v: Vec2, deadzone = JOYSTICK_DEADZONE): Vec2 {
  const m = magnitude(v);
  if (m <= deadzone) {
    return { x: 0, y: 0 };
  }
  const dir = normalize(v);
  const strength = Math.min((m - deadzone) / (1 - deadzone), 1);
  return { x: dir.x * strength, y: dir.y * strength };
}

export function touchesJoystickZone(clientX: number, screenWidth: number): boolean {
  return clientX <= screenWidth / 2;
}
