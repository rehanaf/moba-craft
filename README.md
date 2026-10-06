# moba-craftx

MOBA web berbasis Three.js dengan karakter bergaya Minecraft (skinview3d). Fokus utama: **mobile landscape** dengan kontrol joystick virtual + tombol skill, rilis via **PWA dan Capacitor**.

## Tech Stack

| Layer | Pilihan |
|---|---|
| Rendering | Three.js (WebGL), `MeshLambert`/`MeshToon`, tanpa shadow map (blob shadow) |
| Karakter Minecraft | skinview3d — fork `src/model.ts` + `src/animation.ts` ke scene game; `SkinViewer` hanya untuk UI (hero picker) |
| Bahasa + build | TypeScript strict + Vite |
| Arsitektur game | ECS (miniplex) di `packages/game-core` — murni TS, tanpa DOM/network |
| Input | Pointer Events: WASD + mouse (desktop), joystick virtual + tombol skill (mobile) |
| Fisik/kolisi | Circle-vs-circle 2D di ground plane |
| State UI | Zustand, HUD HTML/CSS overlay |
| Audio | Howler.js |
| Multiplayer (menyusul) | Colyseus server-authoritative, input vector per tick, binary/msgpack |
| Packaging | PWA (`vite-plugin-pwa`) + Capacitor (Play Store) |
| Tooling | pnpm, ESLint, Prettier, Vitest, Playwright |

## Struktur Monorepo

```
moba-craftx/
├─ apps/
│  ├─ client/          # Vite + three.js, HUD, PWA + Capacitor
│  └─ server/          # Colyseus (fase 7)
├─ packages/
│  ├─ game-core/       # ECS + logika gameplay — NO DOM, NO network
│  └─ shared/          # tipe pesan, konstanta hero/skill/map
├─ assets/
│  └─ skins/           # Skin PNG 64x64 (steve, alex, dll)
└─ docs/               # Dokumentasi fase
```

Prinsip kuncinya: semua logika gameplay (movement, kolisi, skill, damage, bot AI) hidup di `packages/game-core` yang murni TypeScript. Sekarang dipanggil game loop browser; nanti dipanggil lagi oleh server Colyseus tanpa refactor.

## Skin

`assets/skins/` berisi skin PNG format 64x64:

- `steve.png`, `alex.png` — skin bawaan
- `blue-demon.png`, `nether-king.png`, `skull.png`, `hacker.png`, `dream.png` — kandidat hero

Dipakai untuk hero picker (`SkinViewer`) dan rig in-game (fork model skinview3d).

## Dokumentasi

Roadmap dan kriteria selesai tiap fase ada di [`docs/PHASES.md`](docs/PHASES.md).

## Cara Mulai

```bash
pnpm install
pnpm dev
```

## Status & Langkah Selanjutnya

Sampai **Fase 3 selesai** (scaffold, render baseline, input & HUD mobile). Detail tiap fase: [`docs/PHASES.md`](docs/PHASES.md).

Yang harus dilanjutkan — **Fase 4: Gameplay Offline**:

1. Bangun ECS di `packages/game-core` (miniplex): komponen Position/Velocity/Collider/Health/Cooldown, fixed timestep 60 tick
2. Sistem movement + kolisi circle-vs-circle, attack basic, 4 skill data-driven dari `packages/shared`, projectile (object pool), HP/death/respawn
3. Fork `src/model.ts` + `src/animation.ts` skinview3d → rig karakter in-game (bukan `SkinViewer` per karakter), mapping state ECS → mesh + animasi jalan/serang
4. Hubungkan `InputManager` → komponen `Input` di world, dummy target untuk testing
5. Wajib lulus: `pnpm test`, `pnpm lint` (guard `game-core` bebas DOM/three), `pnpm dev` main manual

Setelah Fase 4: Fase 5 (bot & match), Fase 6 (VFX/optimasi mobile), Fase 7 (multiplayer Colyseus).
