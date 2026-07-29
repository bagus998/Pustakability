import { useState } from "react";
import { Plus, Clock, CheckCircle, XCircle, BookOpen } from "lucide-react";
import type { AuthUser, Page } from "../App";
import { categories } from "../data/books";
import { FileUploadForm } from "./FileUploadForm";
import { apiUploadBook } from "../api/books";
import { useBooks } from "../contexts/BookContext";
import type { Book } from "../data/books";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

interface VolunteerDashboardProps {
  darkMode: boolean;
  user: AuthUser;
  onNavigate: (page: Page) => void;
}

type Tab = "submissions" | "add";

const formatOptions = ["Audio", "PDF Aksesibel", "DAISY", "Braille Digital"];

// statusBadge built inside component using t() so labels translate

export function VolunteerDashboard({ darkMode: dm, user, onNavigate }: VolunteerDashboardProps) {
  const { t } = useLanguage();
  const { pendingBooks, addLocalBook } = useBooks();

  const statusBadge: Record<string, { bg: string; text: string; label: string; icon: React.FC<any> }> = {
    pending:  { bg: "#FEF9C3", text: "#854D0E", label: t(T.volunteer.status.pending),  icon: Clock },
    approved: { bg: "#DCFCE7", text: "#166534", label: t(T.volunteer.status.approved), icon: CheckCircle },
    rejected: { bg: "#FEE2E2", text: "#991B1B", label: t(T.volunteer.status.rejected), icon: XCircle },
  };
  const mySubmissions = pendingBooks.filter((b) => b.submittedBy === user.email);

  const [tab, setTab] = useState<Tab>("submissions");

  // Form state
  const [form, setForm] = useState({
    title: "", author: "", publisher: "", category: "",
    year: new Date().getFullYear().toString(), description: "",
    coverImage: "", formats: [] as string[],
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [uploadDone, setUploadDone] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const bg      = dm ? "#0D1117" : "#F5F7FF";
  const card    = dm ? "#161B2E" : "#FFFFFF";
  const border  = dm ? "#1E2D4F" : "#E5E7EB";
  const text    = dm ? "#F1F5F9" : "#0F1B35";
  const muted   = dm ? "#94A3B8" : "#6B7280";
  const inputBg = dm ? "#0D1117" : "#F9FAFB";

  const inputStyle: React.CSSProperties = {
    backgroundColor: inputBg, border: `1.5px solid ${border}`,
    color: text, fontSize: "0.9rem", borderRadius: "0.75rem",
    padding: "0.65rem 0.875rem", width: "100%", outline: "none",
  };

  const toggleFormat = (fmt: string) =>
    setForm((f) => ({
      ...f,
      formats: f.formats.includes(fmt) ? f.formats.filter((x) => x !== fmt) : [...f.formats, fmt],
    }));

  const resetForm = () => {
    setForm({ title: "", author: "", publisher: "", category: "", year: new Date().getFullYear().toString(), description: "", coverImage: "", formats: [] });
    setSelectedFile(null);
    setProgress(0);
    setUploadError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.category) {
      setUploadError("Judul, penulis, dan kategori wajib diisi.");
      return;
    }
    if (!selectedFile) {
      setUploadError("Pilih file buku (.epub, .txt, atau .pdf).");
      return;
    }

    setUploading(true);
    setUploadError("");
    setProgress(0);

    try {
      const result = await apiUploadBook(
        {
          title:       form.title,
          author:      form.author,
          publisher:   form.publisher || "UB Press",
          category:    form.category,
          year:        parseInt(form.year),
          description: form.description,
          submittedBy: user.email,
          formats:     form.formats,
          coverImage:  form.coverImage,
          file:        selectedFile,
        },
        setProgress
      );

      // Add to local pending list immediately
      addLocalBook(result.book as unknown as Book);
      setUploadDone(true);

      setTimeout(() => {
        setUploadDone(false);
        setTab("submissions");
        resetForm();
      }, 2500);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err instanceof Error ? err.message : "Gagal mengunggah. Coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: bg }}>
      {/* Header */}
      <div className="py-8 px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #0D7070, #0A1172)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <BookOpen className="w-6 h-6 text-[#00D4AC]" />
            <h1 className="text-white" style={{ fontSize: "1.75rem", fontWeight: 700 }}>{t(T.volunteer.title)}</h1>
          </div>
          <p className="text-blue-200" style={{ fontSize: "0.9rem" }}>
            {t(T.volunteer.hello)} <strong>{user.name}</strong>! {t(T.volunteer.subtitle)}
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ backgroundColor: card, borderBottom: `1px solid ${border}` }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {[
              { id: "submissions" as Tab, label: `${t(T.volunteer.tabs.submissions)} (${mySubmissions.length})` },
              { id: "add"         as Tab, label: t(T.volunteer.tabs.add) },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="px-5 py-4 border-b-2 transition-colors whitespace-nowrap"
                style={{
                  borderBottomColor: tab === t.id ? "#3B5BDB" : "transparent",
                  color:  tab === t.id ? "#3B5BDB" : muted,
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

        {/* ── Submissions Tab ── */}
        {tab === "submissions" && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>{t(T.volunteer.submissions.title)}</h2>
              <button
                onClick={() => setTab("add")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white"
                style={{ backgroundColor: "#0A1172", fontSize: "0.875rem", fontWeight: 500 }}
              >
                <Plus className="w-4 h-4" /> {t(T.volunteer.tabs.add)}
              </button>
            </div>

            {mySubmissions.length === 0 ? (
              <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: muted }} />
                <p style={{ color: muted }}>{t(T.volunteer.submissions.empty)}</p>
                <button onClick={() => setTab("add")} className="mt-4 px-5 py-2 rounded-xl text-white" style={{ backgroundColor: "#0A1172", fontSize: "0.875rem" }}>
                  {t(T.volunteer.submissions.first)}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {mySubmissions.map((s) => {
                  const st = statusBadge[s.status];
                  const StatusIcon = st?.icon ?? Clock;
                  return (
                    <div key={s.id} className="rounded-2xl p-5 flex items-start justify-between gap-4" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                      <div>
                        <h3 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>{s.title}</h3>
                        <p style={{ fontSize: "0.85rem", color: muted }}>{s.author} · {s.category}</p>
                        {s.chapterCount != null && (
                          <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.2rem" }}>
                            {s.chapterCount} bab terdeteksi · {s.fileType?.toUpperCase() || "—"}
                          </p>
                        )}
                        <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.2rem" }}>
                          {s.createdAt ? new Date(s.createdAt).toLocaleDateString("id-ID") : "—"}
                        </p>
                      </div>
                      {st && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: st.bg, color: st.text, fontSize: "0.78rem", fontWeight: 600 }}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {st.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 rounded-xl p-4" style={{ backgroundColor: dm ? "#1E2D4F" : "#EEF2FF", border: `1px solid ${dm ? "#2A3F6F" : "#C7D2FE"}` }}>
              <p style={{ fontSize: "0.8rem", color: dm ? "#93C5FD" : "#3730A3", lineHeight: 1.6 }}>
                <strong>{t(T.volunteer.submissions.infoLabel)}</strong> {t(T.volunteer.submissions.info)}
              </p>
            </div>
          </div>
        )}

        {/* ── Add Book Tab ── */}
        {tab === "add" && (
          <div className="rounded-2xl p-6" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 600, color: text, marginBottom: "1.5rem" }}>
              {t(T.volunteer.form.title)}
            </h2>

            {uploadDone ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-green-100">
                  <CheckCircle className="w-9 h-9 text-green-600" />
                </div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: text }}>{t(T.volunteer.success.title)}</h3>
                <p style={{ fontSize: "0.9rem", color: muted, marginTop: "0.5rem" }}>
                  {t(T.volunteer.success.body)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* ── File Upload ── */}
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {t(T.volunteer.form.fileLabel)} <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <FileUploadForm
                    darkMode={dm}
                    selectedFile={selectedFile}
                    onFileSelected={setSelectedFile}
                    onFileClear={() => setSelectedFile(null)}
                    disabled={uploading}
                  />
                </div>

                {/* ── Metadata ── */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {t(T.volunteer.form.bookTitle)} <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t(T.volunteer.form.bookTitlePh)} required style={inputStyle} disabled={uploading} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {t(T.volunteer.form.author)} <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input type="text" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder={t(T.volunteer.form.authorPh)} required style={inputStyle} disabled={uploading} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{t(T.volunteer.form.publisher)}</label>
                    <input type="text" value={form.publisher} onChange={(e) => setForm({ ...form, publisher: e.target.value })} placeholder={t(T.volunteer.form.publisherPh)} style={inputStyle} disabled={uploading} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      {t(T.volunteer.form.category)} <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required style={{ ...inputStyle, cursor: "pointer" }} disabled={uploading}>
                      <option value="">{t(T.volunteer.form.categoryPh)}</option>
                      {categories.filter((c) => c !== "Semua").map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{t(T.volunteer.form.year)}</label>
                    <input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} min="1900" max="2030" style={inputStyle} disabled={uploading} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{t(T.volunteer.form.coverUrl)}</label>
                    <input type="url" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} placeholder={t(T.volunteer.form.coverUrlPh)} style={inputStyle} disabled={uploading} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    {t(T.volunteer.form.description)} <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t(T.volunteer.form.descriptionPh)} required rows={3} style={{ ...inputStyle, resize: "vertical" }} disabled={uploading} />
                </div>

                {/* Formats */}
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: muted, display: "block", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{t(T.volunteer.form.formats)}</label>
                  <div className="flex flex-wrap gap-2">
                    {formatOptions.map((fmt) => {
                      const active = form.formats.includes(fmt);
                      return (
                        <button key={fmt} type="button" onClick={() => toggleFormat(fmt)} disabled={uploading} aria-pressed={active}
                          className="px-4 py-2 rounded-xl transition-all"
                          style={{ border: `2px solid ${active ? "#0A1172" : border}`, backgroundColor: active ? (dm ? "#1E2D4F" : "#EEF2FF") : "transparent", color: active ? "#3B5BDB" : muted, fontSize: "0.85rem", fontWeight: active ? 600 : 400 }}>
                          {fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Copyright note */}
                <div className="rounded-xl p-4" style={{ backgroundColor: dm ? "#1E2D4F" : "#FEF9C3", border: `1px solid ${dm ? "#2A3F6F" : "#FDE68A"}` }}>
                  <p style={{ fontSize: "0.8rem", color: dm ? "#FCD34D" : "#92400E", lineHeight: 1.5 }}>
                    <strong>{t(T.volunteer.form.copyrightLabel)}</strong> {t(T.volunteer.form.copyright)}
                  </p>
                </div>

                {/* Error */}
                {uploadError && (
                  <div className="rounded-xl px-4 py-3" style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }} role="alert">
                    <p style={{ fontSize: "0.85rem", color: "#DC2626" }}>{uploadError}</p>
                  </div>
                )}

                {/* Progress */}
                {uploading && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span style={{ fontSize: "0.8rem", color: muted }}>
                        {progress < 30 ? "Mengunggah file..." : progress < 80 ? "Memproses & mengekstrak teks..." : "Menyimpan ke database..."}
                      </span>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: text }}>{progress}%</span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: "6px", backgroundColor: dm ? "#1E2D4F" : "#E5E7EB" }}>
                      <div
                        className="rounded-full transition-all duration-500"
                        style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #0A1172, #00D4AC)" }}
                      />
                    </div>
                    {selectedFile && (
                      <p style={{ fontSize: "0.72rem", color: muted, marginTop: "0.5rem" }}>
                        File <strong>{selectedFile.name}</strong> sedang diproses — teks diekstrak dan dikonversi ke format aksesibel...
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full py-3.5 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
                  style={{
                    background: uploading ? "#94A3B8" : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                    fontSize: "1rem",
                    cursor: uploading ? "not-allowed" : "pointer",
                  }}
                >
                  {uploading ? `${t(T.volunteer.form.submitting)} ${progress}%` : t(T.volunteer.form.submit)}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
