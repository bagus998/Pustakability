import { useState, useEffect } from "react";
import { X, Save, UserCog } from "lucide-react";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "volunteer";
  faculty: string;
  status: "active" | "pending" | "suspended";
  joined: string;
}

interface EditUserModalProps {
  user: AppUser;
  darkMode: boolean;
  onSave: (id: string, updates: Partial<AppUser>) => void;
  onClose: () => void;
}

const faculties = [
  "Hukum", "Ilmu Administrasi", "Pertanian", "Teknik", "Kedokteran",
  "Perikanan & Ilmu Kelautan", "Peternakan", "Ilmu Sosial & Ilmu Politik",
  "Ilmu Budaya", "MIPA", "Teknologi Pertanian", "Ekonomi & Bisnis",
  "Ilmu Komputer", "Ilmu Kesehatan", "Vokasi",
];

const roleBadge: Record<string, { bg: string; text: string }> = {
  admin:     { bg: "#FCE7F3", text: "#9D174D" },
  user:      { bg: "#EEF2FF", text: "#3730A3" },
  volunteer: { bg: "#F0FDF4", text: "#166534" },
};

const statusBadge: Record<string, { bg: string; text: string; label: string }> = {
  active:    { bg: "#DCFCE7", text: "#166534", label: "Aktif" },
  pending:   { bg: "#FEF9C3", text: "#854D0E", label: "Menunggu" },
  suspended: { bg: "#FEE2E2", text: "#991B1B", label: "Ditangguhkan" },
};

export function EditUserModal({ user, darkMode: dm, onSave, onClose }: EditUserModalProps) {
  const [form, setForm] = useState<AppUser>({ ...user });
  const [saving, setSaving] = useState(false);
  const [saved,  setSaved]  = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const overlay  = dm ? "#0D1117E6" : "#0F1B35CC";
  const card     = dm ? "#161B2E"   : "#FFFFFF";
  const border   = dm ? "#1E2D4F"   : "#E5E7EB";
  const text     = dm ? "#F1F5F9"   : "#0F1B35";
  const muted    = dm ? "#94A3B8"   : "#6B7280";
  const inputBg  = dm ? "#0D1117"   : "#F9FAFB";
  const sectionBg= dm ? "#0F1623"   : "#F9FAFB";

  const inputStyle: React.CSSProperties = {
    backgroundColor: inputBg,
    border: `1.5px solid ${border}`,
    color: text,
    fontSize: "0.9rem",
    borderRadius: "0.75rem",
    padding: "0.65rem 0.875rem",
    width: "100%",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.78rem",
    fontWeight: 600,
    color: muted,
    display: "block",
    marginBottom: "0.375rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    onSave(user.id, form);
    setSaving(false);
    setSaved(true);
    setTimeout(onClose, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: overlay, backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-user-title"
    >
      <div
        className="w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ backgroundColor: card, border: `1px solid ${border}`, maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: `1px solid ${border}` }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)" }}>
              <UserCog className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 id="edit-user-title" style={{ fontSize: "1.05rem", fontWeight: 700, color: text }}>Edit Pengguna</h2>
              <p style={{ fontSize: "0.72rem", color: muted }}>ID: {user.id} · Bergabung {user.joined}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl transition-colors"
            style={{ color: muted }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Avatar preview row */}
        <div className="px-6 py-4 flex items-center gap-4 flex-shrink-0" style={{ backgroundColor: sectionBg, borderBottom: `1px solid ${border}` }}>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
            style={{
              backgroundColor: roleBadge[form.role]?.text ?? "#0A1172",
              fontSize: "1.35rem",
              fontWeight: 700,
            }}
            aria-hidden="true"
          >
            {form.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div style={{ fontSize: "1rem", fontWeight: 600, color: text }} className="truncate">{form.name || "—"}</div>
            <div style={{ fontSize: "0.8rem", color: muted }} className="truncate">{form.email || "—"}</div>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full capitalize" style={{ backgroundColor: roleBadge[form.role]?.bg, color: roleBadge[form.role]?.text, fontSize: "0.72rem", fontWeight: 600 }}>
                {form.role}
              </span>
              <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: statusBadge[form.status]?.bg, color: statusBadge[form.status]?.text, fontSize: "0.72rem", fontWeight: 600 }}>
                {statusBadge[form.status]?.label}
              </span>
            </div>
          </div>
        </div>

        {/* Form body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="sm:col-span-2">
              <label htmlFor="u-name" style={labelStyle}>Nama Lengkap</label>
              <input
                id="u-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label htmlFor="u-email" style={labelStyle}>Email</label>
              <input
                id="u-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="u-role" style={labelStyle}>Peran</label>
              <select
                id="u-role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as AppUser["role"] })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="user">Pengguna (User)</option>
                <option value="volunteer">Volunteer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="u-status" style={labelStyle}>Status Akun</label>
              <select
                id="u-status"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as AppUser["status"] })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="active">Aktif</option>
                <option value="pending">Menunggu Verifikasi</option>
                <option value="suspended">Ditangguhkan</option>
              </select>
            </div>

            {/* Faculty */}
            <div className="sm:col-span-2">
              <label htmlFor="u-faculty" style={labelStyle}>Fakultas</label>
              <select
                id="u-faculty"
                value={form.faculty}
                onChange={(e) => setForm({ ...form, faculty: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {faculties.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Warning if suspending */}
            {form.status === "suspended" && (
              <div
                className="sm:col-span-2 rounded-xl px-4 py-3"
                style={{ backgroundColor: "#FEF9C3", border: "1px solid #FDE68A" }}
              >
                <p style={{ fontSize: "0.8rem", color: "#92400E", lineHeight: 1.5 }}>
                  <strong>Perhatian:</strong> Pengguna yang ditangguhkan tidak dapat mengakses koleksi Pustakability.
                </p>
              </div>
            )}
            {form.role === "admin" && form.role !== user.role && (
              <div
                className="sm:col-span-2 rounded-xl px-4 py-3"
                style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}
              >
                <p style={{ fontSize: "0.8rem", color: "#991B1B", lineHeight: 1.5 }}>
                  <strong>Perhatian:</strong> Anda akan memberikan hak akses Administrator penuh kepada pengguna ini.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0" style={{ borderTop: `1px solid ${border}` }}>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl transition-colors"
            style={{ border: `1.5px solid ${border}`, color: text, fontSize: "0.875rem" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F9FAFB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !form.name || !form.email}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all"
            style={{
              background: saved
                ? "#16A34A"
                : saving || !form.name || !form.email
                ? "#94A3B8"
                : "linear-gradient(135deg, #0A1172, #3B5BDB)",
              fontSize: "0.875rem",
              cursor: saving || !form.name || !form.email ? "not-allowed" : "pointer",
            }}
          >
            <Save className="w-4 h-4" />
            {saved ? "Tersimpan!" : saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}
