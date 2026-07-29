import { useState, useRef } from "react";
import { X, User, Lock, Upload, Save, KeyRound, AlertCircle, CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";
import { AppUser } from "./EditUserModal";
import { useToast } from "../contexts/ToastContext";
import { apiChangePassword } from "../api/users";

interface ProfileModalProps {
  user: AppUser;
  darkMode: boolean;
  onClose: () => void;
  onUpdateUser: (id: string, updates: Partial<AppUser>) => void;
}

const faculties = [
  "Hukum", "Ilmu Administrasi", "Pertanian", "Teknik", "Kedokteran",
  "Perikanan & Ilmu Kelautan", "Peternakan", "Ilmu Sosial & Ilmu Politik",
  "Ilmu Budaya", "MIPA", "Teknologi Pertanian", "Ekonomi & Bisnis",
  "Ilmu Komputer", "Ilmu Kesehatan", "Vokasi", "Rektorat",
];

export function ProfileModal({ user, darkMode: dm, onClose, onUpdateUser }: ProfileModalProps) {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<"info" | "security">("info");

  // Profile Info Form State
  const [name, setName] = useState(user.name || "");
  const [nim, setNim] = useState(user.nim || "");
  const [faculty, setFaculty] = useState(user.faculty || "Teknik");
  const [disability, setDisability] = useState(user.disability || "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || "");
  const [savingInfo, setSavingInfo] = useState(false);

  // Security / Password Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [updatingPass, setUpdatingPass] = useState(false);

  const modalBg  = dm ? "#161B2E" : "#FFFFFF";
  const border   = dm ? "#1E2D4F" : "#E5E7EB";
  const text     = dm ? "#F1F5F9" : "#0F1B35";
  const muted    = dm ? "#94A3B8" : "#6B7280";
  const inputBg  = dm ? "#0D1117" : "#F9FAFB";
  const headerBg = dm ? "#0D1117" : "#F8FAFC";

  // Handle Avatar Image File Upload Preview
  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast("Ukuran foto maksimal 5MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Profile Info
  const handleSaveInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSavingInfo(true);
    try {
      await onUpdateUser(user.id, {
        name: name.trim(),
        nim: nim.trim(),
        faculty,
        disability: disability.trim(),
        avatarUrl,
      });
      showToast(t(T.profile.saveSuccess), "success");
      onClose();
    } catch {
      showToast("Gagal memperbarui profil.", "error");
    } finally {
      setSavingInfo(false);
    }
  };

  // Update Password
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");

    if (!currentPassword) {
      setPassError(t(T.profile.currentPassErr));
      return;
    }
    if (newPassword.length < 8) {
      setPassError(t(T.profile.passMinErr));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError(t(T.profile.passMismatchErr));
      return;
    }

    setUpdatingPass(true);
    const res = await apiChangePassword(user.email, currentPassword, newPassword);
    setUpdatingPass(false);

    if (res.success) {
      showToast(t(T.profile.passSuccess), "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onClose();
    } else {
      if (res.error === "currentPassErr") {
        setPassError(t(T.profile.currentPassErr));
      } else {
        setPassError(res.error || t(T.profile.currentPassErr));
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border flex flex-col transition-all"
        style={{ backgroundColor: modalBg, borderColor: border }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b sticky top-0 z-10"
          style={{ backgroundColor: headerBg, borderColor: border }}
        >
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#3B5BDB]" aria-hidden="true" />
            <h2 id="profile-modal-title" className="font-bold text-lg" style={{ color: text }}>
              {t(T.profile.modalTitle)}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-500/10 transition-colors text-gray-400 hover:text-gray-200 active:scale-95"
            aria-label="Tutup modal profil"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b px-6 pt-2" style={{ borderColor: border }}>
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className="flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-sm transition-all"
            style={{
              borderColor: activeTab === "info" ? "#3B5BDB" : "transparent",
              color: activeTab === "info" ? "#3B5BDB" : muted,
              fontWeight: activeTab === "info" ? 600 : 400,
            }}
          >
            <User className="w-4 h-4" />
            {t(T.profile.tabInfo)}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("security")}
            className="flex items-center gap-2 py-3 px-4 border-b-2 font-medium text-sm transition-all"
            style={{
              borderColor: activeTab === "security" ? "#3B5BDB" : "transparent",
              color: activeTab === "security" ? "#3B5BDB" : muted,
              fontWeight: activeTab === "security" ? 600 : 400,
            }}
          >
            <Lock className="w-4 h-4" />
            {t(T.profile.tabSecurity)}
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {activeTab === "info" ? (
            <form onSubmit={handleSaveInfo} className="space-y-4">
              {/* Profile Avatar Upload */}
              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border" style={{ borderColor: border, backgroundColor: inputBg }}>
                <div className="relative group">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={name || "Avatar"}
                      className="w-20 h-20 rounded-full object-cover border-2 border-[#3B5BDB] shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-[#0A1172] text-white font-bold text-2xl flex items-center justify-center border-2 border-[#3B5BDB] shadow-md">
                      {name ? name[0].toUpperCase() : "U"}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    aria-label={t(T.profile.avatarUploadBtn)}
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <label className="font-semibold text-xs uppercase tracking-wider" style={{ color: muted }}>
                    {t(T.profile.avatarLabel)}
                  </label>
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg border text-xs font-semibold hover:bg-gray-500/10 transition-colors flex items-center gap-1.5"
                      style={{ borderColor: border, color: text }}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      {t(T.profile.avatarUploadBtn)}
                    </button>
                    {avatarUrl && (
                      <button
                        type="button"
                        onClick={() => setAvatarUrl("")}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        Hapus Foto
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarFile}
                  />
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="profile-name" className="block text-xs font-semibold mb-1" style={{ color: text }}>
                  {t(T.profile.nameLabel)} <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t(T.profile.namePh)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl outline-none transition-all text-sm"
                  style={{ backgroundColor: inputBg, border: `1.5px solid ${border}`, color: text }}
                />
              </div>

              {/* NIM */}
              <div>
                <label htmlFor="profile-nim" className="block text-xs font-semibold mb-1" style={{ color: text }}>
                  {t(T.profile.nimLabel)}
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="profile-nim"
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder={t(T.profile.nimPh)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all text-sm"
                    style={{ backgroundColor: inputBg, border: `1.5px solid ${border}`, color: text }}
                  />
                </div>
              </div>

              {/* Email (Readonly) & Role (Badge) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: muted }}>
                    {t(T.profile.emailLabel)}
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-xl text-sm opacity-70 cursor-not-allowed"
                    style={{ backgroundColor: inputBg, border: `1.5px solid ${border}`, color: muted }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: muted }}>
                    {t(T.profile.roleLabel)}
                  </label>
                  <div className="px-4 py-2.5 rounded-xl border text-sm font-semibold capitalize flex items-center gap-1.5" style={{ backgroundColor: inputBg, borderColor: border, color: "#3B5BDB" }}>
                    <ShieldCheck className="w-4 h-4 text-[#00D4AC]" />
                    {user.role}
                  </div>
                </div>
              </div>

              {/* Faculty & Disability Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="profile-faculty" className="block text-xs font-semibold mb-1" style={{ color: text }}>
                    {t(T.profile.facultyLabel)}
                  </label>
                  <select
                    id="profile-faculty"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl outline-none text-sm transition-all cursor-pointer"
                    style={{ backgroundColor: inputBg, border: `1.5px solid ${border}`, color: text }}
                  >
                    {faculties.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="profile-disability" className="block text-xs font-semibold mb-1" style={{ color: text }}>
                    {t(T.profile.disabilityLabel)}
                  </label>
                  <input
                    id="profile-disability"
                    type="text"
                    value={disability}
                    onChange={(e) => setDisability(e.target.value)}
                    placeholder={t(T.profile.disabilityPh)}
                    className="w-full px-4 py-2.5 rounded-xl outline-none text-sm transition-all"
                    style={{ backgroundColor: inputBg, border: `1.5px solid ${border}`, color: text }}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={savingInfo}
                  className="w-full py-3 rounded-xl font-semibold text-white active:scale-95 transition-all flex items-center justify-center gap-2"
                  style={{
                    background: savingInfo ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                    cursor: savingInfo ? "not-allowed" : "pointer",
                  }}
                >
                  <Save className="w-4 h-4" />
                  {savingInfo ? t(T.profile.savingBtn) : t(T.profile.saveBtn)}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <p className="text-xs leading-relaxed" style={{ color: muted }}>
                Untuk keamanan akun, Anda harus memasukkan kata sandi saat ini sebelum menetapkan kata sandi baru.
              </p>

              {/* Current Password */}
              <div>
                <label htmlFor="current-pass" className="block text-xs font-semibold mb-1" style={{ color: text }}>
                  {t(T.profile.currentPassLabel)} <span className="text-red-500">*</span>
                </label>
                <input
                  id="current-pass"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={t(T.profile.currentPassPh)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl outline-none transition-all text-sm"
                  style={{ backgroundColor: inputBg, border: `1.5px solid ${passError ? "#EF4444" : border}`, color: text }}
                />
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="profile-new-pass" className="block text-xs font-semibold mb-1" style={{ color: text }}>
                  {t(T.profile.newPassLabel)} <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-new-pass"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t(T.profile.newPassPh)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl outline-none transition-all text-sm"
                  style={{ backgroundColor: inputBg, border: `1.5px solid ${passError ? "#EF4444" : border}`, color: text }}
                />
              </div>

              {/* Confirm New Password */}
              <div>
                <label htmlFor="profile-confirm-pass" className="block text-xs font-semibold mb-1" style={{ color: text }}>
                  {t(T.profile.confirmPassLabel)} <span className="text-red-500">*</span>
                </label>
                <input
                  id="profile-confirm-pass"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t(T.profile.confirmPassPh)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl outline-none transition-all text-sm"
                  style={{ backgroundColor: inputBg, border: `1.5px solid ${passError ? "#EF4444" : border}`, color: text }}
                />
              </div>

              {passError && (
                <div className="rounded-lg p-3 flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{passError}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={updatingPass}
                  className="w-full py-3 rounded-xl font-semibold text-white active:scale-95 transition-all flex items-center justify-center gap-2"
                  style={{
                    background: updatingPass ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                    cursor: updatingPass ? "not-allowed" : "pointer",
                  }}
                >
                  <KeyRound className="w-4 h-4" />
                  {updatingPass ? t(T.profile.updatingPassBtn) : t(T.profile.updatePassBtn)}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
