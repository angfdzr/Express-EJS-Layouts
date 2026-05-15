# NodeJS Clean Layouting

Selamat datang di proyek *NodeJS Clean Layouting* — aplikasi Express + EJS dengan dua mood:

- Mode Client: cakep, ringan, cocok buat pengunjung.
- Mode Admin: penuh fitur, agak serius, tapi tetap cakep.

Di README ini saya jelasin cara jalanin, struktur, dan sedikit lawakan supaya tidak bosen.

**Deskripsi Singkat**

Ini project template yang memisahkan layout client dan admin menggunakan `express-ejs-layouts`, session-based auth, middleware role, dan sidebar/navbar dinamis. Cocok buat yang pengin cepat bikin website dengan admin panel tanpa harus pusing mulai dari nol.

**Fitur Utama**

- Auth: register/login/logout (session-based).
- Role: `admin` vs client (dibedakan untuk layout dan akses).
- Layouts: `views/layouts/client/main.ejs` & `views/layouts/admin/main.ejs`.
- Dynamic menu: `models/Sidebar.js` menghasilkan menu untuk header/sidebar.
- Middleware proteksi: `requireAdmin.js`, `preventAuth.js` (dan opsi redirect admin dari client pages).

**Persyaratan**

- Node.js (v14+ direkomendasikan)
- npm
- Database: sesuai konfigurasi di `config/db.js` (jika ada). Jika belum, buat dummy atau sesuaikan model `Auth`.

**Instalasi & Menjalankan**

1. Clone repo (atau pastikan sedang di folder project):

```bash
git clone <repo-url>
cd NodeJS\ Clean\ Layouting
```

2. Install dependencies:

```bash
npm install
```

3. Buat file `.env` di root (jika perlu) dan isi variabel minimal:

```
SECRET_KEY=isi_rahasia_anda
PORT=3000
```

4. Jalankan server:

```bash
node app.js
# atau kalau ada script start
npm start
```

5. Buka browser: http://localhost:3000

Jika Anda lihat halaman putih, ingat pesan bijak: cek layout (pastikan ada `<%- body %>` di setiap `main.ejs`) dan perhatikan `res.locals.layout`.

**Struktur Penting**

- `app.js` — entry, session, express-ejs-layouts, middleware global.
- `routes/` — routing (Index, Auth, Dashboard).
- `controllers/` — logika render + API.
- `middlewares/` — `requireAdmin.js`, `preventAuth.js`, dll.
- `models/Sidebar.js` — sumber menu dinamis.
- `views/layouts/*` — layout admin & client + partials.
- `views/layouts/client/*` — halaman client (body-only views).
- `public/` — assets static (css/js/images).

**Catatan Penting (Jangan Lupa!)**

- Jika Anda pakai `fetch` + `FormData` di client, server harus pake `multer` untuk multipart; lebih gampang: kirim JSON.
- Default registrasi di controller saat ini menetapkan `role = 'admin'` — ini berbahaya jika situs publik. Ubah jadi `user`/`client` kalau perlu.
- Untuk mencegah admin melihat halaman client, gunakan middleware route-level `redirectAdminFromClient` atau lakukan redirect di controller `IndexController`.

**Contoh Shortcuts**

- Proteksi route admin di routes: `router.get('/dashboard', requireAdmin, DashboardController.index);`
- Render tanpa layout (halaman auth): `res.render('login', { layout: false });`

**Debugging Cepat**

- Halaman kosong: periksa `views/layouts/admin/main.ejs` apakah sudah menyertakan `<%- body %>`.
- `body is not defined`: artinya layout memanggil `body` tapi engine EJS tidak menyisipkan child view — cek nama layout dan path file.
- `req.body` kosong saat fetch: pastikan `Content-Type: application/json` saat kirim JSON, atau gunakan middleware yang tepat.

**Mau kontribusi?**

- Benerin bug dan tambahkan fitur — tapi jangan kirim password.

**Lisensi**

Kalau ini untuk belajar, silakan dipakai. Kalau untuk produksi, jangan lupa baca lisensi asset pihak ketiga (AdminLTE, template client, dsb.).

---