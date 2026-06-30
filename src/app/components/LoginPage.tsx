import { useState } from "react";
import { Eye, EyeOff, BookOpen, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Page } from "../App";

interface LoginPageProps {
  darkMode: boolean;
  onLogin: (email: string, password: string) => boolean;
  onNavigate: (page: Page) => void;
}

const demoAccounts = [
  { role: "Admin", email: "admin@ub.ac.id", password: "Admin123", color: "#BE185D" },
  { role: "User", email: "mahasiswa@ub.ac.id", password: "User123", color: "#0A1172" },
  { role: "Volunteer", email: "relawan@ub.ac.id", password: "Vol123", color: "#0D7070" },
];

export function LoginPage({ darkMode: dm, onLogin, onNavigate }: LoginPageProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const bg = dm ? "#0D1117" : "#F5F7FF";
  const card = dm ? "#161B2E" : "#FFFFFF";
  const border = dm ? "#1E2D4F" : "#E5E7EB";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";
  const inputBg = dm ? "#0D1117" : "#F9FAFB";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const ok = onLogin(email, password);
    setLoading(false);
    if (ok) {
      onNavigate("home");
    } else {
      setError(t("login.error_mismatch"));
    }
  };

  const fillDemo = (acc: (typeof demoAccounts)[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20 pt-28"
      style={{ backgroundColor: bg }}
    >
      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2 mb-6 transition-colors"
          style={{ color: muted, fontSize: "0.875rem" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t("login.back_to_home")}
        </button>

        <div
          className="rounded-2xl p-8 shadow-lg"
          style={{ backgroundColor: card, border: `1px solid ${border}` }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)" }}
            >
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: text }}>
              {t("login.title")}
            </h1>
            <p style={{ fontSize: "0.875rem", color: muted, marginTop: "0.375rem" }}>
              {t("login.subtitle")}
            </p>
          </div>

          {/* Demo Accounts */}
          <div
            className="rounded-xl p-4 mb-6"
            style={{ backgroundColor: dm ? "#0A1172/20" : "#EEF2FF", border: `1px solid ${dm ? "#1E3A8A" : "#C7D2FE"}` }}
          >
            <p style={{ fontSize: "0.75rem", fontWeight: 600, color: dm ? "#93C5FD" : "#3730A3", marginBottom: "0.5rem" }}>
              {t("login.demo_title")}
            </p>
            <div className="flex flex-wrap gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  onClick={() => fillDemo(acc)}
                  className="px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-80"
                  style={{ backgroundColor: acc.color, fontSize: "0.75rem", fontWeight: 500 }}
                >
                  {acc.role}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}
              >
                {t("login.email_label")}
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("login.student_email")}
                required
                className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                style={{
                  backgroundColor: inputBg,
                  border: `1.5px solid ${error ? "#EF4444" : border}`,
                  color: text,
                  fontSize: "0.95rem",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#3B5BDB")}
                onBlur={(e) => (e.target.style.borderColor = error ? "#EF4444" : border)}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}
              >
                {t("login.password_label")}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t("login.password_placeholder")}
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl outline-none transition-all"
                  style={{
                    backgroundColor: inputBg,
                    border: `1.5px solid ${error ? "#EF4444" : border}`,
                    color: text,
                    fontSize: "0.95rem",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3B5BDB")}
                  onBlur={(e) => (e.target.style.borderColor = error ? "#EF4444" : border)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: muted }}
                  aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div
                className="rounded-lg px-4 py-3"
                style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", fontSize: "0.85rem" }}
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all"
              style={{
                background: loading ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? t("login.btn_processing") : t("login.btn_login")}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center mt-6" style={{ fontSize: "0.875rem", color: muted }}>
            {t("login.no_account")}{" "}
            <button
              onClick={() => onNavigate("register")}
              style={{ color: "#3B5BDB", fontWeight: 500 }}
              className="hover:underline"
            >
              {t("login.register_now")}
            </button>
          </p>
        </div>

        {/* Guest option */}
        <p className="text-center mt-4" style={{ fontSize: "0.8rem", color: muted }}>
          {t("login.guest_prompt")}{" "}
          <button
            onClick={() => onNavigate("catalog")}
            style={{ color: "#00D4AC", fontWeight: 500 }}
            className="hover:underline"
          >
            {t("login.guest_link")}
          </button>
        </p>
      </div>
    </div>
  );
}
