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
}

export function ForgotPasswordModal({ darkMode: dm, onClose, onSuccessLogin }: ForgotPasswordModalProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [simulatedCode, setSimulatedCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const modalBg = dm ? "#161B2E" : "#FFFFFF";
  const border  = dm ? "#1E2D4F" : "#E5E7EB";
  const text    = dm ? "#F1F5F9" : "#0F1B35";
  const muted   = dm ? "#94A3B8" : "#6B7280";
  const inputBg = dm ? "#0D1117" : "#F9FAFB";
  const headerBg = dm ? "#0D1117" : "#F8FAFC";

  // Step 1: Send Confirmation Code to Email
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Masukkan alamat email UB yang valid.");
      return;
    }

    setLoading(true);
    const res = await apiForgotPassword(email);
    setLoading(false);

    if (res.success) {
      if (res.code) {
        setSimulatedCode(res.code);
        setCode(res.code); // Autofill for convenience in testing
      }
      showToast(`Kode konfirmasi telah dikirim ke ${email}`, "info");
      setStep(2);
    } else {
      setError(res.error || "Email UB tidak terdaftar dalam sistem Pustakability.");
    }
  };

  // Step 2: Confirm Code & Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword.length < 6) {
      setError("Kata sandi baru minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi kata sandi baru tidak cocok.");
      return;
    }

    setLoading(true);
    const res = await apiResetPassword(email, code, newPassword);
    setLoading(false);

    if (res.success) {
      showToast("Kata sandi berhasil diperbarui! Silakan login.", "success");
      if (onSuccessLogin) onSuccessLogin(email);
      onClose();
    } else {
      setError(res.error || "Kode konfirmasi tidak valid atau telah kadaluarsa.");
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
        className="relative w-full max-w-md rounded-2xl shadow-2xl border flex flex-col overflow-hidden transition-all"
        style={{ backgroundColor: modalBg, borderColor: border }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ backgroundColor: headerBg, borderColor: border }}
        >
          <div className="flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 text-[#3B5BDB]" aria-hidden="true" />
            <h2 id="forgot-modal-title" className="font-bold text-lg" style={{ color: text }}>
              Reset Kata Sandi
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
            <form onSubmit={handleSendCode} className="space-y-4">
              <p style={{ color: muted, fontSize: "0.875rem", lineHeight: 1.5 }}>
                Masukkan alamat email UB terdaftar Anda. Kami akan mengirimkan kode konfirmasi 6-digit untuk me-reset kata sandi.
              </p>

              <div>
                <label
                  htmlFor="forgot-email"
                  style={{ fontSize: "0.85rem", fontWeight: 600, color: text, display: "block", marginBottom: "0.375rem" }}
                >
                  Email UB Terdaftar
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" aria-hidden="true" />
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@student.ub.ac.id"
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
                {loading ? "Sending Code..." : "Kirim Kode Konfirmasi via Email"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {simulatedCode && (
                <div className="p-3.5 rounded-xl border bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Kode Konfirmasi Email Terkirim!</div>
                    <div className="mt-0.5">
                      Kode konfirmasi email 6-digit Anda: <strong className="text-emerald-500 font-mono text-sm tracking-widest">{simulatedCode}</strong>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="reset-code"
                  style={{ fontSize: "0.85rem", fontWeight: 600, color: text, display: "block", marginBottom: "0.375rem" }}
                >
                  Kode Konfirmasi Email (6 Digit)
                </label>
                <input
                  id="reset-code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  required
                  className="w-full px-4 py-3 rounded-xl outline-none font-mono text-center text-lg tracking-widest transition-all"
                  style={{
                    backgroundColor: inputBg,
                    border: `1.5px solid ${error ? "#EF4444" : border}`,
                    color: text,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="new-password"
                  style={{ fontSize: "0.85rem", fontWeight: 600, color: text, display: "block", marginBottom: "0.375rem" }}
                >
                  Kata Sandi Baru
                </label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
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
                  Konfirmasi Kata Sandi Baru
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi kata sandi baru"
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
                  Kembali
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
                  {loading ? "Memproses..." : "Ubah Kata Sandi"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
