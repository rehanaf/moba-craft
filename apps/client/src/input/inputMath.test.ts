import { describe, expect, it } from 'vitest';
import {
  applyDeadzone,
  clampMagnitude,
  magnitude,
  normalize,
  touchesJoystickZone,
} from './inputMath';

describe('normalize', () => {
  it('keeps diagonal input at magnitude 1', () => {
    const v = normalize({ x: 1, y: 1 });
    expect(magnitude(v)).toBeCloseTo(1, 10);
    expect(v.x).toBeCloseTo(v.y, 10);
  });

  it('returns zero for zero-length input', () => {
    expect(normalize({ x: 0, y: 0 })).toEqual({ x: 0, y: 0 });
  });
});

describe('clampMagnitude', () => {
  it('leaves vectors inside the limit untouched', () => {
    expect(clampMagnitude({ x: 0.5, y: 0 })).toEqual({ x: 0.5, y: 0 });
  });

  it('scales down vectors over the limit preserving direction', () => {
    const v = clampMagnitude({ x: 3, y: 4 });
    expect(magnitude(v)).toBeCloseTo(1, 10);
    expect(v.x / v.y).toBeCloseTo(3 / 4, 10);
  });
});

describe('applyDeadzone', () => {
  it('zeros out input inside the deadzone', () => {
    expect(applyDeadzone({ x: 0.1, y: 0.05 })).toEqual({ x: 0, y: 0 });
  });

  it('rescales full deflection back to 1', () => {
    const v = applyDeadzone({ x: 1, y: 0 });
    expect(v.x).toBeCloseTo(1, 10);
    expect(v.y).toBeCloseTo(0, 10);
  });

  it('is continuous right after the deadzone', () => {
    const justAbove = applyDeadzone({ x: 0.1501, y: 0 });
    expect(magnitude(justAbove)).toBeLessThan(0.01);
  });
});

describe('touchesJoystickZone', () => {
  const width = 800;

  it('accepts the left half', () => {
    expect(touchesJoystickZone(0, width)).toBe(true);
    expect(touchesJoystickZone(399, width)).toBe(true);
  });

  it('rejects the right half', () => {
    expect(touchesJoystickZone(401, width)).toBe(false);
    expect(touchesJoystickZone(799, width)).toBe(false);
  });
});
