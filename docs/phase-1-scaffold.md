# Fase 1 — Scaffold Monorepo

## Tujuan

Struktur monorepo + tooling siap dikembangkan, PWA dan Capacitor terpasang, projek bisa `pnpm dev` dan render halaman kosong berwarna.

## Deliverable

- [ ] pnpm workspace: `pnpm-workspace.yaml` (`apps/*`, `packages/*`)
- [ ] `apps/client/` — Vite + TypeScript strict
- [ ] `packages/game-core/` — package TS kosong (belum ada logika)
- [ ] `packages/shared/` — package TS kosong
- [ ] Konfigurasi ESLint + Prettier (flat config)
- [ ] Vitest terpasang di root (`pnpm test`)
- [ ] `vite-plugin-pwa` di client (manifest minimal, theme color, landscape orientation)
- [ ] Capacitor init di client (`npx cap init`, iOS/Android platform ditambahkan)
- [ ] Viewport meta anti-zoom + `theme-color` + `user-scalable=no`
- [ ] CSS safe-area: `env(safe-area-inset-*)`, aturan landscape-only fallback (pesan "putar HP" di portrait via media query)
- [ ] `README.md` dan `docs/PHASES.md` sudah ada

## File yang dibuat

```
pnpm-workspace.yaml
package.json
eslint.config.js
.prettierrc
apps/client/{index.html,package.json,vite.config.ts,tsconfig.json,src/main.ts,public/manifest.webmanifest}
apps/client/capacitor.config.ts
packages/game-core/{package.json,tsconfig.json,src/index.ts}
packages/shared/{package.json,tsconfig.json,src/index.ts}
```

## DoD

- [ ] `pnpm dev` menjalankan client, halaman terbuka tanpa error konsol
- [ ] `pnpm lint` dan `pnpm test` lulus (test dummy minimal)
- [ ] `pnpm build` menghasilkan bundle client + service worker PWA
- [ ] `npx cap add android` berhasil, `npx cap sync` jalan

## Verifikasi

```bash
pnpm install
pnpm dev
pnpm lint
pnpm test
pnpm build
cd apps/client && npx cap add android && npx cap sync
```
