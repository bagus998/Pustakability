import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import type { Page } from "../App";
import logoImg from "../../imports/image.png";

interface FooterProps {
  darkMode: boolean;
  onNavigate: (page: Page) => void;
}

export function Footer({ darkMode: dm, onNavigate }: FooterProps) {
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
              Pustaka digital aksesibel untuk mahasiswa penyandang disabilitas cetak di Universitas Brawijaya.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <span className="font-black text-[#00D4AC]" style={{ fontSize: "0.75rem" }}>UB</span>
              <span className="text-blue-200" style={{ fontSize: "0.75rem" }}>Universitas Brawijaya</span>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-white mb-4" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Navigasi</h3>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Beranda", id: "home" as Page },
                { label: "Koleksi Buku", id: "catalog" as Page },
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
            <h3 className="text-white mb-4" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Format Tersedia</h3>
            <ul className="flex flex-col gap-2">
              {["Audio & Text-to-Speech", "PDF Aksesibel", "Buku DAISY", "Braille Digital (BRF)", "Font OpenDyslexic"].map((f) => (
                <li key={f} className="text-blue-300/60" style={{ fontSize: "0.85rem" }}>{f}</li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div id="contact">
            <h3 className="text-white mb-4" style={{ fontSize: "0.875rem", fontWeight: 600 }}>Kontak PLD UB</h3>
            <div className="flex flex-col gap-3">
              <a href="mailto:pld@ub.ac.id" className="flex items-start gap-2.5 text-blue-300/60 hover:text-white transition-colors" style={{ fontSize: "0.85rem" }}>
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4AC]" aria-hidden="true" />
                pld@ub.ac.id
              </a>
              <div className="flex items-start gap-2.5 text-blue-300/60" style={{ fontSize: "0.85rem" }}>
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4AC]" aria-hidden="true" />
                (0341) 575777 ext. 1234
              </div>
              <div className="flex items-start gap-2.5 text-blue-300/60" style={{ fontSize: "0.85rem" }}>
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4AC]" aria-hidden="true" />
                Gedung Rektorat Lt. 1, UB, Malang 65145
              </div>
              <a
                href="https://pld.ub.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 mt-1 hover:text-white transition-colors"
                style={{ color: "#00D4AC", fontSize: "0.85rem", fontWeight: 500 }}
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                Website PLD UB
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-blue-300/40 text-center sm:text-left" style={{ fontSize: "0.78rem" }}>
            © 2024 Pustakability — Pusat Layanan Disabilitas, Universitas Brawijaya.
          </p>
          <div className="flex items-center gap-4">
            <span
              className="px-2 py-0.5 rounded-full border"
              style={{ backgroundColor: "rgba(22,163,74,0.15)", color: "#4ADE80", borderColor: "rgba(22,163,74,0.3)", fontSize: "0.7rem" }}
            >
              WCAG 2.1 AA
            </span>
            {["Kebijakan Privasi", "Syarat Penggunaan"].map(link => (
              <a key={link} href="#" className="text-blue-300/40 hover:text-blue-300/70 transition-colors" style={{ fontSize: "0.78rem" }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
