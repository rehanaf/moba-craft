import type { Vec2 } from './inputMath';
import { clampMagnitude, normalize } from './inputMath';

export type AbilityHandler = (slot: number) => void;

export class InputManager {
  private readonly move: Vec2 = { x: 0, y: 0 };
  private readonly aim: Vec2 = { x: 0, y: -1 };
  private readonly abilityHandlers = new Set<AbilityHandler>();

  get moveVector(): Readonly<Vec2> {
    return this.move;
  }

  get aimVector(): Readonly<Vec2> {
    return this.aim;
  }

  setMove(x: number, y: number): void {
    const clamped = clampMagnitude({ x, y });
    this.move.x = clamped.x;
    this.move.y = clamped.y;
  }

  setAim(x: number, y: number): void {
    const dir = normalize({ x, y });
    if (dir.x === 0 && dir.y === 0) {
      return;
    }
    this.aim.x = dir.x;
    this.aim.y = dir.y;
  }

  pressAbility(slot: number): void {
    for (const handler of this.abilityHandlers) {
      handler(slot);
    }
  }

  onAbility(handler: AbilityHandler): () => void {
    this.abilityHandlers.add(handler);
    return () => {
      this.abilityHandlers.delete(handler);
    };
  }
}
