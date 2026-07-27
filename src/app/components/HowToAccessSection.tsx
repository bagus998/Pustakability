import { UserPlus, ShieldCheck, Mail, BookOpen, Phone } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

interface HowToAccessSectionProps { darkMode: boolean; }

const stepIcons = [UserPlus, ShieldCheck, Mail, BookOpen];
const stepColors = ["#0A1172", "#0D7070", "#3B5BDB", "#00D4AC"];

export function HowToAccessSection({ darkMode: dm }: HowToAccessSectionProps) {
  const { t } = useLanguage();
  const bg   = dm ? "#0D1117" : "#F5F7FF";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted= dm ? "#94A3B8" : "#6B7280";
  const lbg  = dm ? "rgba(59,91,219,0.15)" : "rgba(10,17,114,0.06)";
  const lc   = dm ? "rgba(147,197,253,0.8)" : "#0A1172";

  return (
    <section id="how" className="py-20" style={{ backgroundColor: bg }} aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ backgroundColor: lbg, color: lc, fontSize: "0.8rem", fontWeight: 600 }}>
            {t(T.howTo.sectionLabel)}
          </div>
          <h2 id="how-heading" style={{ fontSize: "1.9rem", fontWeight: 700, color: text }}>{t(T.howTo.sectionTitle)}</h2>
          <p style={{ fontSize: "1rem", color: muted, marginTop: "0.75rem", maxWidth: "36rem", marginLeft: "auto", marginRight: "auto" }}>
            {t(T.howTo.sectionBody)}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {T.howTo.steps.map((step, i) => {
            const IconComp = stepIcons[i];
            const color = stepColors[i];
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: color }} aria-hidden="true">
                  <IconComp className="w-7 h-7 text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow" style={{ fontSize: "0.6rem", fontWeight: 700, color }}>
                    0{i + 1}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: text, marginBottom: "0.5rem" }}>{t(step.title)}</h3>
                <p style={{ fontSize: "0.85rem", color: muted, lineHeight: 1.6 }}>{t(step.desc)}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl p-8 grid sm:grid-cols-2 gap-6 items-center" style={{ background: "linear-gradient(135deg, #0A1172, #132060)" }}>
          <div>
            <h3 className="text-white mb-2" style={{ fontSize: "1.15rem", fontWeight: 600 }}>{t(T.howTo.helpTitle)}</h3>
            <p className="text-blue-100" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>{t(T.howTo.helpBody)}</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="mailto:psldbrawijaya@ub.ac.id" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
              <Mail className="w-5 h-5 text-[#00D4AC] flex-shrink-0" />
              <div>
                <div className="text-white" style={{ fontSize: "0.875rem", fontWeight: 500 }}>psldbrawijaya@ub.ac.id</div>
                <div className="text-blue-300" style={{ fontSize: "0.75rem" }}>Email PLD UB</div>
              </div>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=6282144125010&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
              <Phone className="w-5 h-5 text-[#00D4AC] flex-shrink-0" />
              <div>
                <div className="text-white" style={{ fontSize: "0.875rem", fontWeight: 500 }}>+62 821-4412-5010</div>
                <div className="text-blue-300" style={{ fontSize: "0.75rem" }}>WhatsApp PLD UB</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
