import { useState } from "react";
import { Plus, Clock, CheckCircle, XCircle, BookOpen, Upload } from "lucide-react";
import type { AuthUser, Page } from "../App";
import { categories } from "../data/books";

interface VolunteerDashboardProps {
  darkMode: boolean;
  user: AuthUser;
  onNavigate: (page: Page) => void;
}

type Tab = "submissions" | "add";

const mySubmissions = [
  {
    id: "p1",
    title: "Antropologi Budaya Nusantara",
    author: "Dr. Maya Sari, M.Hum.",
    category: "Sosial",
    status: "pending",
    submittedAt: "2024-04-10",
  },
];

const formatOptions = ["Audio", "PDF Aksesibel", "DAISY", "Braille Digital"];

export function VolunteerDashboard({ darkMode: dm, user, onNavigate }: VolunteerDashboardProps) {
  const [tab, setTab] = useState<Tab>("submissions");
  const [submissions, setSubmissions] = useState(mySubmissions);
  const [form, setForm] = useState({
    title: "",
    author: "",
    publisher: "",
    category: "",
    year: new Date().getFullYear().toString(),
    description: "",
    coverUrl: "",
    formats: [] as string[],
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const toggleFormat = (fmt: string) => {
    setForm(f => ({
      ...f,
      formats: f.formats.includes(fmt) ? f.formats.filter(x => x !== fmt) : [...f.formats, fmt],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmissions(prev => [
      {
        id: `p${Date.now()}`,
        title: form.title,
        author: form.author,
        category: form.category,
        status: "pending",
        submittedAt: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTab("submissions"); setForm({ title: "", author: "", publisher: "", category: "", year: new Date().getFullYear().toString(), description: "", coverUrl: "", formats: [] }); }, 2500);
  };

  const statusBadge: Record<string, { bg: string; text: string; label: string; icon: React.FC<any> }> = {
    pending: { bg: "#FEF9C3", text: "#854D0E", label: "Menunggu Validasi", icon: Clock },
    approved: { bg: "#DCFCE7", text: "#166534", label: "Disetujui", icon: CheckCircle },
    rejected: { bg: "#FEE2E2", text: "#991B1B", label: "Ditolak", icon: XCircle },
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: bg }}>
      {/* Header */}
      <div className="py-8 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #0D7070, #0A1172)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="w-6 h-6 text-[#00D4AC]" />
            <h1 className="text-white" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
              Dashboard Volunteer
            </h1>
          </div>
          <p className="text-blue-200" style={{ fontSize: "0.9rem" }}>
            Halo, <strong>{user.name}</strong>! Kontribusikan buku ke koleksi Pustakability.
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ backgroundColor: card, borderBottom: `1px solid ${border}` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {[
              { id: "submissions" as Tab, label: `Pengajuan Saya (${submissions.length})` },
              { id: "add" as Tab, label: "Tambah Buku Baru" },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-4 border-b-2 transition-colors whitespace-nowrap"
                style={{
                  borderBottomColor: tab === t.id ? "#3B5BDB" : "transparent",
                  color: tab === t.id ? "#3B5BDB" : muted,
                  fontSize: "0.875rem",
                  fontWeight: tab === t.id ? 600 : 400,
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Submissions Tab */}
        {tab === "submissions" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>Buku yang Saya Ajukan</h2>
              <button
                onClick={() => setTab("add")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
                style={{ backgroundColor: "#0A1172", fontSize: "0.875rem", fontWeight: 500 }}
              >
                <Plus className="w-4 h-4" />
                Tambah Buku
              </button>
            </div>

            {submissions.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{ backgroundColor: card, border: `1px solid ${border}` }}
              >
                <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: muted }} />
                <p style={{ color: muted }}>Belum ada buku yang diajukan.</p>
                <button
                  onClick={() => setTab("add")}
                  className="mt-4 px-5 py-2 rounded-xl text-white"
                  style={{ backgroundColor: "#0A1172", fontSize: "0.875rem" }}
                >
                  Ajukan Buku Pertama
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {submissions.map((s) => {
                  const st = statusBadge[s.status];
                  const StatusIcon = st.icon;
                  return (
                    <div
                      key={s.id}
                      className="rounded-2xl p-5 flex items-start justify-between gap-4"
                      style={{ backgroundColor: card, border: `1px solid ${border}` }}
                    >
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>{s.title}</h3>
                        <p style={{ fontSize: "0.85rem", color: muted }}>{s.author} · {s.category}</p>
                        <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.25rem" }}>
                          Diajukan: {s.submittedAt}
                        </p>
                      </div>
                      <span
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: st.bg, color: st.text, fontSize: "0.78rem", fontWeight: 600 }}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Info box */}
            <div
              className="mt-6 rounded-xl p-4"
              style={{ backgroundColor: dm ? "#1E2D4F" : "#EEF2FF", border: `1px solid ${dm ? "#2A3F6F" : "#C7D2FE"}` }}
            >
              <p style={{ fontSize: "0.8rem", color: dm ? "#93C5FD" : "#3730A3", lineHeight: 1.6 }}>
                <strong>Alur Validasi:</strong> Setelah Anda mengajukan buku, tim admin Pustakability akan mereview
                dalam 1–3 hari kerja. Anda akan mendapat notifikasi email setelah buku disetujui atau ditolak.
              </p>
            </div>
          </div>
        )}

        {/* Add Book Tab */}
        {tab === "add" && (
          <div className="rounded-2xl p-6" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: text, marginBottom: "1.5rem" }}>
              Formulir Pengajuan Buku Baru
            </h2>

            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-green-100">
                  <CheckCircle className="w-9 h-9 text-green-600" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: text }}>Pengajuan Terkirim!</h3>
                <p style={{ fontSize: "0.9rem", color: muted, marginTop: "0.5rem" }}>
                  Buku Anda sedang direview oleh admin. Mengalihkan ke halaman pengajuan...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      Judul Buku <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="Judul lengkap buku"
                      required
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      Penulis <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={form.author}
                      onChange={e => setForm({ ...form, author: e.target.value })}
                      placeholder="Nama penulis / editor"
                      required
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      Penerbit
                    </label>
                    <input
                      type="text"
                      value={form.publisher}
                      onChange={e => setForm({ ...form, publisher: e.target.value })}
                      placeholder="Nama penerbit"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      Kategori <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      required
                      style={{ ...inputStyle, cursor: "pointer" }}
                    >
                      <option value="">Pilih kategori</option>
                      {categories.filter(c => c !== "Semua").map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                      Tahun Terbit
                    </label>
                    <input
                      type="number"
                      value={form.year}
                      onChange={e => setForm({ ...form, year: e.target.value })}
                      min="1900"
                      max="2030"
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    Deskripsi Singkat <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Deskripsikan isi dan tujuan buku ini..."
                    required
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.375rem" }}>
                    URL Sampul Buku
                  </label>
                  <input
                    type="url"
                    value={form.coverUrl}
                    onChange={e => setForm({ ...form, coverUrl: e.target.value })}
                    placeholder="https://... (opsional)"
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "0.875rem", fontWeight: 500, color: text, display: "block", marginBottom: "0.5rem" }}>
                    Format Aksesibel Tersedia <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formatOptions.map(fmt => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => toggleFormat(fmt)}
                        className="px-4 py-2 rounded-xl transition-all"
                        style={{
                          border: `2px solid ${form.formats.includes(fmt) ? "#0A1172" : border}`,
                          backgroundColor: form.formats.includes(fmt) ? (dm ? "#1E2D4F" : "#EEF2FF") : "transparent",
                          color: form.formats.includes(fmt) ? "#3B5BDB" : muted,
                          fontSize: "0.85rem",
                          fontWeight: form.formats.includes(fmt) ? 600 : 400,
                        }}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                  {form.formats.length === 0 && (
                    <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.25rem" }}>
                      Pilih minimal satu format
                    </p>
                  )}
                </div>

                <div
                  className="rounded-xl p-4"
                  style={{ backgroundColor: dm ? "#1E2D4F" : "#FEF9C3", border: `1px solid ${dm ? "#2A3F6F" : "#FDE68A"}` }}
                >
                  <p style={{ fontSize: "0.8rem", color: dm ? "#FCD34D" : "#92400E", lineHeight: 1.5 }}>
                    <strong>Penting:</strong> Pastikan buku yang Anda ajukan bebas hak cipta atau memiliki izin
                    distribusi yang sesuai. Pengajuan yang melanggar hak cipta akan langsung ditolak.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading || form.formats.length === 0}
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
                  style={{
                    background: (loading || form.formats.length === 0) ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                    fontSize: "1rem",
                    cursor: (loading || form.formats.length === 0) ? "not-allowed" : "pointer",
                  }}
                >
                  <Upload className="w-4 h-4" />
                  {loading ? "Mengirim..." : "Kirim Pengajuan"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
