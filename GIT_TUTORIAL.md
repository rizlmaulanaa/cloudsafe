# 🎓 Panduan Git untuk Pemula

Panduan ini dibuat khusus untuk membantu Anda mengunggah folder proyek lokal (yang ada di laptop) ke repository GitHub untuk pertama kalinya.

---

## Persiapan Awal

1.  Pastikan **Git** sudah terinstall di laptop. (Cek dengan ketik `git --version` di terminal).
2.  Pastikan Anda sudah punya akun **GitHub**.
3.  **Buat Repository Baru di GitHub:**
    *   Buka [github.com/new](https://github.com/new).
    *   Nama Repository: `cloud-safe-app` (atau nama lain terserah Anda).
    *   **PENTING:** Jangan centang "Add a README", "Add .gitignore", atau "Choose a license". Biarkan kosong agar repo benar-benar bersih.
    *   Klik **Create repository**.
    *   Salin link HTTPS repo Anda (contoh: `https://github.com/username/cloud-safe-app.git`).

---

## Langkah-langkah (Command Line)

Buka terminal (CMD/PowerShell/Terminal VS Code) dan pastikan Anda berada di **dalam folder proyek** Anda.

### 1. Inisialisasi Git (`git init`)
Perintah ini akan mengubah folder biasa menjadi folder yang dipantau oleh Git.

```bash
git init
```
> **Penjelasan:** Bayangkan ini seperti memasang CCTV di folder proyek Anda. Sekarang Git mulai mengawasi setiap perubahan file.

### 2. Memilih File (`git add`)
Sebelum menyimpan, kita harus memilih file mana saja yang mau disimpan. Titik (`.`) artinya "pilih semua file".

```bash
git add .
```
> **Penjelasan:** Ini seperti mengumpulkan barang-barang yang mau dimasukkan ke dalam kardus paket. Belum dikirim, baru dikumpulkan di ruang tunggu (Staging Area).

### 3. Menyimpan Perubahan (`git commit`)
Sekarang kita bungkus file yang sudah dipilih tadi dan beri label/pesan.

```bash
git commit -m "Upload pertama: Aplikasi Cloud Safe selesai"
```
> **Penjelasan:** Ini seperti melakban kardus dan menempelkan resi pengiriman. `-m` artinya "message" (pesan). Pesan ini penting agar kita tahu apa yang kita ubah di versi ini.

### 4. Mengubah Nama Cabang Utama (`git branch`)
Secara default kadang namanya `master`, tapi standar GitHub sekarang adalah `main`.

```bash
git branch -M main
```
> **Penjelasan:** Hanya mengubah nama jalur utama penyimpanan kita menjadi 'main'.

### 5. Menghubungkan ke GitHub (`git remote`)
Kita perlu memberi tahu Git di laptop, ke alamat mana "paket" ini harus dikirim.

```bash
git remote add origin https://github.com/USERNAME_ANDA/NAMA_REPO.git
```
*(Ganti URL di atas dengan link repo yang tadi Anda salin dari GitHub)*

> **Penjelasan:** `origin` adalah nama panggilan untuk alamat GitHub Anda. Jadi kita tidak perlu mengetik URL panjang itu berulang kali.

### 6. Mengirim ke GitHub (`git push`)
Ini langkah terakhir, mengirim file dari laptop ke server GitHub.

```bash
git push -u origin main
```
> **Penjelasan:** "Git, tolong dorong (push) kode saya ke alamat `origin` di cabang `main`".

---

## Rangkuman Cepat (Cheat Sheet)

Jika besok Anda mengubah kode dan ingin update lagi, cukup ketik 3 perintah ini:

1.  `git add .` (Pilih file yang berubah)
2.  `git commit -m "Pesan perubahan"` (Simpan versi baru)
3.  `git push` (Kirim ke GitHub)
