import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TestimonialsSectionProps {
  darkMode: boolean;
}

// Testimonials array will be generated dynamically

export function TestimonialsSection({ darkMode: dm }: TestimonialsSectionProps) {
  const { t } = useTranslation();
  const bg = dm ? "#0F1623" : "#FFFFFF";
  const card = dm ? "#161B2E" : "#F5F7FF";
  const border = dm ? "#1E2D4F" : "#E5E7EB";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";
  const sectionLabelBg = dm ? "rgba(59,91,219,0.15)" : "rgba(10,17,114,0.06)";
  const sectionLabel = dm ? "rgba(147,197,253,0.8)" : "#0A1172";

  const testimonials = [
    { name: t("features.name1"), role: t("features.role1"), text: t("features.text1"), initials: "AF", color: "#0A1172" },
    { name: t("features.name2"), role: t("features.role2"), text: t("features.text2"), initials: "SR", color: "#0D7070" },
    { name: t("features.name3"), role: t("features.role3"), text: t("features.text3"), initials: "RP", color: "#3B5BDB" },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: bg }} aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ backgroundColor: sectionLabelBg, color: sectionLabel, fontSize: "0.8rem", fontWeight: 600 }}>
            Cerita Pengguna
          </div>
          <h2 id="testimonials-heading" style={{ fontSize: "1.9rem", fontWeight: 700, color: text }}>
            {t("features.title")}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="rounded-2xl p-6 flex flex-col"
              style={{ backgroundColor: card, border: `1px solid ${border}` }}
            >
              <Quote className="w-8 h-8 mb-4 flex-shrink-0" style={{ color: dm ? "#1E2D4F" : "#DBEAFE" }} aria-hidden="true" />
              <p className="flex-1 leading-relaxed mb-6" style={{ fontSize: "0.9rem", color: muted }}>
                "{t.text}"
              </p>
              <footer className="flex items-center gap-3 mt-auto">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: t.color, fontSize: "0.8rem" }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 600, color: text }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: muted }}>{t.role}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
