# Fase 7 — Multiplayer Colyseus

## Tujuan

Match online 1v1 (skalable ke 5v5) dengan server authoritative yang menjalankan ulang `game-core` — tanpa refactor logika.

## Deliverable

- [ ] `apps/server/`: Colyseus + TypeScript, room `MatchRoom`
- [ ] Server menjalankan world `game-core` dengan fixed tick (20 atau 60 tick/s)
- [ ] Klien kirim **input vector per tick** (`moveVector`, `abilityInput`, `aimVector`, tick number) — binary/msgpack, bukan JSON teks
- [ ] Server broadcast snapshot delta (state yang berubah saja) per tick
- [ ] Klien: **interpolation buffer** (~100ms) untuk unit remote, **prediction + reconciliation** untuk unit lokal
- [ ] Anti-cheat minimal: server otoritatif — validasi range skill, cooldown, energy, kecepatan gerak maksimum
- [ ] Reconnect otomatis (jaringan mobile putus-menyambung): resume state, token sesi
- [ ] Matchmaking sederhana: room quick-match + antrian; Redis untuk sesi/matchmaking jika sudah perlu
- [ ] Struktur `packages/shared`: skema pesan jaringan (tipe + encode/decode)
- [ ] Test: simulasi 2 klien dengan latency/loss (colyseus-testing atau unit test logika netcode)

## File yang dibuat

```
apps/server/src/{index.ts,rooms/MatchRoom.ts,netcode/{snapshot.ts,validate.ts}}
packages/shared/src/messages.ts    # skema pesan + encode/decode
apps/client/src/net/{client.ts,prediction.ts,interpolation.ts}
```

## DoD

- [ ] 2 device bisa masuk room yang sama dan saling melihat gerakan halus
- [ ] Skill klien A terlihat di klien B dengan damage yang sama (server truth)
- [ ] Putus WiFi 5 detik → reconnect → state pulih, tidak keluar match
- [ ] Kecepatan gerak/spam skill dari klien dimanipulasi ditolak server (uji script)
- [ ] Latency 150ms masih nyaman dimainkan (gerakan lokal tanpa lag feel)
- [ ] Unit test netcode: encode/decode, validasi input, delta snapshot

## Verifikasi

```bash
pnpm test
pnpm --filter server dev
pnpm dev        # 2 browser/tab, bandingkan gerakan
# uji latency: chrome devtools network throttling + wifi off/on di HP
```
