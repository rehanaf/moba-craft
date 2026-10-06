# Roadmap Fase

Total 7 fase. Setiap fase punya file detail di `docs/phase-N-*.md` berisi tujuan, deliverable, DoD (Definition of Done), dan perintah verifikasi.

| # | Fase | Status |
|---|------|--------|
| 1 | [Scaffold monorepo](phase-1-scaffold.md) | ✅ selesai |
| 2 | [Render baseline](phase-2-render.md) | ✅ selesai |
| 3 | [Input & HUD mobile](phase-3-input-hud.md) | ✅ selesai |
| 4 | [Gameplay offline (game-core)](phase-4-gameplay.md) | ☐ belum mulai |
| 5 | [Bot & match loop](phase-5-bot-match.md) | ☐ belum mulai |
| 6 | [VFX/audio & optimasi mobile](phase-6-optimization.md) | ☐ belum mulai |
| 7 | [Multiplayer Colyseus](phase-7-multiplayer.md) | ☐ belum mulai |

## Keputusan yang sudah dikunci

- **Orientasi**: landscape (kunci orientasi via Capacitor, fallback CSS di PWA)
- **Packaging**: PWA + Capacitor sejak awal, satu codebase
- **Mulai dari**: offline dulu (single-player vs bot), Colyseus menyusul di fase 7
- **Kontrol**: direct movement (joystick/WASD), bukan click-to-move → pathfinding/navmesh tidak diperlukan
- **Aiming**: skillshot mengikuti arah joystick, tap = auto-aim unit terdekat

## Alur antar fase

```
1 Scaffold → 2 Render → 3 Input+HUD → 4 Gameplay → 5 Bot+Match → 6 Optimasi → 7 Multiplayer
                                        (game-core dipakai ulang oleh server di fase 7)
```

Setelah tiap fase selesai: centang status di tabel ini.
