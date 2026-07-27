import { useState } from "react";
import { Search, Volume2, FileText, BookOpen, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Page } from "../App";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

interface HeroProps {
  darkMode: boolean;
  onNavigate: (page: Page, bookId?: string, filter?: { query?: string; format?: string }) => void;
}

export function Hero({ darkMode: dm, onNavigate }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useLanguage();

  const formatCards = [
    { key: "Audio", icon: Volume2, label: t(T.hero.formats.audio),   color: "#00D4AC", desc: t(T.hero.formatDesc.audio) },
    { key: "PDF", icon: FileText, label: t(T.hero.formats.pdf),    color: "#3B5BDB", desc: t(T.hero.formatDesc.pdf) },
    { key: "DAISY", icon: BookOpen, label: t(T.hero.formats.daisy),  color: "#0D7070", desc: t(T.hero.formatDesc.daisy) },
    {
      key: "Braille",
      icon: () => (
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
          <circle cx="6" cy="12" r="1.5" fill="currentColor" />
          <circle cx="10" cy="8" r="1.5" fill="currentColor" />
          <circle cx="10" cy="12" r="1.5" fill="currentColor" />
          <circle cx="14" cy="10" r="1.5" fill="currentColor" />
          <circle cx="14" cy="14" r="1.5" fill="currentColor" />
          <circle cx="18" cy="12" r="1.5" fill="currentColor" />
        </svg>
      ),
      label: t(T.hero.formats.braille),
      color: "#87C4E8",
      desc: t(T.hero.formatDesc.braille),
    },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onNavigate("catalog", undefined, { query: searchQuery });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      <div
        className="absolute inset-0"
        style={{
          background: dm
            ? "linear-gradient(135deg, #050A14 0%, #0A1035 40%, #0D1A4A 100%)"
            : "linear-gradient(135deg, #0F1B35 0%, #0A1172 40%, #0D2B6B 70%, #132060 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 id="hero-heading" className="text-white mb-5" style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2 }}>
            {t(T.hero.heading1)}{" "}
            <span style={{ background: "linear-gradient(90deg, #00D4AC, #87C4E8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t(T.hero.headingAccent)}
            </span>{" "}
            {t(T.hero.heading2)}
          </h1>

          <p className="text-blue-100 mb-8 leading-relaxed" style={{ fontSize: "1.05rem" }}>
            {t(T.hero.body).replace("{count}", "10.000")}
          </p>

          <form onSubmit={handleSearch} className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(T.hero.searchPlaceholder)}
              aria-label={t(T.hero.searchPlaceholder)}
              className="w-full pl-12 pr-32 py-4 rounded-xl outline-none text-white placeholder-blue-300 transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", fontSize: "1rem" }}
              onFocus={(e) => (e.target.style.borderColor = "#00D4AC")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.18)")}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-lg font-medium active:scale-[0.96] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1172]"
              style={{ backgroundColor: "#00D4AC", color: "#0A1172", fontSize: "0.875rem" }}
            >
              {t(T.hero.searchBtn)}
            </button>
          </form>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {formatCards.map((f, i) => {
              const IconComp = f.icon;
              return (
                <button
                  key={i}
                  onClick={() => onNavigate("catalog", undefined, { format: f.key })}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl active:scale-[0.96] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4AC]"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                  aria-label={`Format ${f.label}`}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
                  <span style={{ color: f.color }}><IconComp className="w-5 h-5" /></span>
                  <div className="text-center">
                    <div className="text-white" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{f.label}</div>
                    <div className="text-blue-300/70" style={{ fontSize: "0.62rem" }}>{f.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("catalog")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white active:scale-[0.96] transition-all duration-150 ease-out hover:opacity-90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#00D4AC]"
              style={{ background: "linear-gradient(135deg, #00D4AC, #3B5BDB)" }}
            >
              {t(T.hero.ctaBrowse)}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("register")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white active:scale-[0.96] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#00D4AC]"
              style={{ border: "1px solid rgba(255,255,255,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {t(T.hero.ctaRegister)}
            </button>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1771325650489-a41d05192c18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              alt="Mahasiswa membaca di perpustakaan"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,17,114,0.7) 0%, transparent 60%)" }} aria-hidden="true" />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-xl" aria-hidden="true">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4AC] to-[#0D7070] flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[#0A1172] font-bold" style={{ fontSize: "0.85rem" }}>4.200+</div>
                <div className="text-gray-400" style={{ fontSize: "0.7rem" }}>{t(T.hero.statAudio)}</div>
              </div>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 rounded-2xl p-3 shadow-xl border" style={{ backgroundColor: "#0A1172", borderColor: "#1E3A8A" }} aria-hidden="true">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B5BDB] to-[#0A1172] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold" style={{ fontSize: "0.85rem" }}>10.000+</div>
                <div className="text-blue-300" style={{ fontSize: "0.7rem" }}>{t(T.hero.statBooks)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0 60 L0 30 Q360 0 720 20 Q1080 40 1440 10 L1440 60 Z" fill={dm ? "#0D1117" : "white"} />
        </svg>
      </div>
    </section>
  );
}
