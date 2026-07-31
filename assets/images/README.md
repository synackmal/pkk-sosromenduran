# Folder foto

Taruh file foto di sini dengan nama PERSIS seperti berikut, biar otomatis kepakai di website:

| Nama file | Dipakai di halaman | Keterangan |
|---|---|---|
| `logo.png` | Semua halaman (navbar) | Logo PKK, disarankan persegi/transparan PNG |
| `hero.jpg` | index.html | Foto besar di Beranda (background hero) |
| `ketua.jpg` | index.html, profil.html | Foto Ketua PKK |
| `pokja3-kebun.jpg` | bidang.html | Foto kebun/HATINYA PKK di kartu Pokja III |

## Folder `galeri/`
Taruh foto dokumentasi kegiatan di sini, nama bebas (misal `posyandu-1.jpg`, `pelatihan-2.jpg`).
Setelah upload, buka `galeri.html`, cari bagian `const items = [...]` di paling bawah file,
lalu tambahkan `img: 'assets/images/galeri/nama-file.jpg'` ke tiap item yang sesuai
(lihat komentar contoh di file itu).

## Ukuran yang disarankan
- Logo: 200x200px, PNG transparan
- Hero: minimal 1600x900px (landscape)
- Foto lain: minimal 800x800px, format JPG (biar ringan)
