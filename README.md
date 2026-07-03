# Pocong.id

**Cerita Horor Nusantara yang Membuat Bulu Kuduk Berdiri.**

Pocong.id adalah portal berita horor premium Indonesia yang dibangun dengan HTML5, CSS3, dan Vanilla JavaScript. Situs ini menghadirkan cerita-cerita misterius dari seluruh Nusantara dengan desain gelap premium dan optimasi SEO lengkap.

---

## Struktur Folder

```
PocongID/
├── index.html          # Halaman beranda
├── tentang.html        # Halaman tentang kami
├── kontak.html         # Halaman kontak
├── artikel1.html       # Artikel horor 1
├── artikel2.html       # Artikel horor 2
├── artikel3.html       # Artikel horor 3
├── artikel4.html       # Artikel horor 4
├── artikel5.html       # Artikel horor 5
├── 404.html            # Halaman error 404
├── robots.txt          # File robots untuk SEO
├── sitemap.xml         # Peta situs XML
├── manifest.json       # Web App Manifest
├── css/
│   └── style.css       # Stylesheet utama
├── js/
│   └── script.js       # JavaScript utama
└── images/
    ├── logo.png
    ├── favicon.png
    ├── hero.jpg
    ├── banner.jpg
    ├── artikel1.jpg - artikel5.jpg
    ├── fog.png
    └── moon.png
```

---

## Cara Menjalankan

### Opsi 1: Buka Langsung di Browser

1. Buka folder `PocongID` di File Explorer
2. Klik dua kali `index.html`
3. Situs akan terbuka di browser default Anda

### Opsi 2: Local Server (Direkomendasikan)

Menggunakan Python:

```bash
cd PocongID
python -m http.server 8000
```

Buka browser dan akses: `http://localhost:8000`

Menggunakan Node.js (jika terinstall):

```bash
npx serve PocongID
```

### Opsi 3: Live Server di VS Code / Cursor

1. Install ekstensi **Live Server**
2. Klik kanan `index.html` → **Open with Live Server**

---

## Cara Mengedit

### Mengubah Konten Artikel

1. Buka file artikel yang ingin diedit (misalnya `artikel1.html`)
2. Edit teks di dalam tag `<article>` dan `.article-content`
3. Simpan file dan refresh browser

### Mengubah Tampilan (CSS)

1. Buka `css/style.css`
2. Variabel warna dan font ada di bagian `:root` di awal file
3. Ubah nilai variabel sesuai kebutuhan:

```css
:root {
  --bg-primary: #0a0a0a;
  --accent-red: #8b0000;
  --font-heading: 'Cinzel', serif;
  --font-body: 'Poppins', sans-serif;
}
```

### Mengubah Fungsi JavaScript

1. Buka `js/script.js`
2. Setiap fitur memiliki komentar penanda, misalnya:
   - `initLoadingScreen()` — Layar loading
   - `initTypingEffect()` — Animasi ketik di hero
   - `initSearch()` — Fitur pencarian
   - `initRainEffect()` — Efek hujan

### Mengganti Gambar

1. Ganti file di folder `images/` dengan gambar baru (pertahankan nama file yang sama)
2. Pastikan nama file dan atribut `alt` pada tag `<img>` diperbarui

### Menambah Artikel Baru

1. Salin salah satu file `artikel*.html` sebagai template
2. Ubah meta tags SEO (title, description, keywords, canonical, Open Graph)
3. Update JSON-LD structured data
4. Tulis konten artikel baru
5. Tambahkan URL ke `sitemap.xml` dan array `searchData` di `js/script.js`
6. Tambahkan link di `index.html` dan artikel terkait

---

## Fitur

- **Desain Premium Horror** — Dark UI, glassmorphism, animasi halus
- **Responsif** — Desktop, tablet, dan mobile
- **SEO Lengkap** — Meta tags, Open Graph, Twitter Card, JSON-LD, sitemap, robots.txt
- **Animasi** — Hujan, petir, kabut, parallax hero, scroll fade, typing effect
- **Interaktif** — Pencarian artikel, hamburger menu, back to top, loading screen
- **Aksesibilitas** — Semantic HTML, aria labels, heading hierarchy

---

## Teknologi

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES5-compatible IIFE)
- Google Fonts (Cinzel, Poppins)

**Tidak menggunakan:** Bootstrap, Tailwind, React, Vue, Angular, jQuery

---

## Publish ke Blogger.com

Lihat panduan lengkap: **[blogger/BLOGGER-PANDUAN.md](blogger/BLOGGER-PANDUAN.md)**

Ringkasan cepat:
1. Buat blog di [blogger.com](https://www.blogger.com)
2. Upload theme: `blogger/pocongid-blogger-theme.xml`
3. Buat 5 postingan dari `artikel1.html` – `artikel5.html`
4. Buat halaman Tentang & Kontak
5. Set logo, favicon, dan deskripsi blog

Regenerasi theme setelah edit CSS/JS:
```bash
python generate_blogger.py
```

---

## Lisensi

© 2026 Pocong.id. Hak Cipta Dilindungi Undang-Undang.

Konten cerita horor bersifat fiksi dan dibuat untuk tujuan hiburan.

---

## Kontak

- Email: redaksi@pocong.id
- Website: https://pocong.id
