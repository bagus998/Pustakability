import { useState } from "react";
import { Eye, EyeOff, BookOpen, ArrowLeft, CheckCircle } from "lucide-react";
import type { Page } from "../App";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

interface RegisterPageProps {
  darkMode: boolean;
  onNavigate: (page: Page) => void;
  onRegister?: (userData: {
    name: string;
    email: string;
    password: string;
    role: "user" | "volunteer";
    faculty: string;
    nim: string;
    disability?: string;
  }) => void;
}

const disabilityTypes = [
  "Tunanetra (total)",
  "Low Vision",
  "Disleksia",
  "Gangguan Motorik (sulit pegang buku)",
  "Lainnya",
];

export function RegisterPage({ darkMode: dm, onNavigate, onRegister }: RegisterPageProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<"user" | "volunteer">("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    nim: "",
    faculty: "",
    disability: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ nim?: string; email?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const roleOptions = [
    {
      value: "user" as const,
      label: t(T.register.roles.user.label),
      desc: t(T.register.roles.user.desc),
      color: "#0A1172",
    },
    {
      value: "volunteer" as const,
      label: t(T.register.roles.volunteer.label),
      desc: t(T.register.roles.volunteer.desc),
      color: "#0D7070",
    },
  ];

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

  const validateStep1 = () => {
    const errs: { nim?: string; email?: string } = {};

    // NIM validation: digits only, 8-18 chars
    const isNimValid = /^\d{8,18}$/.test(form.nim.trim());
    if (!isNimValid) {
      errs.nim = t(T.register.nimError);
    }

    // Email validation:
    const cleanEmail = form.email.trim().toLowerCase();
    if (selectedRole === "user") {
      if (!cleanEmail.endsWith("@student.ub.ac.id")) {
        errs.email = t(T.register.emailErrorUser);
      }
    } else {
      if (!cleanEmail.endsWith("@student.ub.ac.id") && !cleanEmail.endsWith("@ub.ac.id")) {
        errs.email = t(T.register.emailErrorVol);
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      return;
    }

    // Validate password complexity
    const isPassValid =
      form.password.length >= 8 &&
      /[A-Z]/.test(form.password) &&
      /[0-9]/.test(form.password);
    if (!isPassValid) {
      setErrors({ email: t(T.register.passwordWeakError) });
      return;
    }

    if (form.password !== form.confirmPassword) {
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    
    onRegister?.({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: selectedRole,
      faculty: form.faculty,
      nim: form.nim.trim(),
      disability: form.disability,
    });

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
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: text }}>{t(T.register.successTitle)}</h2>
          <p style={{ fontSize: "0.9rem", color: muted, marginTop: "0.75rem", lineHeight: 1.6 }}>
            {selectedRole === "user"
              ? t(T.register.successBodyUser)
              : t(T.register.successBodyVol)}
          </p>
          <button
            onClick={() => onNavigate("login")}
            className="mt-6 w-full py-3.5 rounded-xl font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)", fontSize: "1rem" }}
          >
            {t(T.register.backToLogin)}
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
          className="flex items-center gap-2 mb-6 transition-colors hover:opacity-80"
          style={{ color: muted, fontSize: "0.875rem" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {step > 1 ? t(T.register.backToStep1) : t(T.register.back)}
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
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: text }}>{t(T.register.title)}</h1>
            <p style={{ fontSize: "0.875rem", color: muted, marginTop: "0.375rem" }}>
              {t(T.register.step)} {step} {t(T.register.of)} 2
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
                  {s === 1 ? t(T.register.step1Label) : t(T.register.step2Label)}
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
                    {t(T.register.roleLabel)}
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
                          {opt.label}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: muted, marginTop: "0.25rem", lineHeight: 1.4 }}>
                          {opt.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      {t(T.register.nameLabel)}
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={t(T.register.namePh)}
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      {t(T.register.nimLabel)}
                    </label>
                    <input
                      type="text"
                      value={form.nim}
                      onChange={(e) => {
                        setForm({ ...form, nim: e.target.value });
                        if (errors.nim) setErrors((prev) => ({ ...prev, nim: undefined }));
                      }}
                      placeholder={t(T.register.nimPh)}
                      required
                      style={{
                        ...inputStyle,
                        borderColor: errors.nim ? "#EF4444" : border,
                      }}
                    />
                    {errors.nim && (
                      <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>
                        {errors.nim}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    {t(T.register.emailLabel)}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder={selectedRole === "user" ? "nim@student.ub.ac.id" : "nama@ub.ac.id"}
                    required
                    style={{
                      ...inputStyle,
                      borderColor: errors.email ? "#EF4444" : border,
                    }}
                  />
                  {errors.email && (
                    <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    {t(T.register.facultyLabel)}
                  </label>
                  <select
                    value={form.faculty}
                    onChange={(e) => setForm({ ...form, faculty: e.target.value })}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                  >
                    <option value="">{t(T.register.facultyPh)}</option>
                    {["Hukum", "Ilmu Administrasi", "Pertanian", "Teknik", "Kedokteran", "Perikanan & Ilmu Kelautan", "Peternakan", "Ilmu Sosial & Ilmu Politik", "Ilmu Budaya", "MIPA", "Teknologi Pertanian", "Ekonomi & Bisnis", "Ilmu Komputer", "Ilmu Kesehatan", "Vokasi"].map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>

                {selectedRole === "user" && (
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      {t(T.register.disabilityLabel)}
                    </label>
                    <select
                      value={form.disability}
                      onChange={(e) => setForm({ ...form, disability: e.target.value })}
                      required
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">{t(T.register.disabilityPh)}</option>
                      {disabilityTypes.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.375rem" }}>
                      {t(T.register.disabilityNote)}
                    </p>
                  </div>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    {t(T.register.passwordLabel)}
                  </label>
                  <div className="relative mb-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder={t(T.register.passwordPh)}
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

                  {/* Password Strength Checklist */}
                  <div className="rounded-xl p-3 mb-4" style={{ backgroundColor: inputBg, border: `1px solid ${border}` }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: muted, marginBottom: "0.375rem" }}>
                      Kriteria Keamanan Kata Sandi:
                    </p>
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-2" style={{ color: form.password.length >= 8 ? "#10B981" : muted }}>
                        <span>{form.password.length >= 8 ? "✓" : "○"}</span>
                        <span>{t(T.register.passwordLength)}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: /[A-Z]/.test(form.password) ? "#10B981" : muted }}>
                        <span>{/[A-Z]/.test(form.password) ? "✓" : "○"}</span>
                        <span>{t(T.register.passwordUppercase)}</span>
                      </div>
                      <div className="flex items-center gap-2" style={{ color: /[0-9]/.test(form.password) ? "#10B981" : muted }}>
                        <span>{/[0-9]/.test(form.password) ? "✓" : "○"}</span>
                        <span>{t(T.register.passwordNumber)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    {t(T.register.confirmLabel)}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder={t(T.register.confirmPh)}
                    required
                    style={{
                      ...inputStyle,
                      borderColor: form.confirmPassword && form.confirmPassword !== form.password ? "#EF4444" : border,
                    }}
                  />
                  {form.confirmPassword && form.confirmPassword !== form.password && (
                    <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>
                      {t(T.register.confirmError)}
                    </p>
                  )}
                </div>

                {/* Summary */}
                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: dm ? "#0A1172/20" : "#EEF2FF", border: `1px solid ${dm ? "#1E3A8A" : "#C7D2FE"}` }}
                >
                  <p style={{ fontSize: "0.8rem", fontWeight: 600, color: dm ? "#93C5FD" : "#3730A3", marginBottom: "0.5rem" }}>
                    {t(T.register.summary)}
                  </p>
                  <div style={{ fontSize: "0.8rem", color: dm ? "#BAE6FD" : "#1E3A8A", lineHeight: 1.7 }}>
                    <div>Nama: <strong>{form.name || "—"}</strong></div>
                    <div>Email: <strong>{form.email || "—"}</strong></div>
                    <div>Peran: <strong>{selectedRole === "user" ? t(T.register.roles.user.label) : t(T.register.roles.volunteer.label)}</strong></div>
                    {form.disability && <div>Disabilitas: <strong>{form.disability}</strong></div>}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="agree" required className="mt-1" />
                  <label htmlFor="agree" style={{ fontSize: "0.8rem", color: muted, lineHeight: 1.5 }}>
                    {t(T.register.agreeText)}{" "}
                    <span style={{ color: "#3B5BDB" }}>{t(T.register.terms)}</span>{" "}
                    {t(T.register.and)}{" "}
                    <span style={{ color: "#3B5BDB" }}>{t(T.register.privacy)}</span> Pustakability PLD UB.
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
              {loading ? t(T.register.submitting) : step === 1 ? t(T.register.next) : t(T.register.submit)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
