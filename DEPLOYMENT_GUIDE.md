# 🚀 Panduan Deployment ke GitHub Pages

Dokumen ini menjelaskan secara teknis bagaimana cara membuat aplikasi React (Vite) Anda bisa diakses online oleh siapa saja menggunakan GitHub Pages.

---

## 1. Persiapan Kode (PENTING!)

Sebelum deploy, kita harus memberi tahu Vite di mana file ini akan di-hosting. Jika langkah ini terlewat, **halaman akan blank putih** saat dibuka.

1.  Buka file `vite.config.ts`.
2.  Tambahkan properti `base`. Sesuaikan dengan nama repository Anda.

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Misal nama repository di GitHub adalah: "tugas-ict-cloud"
// Maka base-nya adalah: '/tugas-ict-cloud/'

export default defineConfig({
  plugins: [react()],
  base: '/GANTI-DENGAN-NAMA-REPO-GITHUB-ANDA/', 
})
```

---

## 2. Install Alat Bantu Deploy

Kita akan menggunakan paket bernama `gh-pages` yang memudahkan proses upload folder hasil build.

Buka terminal di folder proyek, lalu ketik:

```bash
npm install gh-pages --save-dev
```

---

## 3. Atur Script `package.json`

Kita perlu membuat "tombol pintas" agar tidak mengetik perintah panjang setiap kali mau deploy.

1.  Buka file `package.json`.
2.  Cari bagian `"scripts"`.
3.  Tambahkan `"predeploy"` dan `"deploy"` seperti di bawah ini:

```json
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    
    "predeploy": "npm run build", 
    "deploy": "gh-pages -d dist"
  },
```

> **Penjelasan:**
> *   `predeploy`: Perintah ini otomatis jalan sebelum deploy. Fungsinya memerintahkan Vite untuk mem-build aplikasi (mengubah kode React jadi HTML/CSS/JS standar di folder `dist`).
> *   `deploy`: Perintah ini mengambil folder `dist` tadi dan mengunggahnya ke cabang khusus di GitHub bernama `gh-pages`.

---

## 4. Eksekusi Deploy

Setelah semua siap, jalankan perintah ini di terminal:

```bash
npm run deploy
```

**Tunggu Prosesnya:**
1.  Terminal akan menjalankan `vite build` dulu.
2.  Lalu terminal akan tulisan "Published".

---

## 5. Mengaktifkan di GitHub

1.  Buka repository GitHub Anda.
2.  Masuk ke tab **Settings** > **Pages** (di menu kiri).
3.  Pada bagian **Build and deployment**, pastikan:
    *   Source: **Deploy from a branch**
    *   Branch: Pilih **gh-pages** (bukan main) dan folder **/(root)**.
4.  Klik **Save**.

Tunggu sekitar 1-2 menit. Refresh halaman Settings tadi. Akan muncul kotak di bagian atas:
> "Your site is live at https://username.github.io/nama-repo/"

Klik link tersebut, dan website Anda sudah online! 🎉

---

## Troubleshooting (Jika Error)

**Masalah:** Halaman Blank Putih saat dibuka.
**Solusi:** Cek kembali langkah No. 1. Pastikan `base` di `vite.config.ts` sudah sama persis dengan nama repository GitHub. Dan pastikan diawali serta diakhiri garis miring `/`.
