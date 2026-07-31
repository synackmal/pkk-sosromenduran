# Website TP PKK Sosromenduran

## Struktur file
- `index.html` — Beranda
- `profil.html` — Sambutan Ketua, Visi/Misi, Struktur Organisasi
- `bidang.html` — Daftar 4 Pokja (klik kartu untuk ke halaman detail)
- `pokja-1.html`, `pokja-2.html`, `pokja-3.html` — Detail Pokja I–III (masih placeholder, tinggal isi info + link Google Form)
- `pokja-4.html` — Detail Pokja IV / Stunting, dengan 4 kuis skrining interaktif (LILA, ibu hamil, caten, deteksi dini)
- `edukasi.html` — Pusat materi/dokumen pelatihan
- `galeri.html` — Dokumentasi kegiatan (filter kategori)
- `mars.html` — Lirik & pemutar Mars PKK
- `admin.html` — Login kode akses + dashboard rekap data per Pokja
- **`header.html`** — Isi navbar (logo, menu, tombol Admin) — **cukup edit file ini SEKALI, otomatis kepakai di semua halaman**
- **`footer.html`** — Isi footer (deskripsi, tautan cepat, kontak) — **cukup edit file ini SEKALI, otomatis kepakai di semua halaman**
- **`firebase-config.js`** — Kunci penyambung ke Firebase (database + upload). Diisi sekali pas setup, lihat panduan di bawah.
- **`header.css`** — Styling navbar (termasuk efek kaca/glass)
- **`include.js`** — Script yang otomatis "menyuntikkan" `header.html` dan `footer.html` ke tiap halaman + ngatur menu aktif & efek scroll

## ⚡ PENTING: kenapa ada header.html/header.css/include.js terpisah

Dulu tiap halaman punya kode navbar sendiri-sendiri (copy-paste 11x). Sekarang navbar itu **cuma ada di satu tempat** (`header.html`), dan tiap halaman otomatis "manggil" file itu pas dibuka. Jadi:

- **Mau ubah navbar atau footer** (logo, menu, warna, tautan cepat, kontak, dst)? → **cukup edit `header.html` dan/atau `footer.html`, plus `header.css` kalau soal warna navbar**, otomatis berlaku di semua 11 halaman. Gak perlu edit satu-satu lagi.
- **Mau ubah isi 1 halaman doang** (misal cuma teks di Pokja II)? → edit file halaman itu aja seperti biasa, gak akan ngaruh ke halaman lain.

## ⚠️ Cara buka (WAJIB pakai server, bukan double-click file)

Karena navbar sekarang dimuat otomatis pakai JavaScript (`fetch`), file **HARUS dibuka lewat server** seperti Live Server — **tidak bisa dibuka dengan cara double-click file `index.html`** langsung dari File Explorer (nanti navbar-nya kosong/gak muncul, karena browser blokir `fetch` file lokal tanpa server).

- ✅ Buka lewat **Live Server** di VS Code (klik kanan `index.html` → "Open with Live Server") — cara ini yang udah lo pakai selama ini, aman.
- ✅ Kalau nanti sudah di-upload ke GitHub Pages / Netlify / hosting lain, otomatis jalan normal (karena itu juga "server").
- ❌ Jangan double-click file HTML langsung dari File Explorer/Finder.

## Yang WAJIB diganti sebelum dipakai beneran

1. **Foto & gambar** — taruh di folder `assets/images/` sesuai nama file yang diminta di `assets/images/README.md`. Kalau foto belum ada, otomatis fallback ke warna polos (gak nampilin gambar rusak).
2. **Link Google Form** — cari teks `Buka Google Form` di tiap halaman Pokja (`pokja-1.html` s/d `pokja-4.html`), ganti `href="#"`.
3. **Kode akses & link Google Sheets (Admin)** — buka `admin.html`, cari `var AKSES = {...}` di bagian bawah file:
   - `KETUA-PKK` → bisa lihat semua Pokja
   - `POKJA1` s/d `POKJA4` → cuma lihat Pokja masing-masing
   - Ganti kode-kode ini jadi yang tidak mudah ditebak, dan ganti `url: '#'` dengan link Google Sheets asli (set sharing "siapa saja yang punya link").
4. **Materi & foto (Galeri + Edukasi)** — lihat panduan lengkap di bawah, "Sistem Isi Konten Sendiri".

## 🔥 Sistem Isi Konten Sendiri (Galeri & Edukasi) — via Firebase

Halaman **Galeri**, **Edukasi**, dan **Admin** sekarang pakai **Firebase** (layanan gratis dari Google) sebagai "database" — jadi Ibu PKK bisa **upload foto/materi langsung dari halaman Admin di website**, tanpa buka kode sama sekali.

### Setup awal (dilakukan SEKALI, oleh yang paham teknis — bagian ini tugas kamu sebelum serah terima)

