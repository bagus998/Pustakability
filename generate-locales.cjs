const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, 'src', 'locales');
const idPath = path.join(localesPath, 'id.json');
const enPath = path.join(localesPath, 'en.json');

const idData = JSON.parse(fs.readFileSync(idPath, 'utf8'));
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

idData.features = {
  "title": "Belajar Lebih Mudah dengan Pustakability",
  "name1": "Ahmad Fauzi",
  "role1": "Mahasiswa Sastra Inggris, Tuna Netra",
  "text1": "Pustakability sangat membantu saya dalam kuliah Sastra Inggris. Buku-bukunya sudah dikonversi ke format Audio dan Braille Digital sehingga saya bisa mengikuti materi layaknya mahasiswa awas tanpa perlu repot minta scan ulang.",
  "name2": "Siti Rahma",
  "role2": "Mahasiswa Psikologi, Low Vision",
  "text2": "Sebagai mahasiswa low vision, saya sering kesulitan baca PDF biasa karena fontnya kekecilan dan gambarnya tidak jelas. Di Pustakability, PDF-nya sudah dirapikan dan font OpenDyslexic-nya sangat membantu!",
  "name3": "Rizky Pratama",
  "role3": "Mahasiswa Hukum, Tuna Netra",
  "text3": "Fitur DAISY nya luar biasa. Kalau lagi butuh referensi untuk tugas, saya gampang banget buat lompat ke bab 3, lompat ke halaman 45, dsb. Navigasinya sempurna buat pengguna tunanetra."
};

enData.features = {
  "title": "Learn Easier with Pustakability",
  "name1": "Ahmad Fauzi",
  "role1": "English Literature Student, Blind",
  "text1": "Pustakability really helps me in my English Literature classes. The books have been converted to Audio and Digital Braille formats so I can follow the materials just like sighted students without needing to request rescans.",
  "name2": "Siti Rahma",
  "role2": "Psychology Student, Low Vision",
  "text2": "As a low-vision student, I often struggle to read regular PDFs because the fonts are too small and the images are unclear. In Pustakability, the PDFs are well-structured and the OpenDyslexic font is very helpful!",
  "name3": "Rizky Pratama",
  "role3": "Law Student, Blind",
  "text3": "The DAISY feature is amazing. When I need references for assignments, it's very easy to jump to chapter 3, jump to page 45, etc. The navigation is perfect for blind users."
};

idData.howToAccess = {
  "title": "Empat Langkah Mudah",
  "desc": "Kami berkomitmen memastikan bahwa mahasiswa dengan disabilitas cetak di Universitas Brawijaya dapat mengakses materi kuliah dengan mudah dan tanpa hambatan.",
  "step1_title": "Daftar Akun PLD",
  "step1_desc": "Pastikan Anda terdaftar sebagai mahasiswa dampingan PLD UB. Pendaftaran bisa dilakukan via SSO UB atau menghubungi konselor kami.",
  "step2_title": "Verifikasi Status",
  "step2_desc": "Admin PLD akan memverifikasi status kemahasiswaan dan jenis disabilitas Anda untuk memberikan akses yang sesuai.",
  "step3_title": "Pilih Format",
  "step3_desc": "Cari buku yang Anda butuhkan dan pilih format yang paling sesuai dengan kebutuhan aksesibilitas Anda (Audio, DAISY, Braille, dll).",
  "step4_title": "Mulai Membaca",
  "step4_desc": "Baca buku langsung dari browser atau unduh file-nya untuk dibaca secara offline di perangkat Anda."
};

enData.howToAccess = {
  "title": "Four Easy Steps",
  "desc": "We are committed to ensuring that students with print disabilities at Universitas Brawijaya can access course materials easily and without barriers.",
  "step1_title": "Register for a PLD Account",
  "step1_desc": "Ensure you are registered as a PLD UB assisted student. Registration can be done via UB SSO or by contacting our counselors.",
  "step2_title": "Verify Status",
  "step2_desc": "PLD Admins will verify your student status and disability type to provide appropriate access.",
  "step3_title": "Choose Format",
  "step3_desc": "Search for the books you need and select the format that best suits your accessibility needs (Audio, DAISY, Braille, etc.).",
  "step4_title": "Start Reading",
  "step4_desc": "Read books directly from your browser or download the files to read offline on your device."
};

idData.footer = {
  "desc": "Pustaka digital aksesibel untuk mahasiswa penyandang disabilitas cetak di Universitas Brawijaya.",
  "nav_title": "Navigasi",
  "nav_home": "Beranda",
  "nav_catalog": "Koleksi Buku",
  "format_title": "Format Tersedia",
  "contact_title": "Kontak PLD UB",
  "contact_web": "Website PLD UB",
  "copyright": "© 2024 Pustakability — Pusat Layanan Disabilitas, Universitas Brawijaya.",
  "privacy": "Kebijakan Privasi",
  "terms": "Syarat Penggunaan"
};

enData.footer = {
  "desc": "Accessible digital library for print disabled students at Universitas Brawijaya.",
  "nav_title": "Navigation",
  "nav_home": "Home",
  "nav_catalog": "Book Catalog",
  "format_title": "Available Formats",
  "contact_title": "PLD UB Contact",
  "contact_web": "PLD UB Website",
  "copyright": "© 2024 Pustakability — Disability Services Center, Universitas Brawijaya.",
  "privacy": "Privacy Policy",
  "terms": "Terms of Use"
};

fs.writeFileSync(idPath, JSON.stringify(idData, null, 2));
fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log('Locales updated successfully via CJS!');
