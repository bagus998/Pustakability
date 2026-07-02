import { Quote } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

interface TestimonialsSectionProps { darkMode: boolean; }

const testimonials = [
  { name: "Ahmad Fauzan", faculty: "Fakultas Hukum, Angkatan 2021", disability: "Tunanetra", initials: "AF", color: "#0A1172",
    text: { id: "Pustakability benar-benar mengubah cara saya belajar. Sebelumnya saya harus meminta bantuan teman untuk membacakan materi, tapi sekarang saya bisa mengakses semua buku hukum dalam format audio kapan saja.", en: "Pustakability truly changed how I learn. Before, I had to ask friends to read materials for me, but now I can access all law books in audio format anytime." } },
  { name: "Siti Rahayu", faculty: "Fakultas MIPA, Angkatan 2020", disability: "Disleksia", initials: "SR", color: "#0D7070",
    text: { id: "Fitur font aksesibel dan pengaturan spasi baris sangat membantu saya. Saya dulu selalu kesulitan membaca teks padat di buku cetak, tapi dengan Pustakability saya bisa membaca dengan jauh lebih nyaman.", en: "The accessible font feature and line spacing settings help me a lot. I used to struggle reading dense text in print books, but with Pustakability I can read much more comfortably." } },
  { name: "Rizky Pratama", faculty: "Fakultas Teknik, Angkatan 2022", disability: "Low Vision", initials: "RP", color: "#3B5BDB",
    text: { id: "Format DAISY sangat bagus karena saya bisa langsung melompat ke bagian yang saya butuhkan. Terima kasih PLD UB atas layanan yang luar biasa ini!", en: "The DAISY format is great because I can jump directly to the section I need. Thank you PLD UB for this amazing service!" } },
];

export function TestimonialsSection({ darkMode: dm }: TestimonialsSectionProps) {
  const { t, lang } = useLanguage();
  const bg   = dm ? "#0F1623" : "#FFFFFF";
  const card = dm ? "#161B2E" : "#F5F7FF";
  const border = dm ? "#1E2D4F" : "#E5E7EB";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted= dm ? "#94A3B8" : "#6B7280";
  const lbg  = dm ? "rgba(59,91,219,0.15)" : "rgba(10,17,114,0.06)";
  const lc   = dm ? "rgba(147,197,253,0.8)" : "#0A1172";

  return (
    <section className="py-20" style={{ backgroundColor: bg }} aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ backgroundColor: lbg, color: lc, fontSize: "0.8rem", fontWeight: 600 }}>
            {t(T.testimonials.sectionLabel)}
          </div>
          <h2 id="testimonials-heading" style={{ fontSize: "1.9rem", fontWeight: 700, color: text }}>{t(T.testimonials.sectionTitle)}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((tv, i) => (
            <blockquote key={i} className="rounded-2xl p-6 flex flex-col" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
              <Quote className="w-8 h-8 mb-4 flex-shrink-0" style={{ color: dm ? "#1E2D4F" : "#DBEAFE" }} aria-hidden="true" />
              <p className="flex-1 leading-relaxed mb-6" style={{ fontSize: "0.9rem", color: muted }}>
                "{tv.text[lang]}"
              </p>
              <footer className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold" style={{ backgroundColor: tv.color, fontSize: "0.8rem" }} aria-hidden="true">
                  {tv.initials}
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: text }}>{tv.name}</div>
                  <div style={{ fontSize: "0.75rem", color: muted }}>{tv.faculty}</div>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full" style={{ backgroundColor: lbg, color: lc, fontSize: "0.65rem", fontWeight: 600 }}>{tv.disability}</span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
