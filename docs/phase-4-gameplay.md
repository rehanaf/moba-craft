# Fase 4 — Gameplay Offline (game-core)

## Tujuan

Logika gameplay lengkap di `packages/game-core`: ECS, movement, kolisi, attack basic, 4 skill, HP/death/respawn — murni TS tanpa DOM/network, siap dipanggil ulang oleh server di fase 7.

## Deliverable

### game-core (packages/game-core)

- [ ] ECS dengan **miniplex**: komponen `Position`, `Velocity`, `Collider(radius)`, `Health`, `Team`, `Cooldown[]`, `Input`, `Projectile`, `Lifetime`
- [ ] World + sistem berjalan pada **fixed timestep 60 tick/detik** (`accumulator` pattern)
- [ ] Sistem movement: `moveVector` → velocity → posisi, clamp ke batas map
- [ ] Sistem kolisi: circle-vs-circle (unit vs unit, unit vs static collider) + resolusi pemisahan
- [ ] Combat: attack basic (range, attack speed, damage, aggro target)
- [ ] Skill system: 4 slot per hero, cooldown, biaya energy, definisi skill data-driven dari `packages/shared`
  - Skillshot (arah `aimVector`), AoE di posisi, self-buff, dash
  - Projectile: object pool, arah + speed + radius, hit target pertama
- [ ] Damage/taken, death → respawn timer → spawn di base
- [ ] Targeting helper: `findNearestEnemy(pos, range)` untuk auto-aim tap
- [ ] Counter tick di world (untuk sinkronisasi nanti)

### client (apps/client)

- [ ] Rig karakter in-game: **fork `src/model.ts` + `src/animation.ts` skinview3d** ke `packages/game-core` atau `apps/client/src/render/model/` — hasilkan `THREE.Group` per unit, bukan `SkinViewer` per karakter
- [ ] Mapping state ECS → mesh: posisi, rotasi ke arah gerak, animasi jalan/idle/attack
- [ ] Bridge input: `InputManager` → komponen `Input` di world
- [ ] HP bar per unit (HTML overlay atau sprite)
- [ ] Dummy target untuk testing (statik, respawn)
- [ ] Skill cooldown HUD terhubung ke state cooldown ECS

## File yang dibuat

```
packages/game-core/src/{world.ts,components.ts,systems/
  ├─ movement.ts
  ├─ collision.ts
  ├─ combat.ts
  ├─ skill.ts
  ├─ projectile.ts
  └─ respawn.ts
}
packages/shared/src/{heroData.ts,skillData.ts,constants.ts}
apps/client/src/render/minecraftModel.ts   # fork skinview3d model.ts
apps/client/src/render/animations.ts       # fork skinview3d animation.ts
apps/client/src/render/unitRenderer.ts     # ECS state -> mesh
apps/client/src/game/loop.ts               # fixed timestep + interpolation
```

## DoD

- [ ] Karakter bergerak halus mengikuti joystick/WASD, animasi jalan sesuai kecepatan
- [ ] Berputar ke arah gerak; attack basic jalan terhadap dummy (range, damage, HP bar berkurang)
- [ ] Ke-4 skill jalan: skillshot menembak ke arah aim, AoE meledak di titik, dash, buff; cooldown terlihat di HUD
- [ ] Tabrakan unit tidak saling menembus; projectile hilang setelah hit/pinggir map
- [ ] Mati → timer respawn → muncul lagi di base
- [ ] Render mulus walau tick server/gameloop 20-60 (interpolation divalidasi dengan tick sengaja di-drop di test)
- [ ] **Tidak ada import DOM/three/network di `game-core`** (dicek ESLint `no-restricted-imports` atau test dependency)
- [ ] Unit test lulus: movement, collision resolution, cooldown, damage, projectile hit, respawn

## Verifikasi

```bash
pnpm test          # vitest di game-core wajib ijo
pnpm lint          # termasuk guard: game-core bebas DOM
pnpm dev           # uji main manual vs dummy
```
