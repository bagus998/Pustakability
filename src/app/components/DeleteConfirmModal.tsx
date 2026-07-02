import { useEffect, useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import type { Book } from "../data/books";

interface DeleteConfirmModalProps {
  book: Book;
  darkMode: boolean;
  onConfirm: (id: string) => void;
  onClose: () => void;
}

export function DeleteConfirmModal({ book, darkMode: dm, onConfirm, onClose }: DeleteConfirmModalProps) {
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const overlay = dm ? "#0D1117E6" : "#0F1B35CC";
  const card    = dm ? "#161B2E"   : "#FFFFFF";
  const border  = dm ? "#1E2D4F"   : "#E5E7EB";
  const text    = dm ? "#F1F5F9"   : "#0F1B35";
  const muted   = dm ? "#94A3B8"   : "#6B7280";

  const handleConfirm = async () => {
    setDeleting(true);
    await new Promise((r) => setTimeout(r, 500));
    onConfirm(book.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: overlay, backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-modal="true"
      role="alertdialog"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: card, border: `1px solid ${border}` }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 mr-4"
            style={{ backgroundColor: "#FEE2E2" }}
          >
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 id="delete-modal-title" style={{ fontSize: "1.1rem", fontWeight: 700, color: text }}>
              Hapus Buku
            </h2>
            <p id="delete-modal-desc" style={{ fontSize: "0.875rem", color: muted, marginTop: "0.375rem", lineHeight: 1.5 }}>
              Tindakan ini tidak dapat dibatalkan. Buku akan dihapus permanen dari koleksi.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl ml-2 flex-shrink-0 transition-colors"
            style={{ color: muted }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Book preview */}
        <div
          className="mx-6 mb-5 rounded-xl p-4 flex items-center gap-3"
          style={{ backgroundColor: dm ? "#1A2240" : "#F9FAFB", border: `1px solid ${border}` }}
        >
          <div
            className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0"
            style={{ backgroundColor: book.coverColor }}
          >
            <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div style={{ fontSize: "0.9rem", fontWeight: 600, color: text }} className="truncate">
              {book.title}
            </div>
            <div style={{ fontSize: "0.78rem", color: muted, marginTop: "0.15rem" }}>
              {book.author}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className="px-2 py-0.5 rounded-full"
                style={{ backgroundColor: `${book.coverColor}18`, color: book.coverColor, fontSize: "0.7rem", fontWeight: 500 }}
              >
                {book.category}
              </span>
              <span style={{ fontSize: "0.7rem", color: muted }}>{book.year}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className="flex gap-3 px-6 py-4"
          style={{ borderTop: `1px solid ${border}` }}
        >
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl transition-colors"
            style={{ border: `1.5px solid ${border}`, color: text, fontSize: "0.875rem", fontWeight: 500 }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F9FAFB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            Batal
          </button>
          <button
            onClick={handleConfirm}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-white transition-colors"
            style={{
              backgroundColor: deleting ? "#94A3B8" : "#DC2626",
              fontSize: "0.875rem",
              cursor: deleting ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => { if (!deleting) e.currentTarget.style.backgroundColor = "#B91C1C"; }}
            onMouseLeave={(e) => { if (!deleting) e.currentTarget.style.backgroundColor = "#DC2626"; }}
          >
            <Trash2 className="w-4 h-4" />
            {deleting ? "Menghapus..." : "Ya, Hapus Buku"}
          </button>
        </div>
      </div>
    </div>
  );
}
