# SmartDuck 🦆 - Smart Farming Management System

**SmartDuck** adalah sebuah Sistem Informasi Manajemen Peternakan Bebek Berbasis Web (*Smart Farming Management System*). Aplikasi ini dirancang khusus untuk mendigitalisasi dan mengotomatisasi proses pemantauan (*monitoring*), pencatatan operasional, dan pelaporan di sebuah peternakan bebek berskala menengah hingga besar.

## 📖 Tentang Aplikasi Ini

Di industri peternakan konvensional, pencatatan populasi, manajemen pakan, hingga pemantauan suhu lingkungan seringkali dilakukan secara manual menggunakan buku catatan. Hal ini rentan terhadap *human error*, kehilangan data, serta memperlambat pemilik peternakan dalam mengambil keputusan strategis.

**SmartDuck hadir untuk menyelesaikan masalah tersebut dengan menyediakan:**
- **Pencatatan Terpusat (Digitalisasi):** Memudahkan pencatatan data kandang, populasi bebek, dan manajemen pakan secara terstruktur.
- **Monitoring Kondisi Lingkungan:** Menggunakan konsep IoT (Internet of Things) yang disimulasikan secara *real-time* untuk memantau suhu, kelembapan, dan kualitas udara. Memungkinkan deteksi dini jika kandang berada dalam kondisi berbahaya yang dapat membuat bebek stres.
- **Pengambilan Keputusan Berbasis Data (*Data-Driven*):** Menyajikan grafik produksi telur dan konsumsi pakan sehingga manajemen dapat melihat tren performa masing-masing kandang.
- **Sistem Pembagian Tugas (RBAC):** Membagi akses aplikasi secara aman sesuai peran penggunanya (Petugas Lapangan, Admin, dan Pemilik/Pimpinan).

## 🌟 Fitur Utama

- **🔐 Multi-Role Authentication**: Akses berbasis peran (Admin, Petugas Lapangan, Pimpinan) dengan hak akses yang berbeda.
- **📊 Dashboard Analytics**: Visualisasi grafik interaktif (Mingguan, Bulanan, Konsumsi Pakan, Performa Kandang) menggunakan pustaka `Recharts`.
- **👨‍💼 Executive Dashboard**: Tampilan khusus (*read-only*) untuk "Pimpinan" yang berfokus pada ringkasan operasional tingkat tinggi dan estimasi pendapatan.
- **📡 Realtime Monitoring**: Pemantauan simulasi sensor (Suhu, Kelembapan, Udara, Air) secara *realtime* dengan perbaruan otomatis setiap 3 detik.
- **🔔 Smart Notifications**: Sistem notifikasi peringatan cerdas berdasarkan indikator sensor.
- **🏠 Manajemen Kandang**: CRUD (Create, Read, Update, Delete) data kandang lengkap dengan dukungan unggah foto kandang (*Base64 preview*).
- **🌾 Manajemen Pakan**: Pencatatan alur distribusi pakan harian, jenis pakan (Konsentrat, Dedak, dll), dan kandang tujuan.
- **📱 Responsive & Dark Mode**: Desain modern dengan *Mobile-First approach* (mendukung perangkat HP/Tablet) serta fitur Mode Gelap yang ramah di mata.
- **🖨️ Cetak & Export Laporan**: Modul rekapitulasi data yang siap dicetak (*Print*) sebagai laporan fisik.

## 🛠️ Teknologi yang Digunakan

- **Frontend Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4
- **Routing**: React Router DOM v7
- **Charts / Data Visualization**: Recharts
- **Popups & Alerts**: SweetAlert2
- **Icons**: React Icons (Fa & Gi)
- **State Management**: React Context API & Custom Hooks
- **Storage**: LocalStorage (Dengan arsitektur Service Layer yang sudah disiapkan untuk integrasi Firebase Firestore)

## 🚀 Panduan Instalasi & Menjalankan Lokal

1. **Clone repository ini**
   ```bash
   git clone https://github.com/username/smartduck.git
   cd smartduck
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```

3. **Siapkan Environment Variables**
   Duplikat file `.env.example` menjadi `.env`. Ini berguna jika nantinya sistem disambungkan ke layanan API/Firebase secara utuh.
   ```bash
   cp .env.example .env
   ```

4. **Jalankan *Development Server***
   ```bash
   npm run dev
   ```

5. **Buka di Browser**
   Akses `http://localhost:5173`. 
   Anda dapat *login* menggunakan tombol **Akun Demo** yang tersedia di halaman Login untuk melihat perbedaan fitur antar akun.

## 📁 Struktur Direktori Utama
```text
src/
├── components/   # Komponen UI Reusable (Cards, Tables, Modals, Layout)
├── config/       # Konfigurasi Pihak Ketiga (Firebase)
├── contexts/     # State global (AuthContext, NotificationContext)
├── data/         # Konfigurasi Chart & Dummy Data Awal
├── hooks/        # Custom Hooks React (misal: useRealtimeMonitoring)
├── pages/        # Komponen Halaman (Dashboard, Kandang, Pakan, Laporan, dll)
├── services/     # Layer komunikasi API/Firebase
└── utils/        # Fungsi helper/utilitas
```

## 🌐 Catatan Deployment (Vercel / Netlify)

Proyek ini telah disesuaikan agar bisa langsung diunggah (*deploy*) ke *cloud hosting* modern.
- **Vercel**: File `vercel.json` telah disediakan agar *React Router* tidak mengalami pesan *Error 404* saat memuat ulang halaman (*Single Page Application fallback*).
- **Firebase**: Kerangka *Service Layer* sudah terbentuk di folder `src/services/` jika Anda memutuskan untuk mengaktifkan sinkronisasi database menggunakan Firestore.

---
*Dikembangkan dengan standar arsitektur industri untuk memajukan teknologi agrikultur Indonesia.*
