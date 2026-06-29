import { useState } from "react";
import { Accessibility, X, Eye, Type, AlignLeft } from "lucide-react";

interface AccessibilityWidgetProps {
  highContrast: boolean;
  onHighContrastToggle: () => void;
  fontSize: number;
  onFontSizeChange: (delta: number, reset?: boolean) => void;
}

export function AccessibilityWidget({
  highContrast,
  onHighContrastToggle,
  fontSize,
  onFontSizeChange,
}: AccessibilityWidgetProps) {
  const [open, setOpen] = useState(false);
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [lineSpacing, setLineSpacing] = useState(1);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Panel */}
      {open && (
        <div
          className={`rounded-2xl shadow-2xl p-5 w-72 ${
            highContrast
              ? "bg-black border-2 border-yellow-400"
              : "bg-white border border-gray-100"
          }`}
          role="dialog"
          aria-label="Panel Aksesibilitas"
          aria-modal="false"
        >
          <div className="flex items-center justify-between mb-4">
            <h2
              className={`${highContrast ? "text-yellow-400" : "text-[#0F1B35]"}`}
              style={{ fontSize: "0.95rem", fontWeight: 600 }}
            >
              Aksesibilitas
            </h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="Tutup panel aksesibilitas"
              className={`p-1 rounded ${highContrast ? "text-yellow-400 hover:bg-yellow-400/10" : "text-gray-400 hover:bg-gray-100"}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Font Size */}
            <div>
              <div className={`mb-2 flex items-center gap-2 ${highContrast ? "text-yellow-400" : "text-gray-600"}`} style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                <Type className="w-3.5 h-3.5" aria-hidden="true" />
                Ukuran Teks — {fontSize === 0 ? "Normal" : fontSize > 0 ? `+${fontSize}` : fontSize}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onFontSizeChange(-1)}
                  className={`flex-1 py-1.5 rounded-lg border transition-colors ${
                    highContrast
                      ? "border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10"
                      : "border-gray-200 text-gray-600 hover:border-[#0A1172] hover:text-[#0A1172]"
                  }`}
                  style={{ fontSize: "0.85rem" }}
                  aria-label="Perkecil teks"
                >
                  A−
                </button>
                <button
                  onClick={() => onFontSizeChange(0, true)}
                  className={`px-3 py-1.5 rounded-lg border transition-colors ${
                    highContrast
                      ? "border-yellow-400/40 text-yellow-600 hover:bg-yellow-400/10"
                      : "border-gray-200 text-gray-400 hover:border-gray-400"
                  }`}
                  style={{ fontSize: "0.75rem" }}
                  aria-label="Reset ukuran teks"
                >
                  Reset
                </button>
                <button
                  onClick={() => onFontSizeChange(1)}
                  className={`flex-1 py-1.5 rounded-lg border transition-colors ${
                    highContrast
                      ? "border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10"
                      : "border-gray-200 text-gray-600 hover:border-[#0A1172] hover:text-[#0A1172]"
                  }`}
                  aria-label="Perbesar teks"
                >
                  A+
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div>
              <button
                onClick={onHighContrastToggle}
                aria-pressed={highContrast}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  highContrast
                    ? "bg-yellow-400 text-black"
                    : "border border-gray-200 text-gray-700 hover:border-[#0A1172]"
                }`}
                style={{ fontSize: "0.85rem" }}
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" aria-hidden="true" />
                  <span>Kontras Tinggi</span>
                </div>
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    highContrast ? "bg-black/30" : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                      highContrast ? "right-0.5 bg-black" : "left-0.5 bg-white shadow"
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Dyslexia Font */}
            <div>
              <button
                onClick={() => setDyslexiaFont(!dyslexiaFont)}
                aria-pressed={dyslexiaFont}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  dyslexiaFont
                    ? highContrast
                      ? "bg-yellow-400 text-black"
                      : "bg-[#0A1172] text-white"
                    : highContrast
                    ? "border border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10"
                    : "border border-gray-200 text-gray-700 hover:border-[#0A1172]"
                }`}
                style={{ fontSize: "0.85rem" }}
              >
                <div className="flex items-center gap-2">
                  <AlignLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Font Disleksia</span>
                </div>
                <div
                  className={`w-10 h-5 rounded-full transition-colors relative ${
                    dyslexiaFont
                      ? highContrast
                        ? "bg-black/30"
                        : "bg-white/30"
                      : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                >
                  <div
                    className={`absolute top-0.5 w-4 h-4 rounded-full transition-all ${
                      dyslexiaFont
                        ? `right-0.5 ${highContrast ? "bg-black" : "bg-white"} shadow`
                        : "left-0.5 bg-white shadow"
                    }`}
                  />
                </div>
              </button>
            </div>

            {/* Line Spacing */}
            <div>
              <div className={`mb-2 flex items-center gap-2 ${highContrast ? "text-yellow-400" : "text-gray-600"}`} style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                Spasi Baris
              </div>
              <div className="flex gap-2">
                {[{ label: "Normal", v: 1 }, { label: "1,5×", v: 2 }, { label: "2×", v: 3 }].map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => setLineSpacing(opt.v)}
                    aria-pressed={lineSpacing === opt.v}
                    className={`flex-1 py-1.5 rounded-lg border text-center transition-colors ${
                      lineSpacing === opt.v
                        ? highContrast
                          ? "bg-yellow-400 text-black border-yellow-400"
                          : "bg-[#0A1172] text-white border-[#0A1172]"
                        : highContrast
                        ? "border-yellow-400/40 text-yellow-400 hover:bg-yellow-400/10"
                        : "border-gray-200 text-gray-500 hover:border-[#0A1172]"
                    }`}
                    style={{ fontSize: "0.75rem" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset All */}
            <button
              className={`w-full py-2 rounded-lg transition-colors ${
                highContrast
                  ? "border border-yellow-400/30 text-yellow-600 hover:bg-yellow-400/5"
                  : "border border-gray-100 text-gray-400 hover:bg-gray-50"
              }`}
              style={{ fontSize: "0.78rem" }}
              onClick={() => {
                if (highContrast) onHighContrastToggle();
                setDyslexiaFont(false);
                setLineSpacing(1);
              }}
            >
              Reset Semua Pengaturan
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Tutup panel aksesibilitas" : "Buka panel aksesibilitas"}
        aria-expanded={open}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all ${
          highContrast
            ? "bg-yellow-400 text-black hover:bg-yellow-300"
            : "bg-gradient-to-br from-[#0A1172] to-[#3B5BDB] text-white hover:shadow-[#0A1172]/40 hover:shadow-xl"
        }`}
      >
        {open ? <X className="w-6 h-6" /> : <Accessibility className="w-6 h-6" />}
      </button>
    </div>
  );
}
