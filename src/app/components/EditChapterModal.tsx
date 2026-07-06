import { useState, useEffect, useCallback } from "react";
import { X, Save, ChevronRight, BookOpen, Loader2, CheckCircle, AlertCircle, Plus, Trash2 } from "lucide-react";
import type { Book } from "../data/books";
import { apiFetchChapters, apiUpdateChapter, type ApiChapter } from "../api/books";

interface EditChapterModalProps {
  book: Book;
  darkMode: boolean;
  onClose: () => void;
}

export function EditChapterModal({ book, darkMode: dm, onClose }: EditChapterModalProps) {
  const [chapters, setChapters]         = useState<ApiChapter[]>([]);
  const [loading,  setLoading]          = useState(true);
  const [selectedIdx, setSelectedIdx]   = useState(0);
  const [editTitle,   setEditTitle]     = useState("");
  const [editContent, setEditContent]   = useState("");
  const [saving,  setSaving]            = useState(false);
  const [saved,   setSaved]             = useState(false);
  const [saveError, setSaveError]       = useState("");
  const [dirty,   setDirty]             = useState(false);

  // Close on Escape (with dirty check)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dirty) {
          if (window.confirm("Ada perubahan yang belum disimpan. Keluar?")) onClose();
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [dirty, onClose]);

  // Fetch all chapters
  useEffect(() => {
    setLoading(true);
    apiFetchChapters(book.id)
      .then((chs) => {
        const data = chs.length > 0 ? chs : (book.chapters ?? []);
        setChapters(data);
        loadChapter(0, data);
      })
      .catch(() => {
        const data = book.chapters ?? [];
        setChapters(data);
        loadChapter(0, data);
      })
      .finally(() => setLoading(false));
  }, [book.id]);

  const loadChapter = (idx: number, list = chapters) => {
    const ch = list[idx];
    if (!ch) return;
    setSelectedIdx(idx);
    setEditTitle(ch.title ?? "");
    setEditContent(ch.content ?? "");
    setSaved(false);
    setSaveError("");
    setDirty(false);
  };

  const switchChapter = (idx: number) => {
    if (dirty && !window.confirm("Ada perubahan yang belum disimpan. Beralih bab?")) return;
    loadChapter(idx);
  };

  const handleSave = async () => {
    const isApiBook = /^[0-9a-f]{8}-[0-9a-f]{4}-/.test(book.id);
    setSaving(true);
    setSaveError("");
    try {
      const updated: ApiChapter = { title: editTitle, content: editContent };
      if (isApiBook) {
        await apiUpdateChapter(book.id, selectedIdx, updated);
      }
      // Always update local state
      setChapters((prev) => prev.map((ch, i) => (i === selectedIdx ? updated : ch)));
      setSaved(true);
      setDirty(false);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : "Gagal menyimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  const wordCount = editContent.trim().split(/\s+/).filter(Boolean).length;
  const charCount = editContent.length;

  const overlay = dm ? "#0D1117E6" : "#0F1B35CC";
  const card    = dm ? "#161B2E"   : "#FFFFFF";
  const border  = dm ? "#1E2D4F"   : "#E5E7EB";
  const text    = dm ? "#F1F5F9"   : "#0F1B35";
  const muted   = dm ? "#94A3B8"   : "#6B7280";
  const sidebar = dm ? "#0F1623"   : "#F5F7FF";
  const inputBg = dm ? "#0D1117"   : "#F9FAFB";
  const rowHover = dm ? "rgba(255,255,255,0.04)" : "#F9FAFB";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: overlay, backdropFilter: "blur(4px)" }}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        if (dirty) { if (window.confirm("Ada perubahan yang belum disimpan. Keluar?")) onClose(); }
        else onClose();
      }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-chapters-title"
    >
      <div
        className="w-full max-w-5xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ backgroundColor: card, border: `1px solid ${border}`, height: "90vh" }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)" }}>
              <BookOpen className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 id="edit-chapters-title" style={{ fontSize: "1.05rem", fontWeight: 700, color: text }}>
                Edit Konten Bab
              </h2>
              <p style={{ fontSize: "0.72rem", color: muted, marginTop: "0.1rem" }} className="truncate max-w-xs">
                {book.title}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!loading && (
              <span style={{ fontSize: "0.75rem", color: muted }}>
                {chapters.length} bab
              </span>
            )}
            <button
              onClick={() => {
                if (dirty) { if (window.confirm("Ada perubahan yang belum disimpan. Keluar?")) onClose(); }
                else onClose();
              }}
              className="p-2 rounded-xl transition-colors"
              style={{ color: muted }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F3F4F6")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              aria-label="Tutup editor bab"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center gap-3" aria-live="polite" role="status">
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#3B5BDB" }} aria-hidden="true" />
            <span style={{ color: muted }}>Memuat bab...</span>
          </div>
        ) : chapters.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <BookOpen className="w-10 h-10" style={{ color: muted }} aria-hidden="true" />
            <p style={{ color: muted }}>Tidak ada bab yang tersedia untuk diedit.</p>
            <p style={{ fontSize: "0.8rem", color: muted }}>
              Buku ini mungkin belum diproses. Upload ulang dengan file teks.
            </p>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar: chapter list */}
            <aside
              className="w-64 flex-shrink-0 overflow-y-auto"
              style={{ backgroundColor: sidebar, borderRight: `1px solid ${border}` }}
              aria-label="Daftar bab"
            >
              <div className="p-3">
                <p style={{ fontSize: "0.7rem", fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                  Daftar Bab
                </p>
                <ol className="flex flex-col gap-0.5">
                  {chapters.map((ch, i) => (
                    <li key={i}>
                      <button
                        onClick={() => switchChapter(i)}
                        className="w-full flex items-start gap-2 px-3 py-2.5 rounded-xl text-left transition-all"
                        style={{
                          backgroundColor: selectedIdx === i ? (dm ? "#1E2D4F" : "#EEF2FF") : "transparent",
                          color: selectedIdx === i ? "#3B5BDB" : text,
                        }}
                        onMouseEnter={(e) => { if (selectedIdx !== i) e.currentTarget.style.backgroundColor = rowHover; }}
                        onMouseLeave={(e) => { if (selectedIdx !== i) e.currentTarget.style.backgroundColor = "transparent"; }}
                        aria-current={selectedIdx === i ? "true" : undefined}
                        aria-label={`Bab ${i + 1}: ${ch.title}`}
                      >
                        <span
                          className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center mt-0.5"
                          style={{
                            backgroundColor: selectedIdx === i ? "#3B5BDB" : "transparent",
                            color: selectedIdx === i ? "white" : muted,
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            border: selectedIdx === i ? "none" : `1px solid ${border}`,
                          }}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div style={{ fontSize: "0.8rem", fontWeight: selectedIdx === i ? 600 : 400, lineHeight: 1.3 }} className="truncate">
                            {ch.title || `Bab ${i + 1}`}
                          </div>
                          <div style={{ fontSize: "0.68rem", color: muted, marginTop: "0.15rem" }}>
                            {ch.content?.split(/\s+/).length ?? 0} kata
                          </div>
                        </div>
                        {selectedIdx === i && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "#3B5BDB" }} aria-hidden="true" />}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            {/* Editor pane */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Chapter title */}
              <div className="px-6 pt-5 pb-3 flex-shrink-0" style={{ borderBottom: `1px solid ${border}` }}>
                <label
                  htmlFor="ch-title"
                  style={{ fontSize: "0.7rem", fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "0.4rem" }}
                >
                  Judul Bab {selectedIdx + 1}
                </label>
                <input
                  id="ch-title"
                  type="text"
                  value={editTitle}
                  onChange={(e) => { setEditTitle(e.target.value); setDirty(true); setSaved(false); }}
                  placeholder={`Judul Bab ${selectedIdx + 1}`}
                  className="w-full outline-none"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    borderBottom: `2px solid ${dirty ? "#3B5BDB" : border}`,
                    color: text,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    padding: "0.25rem 0",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>

              {/* Content textarea */}
              <div className="flex-1 overflow-hidden flex flex-col px-6 py-4 gap-3">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="ch-content"
                    style={{ fontSize: "0.7rem", fontWeight: 700, color: muted, textTransform: "uppercase", letterSpacing: "0.06em" }}
                  >
                    Konten
                  </label>
                  <span style={{ fontSize: "0.72rem", color: muted }}>
                    {wordCount.toLocaleString()} kata · {charCount.toLocaleString()} karakter
                  </span>
                </div>
                <textarea
                  id="ch-content"
                  value={editContent}
                  onChange={(e) => { setEditContent(e.target.value); setDirty(true); setSaved(false); }}
                  placeholder="Teks konten bab ini..."
                  className="flex-1 resize-none outline-none rounded-xl p-4"
                  style={{
                    backgroundColor: inputBg,
                    border: `1.5px solid ${dirty ? "#3B5BDB" : border}`,
                    color: text,
                    fontSize: "0.9rem",
                    lineHeight: 1.7,
                    fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
                    transition: "border-color 0.2s",
                    minHeight: 0,
                  }}
                  aria-label={`Konten bab ${selectedIdx + 1}: ${editTitle}`}
                />

                {/* Accessibility note */}
                <p style={{ fontSize: "0.72rem", color: muted, lineHeight: 1.4 }}>
                  Konten ini akan dirender sebagai paragraf semantik (tag &lt;p&gt;) dan dapat dibaca oleh screen reader.
                  Pisahkan paragraf dengan baris kosong.
                </p>
              </div>

              {/* Footer */}
              <div
                className="px-6 py-4 flex items-center justify-between gap-3 flex-shrink-0"
                style={{ borderTop: `1px solid ${border}` }}
              >
                <div className="flex items-center gap-2">
                  {saved && (
                    <div className="flex items-center gap-1.5 text-green-600" aria-live="polite" role="status">
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      <span style={{ fontSize: "0.8rem" }}>Tersimpan!</span>
                    </div>
                  )}
                  {saveError && (
                    <div className="flex items-center gap-1.5" style={{ color: "#DC2626" }} aria-live="assertive" role="alert">
                      <AlertCircle className="w-4 h-4" aria-hidden="true" />
                      <span style={{ fontSize: "0.8rem" }}>{saveError}</span>
                    </div>
                  )}
                  {dirty && !saved && !saveError && (
                    <span style={{ fontSize: "0.8rem", color: "#F59E0B" }} aria-live="polite">
                      Ada perubahan yang belum disimpan
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl transition-colors"
                    style={{ border: `1.5px solid ${border}`, color: text, fontSize: "0.875rem" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F9FAFB")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    Selesai
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving || !dirty}
                    className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold text-white transition-all"
                    style={{
                      background: saved
                        ? "#16A34A"
                        : !dirty || saving
                        ? "#94A3B8"
                        : "linear-gradient(135deg, #0A1172, #3B5BDB)",
                      fontSize: "0.875rem",
                      cursor: !dirty || saving ? "not-allowed" : "pointer",
                    }}
                    aria-label={`Simpan perubahan bab ${selectedIdx + 1}`}
                  >
                    {saving ? (
                      <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />Menyimpan...</>
                    ) : saved ? (
                      <><CheckCircle className="w-4 h-4" aria-hidden="true" />Tersimpan!</>
                    ) : (
                      <><Save className="w-4 h-4" aria-hidden="true" />Simpan Bab</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
