import { useState, useEffect } from "react";
import { Eye, EyeOff, BookOpen, ArrowLeft, KeyRound } from "lucide-react";
import type { Page } from "../App";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";
import { ForgotPasswordModal } from "./ForgotPasswordModal";

interface LoginPageProps {
  darkMode: boolean;
  onLogin: (email: string, password: string) => Promise<{ success: boolean; reason?: "invalid" | "pending" }> | { success: boolean; reason?: "invalid" | "pending" } | boolean;
  onNavigate: (page: Page) => void;
}

export function LoginPage({ darkMode: dm, onLogin, onNavigate }: LoginPageProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [initialStep, setInitialStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user clicked a recovery link from Supabase Auth email
    const fullUrl = window.location.href;
    if (fullUrl.includes("type=recovery") || fullUrl.includes("access_token=") || fullUrl.includes("error=")) {
      setInitialStep(2);
      setShowForgotModal(true);
    }
  }, []);

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
    const result = await onLogin(email, password);
    setLoading(false);

    if (typeof result === "boolean") {
      if (result) {
        onNavigate("home");
      } else {
        setError(t(T.login.error));
      }
    } else {
      if (result.success) {
        onNavigate("home");
      } else if (result.reason === "pending") {
        setError(t(T.login.pendingError));
      } else {
        setError(t(T.login.error));
      }
    }
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
          className="flex items-center gap-2 mb-6 transition-colors hover:opacity-80"
          style={{ color: muted, fontSize: "0.875rem" }}
        >
          <ArrowLeft className="w-4 h-4" />
          {t(T.login.back)}
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
              {t(T.login.title)}
            </h1>
            <p style={{ fontSize: "0.875rem", color: muted, marginTop: "0.375rem" }}>
              {t(T.login.subtitle)}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}
              >
                {t(T.login.emailLabel)}
              </label>
              <input
                id="login-email"
                name="email"
                autoComplete="username"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t(T.login.emailPh)}
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
                {t(T.login.passwordLabel)}
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t(T.login.passwordPh)}
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
                  aria-label={showPassword ? t(T.login.hide) : t(T.login.show)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs hover:underline flex items-center gap-1 font-medium transition-colors"
                  style={{ color: "#3B5BDB" }}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  {t(T.login.forgotLink)}
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
              className="w-full py-3.5 rounded-xl font-semibold text-white transition-all active:scale-[0.98]"
              style={{
                background: loading ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                fontSize: "1rem",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? t(T.login.submitting) : t(T.login.submit)}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center mt-6" style={{ fontSize: "0.875rem", color: muted }}>
            {t(T.login.noAccount)}{" "}
            <button
              onClick={() => onNavigate("register")}
              style={{ color: "#3B5BDB", fontWeight: 500 }}
              className="hover:underline"
            >
              {t(T.login.registerLink)}
            </button>
          </p>
        </div>

        {/* Guest option */}
        <p className="text-center mt-4" style={{ fontSize: "0.8rem", color: muted }}>
          {t(T.login.guest)}{" "}
          <button
            onClick={() => onNavigate("catalog")}
            style={{ color: "#00D4AC", fontWeight: 500 }}
            className="hover:underline"
          >
            {t(T.login.guestLink)}
          </button>
        </p>

        {/* Forgot Password Modal */}
        {showForgotModal && (
          <ForgotPasswordModal
            darkMode={dm}
            initialStep={initialStep}
            onClose={() => {
              setShowForgotModal(false);
              if (typeof window !== "undefined" && window.history && window.history.replaceState) {
                window.history.replaceState(null, "", window.location.pathname);
              }
            }}
            onSuccessLogin={(resetEmail) => setEmail(resetEmail)}
          />
        )}
      </div>
    </div>
  );
}
