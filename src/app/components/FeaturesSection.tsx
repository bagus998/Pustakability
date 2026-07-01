import { Volume2, BookOpen, Eye, Type, Headphones, Monitor } from "lucide-react";

interface FeaturesSectionProps {
  darkMode: boolean;
}

import { useTranslation } from "react-i18next";

const features = [
  { icon: Volume2, key: "audio", color: "#00D4AC", badge: "popular" },
  { icon: () => <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><circle cx="6" cy="12" r="2" fill="currentColor"/><circle cx="10" cy="8" r="2" fill="currentColor"/><circle cx="10" cy="12" r="2" fill="currentColor"/><circle cx="14" cy="10" r="2" fill="currentColor"/><circle cx="14" cy="14" r="2" fill="currentColor"/><circle cx="18" cy="12" r="2" fill="currentColor"/></svg>, key: "braille", color: "#87C4E8", badge: null },
  { icon: BookOpen, key: "daisy", color: "#0D7070", badge: null },
  { icon: Type, key: "dyslexic", color: "#3B5BDB", badge: null },
  { icon: Eye, key: "nightMode", color: "#F59E0B", badge: null },
  { icon: Monitor, key: "screenReader", color: "#E85D04", badge: "WCAG 2.1 AA" },
];

export function FeaturesSection({ darkMode: dm }: FeaturesSectionProps) {
  const { t } = useTranslation();
  const bg = dm ? "#0F1623" : "#F5F7FF";
  const card = dm ? "#161B2E" : "#FFFFFF";
  const border = dm ? "#1E2D4F" : "#F0F0F0";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";
  const sectionLabel = dm ? "rgba(147,197,253,0.8)" : "#0A1172";
  const sectionLabelBg = dm ? "rgba(59,91,219,0.15)" : "rgba(10,17,114,0.06)";

  return (
    <section className="py-20" style={{ backgroundColor: bg }} aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ backgroundColor: sectionLabelBg, color: sectionLabel, fontSize: "0.8rem", fontWeight: 600 }}>
            {t("accessibilityFeatures.label")}
          </div>
          <h2 id="features-heading" style={{ fontSize: "1.9rem", fontWeight: 700, color: text }}>
            {t("accessibilityFeatures.title")}
          </h2>
          <p style={{ fontSize: "1rem", color: muted, marginTop: "0.75rem", maxWidth: "36rem", marginLeft: "auto", marginRight: "auto" }}>
            {t("accessibilityFeatures.desc")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const IconComp = feat.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: card, border: `1px solid ${border}` }}
              >
                {feat.badge && (
                  <span
                    className="absolute top-4 right-4 px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: feat.badge === "WCAG 2.1 AA" ? "#DCFCE7" : `${feat.color}18`,
                      color: feat.badge === "WCAG 2.1 AA" ? "#166534" : feat.color,
                      fontSize: "0.7rem",
                      fontWeight: 600,
                    }}
                  >
                    {feat.badge === "popular" ? t("accessibilityFeatures.badges.popular") : feat.badge}
                  </span>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${feat.color}15` }}
                >
                  <span style={{ color: feat.color }}>
                    <IconComp className="w-6 h-6" />
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: text, marginBottom: "0.5rem" }}>
                  {t(`accessibilityFeatures.items.${feat.key}.title`)}
                </h3>
                <p style={{ fontSize: "0.875rem", color: muted, lineHeight: 1.6 }}>
                  {t(`accessibilityFeatures.items.${feat.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* WCAG Statement */}
        <div
          className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          style={{ background: "linear-gradient(135deg, #0A1172, #0D7070)" }}
        >
          <div className="w-10 h-10 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold" style={{ fontSize: "0.95rem" }}>{t("accessibilityFeatures.accessibilityStatement.title")}</div>
            <div className="text-blue-100 mt-0.5" style={{ fontSize: "0.8rem" }}>
              {t("accessibilityFeatures.accessibilityStatement.desc1")}
              <span className="text-[#00D4AC]">psldbrawijaya@ub.ac.id</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
