export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  category: string;
  formats: string[];
  coverImage: string;
  coverColor: string;
  rating: number;
  year: number;
  description: string;
  pages: number;
  previewPages: number;
  status: "approved" | "pending" | "rejected";
  submittedBy?: string;
  chapters: { title: string; content: string }[];
}

const chapterContent = (title: string) => `
${title}

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dalam konteks ilmu pengetahuan modern, pemahaman yang komprehensif terhadap konsep-konsep dasar merupakan fondasi yang tidak dapat diabaikan.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Studi mendalam terhadap materi ini akan memberikan wawasan yang luas kepada mahasiswa dalam menghadapi tantangan akademis dan profesional.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Penerapan teori dalam praktik nyata memerlukan pemahaman yang mendalam terhadap prinsip-prinsip fundamental yang telah dikemukakan oleh para ahli di bidang ini.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Mahasiswa diharapkan dapat memahami dan mengaplikasikan konsep-konsep yang telah dipelajari dalam kehidupan akademis dan profesional mereka.

Pengembangan kemampuan analitis dan kritis dalam mempelajari materi ini akan sangat membantu dalam proses pengambilan keputusan yang tepat. Berbagai studi kasus yang disajikan dalam bab ini bertujuan untuk memperkuat pemahaman teoritis dengan contoh-contoh praktis yang relevan.
`.trim();

