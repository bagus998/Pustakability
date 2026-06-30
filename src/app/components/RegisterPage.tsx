import { useState } from "react";
import { Eye, EyeOff, BookOpen, ArrowLeft, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Page } from "../App";

interface RegisterPageProps {
  darkMode: boolean;
  onNavigate: (page: Page) => void;
}

const roleOptions = [
  {
    value: "user",
    labelKey: "role_user_label",
    descKey: "role_user_desc",
    color: "#0A1172",
  },
  {
    value: "volunteer",
    labelKey: "role_vol_label",
    descKey: "role_vol_desc",
    color: "#0D7070",
  },
];

const disabilityTypes = [
  "Tunanetra (total)",
  "Low Vision",
  "Disleksia",
  "Gangguan Motorik (sulit pegang buku)",
  "Lainnya",
];

export function RegisterPage({ darkMode: dm, onNavigate }: RegisterPageProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    nim: "",
    faculty: "",
    disability: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const bg = dm ? "#0D1117" : "#F5F7FF";
  const card = dm ? "#161B2E" : "#FFFFFF";
  const border = dm ? "#1E2D4F" : "#E5E7EB";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";
  const inputBg = dm ? "#0D1117" : "#F9FAFB";

  const inputStyle = {
    backgroundColor: inputBg,
    border: `1.5px solid ${border}`,
    color: text,
    fontSize: "0.9rem",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 pt-20"
        style={{ backgroundColor: bg }}
      >
        <div
          className="w-full max-w-md rounded-2xl p-8 text-center shadow-lg"
          style={{ backgroundColor: card, border: `1px solid ${border}` }}
        >
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-green-100">
            <CheckCircle className="w-9 h-9 text-green-600" />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: text }}>{t("register.success_title")}</h2>
          <p style={{ fontSize: "0.9rem", color: muted, marginTop: "0.75rem", lineHeight: 1.6 }}>
            {selectedRole === "user" ? t("register.success_desc_user") : t("register.success_desc_volunteer")}
          </p>
          <button
            onClick={() => onNavigate("login")}
            className="mt-6 w-full py-3.5 rounded-xl font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)", fontSize: "1rem" }}
          >
            {t("register.back_to_login")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20 pt-28"
      style={{ backgroundColor: bg }}
    >
      <div className="w-full max-w-lg">
        <button
          onClick={() => (step > 1 ? setStep(1) : onNavigate("login"))}
          className="flex items-center gap-2 mb-6 transition-colors"
          style={{ color: muted, fontSize: "0.875rem" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {step > 1 ? t("register.back_step1") : t("register.have_account")}
        </button>

        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: card, border: `1px solid ${border}` }}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)" }}
            >
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: text }}>{t("register.title")}</h1>
            <p style={{ fontSize: "0.875rem", color: muted, marginTop: "0.375rem" }}>
              {t("register.step_x_of_y", { current: step, total: 2 })}
            </p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: step >= s ? "#0A1172" : (dm ? "#1E2D4F" : "#E5E7EB"),
                    color: step >= s ? "white" : muted,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {s}
                </div>
                <span style={{ fontSize: "0.78rem", color: step >= s ? (dm ? "#93C5FD" : "#0A1172") : muted, fontWeight: step >= s ? 500 : 400 }}>
                  {s === 1 ? t("register.step1_label") : t("register.step2_label")}
                </span>
                {s < 2 && <div className="flex-1 h-px" style={{ backgroundColor: border }} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 1 && (
              <>
                {/* Role Selection */}
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.5rem" }}>
                    {t("register.role_select")}
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {roleOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSelectedRole(opt.value)}
                        className="text-left p-4 rounded-xl transition-all"
                        style={{
                          border: `2px solid ${selectedRole === opt.value ? opt.color : border}`,
                          backgroundColor: selectedRole === opt.value ? (dm ? `${opt.color}20` : `${opt.color}08`) : "transparent",
                        }}
                      >
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: selectedRole === opt.value ? opt.color : text }}>
                          {t("register." + opt.labelKey)}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: muted, marginTop: "0.25rem", lineHeight: 1.4 }}>
                          {t("register." + opt.descKey)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      {t("register.fullname")}
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t("register.fullname_placeholder")}
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      {t("register.nim")}
                    </label>
                    <input
                      type="text"
                      value={form.nim}
                      onChange={(e) => setForm({ ...form, nim: e.target.value })}
                      placeholder={t("register.nim_placeholder")}
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    {t("register.email")}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={t("register.email_placeholder")}
                    required
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    {t("register.faculty")}
                  </label>
                  <select
                    value={form.faculty}
                    onChange={(e) => setForm({ ...form, faculty: e.target.value })}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">{t("register.faculty_placeholder")}</option>
                    {["Hukum", "Ilmu Administrasi", "Pertanian", "Teknik", "Kedokteran", "Perikanan & Ilmu Kelautan", "Peternakan", "Ilmu Sosial & Ilmu Politik", "Ilmu Budaya", "MIPA", "Teknologi Pertanian", "Ekonomi & Bisnis", "Ilmu Komputer", "Ilmu Kesehatan", "Vokasi"].map(f => (
                      <option key={f} value={f}>{t(`register.faculties.${f}`)}</option>
                    ))}
                  </select>
                </div>

                {selectedRole === "user" && (
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      {t("register.disability")}
                    </label>
                    <select
                      value={form.disability}
                      onChange={(e) => setForm({ ...form, disability: e.target.value })}
                      required
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">{t("register.disability_placeholder")}</option>
                      {disabilityTypes.map((d) => (
                        <option key={d} value={d}>{t(`register.disabilities.${d}`)}</option>
                      ))}
                    </select>
                    <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.375rem" }}>
                      {t("register.verification_note")}
                    </p>
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    {t("register.password")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder={t("register.password_placeholder")}
                      required
                      minLength={8}
                      style={{ ...inputStyle, paddingRight: "3rem" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      style={{ color: muted }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    {t("register.confirm_password")}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder={t("register.confirm_password_placeholder")}
                    required
                    style={{
                      ...inputStyle,
                      borderColor: form.confirmPassword && form.confirmPassword !== form.password ? "#EF4444" : border,
                    }}
                  />
                  {form.confirmPassword && form.confirmPassword !== form.password && (
                    <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>
                      {t("register.password_mismatch")}
                    </p>
                  )}
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: dm ? "#0A1172/20" : "#EEF2FF", border: `1px solid ${dm ? "#1E3A8A" : "#C7D2FE"}` }}
                >
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: dm ? "#93C5FD" : "#3730A3", marginBottom: "0.5rem" }}>
                    {t("register.summary_title")}
                  </p>
                  <div style={{ fontSize: "0.8rem", color: dm ? "#BAE6FD" : "#1E3A8A", lineHeight: 1.7 }}>
                    <div>{t("register.summary_name")}: <strong>{form.name || "—"}</strong></div>
                    <div>{t("register.summary_email")}: <strong>{form.email || "—"}</strong></div>
                    <div>{t("register.summary_role")}: <strong>{selectedRole === "user" ? t("register.role_user") : t("register.role_volunteer")}</strong></div>
                    {form.disability && <div>{t("register.summary_disability")}: <strong>{t(`register.disabilities.${form.disability}`)}</strong></div>}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="agree" required className="mt-1" />
                  <label htmlFor="agree" style={{ fontSize: "0.8rem", color: muted, lineHeight: 1.5 }}>
                    {t("register.agree_prefix")} <span style={{ color: "#3B5BDB" }}>{t("register.terms")}</span> {t("register.and")}{" "}
                    <span style={{ color: "#3B5BDB" }}>{t("register.privacy")}</span> {t("register.agree_suffix")}
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading || (step === 2 && form.password !== form.confirmPassword)}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all mt-2"
              style={{
                background: (loading || (step === 2 && form.password !== form.confirmPassword)) ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                fontSize: "1rem",
                cursor: (loading || (step === 2 && form.password !== form.confirmPassword)) ? "not-allowed" : "pointer",
              }}
            >
              {loading ? t("login.btn_processing") : step === 1 ? t("register.btn_next") : t("register.btn_register")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
