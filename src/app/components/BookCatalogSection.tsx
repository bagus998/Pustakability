import { ArrowRight, Star, Lock, Eye } from "lucide-react";
import { allBooks, categories, type Book } from "../data/books";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import type { UserRole, Page } from "../App";
import { useTranslation } from "react-i18next";

interface BookCatalogSectionProps {
  darkMode: boolean;
  onNavigate: (page: Page) => void;
  role: UserRole;
  onOpenBook: (bookId: string) => void;
}

export interface BookCardProps {
  book: Book;
  darkMode: boolean;
  role: UserRole;
  onOpenBook: (bookId: string) => void;
}

const formatColors: Record<string, string> = {
  Audio: "#00D4AC",
  PDF: "#3B5BDB",
  DAISY: "#0A1172",
  Braille: "#87C4E8",
  "Braille Digital": "#87C4E8",
  "PDF Aksesibel": "#3B5BDB",
};

export function BookCard({ book, darkMode: dm, role, onOpenBook }: BookCardProps) {
  const { t } = useTranslation();
  const isGuest = role === "guest";
  const card = dm ? "#1A2240" : "#FFFFFF";
  const border = dm ? "#1E2D4F" : "#F0F0F0";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";

  return (
    <article
      className="rounded-2xl overflow-hidden transition-all hover:-translate-y-1.5 hover:shadow-xl cursor-pointer group"
      style={{ backgroundColor: card, border: `1px solid ${border}` }}
      onClick={() => onOpenBook(book.id)}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpenBook(book.id)}
      aria-label={`${book.title} ${isGuest ? t("catalog.login_prompt") : ""}`}
    >
      {/* Cover Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <ImageWithFallback
          src={book.coverImage}
          alt={t("catalog.cover_alt")}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Guest lock indicator */}
        {isGuest && (
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            aria-label={t("catalog.login_prompt")}
          >
            <Lock className="w-4 h-4 text-white" />
          </div>
        )}

        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-lg"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", fontSize: "0.65rem", fontWeight: 600, color: "white" }}
        >
          {book.category}
        </div>

        {/* Bottom overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white leading-tight mb-1" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            {book.title}
          </h3>
          <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)" }}>
            {book.author}
          </p>
        </div>
      </div>

      {/* Info Footer */}
      <div className="p-3">
        {/* Rating & Year */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" aria-hidden="true" />
            <span style={{ fontSize: "0.78rem", fontWeight: 600, color: text }}>{book.rating}</span>
          </div>
          <span style={{ fontSize: "0.72rem", color: muted }}>{book.year}</span>
        </div>

        {/* Format Badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {book.formats.map((fmt) => (
            <span
              key={fmt}
              className="px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${formatColors[fmt] ?? "#6B7280"}18`,
                color: formatColors[fmt] ?? "#6B7280",
                fontSize: "0.65rem",
                fontWeight: 500,
              }}
            >
              {fmt}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="w-full py-2 rounded-xl transition-colors text-white font-medium flex items-center justify-center gap-1.5"
          style={{
            backgroundColor: isGuest ? "#6B7280" : "#0A1172",
            fontSize: "0.8rem",
          }}
          onClick={(e) => { e.stopPropagation(); onOpenBook(book.id); }}
        >
          {isGuest ? (
            <>
              <Eye className="w-3.5 h-3.5" />
              {t("catalog.btn_preview")}
            </>
          ) : (
            <>
              {t("catalog.btn_read")}
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export function BookCatalogSection({ darkMode: dm, onNavigate, role, onOpenBook }: BookCatalogSectionProps) {
  const { t } = useTranslation();
  const bg = dm ? "#0D1117" : "#FFFFFF";
  const text = dm ? "#F1F5F9" : "#0F1B35";
  const muted = dm ? "#94A3B8" : "#6B7280";
  const pillBg = dm ? "#1A2240" : "#0A117208";
  const pillActive = dm ? "#3B5BDB" : "#0A1172";
  const pillBorder = dm ? "#1E2D4F" : "#E5E7EB";

  return (
    <section className="py-20" style={{ backgroundColor: bg }} aria-labelledby="catalog-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div
              className="inline-block px-3 py-1 rounded-full mb-3"
              style={{ backgroundColor: pillBg, color: dm ? "#93C5FD" : "#0A1172", fontSize: "0.8rem", fontWeight: 600 }}
            >
              {t("catalog.badge")}
            </div>
            <h2 id="catalog-heading" style={{ fontSize: "1.9rem", fontWeight: 700, color: text }}>
              {t("catalog.title")}
            </h2>
          </div>
          <button
            onClick={() => onNavigate("catalog")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-colors flex-shrink-0 text-white"
            style={{ backgroundColor: "#0A1172", fontSize: "0.875rem" }}
          >
            {t("catalog.btn_explore")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8" role="tablist" aria-label="Filter kategori">
          {categories.slice(0, 7).map((cat, i) => (
            <button
              key={cat}
              role="tab"
              aria-selected={i === 0}
              className="px-4 py-2 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
              style={{
                backgroundColor: i === 0 ? pillActive : "transparent",
                color: i === 0 ? "white" : muted,
                border: `1px solid ${i === 0 ? pillActive : pillBorder}`,
                fontSize: "0.85rem",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {allBooks.slice(0, 8).map((book) => (
            <BookCard key={book.id} book={book} darkMode={dm} role={role} onOpenBook={onOpenBook} />
          ))}
        </div>
      </div>
    </section>
  );
}
