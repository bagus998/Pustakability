const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'src', 'locales');
const idPath = path.join(localesPath, 'id.json');
const enPath = path.join(localesPath, 'en.json');

const idData = JSON.parse(fs.readFileSync(idPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

const statsId = {
  "title": "Dirancang untuk Semua Cara Membaca",
  "desc": "Pustakability memfasilitasi berbagai format bacaan untuk memastikan mahasiswa disabilitas netra dan low vision dapat mengakses materi kuliah tanpa hambatan.",
  "stat1_label": "Koleksi Buku",
  "stat1_sub": "& jurnal digital",
  "stat2_label": "Format Aksesibel",
  "stat2_sub": "Audio, Braille, DAISY, dll.",
  "stat3_label": "Pengguna Aktif",
  "stat3_sub": "Mahasiswa UB",
  "stat4_label": "Kategori",
  "stat4_sub": "Lintas disiplin ilmu"
};

const statsEn = {
  "title": "Designed for Every Way to Read",
  "desc": "Pustakability provides various reading formats to ensure blind and low-vision students can access course materials without barriers.",
  "stat1_label": "Book Collections",
  "stat1_sub": "& digital journals",
  "stat2_label": "Accessible Formats",
  "stat2_sub": "Audio, Braille, DAISY, etc.",
  "stat3_label": "Active Users",
  "stat3_sub": "UB Students",
  "stat4_label": "Categories",
  "stat4_sub": "Cross-disciplinary"
};

const catalogId = {
  "title": "Temukan Buku yang Anda Butuhkan",
  "badge": "Koleksi Pilihan",
  "btn_explore": "Lihat Semua Koleksi",
  "btn_read": "Baca Sekarang",
  "btn_preview": "Preview",
  "cover_alt": "Sampul buku",
  "login_prompt": "Perlu login untuk membaca penuh"
};

const catalogEn = {
  "title": "Find the Books You Need",
  "badge": "Curated Collections",
  "btn_explore": "View All Collections",
  "btn_read": "Read Now",
  "btn_preview": "Preview",
  "cover_alt": "Book cover",
  "login_prompt": "Login required for full access"
};

idData.stats = statsId;
enData.stats = statsEn;

idData.catalog = catalogId;
enData.catalog = catalogEn;

fs.writeFileSync(idPath, JSON.stringify(idData, null, 2));
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log('Locales updated!');
