import { describe, expect, it } from 'vitest';
import { GAME_TICK_RATE, TICK_INTERVAL_MS } from './index';

describe('game-core constants', () => {
  it('runs at 60 ticks per second', () => {
    expect(GAME_TICK_RATE).toBe(60);
  });

  it('has a 16.67ms tick interval', () => {
    expect(TICK_INTERVAL_MS).toBeCloseTo(16.67, 2);
  });
});
