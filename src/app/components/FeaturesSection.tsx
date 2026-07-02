import { Volume2, BookOpen, Eye, Type, Monitor } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

interface FeaturesSectionProps { darkMode: boolean; }

export function FeaturesSection({ darkMode: dm }: FeaturesSectionProps) {
  const { t } = useLanguage();

  const bg     = dm ? "#0F1623" : "#F5F7FF";
  const card   = dm ? "#161B2E" : "#FFFFFF";
  const border = dm ? "#1E2D4F" : "#F0F0F0";
  const text   = dm ? "#F1F5F9" : "#0F1B35";
  const muted  = dm ? "#94A3B8" : "#6B7280";
  const lbg    = dm ? "rgba(59,91,219,0.15)" : "rgba(10,17,114,0.06)";
  const lc     = dm ? "rgba(147,197,253,0.8)" : "#0A1172";

  const features = [
    { icon: Volume2,  color: "#00D4AC", badge: "Populer",     item: T.features.items.audio },
    { icon: () => <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6"><circle cx="6" cy="12" r="2" fill="currentColor"/><circle cx="10" cy="8" r="2" fill="currentColor"/><circle cx="10" cy="12" r="2" fill="currentColor"/><circle cx="14" cy="10" r="2" fill="currentColor"/><circle cx="14" cy="14" r="2" fill="currentColor"/><circle cx="18" cy="12" r="2" fill="currentColor"/></svg>,
      color: "#87C4E8", badge: null,        item: T.features.items.braille },
    { icon: BookOpen, color: "#0D7070", badge: null,          item: T.features.items.daisy },
    { icon: Type,     color: "#3B5BDB", badge: null,          item: T.features.items.font },
    { icon: Eye,      color: "#F59E0B", badge: null,          item: T.features.items.night },
    { icon: Monitor,  color: "#E85D04", badge: "WCAG 2.1 AA", item: T.features.items.reader },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: bg }} aria-labelledby="features-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ backgroundColor: lbg, color: lc, fontSize: "0.8rem", fontWeight: 600 }}>
            {t(T.features.sectionLabel)}
          </div>
          <h2 id="features-heading" style={{ fontSize: "1.9rem", fontWeight: 700, color: text }}>{t(T.features.sectionTitle)}</h2>
          <p style={{ fontSize: "1rem", color: muted, marginTop: "0.75rem", maxWidth: "36rem", marginLeft: "auto", marginRight: "auto" }}>
            {t(T.features.sectionBody)}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, i) => {
            const IconComp = feat.icon;
            return (
              <div key={i} className="relative rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                {feat.badge && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full" style={{ backgroundColor: feat.badge === "WCAG 2.1 AA" ? "#DCFCE7" : `${feat.color}18`, color: feat.badge === "WCAG 2.1 AA" ? "#166534" : feat.color, fontSize: "0.7rem", fontWeight: 600 }}>
                    {feat.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${feat.color}15` }}>
                  <span style={{ color: feat.color }}><IconComp className="w-6 h-6" /></span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: text, marginBottom: "0.5rem" }}>{t(feat.item.title)}</h3>
                <p style={{ fontSize: "0.875rem", color: muted, lineHeight: 1.6 }}>{t(feat.item.desc)}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ background: "linear-gradient(135deg, #0A1172, #0D7070)" }}>
          <div className="w-10 h-10 rounded-full bg-white/20 flex-shrink-0 flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-semibold" style={{ fontSize: "0.95rem" }}>{t(T.features.wcagLabel)}</div>
            <div className="text-blue-100 mt-0.5" style={{ fontSize: "0.8rem" }}>
              {t(T.features.wcagBody)}{" "}
              <span className="text-[#00D4AC]">pld@ub.ac.id</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
