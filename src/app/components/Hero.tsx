import { useState } from "react";
import { Search, Volume2, FileText, BookOpen, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { Page } from "../App";
import { useTranslation, Trans } from "react-i18next";

interface HeroProps {
  darkMode: boolean;
  onNavigate: (page: Page) => void;
}

export function Hero({ darkMode: dm, onNavigate }: HeroProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  
  const formatCards = [
    { icon: Volume2, label: t("hero.format_audio"), color: "#00D4AC", desc: t("hero.format_audio_desc") },
    { icon: FileText, label: t("hero.format_pdf"), color: "#3B5BDB", desc: t("hero.format_pdf_desc") },
    { icon: BookOpen, label: t("hero.format_daisy"), color: "#0D7070", desc: t("hero.format_daisy_desc") },
    {
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
      label: t("hero.format_braille"),
      color: "#87C4E8",
      desc: t("hero.format_braille_desc"),
    },
  ];

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: dm
            ? "linear-gradient(135deg, #050A14 0%, #0A1035 40%, #0D1A4A 100%)"
            : "linear-gradient(135deg, #0F1B35 0%, #0A1172 40%, #0D2B6B 70%, #132060 100%)",
        }}
        aria-hidden="true"
      />

      {/* Dot pattern */}
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
        {/* Left Content */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              backgroundColor: "rgba(0,212,172,0.12)",
              border: "1px solid rgba(0,212,172,0.3)",
              color: "#00D4AC",
              fontSize: "0.8rem",
            }}
          >
            <div className="w-2 h-2 rounded-full bg-[#00D4AC] animate-pulse" />
            {t("hero.badge")}
          </div>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="text-white mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", fontWeight: 700, lineHeight: 1.2 }}
          >
            {t("hero.title_main")}{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00D4AC, #87C4E8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("hero.title_highlight")}
            </span>{" "}
            {t("hero.title_sub")}
          </h1>

          <p className="text-blue-100 mb-8 leading-relaxed" style={{ fontSize: "1.05rem" }}>
            <Trans i18nKey="hero.description">
              Akses lebih dari <strong className="text-[#00D4AC]">10.000 koleksi</strong> buku teks, jurnal, dan materi pembelajaran dalam format Audio, Braille Digital, DAISY, dan PDF Aksesibel — khusus untuk mahasiswa UB.
            </Trans>
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("hero.search_placeholder")}
              aria-label="Cari koleksi"
              className="w-full pl-12 pr-32 py-4 rounded-xl outline-none text-white placeholder-blue-300 transition-all"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                fontSize: "1rem",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#00D4AC")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.18)")}
            />
            <button
              onClick={() => onNavigate("catalog")}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-lg font-medium"
              style={{ backgroundColor: "#00D4AC", color: "#0A1172", fontSize: "0.875rem" }}
            >
              {t("hero.btn_search")}
            </button>
          </div>

          {/* Format Quick Access */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {formatCards.map((f, i) => {
              const IconComp = f.icon;
              return (
                <button
                  key={i}
                  onClick={() => onNavigate("catalog")}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                  aria-label={`Format ${f.label}`}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
                  <span style={{ color: f.color }}>
                    <IconComp className="w-5 h-5" />
                  </span>
                  <div className="text-center">
                    <div className="text-white" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{f.label}</div>
                    <div className="text-blue-300/70" style={{ fontSize: "0.62rem" }}>{f.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("catalog")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00D4AC, #3B5BDB)" }}
            >
              {t("hero.btn_explore")}
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("register")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.3)" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {t("hero.btn_register")}
            </button>
          </div>
        </div>

        {/* Right: Hero Image */}
        <div className="hidden lg:block relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: "4/3" }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1771325650489-a41d05192c18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              alt="Mahasiswa membaca di perpustakaan"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(10,17,114,0.7) 0%, transparent 60%)" }}
              aria-hidden="true"
            />
          </div>

          {/* Floating Cards */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-xl" aria-hidden="true">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4AC] to-[#0D7070] flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[#0A1172] font-bold" style={{ fontSize: "0.85rem" }}>4.200+</div>
                <div className="text-gray-400" style={{ fontSize: "0.7rem" }}>{t("hero.stats_audio")}</div>
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
                <div className="text-blue-300" style={{ fontSize: "0.7rem" }}>{t("hero.stats_collection")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none" className="w-full h-12">
          <path
            d="M0 60 L0 30 Q360 0 720 20 Q1080 40 1440 10 L1440 60 Z"
            fill={dm ? "#0D1117" : "white"}
          />
        </svg>
      </div>
    </section>
  );
}
