# Rangkuman Frontend Sistem CEK-B3

## 1. Gambaran Umum Frontend

Frontend pada sistem CEK-B3 dibangun sebagai antarmuka web interaktif untuk *Sistem Identifikasi Limbah B3 Rumah Tangga* berbasis AI. Aplikasi ini dirancang modern, cepat, dan berfokus pada pengalaman pengguna (UX) untuk memudahkan masyarakat mengenali jenis limbah rumah tangga. Frontend ini berkomunikasi dengan layanan *backend* (model MobileViT-XS) untuk mendapatkan hasil klasifikasi dan visualisasi Grad-CAM.

Frontend dikembangkan menggunakan teknologi *modern stack*, yaitu:
* **Framework:** Next.js (App Router) & React 19
* **Styling:** Tailwind CSS (Vanilla CSS & CSS Variables)
* **Animasi:** Framer Motion (Transitions, Layout Animations)
* **Ikonografi:** Lucide React

## 2. Struktur Folder Utama

Struktur utama pada direktori `frontend` adalah sebagai berikut:

```text
frontend/
├── public/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── classify/
│   │   │   ├── camera-input.tsx
│   │   │   ├── classify-experience.tsx
│   │   │   ├── dataset-input.tsx
│   │   │   ├── prediction-history.tsx
│   │   │   └── prediction-result.tsx
│   │   ├── ui/
│   │   ├── category-carousel.tsx
│   │   ├── gradcam-demo.tsx
│   │   ├── impact-metrics.tsx
│   │   └── site-header.tsx
│   └── lib/
│       ├── api.ts
│       ├── history.ts
│       ├── image-quality.ts
│       ├── waste-data.ts
│       └── utils.ts
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

Setiap direktori memiliki peran yang jelas:
* **`app/`**: Berisi *routing* halaman aplikasi (seperti halaman beranda di `page.tsx`).
* **`components/`**: Berisi komponen-komponen antarmuka yang dapat digunakan kembali, termasuk folder khusus untuk fitur klasifikasi (`classify/`).
* **`lib/`**: Menyimpan fungsi utilitas, integrasi API, pengolahan riwayat penyimpanan, data statis edukasi, dan validasi kualitas gambar.

## 3. Fitur Utama Frontend

Frontend CEK-B3 dilengkapi dengan berbagai fitur interaktif untuk memaksimalkan performa dan fungsionalitas sistem:

1. **Multi-Input Gambar**
   Pengguna dapat memasukkan gambar melalui tiga cara: mengunggah file (termasuk fitur *drag & drop*), menggunakan kamera secara langsung (*webcam/smartphone*), atau memilih dari gambar *dataset* yang sudah disediakan.
2. **Pengecekan Kualitas Gambar (Pre-flight)**
   Sistem mengecek kualitas gambar di sisi *client* (menggunakan HTML5 Canvas) sebelum dikirim ke backend. Jika gambar terlalu buram (*blur*), terlalu gelap, atau *overexposed*, sistem akan memunculkan peringatan untuk memastikan hasil yang akurat.
3. **Visualisasi Grad-CAM**
   Sistem menampilkan gambar asli berdampingan dengan gambar *heatmap* (Grad-CAM) untuk menunjukkan transparansi pengambilan keputusan oleh model AI.
4. **Mode Edukasi dan Mode Teknis**
   Terdapat *toggle* (sakelar) yang memungkinkan pengguna mengubah tampilan hasil prediksi dari rincian teknis (regulasi, probabilitas *top-k*) ke informasi edukasi (dampak lingkungan dan kesehatan dari jenis limbah tersebut).
5. **Riwayat Klasifikasi Otomatis**
   Sistem menyimpan beberapa hasil klasifikasi terakhir (lengkap dengan *thumbnail*) secara lokal menggunakan `localStorage`, sehingga tidak membebani database dan pengguna dapat melihat kembali riwayat pemeriksaannya dengan mudah.
6. **Sistem Feedback**
   Pengguna dapat memberikan respons (benar/salah) beserta komentar terhadap hasil prediksi. Data ini kemudian dikirim kembali ke *backend* untuk membantu evaluasi riset dan model ke depannya.

## 4. Alur Kerja Aplikasi (User Flow)

1. **Akses Halaman**: Pengguna mengakses halaman beranda yang menampilkan pengenalan sistem, alur pemakaian, serta demo Grad-CAM.
2. **Memilih Gambar**: Pada menu antarmuka klasifikasi, pengguna memilih gambar (maksimal 10 MB dan dimensi minimal 100x100px).
3. **Validasi Klien**: `classify-experience.tsx` akan memvalidasi ukuran, format, dan kualitas visual gambar.
4. **Proses Inferensi**: Frontend memanggil fungsi `predictImage` (pada `api.ts`), mengirim data ke server *backend*, dan menampilkan status *loading* beranimasi (via Framer Motion).
5. **Menampilkan Hasil**: Komponen `prediction-result.tsx` memproses respons dari API. Jika input ditolak (contoh: di luar distribusi atau bukan B3), akan muncul alasan penolakan. Jika diterima, akan muncul informasi lengkap meliputi label kelas, tingkat bahaya, probabilitas, dan visualisasi Grad-CAM.
6. **Aksi Lanjutan**: Pengguna dapat membaca edukasi penanganan dan mengisi *form feedback* yang otomatis muncul di bawah hasil.

## 5. Detail Komponen Utama

### `src/app/page.tsx`
Ini adalah halaman *landing page* yang didesain secara modern. Halaman ini menggunakan *Hero section* berukuran besar, menampilkan *Impact Metrics*, animasi tahapan-tahapan pemakaian, serta bagian khusus yang mengedukasi masyarakat terkait alasan dan risiko mengapa membuang limbah B3 sembarangan berbahaya.

### `src/components/classify/classify-experience.tsx`
Komponen ini merupakan "otak" dari antarmuka klasifikasi di *frontend*. Komponen ini mengelola *state* input (file gambar, tangkapan kamera, pemilihan dataset), memanggil validasi kualitas `checkImageQuality`, mengirim data secara asinkron (*multipart/form-data*) ke endpoint `/predict`, menyimpan *thumbnail* dan riwayat ke `localStorage`, serta mengatur notifikasi (*toast*) sistem.

### `src/components/classify/prediction-result.tsx`
Merupakan komponen visual untuk menampilkan output model. Ketika hasil prediksi dikembalikan oleh backend, komponen ini akan merender:
* Animasi indikator batang probabilitas (*Confidence bar*).
* Informasi Regulasi dan Rekomendasi (berdasarkan parameter *response* API atau modul internal `waste-data.ts`).
* Tampilan *Top 3* probabilitas kelas prediksi tertinggi.
* *Toggle switch* antara tampilan layar teknis dan tampilan edukasi limbah B3.
* Komparasi visual bersebelahan antara gambar asli dengan gambar *heatmap* Grad-CAM format *base64*.

### `src/lib/api.ts` & `src/lib/history.ts`
* `api.ts`: Mengelola pemanggilan *fetch* HTTP ke layanan backend secara asinkronus, dengan membaca variabel lingkungan `NEXT_PUBLIC_API_BASE_URL` dan melampirkan *header* otorisasi (API Key) secara dinamis.
* `history.ts`: Memanfaatkan fitur `HTML Canvas` untuk merender ulang gambar besar ke bentuk *thumbnail* secara proporsional. Hasil thumbnail lalu disimpan bersama label ke dalam *browser local storage*.

## 6. Konfigurasi dan Deployment

Sama seperti backend, frontend CEK-B3 mengandalkan variabel lingkungan untuk menyesuaikan alamat pengujian. Konfigurasi yang harus diisi pada file `.env` antara lain:
* `NEXT_PUBLIC_API_BASE_URL`: Berfungsi menentukan ke alamat IP atau URL mana permintaan API disalurkan (contohnya diisi dengan URL Hugging Face Space).
* `NEXT_PUBLIC_API_KEY`: Digunakan jika endpoint backend ditutup atau dibatasi untuk umum.

Karena aplikasi ini dikembangkan menggunakan *App Router* Next.js, *source code* ini mudah dilakukan proses *build* dan *deployment* pada berbagai penyedia layanan *hosting* awan modern (Vercel, Netlify) atau dikonfigurasi pada container mandiri secara optimal.

## 7. Kesimpulan Frontend

Sistem *frontend* CEK-B3 berhasil dibangun tidak hanya sebagai sebuah klien API standar, tetapi dikembangkan sebagai peramban modern interaktif berskala cerdas (*smart client*). Adanya fitur prapemrosesan mandiri dalam validasi peringatan kualitas gambar, sistem rekam penyimpanan lokal, antarmuka pergantian mode fitur adaptif, hingga manipulasi tampilan transisi, menjadikannya responsif. Penggunaan framer-motion dan *utility classes* (Tailwind CSS) menjadikan tampilan UI dan *user experience* terasa mutakhir, yang diyakini secara signifikan akan memudahkan masyarakat awam dalam menggunakan teknologi AI secara praktis guna keperluan pelestarian penanganan limbah berbahaya.
