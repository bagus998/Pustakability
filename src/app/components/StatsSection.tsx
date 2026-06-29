interface StatsSectionProps {
  darkMode: boolean;
}

const stats = [
  { value: "10.000+", label: "Koleksi Buku", sub: "& jurnal digital" },
  { value: "6", label: "Format Aksesibel", sub: "Audio, Braille, DAISY, dll." },
  { value: "1.200+", label: "Pengguna Aktif", sub: "Mahasiswa UB" },
  { value: "47", label: "Kategori", sub: "Lintas disiplin ilmu" },
];

export function StatsSection({ darkMode: dm }: StatsSectionProps) {
  const bg = dm ? "#0D1117" : "#FFFFFF";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";
  const accent = dm ? "#3B5BDB" : "#0A1172";
  const divider = dm ? "#1E2D4F" : "#E5E7EB";

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
