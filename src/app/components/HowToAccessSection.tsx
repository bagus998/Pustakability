import { UserPlus, ShieldCheck, Mail, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

interface HowToAccessSectionProps {
  darkMode: boolean;
}

// Steps array will be generated dynamically

export function HowToAccessSection({ darkMode: dm }: HowToAccessSectionProps) {
  const { t } = useTranslation();
  const bg = dm ? "#0D1117" : "#F5F7FF";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";
  const sectionLabelBg = dm ? "rgba(59,91,219,0.15)" : "rgba(10,17,114,0.06)";
  const sectionLabel = dm ? "rgba(147,197,253,0.8)" : "#0A1172";

  const steps = [
    { step: "01", icon: UserPlus, title: t("howToAccess.step1_title"), desc: t("howToAccess.step1_desc"), color: "#0A1172" },
    { step: "02", icon: ShieldCheck, title: t("howToAccess.step2_title"), desc: t("howToAccess.step2_desc"), color: "#0D7070" },
    { step: "03", icon: Mail, title: t("howToAccess.step3_title"), desc: t("howToAccess.step3_desc"), color: "#3B5BDB" },
    { step: "04", icon: BookOpen, title: t("howToAccess.step4_title"), desc: t("howToAccess.step4_desc"), color: "#00D4AC" },
  ];

  return (
    <section id="how" className="py-20" style={{ backgroundColor: bg }} aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full mb-3" style={{ backgroundColor: sectionLabelBg, color: sectionLabel, fontSize: "0.8rem", fontWeight: 600 }}>
            Cara Mendapatkan Akses
          </div>
          <h2 id="how-heading" style={{ fontSize: "1.9rem", fontWeight: 700, color: text }}>
            {t("howToAccess.title")}
          </h2>
          <p style={{ fontSize: "1rem", color: muted, marginTop: "0.75rem", maxWidth: "36rem", marginLeft: "auto", marginRight: "auto" }}>
            {t("howToAccess.desc")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const IconComp = step.icon;
            return (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center mb-5"
                  style={{ backgroundColor: step.color }}
                  aria-hidden="true"
                >
                  <IconComp className="w-7 h-7 text-white" />
                  <span
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow"
                    style={{ fontSize: "0.6rem", fontWeight: 700, color: step.color }}
                  >
                    {step.step}
                  </span>
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 600, color: text, marginBottom: "0.5rem" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: muted, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Box */}
        <div
          className="mt-12 rounded-2xl p-8 grid sm:grid-cols-2 gap-6 items-center"
          style={{ background: "linear-gradient(135deg, #0A1172, #132060)" }}
        >
          <div>
            <h3 className="text-white mb-2" style={{ fontSize: "1.15rem", fontWeight: 600 }}>{t("howToAccess.contact_title")}</h3>
            <p className="text-blue-100" style={{ fontSize: "0.875rem", lineHeight: 1.6 }}>
              {t("howToAccess.contact_desc")}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {[
              { icon: Mail, label: "pld@ub.ac.id", sub: t("howToAccess.contact_email_label") },
              { icon: () => <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>, label: "(0341) 575777 ext. 1234", sub: t("howToAccess.contact_phone_label") },
            ].map((c, i) => {
              const CIcon = c.icon;
              return (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10">
                  <CIcon className="w-5 h-5 text-[#00D4AC] flex-shrink-0" />
                  <div>
                    <div className="text-white" style={{ fontSize: "0.875rem", fontWeight: 500 }}>{c.label}</div>
                    <div className="text-blue-300" style={{ fontSize: "0.75rem" }}>{c.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
