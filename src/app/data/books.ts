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
    formats: ["Audio Book", "PDF Aksesibel"],
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
    ],
  },
  {
    id: "2",
    title: "Biologi Sel dan Molekuler",
    author: "Dr. Rina Hartati, M.Si.",
    publisher: "UB Press",
    category: "Sains",
    formats: ["Audio Book", "DAISY", "Braille Digital"],
    coverImage: "https://images.unsplash.com/photo-1630959305606-3123a081dada?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#0D7070",
    rating: 4.6,
    year: 2022,
    description: "Membahas struktur dan fungsi sel, mekanisme molekuler kehidupan, serta teknologi biologi modern yang revolusioner.",
    pages: 450,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Struktur Sel", content: chapterContent("Bab 1: Struktur Sel") },
      { title: "Bab 2: Membran Sel dan Transport", content: chapterContent("Bab 2: Membran Sel dan Transport") },
    ],
  },
  {
    id: "3",
    title: "Kalkulus untuk Mahasiswa Teknik",
    author: "Dr. Bambang Widodo, M.T.",
    publisher: "UB Press",
    category: "Teknik",
    formats: ["PDF Aksesibel", "Audio Book"],
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
    ],
  },
  {
    id: "4",
    title: "Dasar-Dasar Akuntansi",
    author: "Prof. Ratna Dewi, Ak., M.Si.",
    publisher: "UB Press",
    category: "Ekonomi",
    formats: ["Audio Book", "Braille Digital", "PDF Aksesibel"],
    coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&w=400&h=560",
    coverColor: "#0A1172",
    rating: 4.7,
    year: 2023,
    description: "Prinsip-prinsip akuntansi keuangan dasar, penyusunan laporan keuangan, dan siklus akuntansi perusahaan jasa dan dagang.",
    pages: 340,
    previewPages: 3,
    status: "approved",
    chapters: [
      { title: "Bab 1: Pengantar Akuntansi", content: chapterContent("Bab 1: Pengantar Akuntansi") },
      { title: "Bab 2: Persamaan Dasar Akuntansi", content: chapterContent("Bab 2: Persamaan Dasar Akuntansi") },
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
    formats: ["Audio Book", "PDF Aksesibel"],
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
  "Sosial", "Psikologi", "Teknologi", "Kedokteran", "Pertanian", "Ilmu Budaya", "MIPA",
];

export const categoryTranslations: Record<string, { id: string; en: string }> = {
  Semua: { id: "Semua", en: "All" },
  Sains: { id: "Sains", en: "Science" },
  Teknik: { id: "Teknik", en: "Engineering" },
  Hukum: { id: "Hukum", en: "Law" },
  Ekonomi: { id: "Ekonomi", en: "Economics" },
  Sosial: { id: "Sosial & Politik", en: "Social Sciences" },
  Psikologi: { id: "Psikologi", en: "Psychology" },
  Teknologi: { id: "Teknologi", en: "Technology" },
  Kedokteran: { id: "Kedokteran", en: "Medicine" },
  Pertanian: { id: "Pertanian", en: "Agriculture" },
  "Ilmu Budaya": { id: "Ilmu Budaya", en: "Cultural Studies" },
  MIPA: { id: "MIPA", en: "Mathematics & Science" },
};

export function getTranslatedCategory(cat: string, lang?: "id" | "en"): string {
  if (!cat) return "";
  const currentLang = lang || "id";
  const match = categoryTranslations[cat];
  if (match && match[currentLang]) return match[currentLang];
  return cat;
}

export const formatOptions = [
  "Audio",
  "PDF Aksesibel",
  "EPUB Aksesibel",
  "DAISY",
  "Braille Digital",
];

export const formatTranslations: Record<string, { id: string; en: string }> = {
  Audio: { id: "Audio", en: "Audio" },
  "Audio Book": { id: "Audio", en: "Audio" },
  "PDF Aksesibel": { id: "PDF Aksesibel", en: "Accessible PDF" },
  "Accessible PDF": { id: "PDF Aksesibel", en: "Accessible PDF" },
  PDF: { id: "PDF Standar", en: "Standard PDF" },
  DAISY: { id: "DAISY", en: "DAISY" },
  "Braille Digital": { id: "Braille Digital", en: "Digital Braille" },
  Braille: { id: "Braille Digital", en: "Digital Braille" },
  "EPUB Aksesibel": { id: "EPUB Aksesibel", en: "Accessible EPUB" },
};

export function getTranslatedFormat(fmt: string, lang?: "id" | "en"): string {
  if (!fmt) return "";
  const currentLang = lang || "id";
  const match = formatTranslations[fmt];
  if (match && match[currentLang]) return match[currentLang];
  return fmt;
}

export function normalizeFormats(formats: any): string[] {
  if (!formats) return [];
  if (Array.isArray(formats)) return formats;
  if (typeof formats === "string") {
    try {
      const parsed = JSON.parse(formats);
      if (Array.isArray(parsed)) return parsed;
    } catch {}
    return formats.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
}
