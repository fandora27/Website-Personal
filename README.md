# Sistem Prediksi Kondisi Kelahiran Bayi

Sistem informasi berbasis web untuk memprediksi kondisi kelahiran bayi (normal atau berisiko) menggunakan algoritma Naïve Bayes berdasarkan penelitian "Sistem Prediksi Kondisi Kelahiran Bayi Menggunakan Klasifikasi Naïve Bayes" oleh Handini Arga Damar Rani dan Syaifuddin Zuhri, Universitas IVET.

## 🎯 Fitur Utama

### 1. **Dashboard Utama**
- Ringkasan statistik prediksi
- Grafik akurasi model (92.73%)
- Monitoring hasil prediksi bulanan
- Visualisasi performa algoritma

### 2. **Input Data**
- **Manual Input**: Form input data ibu hamil
- **Batch Input**: Upload file Excel/CSV untuk prediksi massal
- Template download untuk format data yang benar

### 3. **Algoritma Naïve Bayes**
- Implementasi sesuai dengan jurnal penelitian
- Akurasi: 92.73%
- Precision: 83.33%
- Recall: 100%
- AUC: 0.991 (Excellent Classification)

### 4. **Manajemen Data**
- 165 total data (110 training + 55 testing)
- Data training dan testing terpisah
- Validasi menggunakan 10-fold cross validation

### 5. **Laporan & Export**
- Export hasil ke PDF dan Excel
- Laporan prediksi dengan detail probabilitas
- Riwayat prediksi dengan timestamp

### 6. **User Management**
- Login Admin dan User
- Role-based access control
- Session management

## 📊 Parameter Input

Sistem menggunakan 5 parameter utama sesuai jurnal:

1. **Nama Ibu Hamil** - Identitas pasien
2. **Usia Ibu** - Rentang 15-50 tahun
3. **Tekanan Darah** - Rendah / Normal / Tinggi
4. **Tinggi Fundus Uterus (TFU)** - Sesuai / Tidak Sesuai
5. **Letak Janin** - Sesuai / Tidak Sesuai

## 🔬 Algoritma Naïve Bayes

### Perhitungan Probabilitas

