# Panduan Setup Database & Pengujian Lokal (Supabase)

Dokumen ini berisi petunjuk langkah demi langkah untuk mengonfigurasi database **Supabase** dan melakukan pengujian lokal untuk website **Google Skills Arcade Facilitator 2026**.

---

## 1. Membuat Project Supabase

1. Buka [supabase.com/dashboard](https://supabase.com/dashboard) → **New Project**.
2. Beri nama project (contoh: `gsa-leaderboard`), pilih region **Southeast Asia (Singapore)** (region paling dekat ke Indonesia).
3. Simpan database password yang muncul.
4. Setelah project selesai dibuat, masuk ke **Project Settings → API**, lalu salin:
   - **Project URL** → disimpan sebagai variabel `SUPABASE_URL`.
   - **`service_role` secret** → disimpan sebagai variabel `SUPABASE_SERVICE_ROLE_KEY`.
     *(Perhatian: Ambil kunci `service_role`, BUKAN `anon` key).*
5. Masukkan kedua nilai tersebut ke Vercel Dashboard: **Settings → Environment Variables**.
6. Untuk pengujian di komputer lokal, salin ke file `.env.local`.

---

## 2. Environment Variables & Keamanan

> ⚠️ **PERINGATAN DILARANG MEMAKAI AWALAN `VITE_`**:
> Vite akan membocorkan SETIAP environment variable yang diawali `VITE_` langsung ke bundle browser.
> **DILARANG HARAM** menggunakan `VITE_SUPABASE_URL` atau `VITE_SUPABASE_SERVICE_ROLE_KEY`.
>
> ⚠️ **PERINGATAN SENSITIF**:
> Jangan pernah menuliskan nilai password/secret asli di file `SETUP.md` atau commit ke git.

Isi file `.env.local` lokal Anda dengan format berikut:

```env
ADMIN_PASSWORD=
CRON_SECRET=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## 3. Menjalankan di Lokal (`npm run dev` vs `vercel dev`)

| Perintah | Yang Jalan | Kapan Dipakai |
|---|---|---|
| `npm run dev` | Frontend saja | Cuma untuk lihat tampilan UI. **Kalkulator & Leaderboard akan error 404** karena folder `api/` tidak dijalankan oleh Vite. Ini normal, bukan bug. |
| `vercel dev` | Frontend **dan** `api/` | Untuk menguji kalkulator, leaderboard, & panel admin. Wajib pakai ini kalau mau tes fungsi lengkap. |

### Cara Menjalankan `vercel dev`:

1. Install Vercel CLI (jika belum ada):
   ```bash
   npm i -g vercel
   ```
2. Buat file `.env.local` dari `.env.local.example`.
3. Jalankan perintah:
   ```bash
   vercel dev
   ```

---

## 4. Eksekusi Skema SQL (Inisialisasi Tabel & RLS)

Buka Supabase Dashboard → **SQL Editor** → **New query** → paste SQL di bawah → **Run**:

```sql
-- Tabel 1: Peserta (hanya simpan Nama & Profile URL)
CREATE TABLE IF NOT EXISTS participants (
  id          SERIAL PRIMARY KEY,
  nama        TEXT NOT NULL,
  profile_url TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel 2: Snapshots Mingguan untuk Hitung Kenaikan (poin NUMERIC(6,1) untuk presisi eksak desimal .5)
CREATE TABLE IF NOT EXISTS snapshots (
  id             SERIAL PRIMARY KEY,
  participant_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
  snapshot_date  DATE NOT NULL,
  points         NUMERIC(6,1) NOT NULL,
  bonus_points   INTEGER NOT NULL DEFAULT 0,
  milestone      TEXT,
  games          INTEGER NOT NULL,
  skill_badges   INTEGER NOT NULL,
  captured_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (participant_id, snapshot_date)
);

-- MIGRASI UNTUK TABEL SNAPSHOTS YANG SUDAH ADA:
ALTER TABLE snapshots ALTER COLUMN points TYPE NUMERIC(6,1);
ALTER TABLE snapshots ADD COLUMN IF NOT EXISTS bonus_points INTEGER NOT NULL DEFAULT 0;
ALTER TABLE snapshots ADD COLUMN IF NOT EXISTS milestone TEXT;

-- Tabel 3: Riwayat Job Scraping
CREATE TABLE IF NOT EXISTS jobs (
  id            SERIAL PRIMARY KEY,
  started_at    TIMESTAMPTZ DEFAULT NOW(),
  finished_at   TIMESTAMPTZ,
  success_count INTEGER DEFAULT 0,
  fail_count    INTEGER DEFAULT 0,
  errors        JSONB
);

-- WAJIB: Aktifkan Row Level Security (RLS) pada semua tabel
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE snapshots    ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs         ENABLE ROW LEVEL SECURITY;
```

*Catatan: RLS diaktifkan tanpa policy publik, sehingga PostgREST API anon ditutup total. `SUPABASE_SERVICE_ROLE_KEY` pada folder `api/` serverless aman melewati RLS.*

---

## 5. Cron Mingguan

Konfigurasi cron tersimpan di `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron-leaderboard",
      "schedule": "0 2 * * 0"
    }
  ]
}
```

- `0 2 * * 0` = Setiap hari Minggu pukul 02:00 UTC = **09:00 WIB**.
- Cron hanya berjalan otomatis pada deployment **production** di Vercel.
- Untuk tes manual, panggil endpoint `/api/cron-leaderboard` dengan menambahkan header `Authorization: Bearer <CRON_SECRET>`.

---

## 6. Verifikasi Keamanan

Lakukan pengecekan keamanan mandiri sebelum mempublikasikan website:

- [ ] Buka web → klik kanan → **View Page Source** → Ctrl+F cari `supabase`, `SERVICE_ROLE`, `eyJ` → **harus tidak ada hasil**.
- [ ] Buka DevTools → tab **Network** → buka halaman Leaderboard → klik response `/api/leaderboard` → **harus hanya berisi maksimal 10 baris**.
- [ ] Ctrl+F cari `VITE_SUPABASE` di seluruh folder `src/` → **harus tidak ada hasil**.
- [ ] Jalankan `git log --all --oneline -- "*.csv"` → **harus kosong** (tidak ada CSV yang pernah ter-commit).
- [ ] Coba login panel admin dengan password salah → harus gagal, dan setelah 5 kali harus diblokir sementara (rate limited).
- [ ] Buka `SUPABASE_URL` + `/rest/v1/participants` di browser tanpa key → harus ditolak (401 Unauthorized / RLS active).

---

## 7. Rutinitas Mingguan & Catatan Supabase Free Tier

### Rutinitas Mingguan Fasilitator:
1. Buka `/leaderboard` → klik **Area Admin** → masukkan password.
2. Upload CSV terbaru dari penyelenggara (file mentah, tidak perlu menghapus kolom email/HP manual).
3. Klik **Jalankan Scraping**.
4. Cek hasilnya di halaman leaderboard publik. Tidak perlu deploy ulang atau commit ke git.

### Catatan Supabase Free Tier:
Project Supabase gratis akan **di-pause otomatis jika tidak ada aktivitas selama 7 hari**.
Karena cron otomatis kita berjalan setiap hari Minggu pukul 09:00 WIB, project akan tetap aktif dengan sendirinya.
Jika Anda melewatkan beberapa minggu dan project ter-pause, klik tombol **Restore** pada Supabase Dashboard.
