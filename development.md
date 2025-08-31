# Dokumentasi Pengembangan Proyek

Dokumen ini menjelaskan semua tahapan pengembangan proyek Vue Vite dengan shadcn-vue UI components yang telah dilakukan sejauh ini.

## 1. Setup Awal Proyek

### 1.1. Inisialisasi Proyek
- Membuat aplikasi Vue menggunakan Vite dengan TypeScript
- Menggunakan konfigurasi:
  - Vue 3
  - TypeScript
  - Vue Router
  - ESLint
  - Prettier

### 1.2. Instalasi Dependensi
- Menginstal Tailwind CSS v3 (bukan v4 karena masalah kompatibilitas dengan shadcn-vue)
- Menginstal shadcn-vue sebagai library komponen UI
- Menginstal lucide-vue-next untuk ikon
- Menginstal vue3-apexcharts untuk visualisasi data

## 2. Konfigurasi Styling

### 2.1. Konfigurasi Tailwind CSS
- Mengatur file `tailwind.config.js` dan `postcss.config.js`
- Mengimplementasikan custom theme untuk light/dark mode
- Menambahkan Google Font Lato sebagai font default

### 2.2. Konfigurasi CSS
- Menambahkan custom CSS variables untuk tema
- Mengimplementasikan utility classes untuk komponen shadcn-vue
- Menambahkan konfigurasi warna untuk light dan dark mode

## 3. Layout Admin

### 3.1. Struktur Layout
- Membuat layout admin dengan sidebar navigasi
- Mengimplementasikan responsive design untuk mobile dan desktop
- Menambahkan toggle dark/light mode dengan persistensi menggunakan localStorage

### 3.2. Navigasi
- Dashboard (default page)
- Projects
- Tasks
- Settings
- Profile
- Dropdown menu Admin (Users, Roles, Permissions)

### 3.3. Header
- Toggle dark/light mode
- Informasi pengguna dengan akses ke halaman profile
- Tombol logout

## 4. Halaman-halaman

### 4.1. Dashboard
- Mengimplementasikan chart menggunakan ApexCharts
- Menampilkan statistik dalam bentuk card
- Menampilkan tabel data

### 4.2. Users
- Menampilkan data pengguna dalam bentuk tabel
- Implementasi CRUD (Create, Read, Update, Delete)
- Menggunakan modal untuk form tambah/edit
- Menggunakan dropdown menu untuk aksi

### 4.3. Projects
- Menampilkan data proyek dalam bentuk card grid
- Maksimal 4 card per baris
- Menggunakan modal untuk form tambah/edit
- Mengimplementasikan konfirmasi hapus

### 4.4. Tasks
- Menampilkan data task dalam bentuk card grid
- Setiap task memiliki project_id dan user_id
- Menggunakan modal untuk form tambah/edit
- Mengimplementasikan konfirmasi hapus

### 4.5. Settings
- Form untuk mengatur informasi kantor
- Field: logo, nama, alamat, telepon, email, dan kepala petugas
- Preview section untuk menampilkan informasi kantor
- Integrasi dengan komponen shadcn-vue

### 4.6. Roles
- Menampilkan data role dalam bentuk tabel
- Implementasi CRUD
- Menggunakan modal untuk form tambah/edit
- Mengimplementasikan konfirmasi hapus

### 4.7. Permissions
- Menampilkan data permission dalam bentuk tabel
- Implementasi CRUD
- Menggunakan modal untuk form tambah/edit
- Mengimplementasikan konfirmasi hapus

## 5. Komponen UI

### 5.1. Komponen shadcn-vue
- Table
- Card
- Dialog/Modal
- Button
- Input
- Select
- Dropdown Menu
- Alert Dialog

### 5.2. Penanganan Masalah Komponen
- Memperbaiki masalah import komponen
- Mengatasi masalah styling dengan konfigurasi CSS yang tepat
- Memperbaiki masalah tipe data pada komponen alert dialog

## 6. Routing

### 6.1. Konfigurasi Route
- Implementasi nested routes untuk admin layout
- Redirect `/admin` ke `/admin/dashboard`
- Route untuk semua halaman admin

### 6.2. Penanganan Active Class
- Memperbaiki masalah active class pada navigasi
- Menggunakan `exact-active-class` untuk penanganan yang tepat

## 7. Fitur-fitur

### 7.1. Theme Toggle
- Implementasi dark/light mode
- Deteksi preferensi sistem pengguna
- Persistensi tema menggunakan localStorage

### 7.2. Responsive Design
- Layout yang responsif untuk mobile dan desktop
- Penanganan overflow tabel pada perangkat mobile
- Grid layout yang responsif untuk card

## 8. Penanganan Masalah

### 8.1. Masalah Tabel Mobile
- Mengidentifikasi dan memperbaiki masalah overflow horizontal pada tabel
- Mengimplementasikan solusi dengan `overflow-x-auto` pada container tabel
- Memastikan kompatibilitas dengan komponen shadcn-vue Table

### 8.2. Masalah Import
- Memperbaiki masalah import komponen shadcn-vue
- Menggunakan syntax import yang benar

### 8.3. Masalah Styling
- Mengatasi masalah styling komponen
- Menambahkan utility classes yang diperlukan

## 9. Pengujian

### 9.1. Pengujian Cross-browser
- Menguji aplikasi di berbagai browser
- Memastikan konsistensi tampilan dan fungsi

### 9.2. Pengujian Responsif
- Menguji layout pada berbagai ukuran layar
- Memastikan fungsi overflow tabel bekerja dengan benar

## 10. Struktur Proyek

```
src/
├── assets/
│   └── main.css
├── components/
│   └── ui/ (komponen shadcn-vue)
├── layouts/
│   └── AdminLayout.vue
├── lib/
│   └── utils.ts
├── router/
│   └── index.ts
├── views/
│   ├── DemoPage.vue
│   └── admin/
│       ├── DashboardPage.vue
│       ├── UsersPage.vue
│       ├── ProjectsPage.vue
│       ├── TasksPage.vue
│       ├── SettingsPage.vue
│       ├── ProfilePage.vue
│       ├── RolesPage.vue
│       ├── PermissionsPage.vue
│       └── TestTablePage.vue
├── App.vue
└── main.ts
```

## 11. Perintah Development

- `npm run dev` - Menjalankan development server
- `npm run build` - Membuat build produksi
- `npm run preview` - Menjalankan preview build produksi

## 12. Dependensi Utama

- vue: ^3.4.21
- vue-router: ^4.3.0
- @vitejs/plugin-vue: ^5.0.4
- tailwindcss: ^3.4.1
- shadcn-vue: Komponen UI
- lucide-vue-next: Ikon
- vue3-apexcharts: Visualisasi data

## 13. Catatan Penting

1. Proyek menggunakan Tailwind CSS v3 karena masalah kompatibilitas dengan shadcn-vue jika menggunakan v4
2. Komponen shadcn-vue memerlukan konfigurasi CSS khusus untuk bekerja dengan benar
3. Penanganan overflow tabel pada mobile memerlukan pendekatan khusus karena implementasi komponen shadcn-vue Table
4. Theme toggle menggunakan localStorage untuk persistensi preferensi pengguna