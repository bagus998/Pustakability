import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import type { Page } from "../App";
import logoImg from "../../imports/logo.png";
import ubLogo from "../../imports/logo-ub.png";
import { useTranslation } from "react-i18next";

interface FooterProps {
  darkMode: boolean;
  onNavigate: (page: Page) => void;
}

export function Footer({ darkMode: dm, onNavigate }: FooterProps) {
  const { t } = useTranslation();
  const footerBg = dm ? "#050A14" : "#0F1B35";

  return (
    <footer style={{ backgroundColor: footerBg }} aria-label="Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={logoImg} alt="Logo Pustakability" className="w-9 h-9 object-contain" />
              <div>
                <div className="text-white font-semibold" style={{ fontSize: "0.95rem" }}>Pustakability</div>
                <div className="text-blue-300/60" style={{ fontSize: "0.6rem" }}>PLD Universitas Brawijaya</div>
              </div>
            </div>
            <p className="text-blue-200/60 leading-relaxed mb-5" style={{ fontSize: "0.85rem" }}>
              {t("footer.desc")}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <img src={ubLogo} alt="Universitas Brawijaya" className="h-6 w-auto object-contain" />
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: "0.875rem", fontWeight: 600 }}>{t("footer.nav_title")}</h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: t("footer.nav_home"), id: "home" as Page },
                { label: t("footer.nav_catalog"), id: "catalog" as Page },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-blue-300/60 hover:text-white transition-colors"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Format Tersedia */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: "0.875rem", fontWeight: 600 }}>{t("footer.format_title")}</h3>
            <ul className="flex flex-col gap-2">
              {[t("footer.format_audio"), t("footer.format_pdf"), t("footer.format_daisy"), t("footer.format_braille"), t("footer.format_dyslexic")].map((f) => (
                <li key={f} className="text-blue-300/60" style={{ fontSize: "0.85rem" }}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div id="contact">
            <h3 className="text-white mb-4" style={{ fontSize: "0.875rem", fontWeight: 600 }}>{t("footer.contact_title")}</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:psldbrawijaya@ub.ac.id" className="flex items-start gap-2.5 text-blue-300/60 hover:text-white transition-colors" style={{ fontSize: "0.85rem" }}>
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4AC]" aria-hidden="true" />
                psldbrawijaya@ub.ac.id
              </a>
              <div className="flex items-start gap-2.5 text-blue-300/60" style={{ fontSize: "0.85rem" }}>
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4AC]" aria-hidden="true" />
                +62 821-4412-5010
              </div>
              <div className="flex items-start gap-2.5 text-blue-300/60" style={{ fontSize: "0.85rem" }}>
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4AC]" aria-hidden="true" />
                Jl. MT. Haryono No.163, Lowokwaru, Kota Malang, Jawa Timur 65145, Indonesia
              </div>
              <a
                href="https://pld.ub.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 mt-1 hover:text-white transition-colors"
                style={{ color: "#00D4AC", fontSize: "0.85rem", fontWeight: 500 }}
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                {t("footer.contact_web")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-300/40 text-center sm:text-left" style={{ fontSize: "0.78rem" }}>
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-4">
            <span
              className="px-2 py-0.5 rounded-full border"
              style={{ backgroundColor: "rgba(22,163,74,0.15)", color: "#4ADE80", borderColor: "rgba(22,163,74,0.3)", fontSize: "0.7rem" }}
            >
              WCAG 2.1 AA
            </span>
            {[{label: t("footer.privacy"), href: "#"}, {label: t("footer.terms"), href: "#"}].map(link => (
              <a key={link.label} href={link.href} className="text-blue-300/40 hover:text-blue-300/70 transition-colors" style={{ fontSize: "0.78rem" }}>{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