**⚠️ PENTING:** pakai akun Google **khusus PKK** (bukan akun pribadi kamu), misal `pkksosromenduran@gmail.com` — biar Bu Febby bisa lanjut pegang akses ini setelah KKN selesai.

**1. Bikin project Firebase**
1. Buka [https://console.firebase.google.com](https://console.firebase.google.com), login pakai akun Google PKK
2. Klik **"Add project"** / **"Buat project"**, kasih nama (misal `pkk-sosromenduran`), lanjut sampai selesai (boleh matikan Google Analytics, gak wajib)

**2. Aktifkan Authentication (buat login Kelola Konten)**
1. Di sidebar kiri, klik **Build → Authentication → Get started**
2. Pilih metode **Email/Password**, aktifkan (toggle jadi ON), Save
3. Masih di halaman Authentication, klik tab **Users → Add user** — buat 1 akun admin (email + password), ini yang dipakai Ibu PKK/Bu Febby buat login ke Dasbor Admin

**3. Aktifkan Firestore Database (buat nyimpen data)**
1. Sidebar kiri → **Build → Firestore Database → Create database**
2. Pilih **"Start in production mode"**, pilih lokasi server (`asia-southeast2` / Jakarta paling deket), Enable
3. Setelah aktif, klik tab **Rules**, hapus isinya, ganti dengan ini, lalu **Publish**:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
(Artinya: semua orang boleh **lihat** data, tapi cuma yang **login** yang boleh nambah/upload)

**4. Aktifkan Storage (buat nyimpen file foto/PDF/PPT)**
1. Sidebar kiri → **Build → Storage → Get started**
2. Pilih **"Start in production mode"**, lokasi sama kayak Firestore, Done
3. Klik tab **Rules**, ganti isinya jadi sama persis kayak Firestore di atas (read: true, write: butuh login), **Publish**

**5. Daftarin "Web App" biar dapet kode config**
1. Di halaman utama project (klik ikon rumah/Project Overview), klik ikon **`</>`** (Web)
2. Kasih nama app (bebas), **jangan** centang Firebase Hosting, klik Register app
3. Firebase bakal nampilin kode `firebaseConfig = {...}` — **copy semua isinya**
4. Buka file **`firebase-config.js`** di project ini, ganti isi `window.firebaseConfig = {...}` dengan yang barusan di-copy

Selesai — setelah langkah ini, semua halaman otomatis nyambung ke Firebase kalian sendiri.

### Pemakaian sehari-hari (buat Ibu PKK — TANPA buka kode sama sekali)

1. Buka website → klik **Admin** di navbar
2. Login pakai email &amp; password yang udah dibikinin di langkah setup (poin 2)
3. Masuk ke **Dasbor Admin** — ada sidebar menu di kiri: **Kelola Galeri**, **Kelola Materi**, **Pantau Pendataan**
4. Klik **Kelola Galeri**: pilih foto dari HP/laptop, isi judul/tanggal/kategori, klik Upload
5. Klik **Kelola Materi**: pilih file PDF/PPT/Word, isi judul & Pokja, klik Upload
6. Klik **Pantau Pendataan** buat buka rekap data Google Sheets tiap Pokja
7. **Salah upload atau mau hapus?** Di halaman Kelola Galeri/Materi, ada daftar "Tersimpan" di sebelah kanan — klik ikon tempat sampah di item yang mau dihapus

### Kalau Firebase belum di-setup
Website tetap jalan normal pakai **data contoh** (demo) — jadi gak akan pernah tampil kosong/rusak, cuma isinya data dummy sampai Firebase disambungkan.

### Biaya & batas pemakaian
Firebase paket gratis (**Spark Plan**) cukup buat kebutuhan website 1 kalurahan — batasnya jauh di atas kebutuhan normal (ribuan-puluhan ribu akses per hari). Gak ada tagihan mendadak selama tetap di paket gratis ini.

## Catatan desain
Situs ini formal/korporat (Charcoal Blue, Amber Earth, Wisteria Blue, Beige — bisa diganti lagi kalau mau) — kecuali kuis skrining di `pokja-4.html` yang sengaja dikasih aksen warna-warni (teal/coral/pink/amber) dan animasi ringan saat hasil muncul, biar terasa lebih ramah dan gampang dipakai masyarakat umum.

Header di 5 halaman (Beranda + Pokja I-IV) transparan di atas foto/warna hero, makin solid pas discroll. Di 6 halaman lainnya header selalu efek kaca (glass) sejak awal karena tidak ada hero berwarna di baliknya.

## Catatan keamanan
Kode akses di `admin.html` adalah proteksi ringan di sisi tampilan (front-end), bukan sistem login server. Untuk data sensitif, andalkan setting sharing Google Sheets sebagai lapisan keamanan utama.