\`\`\`
P(Normal) = 97/165 = 0.588
P(Berisiko) = 68/165 = 0.412

Likelihood untuk kondisi Normal:
- P(letak_janin=sesuai|Normal) = 1.0
- P(TFU=sesuai|Normal) = 1.0  
- P(tekanan_darah=normal|Normal) = 1.0

Likelihood untuk kondisi Berisiko:
- P(letak_janin=tidak_sesuai|Berisiko) = 0.5
- P(TFU=tidak_sesuai|Berisiko) = 0.441
- P(tekanan_darah=rendah|Berisiko) = 0.25
- P(tekanan_darah=tinggi|Berisiko) = 0.044
\`\`\`

### Hasil Klasifikasi

- **Normal**: Kelahiran tanpa komplikasi
- **Berisiko**: Memerlukan perhatian medis khusus

## 🚀 Instalasi & Penggunaan

### Persyaratan Sistem
- Node.js 18+ 
- NPM atau Yarn
- Browser modern (Chrome, Firefox, Safari, Edge)

### Langkah Instalasi

1. **Clone atau Download Project**
   \`\`\`bash
   # Jika menggunakan Git
   git clone [repository-url]
   cd baby-birth-prediction-system
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   # atau
   yarn install
   \`\`\`

3. **Setup Database**
   \`\`\`bash
   # Database SQLite akan otomatis dibuat
   # Script SQL tersedia di /scripts/database-schema.sql
   \`\`\`

4. **Jalankan Aplikasi**
   \`\`\`bash
   npm run dev
   # atau
   yarn dev
   \`\`\`

5. **Akses Aplikasi**
   - Buka browser: \`http://localhost:3000\`
   - Login dengan akun demo:
     - **Admin**: username: \`admin\`, password: \`admin123\`
     - **User**: username: \`user\`, password: \`user123\`

## 📱 Panduan Penggunaan

### 1. **Login**
- Masukkan username dan password
- Pilih role (Admin/User)

### 2. **Prediksi Manual**
- Pilih tab "Prediksi"
- Isi form data ibu hamil
- Klik "Prediksi Kondisi Kelahiran"
- Lihat hasil prediksi dengan probabilitas

### 3. **Prediksi Batch**
- Pilih tab "Input Batch"
- Download template CSV
- Upload file dengan data multiple
- Proses dan lihat hasil batch

### 4. **Melihat Laporan**
- Pilih tab "Laporan"
- Export ke PDF atau Excel
- Analisis hasil prediksi

### 5. **Training Model**
- Pilih tab "Training"
- Lihat metrik model (Accuracy, Precision, Recall, AUC)
- Confusion Matrix

## 📋 Format Data Batch

Template CSV untuk input batch:

\`\`\`csv
nama_ibu,usia,tekanan_darah,tfu,letak_janin
Ibu Contoh,25,normal,sesuai,sesuai
Ibu Contoh 2,35,tinggi,tidak_sesuai,tidak_sesuai
\`\`\`

**Nilai yang Valid:**
- \`tekanan_darah\`: rendah, normal, tinggi
- \`tfu\`: sesuai, tidak_sesuai  
- \`letak_janin\`: sesuai, tidak_sesuai

## 🔧 Teknologi yang Digunakan

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: SQLite (untuk kemudahan deployment)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Styling**: TailwindCSS

## 📊 Hasil Validasi Model

Berdasarkan jurnal penelitian:

| Metrik | Nilai |
|--------|-------|
| Accuracy | 92.73% |
| Precision | 83.33% |
| Recall | 100% |
| AUC | 0.991 |
| Classification | Excellent |

### Confusion Matrix
\`\`\`
                Prediksi
Aktual    Normal  Berisiko
Normal      31       0
Berisiko     4      20
\`\`\`

##
\`\`\`
                Prediksi
Aktual    Normal  Berisiko
Normal      31       0
Berisiko     4      20
\`\`\`

## 🛠️ Deployment

### Deployment Lokal
\`\`\`bash
# Build untuk production
npm run build

# Start production server
npm start
\`\`\`

### Deployment Online
Aplikasi dapat di-deploy ke:
- **Vercel** (Recommended untuk Next.js)
- **Netlify**
- **Railway**
- **Heroku**

## 📁 Struktur Project

\`\`\`
baby-birth-prediction-system/
├── app/
│   ├── page.tsx                 # Halaman utama
│   ├── api/
│   │   ├── predict/route.ts     # API prediksi tunggal
│   │   └── batch-predict/route.ts # API prediksi batch
│   └── globals.css
├── components/
│   └── ui/                      # shadcn/ui components
├── scripts/
│   └── database-schema.sql      # Schema database
├── README.md
└── package.json
\`\`\`

## 🔍 Troubleshooting

### Masalah Umum

1. **Error saat install dependencies**
   \`\`\`bash
   # Hapus node_modules dan install ulang
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

2. **Port 3000 sudah digunakan**
   \`\`\`bash
   # Gunakan port lain
   npm run dev -- -p 3001
   \`\`\`

3. **Database tidak terbaca**
   - Pastikan file database-schema.sql sudah dijalankan
   - Check permission folder untuk SQLite

4. **Upload file tidak berfungsi**
   - Pastikan format file CSV sesuai template
   - Check ukuran file (max 10MB)

## 📚 Referensi

1. **Jurnal Penelitian**: "Sistem Prediksi Kondisi Kelahiran Bayi Menggunakan Klasifikasi Naïve Bayes" - Handini Arga Damar Rani, Syaifuddin Zuhri, Universitas IVET

2. **Algoritma Naïve Bayes**: Implementasi berdasarkan perhitungan manual dalam jurnal

3. **Validasi Model**: 10-fold cross validation dengan hasil akurasi 92.73%

## 🤝 Kontribusi

Untuk pengembangan lebih lanjut:

1. Fork repository
2. Buat branch fitur baru
3. Commit perubahan
4. Push ke branch
5. Buat Pull Request

## 📞 Support

Jika mengalami masalah atau butuh bantuan:

1. Check dokumentasi di README
2. Lihat troubleshooting guide
3. Buat issue di repository
4. Kontak developer

## 📄 Lisensi

Project ini dibuat untuk keperluan akademik dan penelitian berdasarkan jurnal yang telah dipublikasikan. Penggunaan untuk tujuan komersial memerlukan izin dari penulis asli.

---

**Catatan Penting**: Sistem ini dibuat untuk keperluan penelitian dan pembelajaran. Untuk penggunaan medis yang sesungguhnya, diperlukan validasi lebih lanjut oleh tenaga medis profesional dan uji klinis yang komprehensif.
