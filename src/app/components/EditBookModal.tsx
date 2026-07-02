import { useState, useEffect } from "react";
import { X, Save, ImageIcon } from "lucide-react";
import type { Book } from "../data/books";
import { categories } from "../data/books";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface EditBookModalProps {
  book: Book;
  darkMode: boolean;
  onSave: (id: string, updates: Partial<Book>) => void;
  onClose: () => void;
}

const formatOptions = ["Audio", "PDF", "DAISY", "Braille"];

export function EditBookModal({ book, darkMode: dm, onSave, onClose }: EditBookModalProps) {
  const [form, setForm] = useState({
    title:       book.title,
    author:      book.author,
    publisher:   book.publisher,
    category:    book.category,
    year:        String(book.year),
    description: book.description,
    coverImage:  book.coverImage,
    formats:     [...book.formats],
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const overlay = dm ? "#0D1117E6" : "#0F1B35CC";
  const card    = dm ? "#161B2E" : "#FFFFFF";
  const border  = dm ? "#1E2D4F" : "#E5E7EB";
  const text    = dm ? "#F1F5F9" : "#0F1B35";
  const muted   = dm ? "#94A3B8" : "#6B7280";
  const inputBg = dm ? "#0D1117" : "#F9FAFB";

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
    fontSize: "0.8rem",
    fontWeight: 600,
    color: muted,
    display: "block",
    marginBottom: "0.375rem",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const toggleFormat = (fmt: string) =>
    setForm((f) => ({
      ...f,
      formats: f.formats.includes(fmt)
        ? f.formats.filter((x) => x !== fmt)
        : [...f.formats, fmt],
    }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    onSave(book.id, {
      title:       form.title,
      author:      form.author,
      publisher:   form.publisher,
      category:    form.category,
      year:        Number(form.year),
      description: form.description,
      coverImage:  form.coverImage,
      formats:     form.formats,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(onClose, 700);
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: overlay, backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-modal="true"
      role="dialog"
      aria-labelledby="edit-modal-title"
    >
      <div
        className="w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ backgroundColor: card, border: `1px solid ${border}`, maxHeight: "90vh" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: `1px solid ${border}` }}
        >
          <div>
            <h2 id="edit-modal-title" style={{ fontSize: "1.1rem", fontWeight: 700, color: text }}>
              Edit Buku
            </h2>
            <p style={{ fontSize: "0.78rem", color: muted, marginTop: "0.15rem" }}>
              ID: {book.id} · Perubahan disimpan ke daftar koleksi
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl transition-colors"
            style={{ color: muted }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Cover preview + URL */}
            <div className="sm:col-span-2">
              <div className="flex gap-4 items-start">
                {/* Cover thumbnail */}
                <div
                  className="w-20 h-28 rounded-xl overflow-hidden flex-shrink-0"
                  style={{ border: `1px solid ${border}` }}
                >
                  {form.coverImage ? (
                    <ImageWithFallback src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: dm ? "#1E2D4F" : "#F3F4F6" }}>
                      <ImageIcon className="w-6 h-6" style={{ color: muted }} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label style={labelStyle}>URL Sampul</label>
                  <input
                    type="url"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    style={inputStyle}
                  />
                  <p style={{ fontSize: "0.72rem", color: muted, marginTop: "0.375rem" }}>
                    Tempel URL gambar untuk mengganti sampul buku
                  </p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="sm:col-span-2">
              <label htmlFor="edit-title" style={labelStyle}>Judul Buku</label>
              <input
                id="edit-title"
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                style={inputStyle}
                required
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor="edit-author" style={labelStyle}>Penulis</label>
              <input
                id="edit-author"
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Publisher */}
            <div>
              <label htmlFor="edit-publisher" style={labelStyle}>Penerbit</label>
              <input
                id="edit-publisher"
                type="text"
                value={form.publisher}
                onChange={(e) => setForm({ ...form, publisher: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="edit-category" style={labelStyle}>Kategori</label>
              <select
                id="edit-category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {categories.filter((c) => c !== "Semua").map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label htmlFor="edit-year" style={labelStyle}>Tahun Terbit</label>
              <input
                id="edit-year"
                type="number"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                min="1900"
                max="2030"
                style={inputStyle}
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="edit-desc" style={labelStyle}>Deskripsi</label>
              <textarea
                id="edit-desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>

            {/* Formats */}
            <div className="sm:col-span-2">
              <label style={labelStyle}>Format Aksesibel</label>
              <div className="flex flex-wrap gap-2">
                {formatOptions.map((fmt) => {
                  const active = form.formats.includes(fmt);
                  return (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => toggleFormat(fmt)}
                      aria-pressed={active}
                      className="px-4 py-2 rounded-xl transition-all"
                      style={{
                        border: `2px solid ${active ? "#0A1172" : border}`,
                        backgroundColor: active ? (dm ? "#1E2D4F" : "#EEF2FF") : "transparent",
                        color: active ? "#3B5BDB" : muted,
                        fontSize: "0.85rem",
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {fmt}
                    </button>
                  );
                })}
              </div>
              {form.formats.length === 0 && (
                <p style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "0.375rem" }}>
                  Pilih minimal satu format
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-end gap-3 px-6 py-4 flex-shrink-0"
          style={{ borderTop: `1px solid ${border}` }}
        >
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
            disabled={saving || form.formats.length === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white transition-all"
            style={{
              background: saved
                ? "#16A34A"
                : saving || form.formats.length === 0
                ? "#94A3B8"
                : "linear-gradient(135deg, #0A1172, #3B5BDB)",
              fontSize: "0.875rem",
              cursor: saving || form.formats.length === 0 ? "not-allowed" : "pointer",
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
