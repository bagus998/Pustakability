import { useState, useEffect } from "react";
import { X, ShieldCheck, FileText, Lock } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

export type LegalTab = "privacy" | "terms";

interface LegalModalProps {
  initialTab?: LegalTab;
  darkMode: boolean;
  onClose: () => void;
}

export function LegalModal({ initialTab = "privacy", darkMode: dm, onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const modalBg = dm ? "#161B2E" : "#FFFFFF";
  const border  = dm ? "#1E2D4F" : "#E5E7EB";
  const text    = dm ? "#F1F5F9" : "#0F1B35";
  const muted   = dm ? "#94A3B8" : "#4B5563";
  const headerBg = dm ? "#0D1117" : "#F8FAFC";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl shadow-2xl border flex flex-col max-h-[85vh] overflow-hidden transition-all"
        style={{ backgroundColor: modalBg, borderColor: border }}
      >
        {/* Modal Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ backgroundColor: headerBg, borderColor: border }}
        >
          <div className="flex items-center gap-2.5">
            {activeTab === "privacy" ? (
              <ShieldCheck className="w-5 h-5 text-[#00D4AC]" aria-hidden="true" />
            ) : (
              <FileText className="w-5 h-5 text-[#3B5BDB]" aria-hidden="true" />
            )}
            <h2 id="legal-modal-title" className="font-bold text-lg" style={{ color: text }}>
              {activeTab === "privacy" ? t(T.legal.privacyTitle) : t(T.legal.termsTitle)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-500/10 transition-colors text-gray-400 hover:text-gray-200 active:scale-95"
            aria-label={t(T.legal.closeBtn)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b" style={{ borderColor: border }}>
          <button
            onClick={() => setActiveTab("privacy")}
            className="flex-1 py-3 px-4 font-semibold text-sm transition-all flex items-center justify-center gap-2 border-b-2"
            style={{
              borderColor: activeTab === "privacy" ? "#00D4AC" : "transparent",
              color: activeTab === "privacy" ? (dm ? "#00D4AC" : "#0A1172") : muted,
              backgroundColor: activeTab === "privacy" ? (dm ? "rgba(0,212,172,0.08)" : "rgba(10,17,114,0.04)") : "transparent",
            }}
          >
            <Lock className="w-4 h-4" />
            {t(T.footer.privacy)}
          </button>
          <button
            onClick={() => setActiveTab("terms")}
            className="flex-1 py-3 px-4 font-semibold text-sm transition-all flex items-center justify-center gap-2 border-b-2"
            style={{
              borderColor: activeTab === "terms" ? "#3B5BDB" : "transparent",
              color: activeTab === "terms" ? (dm ? "#93C5FD" : "#0A1172") : muted,
              backgroundColor: activeTab === "terms" ? (dm ? "rgba(59,91,219,0.08)" : "rgba(10,17,114,0.04)") : "transparent",
            }}
          >
            <FileText className="w-4 h-4" />
            {t(T.footer.terms)}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm leading-relaxed" style={{ color: text }}>
          {activeTab === "privacy" ? (
            <>
              <p className="p-3.5 rounded-xl border font-medium" style={{ backgroundColor: dm ? "#0D1117" : "#F0FDF4", borderColor: dm ? "#1E2D4F" : "#BBF7D0", color: dm ? "#86EFAC" : "#166534" }}>
                {t(T.legal.privacyContent.intro)}
              </p>

              <div>
                <h3 className="font-bold text-base mb-1.5" style={{ color: text }}>{t(T.legal.privacyContent.section1Title)}</h3>
                <p style={{ color: muted }}>{t(T.legal.privacyContent.section1Body)}</p>
              </div>

              <div>
                <h3 className="font-bold text-base mb-1.5" style={{ color: text }}>{t(T.legal.privacyContent.section2Title)}</h3>
                <p style={{ color: muted }}>{t(T.legal.privacyContent.section2Body)}</p>
              </div>

              <div>
                <h3 className="font-bold text-base mb-1.5" style={{ color: text }}>{t(T.legal.privacyContent.section3Title)}</h3>
                <p style={{ color: muted }}>{t(T.legal.privacyContent.section3Body)}</p>
              </div>
            </>
          ) : (
            <>
              <p className="p-3.5 rounded-xl border font-medium" style={{ backgroundColor: dm ? "#0D1117" : "#EFF6FF", borderColor: dm ? "#1E2D4F" : "#BFDBFE", color: dm ? "#93C5FD" : "#1E40AF" }}>
                {t(T.legal.termsContent.intro)}
              </p>

              <div>
                <h3 className="font-bold text-base mb-1.5" style={{ color: text }}>{t(T.legal.termsContent.section1Title)}</h3>
                <p style={{ color: muted }}>{t(T.legal.termsContent.section1Body)}</p>
              </div>

              <div>
                <h3 className="font-bold text-base mb-1.5" style={{ color: text }}>{t(T.legal.termsContent.section2Title)}</h3>
                <p style={{ color: muted }}>{t(T.legal.termsContent.section2Body)}</p>
              </div>

              <div>
                <h3 className="font-bold text-base mb-1.5" style={{ color: text }}>{t(T.legal.termsContent.section3Title)}</h3>
                <p style={{ color: muted }}>{t(T.legal.termsContent.section3Body)}</p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div
          className="px-6 py-4 border-t flex justify-end"
          style={{ backgroundColor: headerBg, borderColor: border }}
        >
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl font-semibold text-white active:scale-95 transition-all"
            style={{ backgroundColor: "#0A1172" }}
          >
            {t(T.legal.closeBtn)}
          </button>
        </div>
      </div>
    </div>
  );
}