export const allBooks: Book[] = [
  {
    id: "1",
    title: "Pengantar Ilmu Hukum",
    author: "Prof. Dr. Sudikno Mertokusumo, S.H.",
    publisher: "UB Press",
    category: "Hukum",
    formats: ["Audio", "PDF"],
    coverImage: "https://images.unsplash.com/photo-1709626011485-6fe000ea2dbc?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#0A1172",
    rating: 4.8,
    year: 2023,
    description: "Buku teks komprehensif yang membahas dasar-dasar ilmu hukum, sistem hukum Indonesia, dan konsep hukum dalam perspektif modern.",
    pages: 320,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Pengertian Hukum", content: chapterContent("Bab 1: Pengertian Hukum") },
      { title: "Bab 2: Sumber-Sumber Hukum", content: chapterContent("Bab 2: Sumber-Sumber Hukum") },
      { title: "Bab 3: Sistem Hukum Indonesia", content: chapterContent("Bab 3: Sistem Hukum Indonesia") },
      { title: "Bab 4: Hukum Publik dan Hukum Privat", content: chapterContent("Bab 4: Hukum Publik dan Hukum Privat") },
      { title: "Bab 5: Penemuan Hukum", content: chapterContent("Bab 5: Penemuan Hukum") },
    ],
  },
  {
    id: "2",
    title: "Biologi Sel dan Molekuler",
    author: "Dr. Rina Hartati, M.Si.",
    publisher: "UB Press",
    category: "Sains",
    formats: ["Audio", "DAISY", "Braille"],
    coverImage: "https://images.unsplash.com/photo-1630959305606-3123a081dada?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#0D7070",
    rating: 4.6,
    year: 2022,
    description: "Membahas struktur dan fungsi sel, mekanisme molekuler kehidupan, serta teknologi biologi modern yang revolutioner.",
    pages: 450,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Struktur Sel", content: chapterContent("Bab 1: Struktur Sel") },
      { title: "Bab 2: Membran Sel dan Transport", content: chapterContent("Bab 2: Membran Sel dan Transport") },
      { title: "Bab 3: Metabolisme Sel", content: chapterContent("Bab 3: Metabolisme Sel") },
      { title: "Bab 4: DNA dan Replikasi", content: chapterContent("Bab 4: DNA dan Replikasi") },
      { title: "Bab 5: Ekspresi Gen", content: chapterContent("Bab 5: Ekspresi Gen") },
    ],
  },
  {
    id: "3",
    title: "Kalkulus untuk Mahasiswa Teknik",
    author: "Dr. Bambang Widodo, M.T.",
    publisher: "UB Press",
    category: "Teknik",
    formats: ["PDF", "Audio"],
    coverImage: "https://images.unsplash.com/photo-1733723586975-9aaae6983459?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#3B5BDB",
    rating: 4.7,
    year: 2023,
    description: "Kalkulus diferensial dan integral dengan penerapan langsung pada rekayasa dan teknik, dilengkapi latihan soal terstruktur.",
    pages: 380,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Limit dan Kontinuitas", content: chapterContent("Bab 1: Limit dan Kontinuitas") },
      { title: "Bab 2: Turunan Fungsi", content: chapterContent("Bab 2: Turunan Fungsi") },
      { title: "Bab 3: Integral Tak Tentu", content: chapterContent("Bab 3: Integral Tak Tentu") },
      { title: "Bab 4: Integral Tentu", content: chapterContent("Bab 4: Integral Tentu") },
      { title: "Bab 5: Persamaan Diferensial", content: chapterContent("Bab 5: Persamaan Diferensial") },
    ],
  },
  {
    id: "4",
    title: "Sosiologi Pendidikan",
    author: "Prof. Wahyu Indriastuti, M.Pd.",
    publisher: "UB Press",
    category: "Sosial",
    formats: ["Audio", "DAISY"],
    coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#6B21A8",
    rating: 4.5,
    year: 2022,
    description: "Kajian sosiologi dalam konteks pendidikan, mencakup interaksi sosial, stratifikasi, dan peran pendidikan dalam masyarakat.",
    pages: 290,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Pengantar Sosiologi Pendidikan", content: chapterContent("Bab 1: Pengantar Sosiologi Pendidikan") },
      { title: "Bab 2: Lembaga Pendidikan", content: chapterContent("Bab 2: Lembaga Pendidikan") },
      { title: "Bab 3: Stratifikasi Sosial", content: chapterContent("Bab 3: Stratifikasi Sosial") },
      { title: "Bab 4: Perubahan Sosial", content: chapterContent("Bab 4: Perubahan Sosial") },
    ],
  },
  {
    id: "5",
    title: "Ekonomi Makro Modern",
    author: "Dr. Achmad Fauzi, S.E., M.M.",
    publisher: "UB Press",
    category: "Ekonomi",
    formats: ["PDF", "Audio", "Braille"],
    coverImage: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#B45309",
    rating: 4.4,
    year: 2024,
    description: "Teori-teori ekonomi makro kontemporer, kebijakan fiskal dan moneter, serta analisis perekonomian nasional dan global.",
    pages: 410,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Konsep Dasar Ekonomi Makro", content: chapterContent("Bab 1: Konsep Dasar Ekonomi Makro") },
      { title: "Bab 2: Pendapatan Nasional", content: chapterContent("Bab 2: Pendapatan Nasional") },
      { title: "Bab 3: Inflasi dan Deflasi", content: chapterContent("Bab 3: Inflasi dan Deflasi") },
      { title: "Bab 4: Kebijakan Moneter", content: chapterContent("Bab 4: Kebijakan Moneter") },
      { title: "Bab 5: Perdagangan Internasional", content: chapterContent("Bab 5: Perdagangan Internasional") },
    ],
  },
  {
    id: "6",
    title: "Psikologi Klinis",
    author: "Dr. Sri Wahyuni, M.Psi., Psikolog",
    publisher: "UB Press",
    category: "Psikologi",
    formats: ["Audio", "DAISY", "PDF"],
    coverImage: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#BE185D",
    rating: 4.9,
    year: 2023,
    description: "Psikologi klinis modern: diagnosis, asesmen, dan intervensi pada berbagai gangguan psikologis dalam setting klinis Indonesia.",
    pages: 360,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Dasar Psikologi Klinis", content: chapterContent("Bab 1: Dasar Psikologi Klinis") },
      { title: "Bab 2: Asesmen Psikologis", content: chapterContent("Bab 2: Asesmen Psikologis") },
      { title: "Bab 3: Gangguan Mood", content: chapterContent("Bab 3: Gangguan Mood") },
      { title: "Bab 4: Gangguan Kecemasan", content: chapterContent("Bab 4: Gangguan Kecemasan") },
      { title: "Bab 5: Intervensi Psikologis", content: chapterContent("Bab 5: Intervensi Psikologis") },
    ],
  },
  {
    id: "7",
    title: "Jaringan Komputer & Internet",
    author: "Ir. Budi Santoso, M.T.",
    publisher: "UB Press",
    category: "Teknologi",
    formats: ["PDF", "Audio"],
    coverImage: "https://images.unsplash.com/photo-1562408590-e32931084e23?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#047857",
    rating: 4.6,
    year: 2024,
    description: "Konsep dasar jaringan komputer, protokol TCP/IP, keamanan jaringan, dan infrastruktur internet modern.",
    pages: 395,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Konsep Dasar Jaringan", content: chapterContent("Bab 1: Konsep Dasar Jaringan") },
      { title: "Bab 2: Model OSI dan TCP/IP", content: chapterContent("Bab 2: Model OSI dan TCP/IP") },
      { title: "Bab 3: Pengalamatan IP", content: chapterContent("Bab 3: Pengalamatan IP") },
      { title: "Bab 4: Routing dan Switching", content: chapterContent("Bab 4: Routing dan Switching") },
      { title: "Bab 5: Keamanan Jaringan", content: chapterContent("Bab 5: Keamanan Jaringan") },
    ],
  },
  {
    id: "8",
    title: "Dasar-Dasar Akuntansi",
    author: "Prof. Ratna Dewi, Ak., M.M.",
    publisher: "UB Press",
    category: "Ekonomi",
    formats: ["Audio", "Braille", "PDF"],
    coverImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#0369A1",
    rating: 4.7,
    year: 2023,
    description: "Prinsip-prinsip akuntansi keuangan, pencatatan transaksi, laporan keuangan, dan analisis laporan keuangan perusahaan.",
    pages: 340,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Konsep Dasar Akuntansi", content: chapterContent("Bab 1: Konsep Dasar Akuntansi") },
      { title: "Bab 2: Persamaan Dasar Akuntansi", content: chapterContent("Bab 2: Persamaan Dasar Akuntansi") },
      { title: "Bab 3: Jurnal dan Buku Besar", content: chapterContent("Bab 3: Jurnal dan Buku Besar") },
      { title: "Bab 4: Laporan Keuangan", content: chapterContent("Bab 4: Laporan Keuangan") },
    ],
  },
  {
    id: "9",
    title: "Pengantar Farmakologi",
    author: "Dr. Indah Kusumawati, Apt., M.Farm.",
    publisher: "UB Press",
    category: "Kedokteran",
    formats: ["Audio", "DAISY", "PDF"],
    coverImage: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#DC2626",
    rating: 4.8,
    year: 2023,
    description: "Farmakologi dasar: mekanisme kerja obat, farmakokinetik, farmakodinamik, dan penerapan klinisnya dalam pengobatan modern.",
    pages: 480,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Pengantar Farmakologi", content: chapterContent("Bab 1: Pengantar Farmakologi") },
      { title: "Bab 2: Farmakokinetik", content: chapterContent("Bab 2: Farmakokinetik") },
      { title: "Bab 3: Farmakodinamik", content: chapterContent("Bab 3: Farmakodinamik") },
      { title: "Bab 4: Obat Sistem Saraf", content: chapterContent("Bab 4: Obat Sistem Saraf") },
      { title: "Bab 5: Antibiotik dan Antimikroba", content: chapterContent("Bab 5: Antibiotik dan Antimikroba") },
    ],
  },
  {
    id: "10",
    title: "Agribisnis Modern",
    author: "Prof. Heru Santoso, M.P.",
    publisher: "UB Press",
    category: "Pertanian",
    formats: ["Audio", "PDF"],
    coverImage: "https://images.unsplash.com/photo-1621394988863-117a9fc6e77f?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#15803D",
    rating: 4.5,
    year: 2022,
    description: "Manajemen agribisnis modern: rantai pasok pertanian, pemasaran produk agraris, dan digitalisasi sektor pertanian Indonesia.",
    pages: 310,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Konsep Agribisnis", content: chapterContent("Bab 1: Konsep Agribisnis") },
      { title: "Bab 2: Rantai Nilai Pertanian", content: chapterContent("Bab 2: Rantai Nilai Pertanian") },
      { title: "Bab 3: Pemasaran Produk Pertanian", content: chapterContent("Bab 3: Pemasaran Produk Pertanian") },
      { title: "Bab 4: Agritech dan Digitalisasi", content: chapterContent("Bab 4: Agritech dan Digitalisasi") },
    ],
  },
  {
    id: "11",
    title: "Komunikasi Massa Digital",
    author: "Dr. Dewi Rahayu, M.I.Kom.",
    publisher: "UB Press",
    category: "Sosial",
    formats: ["Audio", "PDF", "Braille"],
    coverImage: "https://images.unsplash.com/photo-1758270705518-b61b40527e76?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#7C3AED",
    rating: 4.6,
    year: 2024,
    description: "Teori komunikasi massa di era digital, media sosial, jurnalisme online, dan literasi media untuk masyarakat modern.",
    pages: 275,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Teori Komunikasi Massa", content: chapterContent("Bab 1: Teori Komunikasi Massa") },
      { title: "Bab 2: Media Digital dan Konvergensi", content: chapterContent("Bab 2: Media Digital dan Konvergensi") },
      { title: "Bab 3: Media Sosial", content: chapterContent("Bab 3: Media Sosial") },
      { title: "Bab 4: Jurnalisme Online", content: chapterContent("Bab 4: Jurnalisme Online") },
    ],
  },
  {
    id: "12",
    title: "Fisika Kuantum Dasar",
    author: "Dr. Eko Prasetyo, M.Si.",
    publisher: "UB Press",
    category: "Sains",
    formats: ["Audio", "DAISY"],
    coverImage: "https://images.unsplash.com/photo-1592659762303-90081d34b277?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#1D4ED8",
    rating: 4.4,
    year: 2023,
    description: "Pengantar fisika kuantum: dualitas gelombang-partikel, prinsip ketidakpastian Heisenberg, dan aplikasi fisika kuantum modern.",
    pages: 420,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Asal-Usul Fisika Kuantum", content: chapterContent("Bab 1: Asal-Usul Fisika Kuantum") },
      { title: "Bab 2: Dualitas Gelombang-Partikel", content: chapterContent("Bab 2: Dualitas Gelombang-Partikel") },
      { title: "Bab 3: Persamaan Schrödinger", content: chapterContent("Bab 3: Persamaan Schrödinger") },
      { title: "Bab 4: Prinsip Ketidakpastian", content: chapterContent("Bab 4: Prinsip Ketidakpastian") },
      { title: "Bab 5: Aplikasi Fisika Kuantum", content: chapterContent("Bab 5: Aplikasi Fisika Kuantum") },
    ],
  },
];

export const pendingBooks: Book[] = [
  {
    id: "p1",
    title: "Antropologi Budaya Nusantara",
    author: "Dr. Maya Sari, M.Hum.",
    publisher: "Brawijaya Press",
    category: "Sosial",
    formats: ["Audio", "PDF"],
    coverImage: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#92400E",
    rating: 0,
    year: 2024,
    description: "Kajian antropologi budaya Indonesia dengan fokus pada kearifan lokal dan dinamika budaya Nusantara di era globalisasi.",
    pages: 250,
    previewPages: 3,
    status: "pending",
    submittedBy: "relawan@ub.ac.id",
    chapters: [{ title: "Bab 1: Pengantar", content: chapterContent("Bab 1: Pengantar") }],
  },
];

export const categories = [
  "Semua", "Sains", "Teknik", "Hukum", "Ekonomi",
  "Sosial", "Psikologi", "Teknologi", "Kedokteran", "Pertanian",
];
