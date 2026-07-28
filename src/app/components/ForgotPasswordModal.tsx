import { useState } from "react";
import { X, Mail, KeyRound, CheckCircle2, AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";
import { apiForgotPassword, apiResetPassword } from "../api/users";
import { useToast } from "../contexts/ToastContext";

interface ForgotPasswordModalProps {
  darkMode: boolean;
  onClose: () => void;
  onSuccessLogin?: (email: string) => void;
  initialStep?: 1 | 2;
}

export function ForgotPasswordModal({ darkMode: dm, onClose, onSuccessLogin, initialStep = 1 }: ForgotPasswordModalProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2>(initialStep);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFromEmailLink = typeof window !== "undefined" && (window.location.href.includes("type=recovery") || window.location.href.includes("access_token"));

  const modalBg = dm ? "#161B2E" : "#FFFFFF";
  const border  = dm ? "#1E2D4F" : "#E5E7EB";
  const text    = dm ? "#F1F5F9" : "#0F1B35";
  const muted   = dm ? "#94A3B8" : "#6B7280";
  const inputBg = dm ? "#0D1117" : "#F9FAFB";
  const headerBg = dm ? "#0D1117" : "#F8FAFC";

  // Step 1: Send Magic Link to Email
  const handleSendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError(t(T.forgot.invalidEmailErr));
      return;
    }

    setLoading(true);
    const res = await apiForgotPassword(email);
    setLoading(false);

    if (res.success) {
      setEmailSent(true);
      showToast(`${t(T.forgot.sentTitle)} (${email})`, "info");
    } else {
      setError(res.error || t(T.forgot.userNotFoundErr));
    }
  };

  // Step 2: Reset Password (arrived from Email Link)
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError(t(T.forgot.passMinErr));
      return;
    }
    if (newPassword !== confirmPassword) {
      setError(t(T.forgot.passMismatchErr));
      return;
    }

    setLoading(true);
    const res = await apiResetPassword(email, "", newPassword);
    setLoading(false);

    if (res.success) {
      showToast(t(T.forgot.resetSuccessToast), "success");
      if (onSuccessLogin) onSuccessLogin(email);
      onClose();
    } else {
      setError(res.error || t(T.forgot.resetExpiredErr));
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-modal-title"
    >
      <div
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border flex flex-col transition-all"
        style={{ backgroundColor: modalBg, borderColor: border }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
          style={{ backgroundColor: headerBg, borderColor: border }}
        >
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-[#3B5BDB]" aria-hidden="true" />
            <h2 id="forgot-modal-title" className="font-bold text-lg" style={{ color: text }}>
              {t(T.forgot.modalTitle)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-500/10 transition-colors text-gray-400 hover:text-gray-200 active:scale-95"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {step === 1 ? (
            emailSent ? (
              <div className="text-center py-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg" style={{ color: text }}>
                  {t(T.forgot.sentTitle)}
                </h3>
                <p style={{ color: muted, fontSize: "0.875rem", lineHeight: 1.5 }}>
                  {t(T.forgot.sentDesc)} <strong>{email}</strong>. {t(T.forgot.sentCheckInbox)}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 rounded-xl font-semibold text-white mt-2 active:scale-95 transition-all"
                  style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)" }}
                >
                  {t(T.forgot.closeBtn)}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendLink} className="space-y-4">
                <p style={{ color: muted, fontSize: "0.875rem", lineHeight: 1.5 }}>
                  {t(T.forgot.step1Desc)}
                </p>

                <div>
                  <label
                    htmlFor="forgot-email"
                    style={{ fontSize: "0.85rem", fontWeight: 600, color: text, display: "block", marginBottom: "0.375rem" }}
                  >
                    {t(T.forgot.emailLabel)}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t(T.forgot.emailPh)}
                      required
                      className="w-full pl-11 pr-4 py-3 rounded-xl outline-none transition-all"
                      style={{
                        backgroundColor: inputBg,
                        border: `1.5px solid ${error ? "#EF4444" : border}`,
                        color: text,
                        fontSize: "0.95rem",
                      }}
                    />
                  </div>
                </div>

                {error && (
                  <div className="rounded-lg p-3 flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold text-white active:scale-95 transition-all flex items-center justify-center gap-2"
                  style={{
                    background: loading ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? t(T.forgot.sendingBtn) : t(T.forgot.sendBtn)}
                </button>
              </form>
            )
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t(T.forgot.verifiedTitle)}</span>
                </div>
                <p style={{ color: dm ? "#CBD5E1" : "#334155" }}>
                  {t(T.forgot.verifiedDesc)}
                </p>
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  style={{ fontSize: "0.85rem", fontWeight: 600, color: text, display: "block", marginBottom: "0.375rem" }}
                >
                  {t(T.forgot.newPasswordLabel)}
                </label>
                <input
                  id="new-password"
                  name="new-password"
                  autoComplete="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t(T.forgot.newPasswordPh)}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{
                    backgroundColor: inputBg,
                    border: `1.5px solid ${error ? "#EF4444" : border}`,
                    color: text,
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  style={{ fontSize: "0.85rem", fontWeight: 600, color: text, display: "block", marginBottom: "0.375rem" }}
                >
                  {t(T.forgot.confirmPassLabel)}
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  autoComplete="new-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t(T.forgot.confirmPassPh)}
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none transition-all"
                  style={{
                    backgroundColor: inputBg,
                    border: `1.5px solid ${error ? "#EF4444" : border}`,
                    color: text,
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              {error && (
                <div className="rounded-lg p-3 flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 rounded-xl font-medium border text-gray-400 hover:text-white transition-all flex items-center gap-1.5"
                  style={{ borderColor: border }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t(T.forgot.backBtn)}
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl font-semibold text-white active:scale-95 transition-all"
                  style={{
                    background: loading ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? t(T.forgot.submittingBtn) : t(T.forgot.submitBtn)}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
