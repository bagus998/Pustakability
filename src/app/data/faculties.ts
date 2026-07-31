export const faculties = [
  "Hukum", "Ilmu Administrasi", "Pertanian", "Teknik", "Kedokteran",
  "Perikanan & Ilmu Kelautan", "Peternakan", "Ilmu Sosial & Ilmu Politik",
  "Ilmu Budaya", "MIPA", "Teknologi Pertanian", "Ekonomi & Bisnis",
  "Ilmu Komputer", "Ilmu Kesehatan", "Vokasi", "Rektorat",
];

export const facultyTranslations: Record<string, { id: string; en: string }> = {
  Hukum: { id: "Fakultas Hukum", en: "Faculty of Law" },
  "Ilmu Administrasi": { id: "Fakultas Ilmu Administrasi", en: "Faculty of Administrative Sciences" },
  Pertanian: { id: "Fakultas Pertanian", en: "Faculty of Agriculture" },
  Teknik: { id: "Fakultas Teknik", en: "Faculty of Engineering" },
  Kedokteran: { id: "Fakultas Kedokteran", en: "Faculty of Medicine" },
  "Perikanan & Ilmu Kelautan": { id: "Fakultas Perikanan & Ilmu Kelautan", en: "Faculty of Fisheries & Marine Sciences" },
  Peternakan: { id: "Fakultas Peternakan", en: "Faculty of Animal Husbandry" },
  "Ilmu Sosial & Ilmu Politik": { id: "Fakultas Ilmu Sosial & Ilmu Politik", en: "Faculty of Social & Political Sciences" },
  "Ilmu Budaya": { id: "Fakultas Ilmu Budaya", en: "Faculty of Cultural Studies" },
  MIPA: { id: "Fakultas MIPA", en: "Faculty of Mathematics & Natural Sciences" },
  "Teknologi Pertanian": { id: "Fakultas Teknologi Pertanian", en: "Faculty of Agricultural Technology" },
  "Ekonomi & Bisnis": { id: "Fakultas Ekonomi & Bisnis", en: "Faculty of Economics & Business" },
  "Ilmu Komputer": { id: "Fakultas Ilmu Komputer", en: "Faculty of Computer Science" },
  "Ilmu Kesehatan": { id: "Fakultas Ilmu Kesehatan", en: "Faculty of Health Sciences" },
  Vokasi: { id: "Fakultas Vokasi", en: "Faculty of Vocational Studies" },
  Rektorat: { id: "Rektorat / Kantor Pusat", en: "Rectorate / Central Admin" },
};

export function getTranslatedFaculty(fac?: string, lang?: "id" | "en"): string {
  if (!fac) return "—";
  const currentLang = lang || "id";
  const match = facultyTranslations[fac];
  if (match && match[currentLang]) return match[currentLang];
  return fac;
}
