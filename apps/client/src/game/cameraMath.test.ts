import { describe, expect, it } from 'vitest';
import {
  CAMERA_DISTANCE,
  cameraOffset,
  expAlpha,
  lerp3,
  screenToGroundDir,
  verticalFovDeg,
} from './cameraMath';

describe('cameraOffset', () => {
  it('keeps the configured distance from target', () => {
    const offset = cameraOffset();
    const length = Math.hypot(offset.x, offset.y, offset.z);
    expect(length).toBeCloseTo(CAMERA_DISTANCE, 6);
  });

  it('looks down from above', () => {
    expect(cameraOffset().y).toBeGreaterThan(0);
  });
});

describe('lerp3', () => {
  const from = { x: 0, y: 0, z: 0 };
  const to = { x: 10, y: 10, z: 10 };

  it('interpolates halfway at alpha 0.5', () => {
    expect(lerp3(from, to, 0.5)).toEqual({ x: 5, y: 5, z: 5 });
  });

  it('clamps alpha outside 0..1', () => {
    expect(lerp3(from, to, 2)).toEqual(to);
    expect(lerp3(from, to, -1)).toEqual(from);
  });
});

describe('expAlpha', () => {
  it('starts near zero for tiny dt', () => {
    expect(expAlpha(8, 0)).toBe(0);
  });

  it('approaches 1 for large dt', () => {
    expect(expAlpha(8, 5)).toBeGreaterThan(0.99);
  });

  it('is frame-rate independent: same result per total time', () => {
    const oneStep = expAlpha(8, 0.1);
    const twoSteps = 1 - (1 - expAlpha(8, 0.05)) ** 2;
    expect(oneStep).toBeCloseTo(twoSteps, 10);
  });
});

describe('verticalFovDeg', () => {
  it('equals horizontal fov at square aspect', () => {
    expect(verticalFovDeg(1, 70)).toBeCloseTo(70, 6);
  });

  it('narrows vertical fov as aspect widens', () => {
    expect(verticalFovDeg(16 / 9, 70)).toBeCloseTo(43.0, 1);
    expect(verticalFovDeg(16 / 9, 70)).toBeLessThan(verticalFovDeg(1, 70));
  });
});

describe('screenToGroundDir', () => {
  it('maps screen up to the world direction that moves up on screen', () => {
    const dir = screenToGroundDir(0, 1, 45);
    expect(dir.x).toBeCloseTo(-Math.SQRT1_2, 10);
    expect(dir.z).toBeCloseTo(-Math.SQRT1_2, 10);
  });

  it('maps screen right to the world direction that moves right on screen', () => {
    const dir = screenToGroundDir(1, 0, 45);
    expect(dir.x).toBeCloseTo(Math.SQRT1_2, 10);
    expect(dir.z).toBeCloseTo(-Math.SQRT1_2, 10);
  });

  it('preserves magnitude (pure rotation on the ground plane)', () => {
    const dir = screenToGroundDir(0.6, 0.8, 45);
    expect(Math.hypot(dir.x, dir.z)).toBeCloseTo(1, 10);
  });

  it('keeps screen up and right orthogonal', () => {
    const up = screenToGroundDir(0, 1, 45);
    const right = screenToGroundDir(1, 0, 45);
    expect(up.x * right.x + up.z * right.z).toBeCloseTo(0, 10);
  });
});
