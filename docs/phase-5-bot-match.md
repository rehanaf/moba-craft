# Fase 5 — Bot & Match Loop

## Tujuan

Match yang bisa dimainkan sampai menang/kalah melawan bot, plus hero picker dengan skin dari `assets/skins/`.

## Deliverable

- [ ] Bot AI di `game-core` (state machine sederhana): `idle → chase → attack → retreat` (retreat saat HP < 30%)
- [ ] Bot memakai skill dasar (skillshot ke arah target, dash untuk kabur)
- [ ] Win/lose condition: hancurkan base musuh / destroy core, atau timer + kill count
- [ ] Match flow: hero picker → loading → playing → result screen → rematch
- [ ] Hero picker: grid hero pakai `SkinViewer` skinview3d per kartu (bukan in-game scene), skin dari `assets/skins/`
- [ ] Pemetaan skin → hero: `steve/alex/blue-demon/nether-king/skull/hacker/dream`
- [ ] Minimap sederhana (canvas 2D): posisi unit, base, viewport indicator
- [ ] Kill feed + skor sementara

## File yang dibuat

```
packages/game-core/src/systems/bot.ts
packages/game-core/src/match.ts           # win/lose, phase match
apps/client/src/screens/HeroPicker.ts     # SkinViewer
apps/client/src/screens/Result.ts
apps/client/src/ui/Minimap.ts
apps/client/src/game/matchController.ts   # wiring input -> world -> render
```

## DoD

- [ ] Bisa pilih hero (tampil skin aslinya) → mulai match → main sampai menang/kalah
- [ ] Bot bergerak, menyerang, mundur saat sekarat, memakai skill
- [ ] Minimap menampilkan unit real-time
- [ ] Rematch langsung tanpa reload halaman
- [ ] Unit test: transisi state bot, kondisi menang/kalah, respawn base

## Verifikasi

```bash
pnpm test
pnpm dev    # main 1 match penuh vs bot
```
