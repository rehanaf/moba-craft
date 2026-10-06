# Fase 3 — Input & HUD Mobile

## Tujuan

Input abstrak `moveVector + abilityInput[]` dari sumber keyboard (desktop) dan joystick virtual + tombol skill (mobile). HUD overlay HTML/CSS siap.

## Deliverable

- [ ] `InputManager` abstraksi — semua gameplay hanya baca:
  - `moveVector: {x, y}` (deadzone, normalized)
  - `abilityInput: 0..3` (event tap per tombol)
  - `aimVector` (arah joystick terakhir, untuk skillshot)
- [ ] Sumber desktop: WASD/arrow → `moveVector`, tombol 1-4/QWER → ability, mouse untuk aim
- [ ] Sumber mobile: **virtual joystick custom** di sisi kiri layar (Pointer Events, spawn di titik sentuh, `touch-action: none`, visual thumb circle)
- [ ] 4 tombol skill di kanan bawah: ikon, label, tap → `abilityInput`
- [ ] Cooldown visual radial (`conic-gradient`) — siap dipakai fase 4
- [ ] Haptics: `navigator.vibrate(15)` saat tap skill
- [ ] Layout landscape: joystick kiri, tombol skill kanan, area tengah `pointer-events: none`
- [ ] Safe area insets diterapkan pada posisi kontrol
- [ ] State HUD di Zustand (`cooldowns[]`, `hp`, `energy`) — store disiapkan, belum diisi logika

## File yang dibuat

```
apps/client/src/input/InputManager.ts
apps/client/src/input/keyboard.ts
apps/client/src/input/touchControls.ts   # joystick + tombol skill
apps/client/src/ui/Hud.tsx (atau vanilla DOM)
apps/client/src/ui/SkillButton.ts
apps/client/src/ui/Joystick.ts
apps/client/src/state/hudStore.ts        # zustand
```

## DoD

- [ ] Di desktop: karakter dummy bergerak halus dengan WASD
- [ ] Di HP (PWA/Chrome remote): joystick bekerja, tombol skill memberi callback + getar
- [ ] Tidak ada scroll/zoom/overscroll saat main (uji di mobile browser asli)
- [ ] Layout tidak tertutup notch/safe-area di HP landscape
- [ ] Unit test: deadzone, normalisasi diagonal (1,1) → magnitude 1, pembagian zona sentuh kiri/kanan

## Verifikasi

```bash
pnpm dev
pnpm test
# uji manual: chrome://inspect atau remote debug ke HP Android
```
