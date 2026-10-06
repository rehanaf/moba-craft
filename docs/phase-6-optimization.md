# Fase 6 — VFX/Audio & Optimasi Mobile

## Tujuan

Game terasa "juice" (efek skill, suara) dan lolos budget performa di HP Android mid-end.

## Deliverable

### VFX & audio

- [ ] VFX skill ringkas: impact flash, ring AoE, trail projectile, hit marker — sprite/particle hemat (bukan postprocessing)
- [ ] Object pool untuk projectile & VFX (nol alokasi di game loop)
- [ ] Audio: Howler.js — SFX serang/kena/skill/kematian, BGM opsi
- [ ] Haptics berbeda per aksi (skill, kill, damage diterima)

### Optimasi

- [ ] `InstancedMesh` untuk unit / projectile / minion (target: draw call total < 100)
- [ ] Texture atlas untuk material voxel (1 material untuk semua props)
- [ ] Cap `setPixelRatio(Math.min(devicePixelRatio, 1.5))` dengan auto-turun bila FPS < 45
- [ ] Object pooling menyeluruh (damage number, hp bar, dll)
- [ ] GC-free game loop: tidak ada `new`/closure baru per tick (dicek dengan heap snapshot)
- [ ] Loading: preloader skin PNG + aset inti, progress bar
- [ ] Fallback 30fps untuk low-end (frame skip tick render, gameplay tetap 60 tick)

## File yang dibuat

```
apps/client/src/fx/{particles.ts,pool.ts,impact.ts}
apps/client/src/audio/sfx.ts
packages/game-core/src/objectPool.ts
```

## DoD

- [ ] Profil di HP Android mid-end: **≥55fps rata-rata saat teamfight 6 unit + projectile**
- [ ] Draw call < 100 (cek `renderer.info.render.calls`)
- [ ] Heap snapshot stabil: tidak ada growth setelah 5 menit main
- [ ] SFX terdengar sinkron dengan aksi di device asli
- [ ] Low-end mode aktif otomatis menurunkan pixel ratio tanpa error

## Verifikasi

```bash
pnpm test
pnpm build
# uji device asli + chrome://inspect performance profiler
# catat: fps, draw calls, heap growth
```
