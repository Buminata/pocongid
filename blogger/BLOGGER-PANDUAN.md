# Panduan Publish Pocong.id ke Blogger.com

Panduan lengkap untuk mempublikasikan website Pocong.id ke **Blogger.com** (gratis).

---

## Ringkasan Arsitektur

| Komponen | Di Blogger |
|----------|------------|
| Desain & CSS | Theme XML (`blogger/pocongid-blogger-theme.xml`) |
| Beranda & daftar artikel | Halaman utama blog (otomatis) |
| 5 Cerita horor | **Postingan Blog** (5 entri) |
| Tentang & Kontak | **Halaman** (Pages) |
| Gambar | Diunggah ke Blogger saat buat posting |
| JavaScript | Embedded di theme XML |

---

## Langkah 1: Buat Blog Baru

1. Buka [blogger.com](https://www.blogger.com) dan login dengan akun Google
2. Klik **Buat blog baru**
3. Judul: `Pocong.id`
4. Alamat: `pocongid` (akan menjadi `https://pocongid.blogspot.com`)
5. Klik **Buat blog**

---

## Langkah 2: Upload Theme

1. Di dashboard Blogger, buka **Theme** (Tema)
2. Klik panah bawah **Backup/Restore** → **Unggah**
3. Pilih file: `blogger/pocongid-blogger-theme.xml`
4. Klik **Unggah** dan konfirmasi

> **Penting:** Jika upload gagal karena ukuran file, buka theme XML dan pastikan tidak ada karakter invalid. Alternatif: salin isi `css/style.css` ke **Theme → Edit HTML → di dalam `<b:skin><![CDATA[ ... ]]></b:skin>`**

---

## Langkah 3: Upload Logo & Favicon

1. Buka **Setelan** → **Dasar**
2. **Favicon**: unggah `images/favicon.png`
3. **Logo halaman**: unggah `images/logo.png`

---

## Langkah 4: Buat 5 Postingan Artikel

Untuk setiap artikel (`artikel1.html` s/d `artikel5.html`):

1. Klik **Postingan** → **Buat postingan baru**
2. **Judul**: salin dari tag `<h1>` artikel
3. **Konten**: salin isi dari `<div class="article-content">` (tanpa sidebar)
4. Klik **Label** dan tambahkan label: `Cerita Horor`, `Misteri`, atau `Urban Legend`
5. Klik **Gambar postingan** → unggah gambar dari folder `images/artikelX.jpg`
6. Klik **Tautan permanen** → buat URL ramah SEO, contoh:
   - `pocong-penunggu-jembatan-tua`
   - `rumah-kos-nomor-13`
   - `pocong-tanpa-wajah-makam-belanda`
   - `tangisan-pocong-sawah`
   - `legenda-pocong-tanah-merah`
7. Klik **Pratinjau** untuk cek tampilan
8. Klik **Publikasikan**

### Daftar Artikel

| File | Judul Posting |
|------|---------------|
| artikel1.html | Cerita Pocong Penunggu Jembatan Tua yang Tidak Pernah Pulang |
| artikel2.html | Rumah Kos Nomor 13 yang Selalu Didatangi Pocong Setelah Tengah Malam |
| artikel3.html | Pocong Tanpa Wajah di Makam Belanda yang Menghilang Saat Adzan Subuh |
| artikel4.html | Tangisan Pocong dari Tengah Sawah yang Mengubah Nasib Seorang Petani |
| artikel5.html | Legenda Pocong Berlumuran Tanah Merah di Desa Terlarang |

---

## Langkah 5: Buat Halaman Statis

### Halaman Tentang

1. Klik **Halaman** → **Buat halaman baru**
2. Judul: `Tentang`
3. Salin konten dari `tentang.html` (bagian artikel utama)
4. Tautan permanen: `tentang`
5. Publikasikan

### Halaman Kontak

1. Buat halaman baru, judul: `Kontak`
2. Salin konten dari `kontak.html`
3. Tautan permanen: `kontak`
4. Publikasikan

> **Catatan:** Formulir kontak di Blogger tidak mendukung backend custom. Gunakan widget **Formulir Kontak** bawaan Blogger, atau arahkan ke email: `redaksi@pocong.id`

---

## Langkah 6: Konfigurasi SEO Blogger

1. **Setelan** → **Dasar** → **Deskripsi**:  
   `Cerita Horor Nusantara yang Membuat Bulu Kuduk Berdiri. Portal berita horor premium Indonesia.`

2. **Setelan** → **Penelusuran** → centang **Izinkan blog muncul di hasil penelusuran**

3. **Setelan** → **Penelusuran** → **Robots.txt kustom** — tambahkan:
   ```
   User-agent: *
   Allow: /
   Sitemap: https://pocongid.blogspot.com/sitemap.xml
   ```

4. **Setelan** → **Penelusuran** → **Meta tag kustom** (opsional):
   ```html
   <meta name="keywords" content="pocong, cerita horor, horor indonesia, urban legend"/>
   ```

---

## Langkah 7: Menu Navigasi

1. Buka **Tata Letak** (Layout)
2. Tambahkan gadget **Halaman** ke area header
3. Pilih halaman: Tentang, Kontak
4. Simpan

Atau edit link di theme XML bagian `<ul class='navbar-nav'>`.

---

## Langkah 8: Domain Kustom (Opsional)

Jika punya domain `pocong.id`:

1. **Setelan** → **Dasar** → **Domain kustom**
2. Ikuti instruksi DNS (CNAME ke `ghs.googlehosted.com`)
3. Update semua URL di `js/config.js`:
   ```javascript
   blogUrl: 'https://pocong.id'
   ```

---

## Langkah 9: Regenerasi Theme (Jika Edit CSS/JS)

Setelah mengubah `css/style.css` atau `js/script.js`:

```bash
python generate_blogger.py
```

Lalu upload ulang `blogger/pocongid-blogger-theme.xml`.

---

## Hosting Alternatif: Static + Blogger

Anda juga bisa:

- **Opsi A:** Pakai Blogger sepenuhnya (disarankan untuk pemula)
- **Opsi B:** Host file static di **GitHub Pages** / **Netlify** gratis dengan domain kustom — upload seluruh folder `PocongID`
- **Opsi C:** Kombinasi — landing page di Netlify, artikel di Blogger

---

## Checklist Sebelum Publish

- [ ] Theme terupload tanpa error
- [ ] Logo & favicon tampil
- [ ] 5 postingan artikel live
- [ ] Halaman Tentang & Kontak live
- [ ] Deskripsi blog diisi
- [ ] Penelusuran diizinkan
- [ ] Pratinjau mobile OK
- [ ] Semua gambar punya alt text
- [ ] Tautan internal antar artikel berfungsi

---

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| CSS tidak tampil | Pastikan CSS ada di dalam `<b:skin>` |
| JS error | Cek Console browser; pastikan script di theme valid |
| Gambar broken | Unggah ulang via Blogger, jangan pakai path lokal |
| Theme upload gagal | Kurangi ukuran atau hapus komentar `/* */` berlebihan |
| Menu tidak muncul | Edit navbar di theme XML |

---

## Kontak & Dukungan

- Email: redaksi@pocong.id
- Dokumentasi Blogger: [support.google.com/blogger](https://support.google.com/blogger)

**Selamat mempublikasikan Pocong.id!**
