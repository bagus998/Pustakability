import { useTranslation } from "react-i18next";

interface StatsSectionProps {
  darkMode: boolean;
}

// Stats array will be generated dynamically inside the component

export function StatsSection({ darkMode: dm }: StatsSectionProps) {
  const { t } = useTranslation();
  const bg = dm ? "#0D1117" : "#FFFFFF";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";
  const accent = dm ? "#3B5BDB" : "#0A1172";
  const divider = dm ? "#1E2D4F" : "#E5E7EB";

  const stats = [
    { value: "10.000+", label: t("stats.stat1_label"), sub: t("stats.stat1_sub") },
    { value: "6", label: t("stats.stat2_label"), sub: t("stats.stat2_sub") },
    { value: "1.200+", label: t("stats.stat3_label"), sub: t("stats.stat3_sub") },
    { value: "47", label: t("stats.stat4_label"), sub: t("stats.stat4_sub") },
  ];

  return (
    <section className="py-14" style={{ backgroundColor: bg, borderBottom: `1px solid ${divider}` }} aria-label="Statistik Pustakability">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div style={{ fontSize: "2.25rem", fontWeight: 700, lineHeight: 1, color: accent }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: text, marginTop: "0.375rem" }}>
                {stat.label}
              </div>
              <div style={{ fontSize: "0.78rem", color: muted, marginTop: "0.25rem" }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
