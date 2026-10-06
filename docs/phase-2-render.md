# Fase 2 — Render Baseline

## Tujuan

Scene Three.js: kamera follow isometrik, peta datar bergaya voxel, pencahayaan hemat, siap menerima karakter.

## Deliverable

- [ ] Renderer setup: WebGLRenderer, antialias off (mobile), `setPixelRatio(Math.min(devicePixelRatio, 2))`, resize handler
- [ ] Warna clear / fog sesuai palet voxel
- [ ] Kamera: fixed angle isometrik-ish (~45° pitch, 45° yaw), follow target dengan lerp (`camera.position.lerp`), FOV menyesuaikan aspect
- [ ] Ground plane + props sederhana (kotak/kubus bergaya voxel) — model glTF dari Blender menyusul, placeholder dulu
- [ ] Cahaya: ambient + directional **tanpa shadow map**
- [ ] Blob shadow: circle plane transparan di bawah unit (utility siap dipakai fase 4)
- [ ] Canvas fullscreen landscape, aturan CSS anti-scroll
- [ ] Asset pool: `assets/skins/` terdaftar sebagai static assets (belum dirender)

## File yang dibuat

```
apps/client/src/game/renderer.ts      # init renderer + resize
apps/client/src/game/camera.ts        # kamera follow lerp
apps/client/src/game/scene.ts         # scene, cahaya, ground, props
apps/client/src/game/blobShadow.ts
apps/client/src/main.ts               # game loop placeholder (requestAnimationFrame)
```

## DoD

- [ ] Peta terlihat di browser, kamera follow fungsi dummy (target bergerak pelan)
- [ ] 60fps di browser desktop, tidak ada warning WebGL di konsol
- [ ] Rotasi ke portrait menampilkan pesan "putar perangkat"
- [ ] Unit test untuk helper kamera (fungsi lerp follow) lulus

## Verifikasi

```bash
pnpm dev
pnpm test
pnpm lint
```
