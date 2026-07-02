import { useState } from "react";
import { Search, Grid, List } from "lucide-react";
import { BookCard } from "./BookCatalogSection";
import { useBooks } from "../contexts/BookContext";
import type { UserRole, Page } from "../App";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

interface CatalogPageProps {
  darkMode: boolean;
  role: UserRole;
  onOpenBook: (bookId: string) => void;
  onNavigate: (page: Page) => void;
}

export function CatalogPage({ darkMode: dm, role, onOpenBook, onNavigate }: CatalogPageProps) {
  const { t } = useLanguage();
  const { books: allBooks } = useBooks();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [selectedSort, setSelectedSort] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const bg      = dm ? "#0D1117" : "#F5F7FF";
  const card    = dm ? "#161B2E" : "#FFFFFF";
  const border  = dm ? "#1E2D4F" : "#E5E7EB";
  const text    = dm ? "#F1F5F9" : "#0F1B35";
  const muted   = dm ? "#94A3B8" : "#6B7280";
  const inputBg = dm ? "#161B2E" : "#FFFFFF";
  const pillActive = dm ? "#3B5BDB" : "#0A1172";

  const categories = [
    { key: "all",       label: t(T.catalog.categories.all) },
    { key: "Sains",     label: t(T.catalog.categories.sains) },
    { key: "Teknik",    label: t(T.catalog.categories.teknik) },
    { key: "Hukum",     label: t(T.catalog.categories.hukum) },
    { key: "Ekonomi",   label: t(T.catalog.categories.ekonomi) },
    { key: "Sosial",    label: t(T.catalog.categories.sosial) },
    { key: "Psikologi", label: t(T.catalog.categories.psikologi) },
    { key: "Teknologi", label: t(T.catalog.categories.teknologi) },
    { key: "Kedokteran",label: t(T.catalog.categories.kedokteran) },
    { key: "Pertanian", label: t(T.catalog.categories.pertanian) },
  ];

  const formats = [
    { key: "all",     label: t(T.catalogPage.formats.all) },
    { key: "Audio",   label: t(T.catalogPage.formats.audio) },
    { key: "PDF",     label: t(T.catalogPage.formats.pdf) },
    { key: "DAISY",   label: t(T.catalogPage.formats.daisy) },
    { key: "Braille", label: t(T.catalogPage.formats.braille) },
  ];

  const sorts = [
    { key: "relevance", label: t(T.catalogPage.sort.relevance) },
    { key: "newest",    label: t(T.catalogPage.sort.newest) },
    { key: "rating",    label: t(T.catalogPage.sort.rating) },
    { key: "az",        label: t(T.catalogPage.sort.az) },
  ];

  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch   = !searchQuery || book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    const matchesFormat   = selectedFormat === "all" || book.formats.some((f) => f.toLowerCase().includes(selectedFormat.toLowerCase()));
    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: bg }}>
      {/* Header */}
      <div className="py-10 px-4 sm:px-6 lg:px-8" style={{ background: dm ? "#0F1623" : "linear-gradient(135deg, #0A1172, #132060)" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-white mb-2" style={{ fontSize: "2rem", fontWeight: 700 }}>{t(T.catalogPage.title)}</h1>
          <p className="text-blue-200 mb-6" style={{ fontSize: "0.95rem" }}>
            {allBooks.length} {t(T.catalogPage.subtitle)}
          </p>
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t(T.catalogPage.searchPlaceholder)}
              aria-label={t(T.catalogPage.searchPlaceholder)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl outline-none text-white placeholder-blue-300 transition-all"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "1rem" }}
              onFocus={(e) => (e.target.style.borderColor = "#00D4AC")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
            {categories.map(({ key, label }) => (
              <button key={key} onClick={() => setSelectedCategory(key)} aria-pressed={selectedCategory === key}
                className="px-3 py-1.5 rounded-full whitespace-nowrap transition-colors flex-shrink-0"
                style={{ backgroundColor: selectedCategory === key ? pillActive : (dm ? "#1A2240" : "#FFFFFF"), color: selectedCategory === key ? "white" : muted, border: `1px solid ${selectedCategory === key ? pillActive : border}`, fontSize: "0.8rem" }}>
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)} aria-label="Filter format"
              className="px-3 py-1.5 rounded-lg outline-none" style={{ backgroundColor: inputBg, border: `1px solid ${border}`, color: text, fontSize: "0.8rem" }}>
              {formats.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
            </select>

            <select value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)} aria-label="Urutkan"
              className="px-3 py-1.5 rounded-lg outline-none" style={{ backgroundColor: inputBg, border: `1px solid ${border}`, color: text, fontSize: "0.8rem" }}>
              {sorts.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
            </select>

            <div className="flex rounded-lg overflow-hidden" style={{ border: `1px solid ${border}` }}>
              {(["grid", "list"] as const).map((v) => (
                <button key={v} onClick={() => setViewMode(v)} aria-pressed={viewMode === v} aria-label={v === "grid" ? "Grid view" : "List view"}
                  className="p-2 transition-colors" style={{ backgroundColor: viewMode === v ? pillActive : inputBg, color: viewMode === v ? "white" : muted }}>
                  {v === "grid" ? <Grid className="w-4 h-4" /> : <List className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-5" style={{ fontSize: "0.85rem", color: muted }}>
          {t(T.catalogPage.showing)}{" "}
          <strong style={{ color: text }}>{filteredBooks.length}</strong>{" "}
          {t(T.catalogPage.collections)}
          {searchQuery && <> {t(T.catalogPage.for)} "<strong style={{ color: text }}>{searchQuery}</strong>"</>}
        </div>

        {/* Books */}
        {filteredBooks.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} darkMode={dm} role={role} onOpenBook={onOpenBook} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredBooks.map((book) => (
                <div key={book.id} className="flex gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:shadow-md"
                  style={{ backgroundColor: card, border: `1px solid ${border}` }}
                  onClick={() => onOpenBook(book.id)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpenBook(book.id)} role="button" aria-label={`Buka ${book.title}`}>
                  <div className="w-16 rounded-xl overflow-hidden flex-shrink-0" style={{ height: "88px" }}>
                    <img src={book.coverImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.95rem", fontWeight: 600, color: text }}>{book.title}</div>
                    <div style={{ fontSize: "0.8rem", color: muted, marginTop: "0.2rem" }}>{book.author}</div>
                    <div style={{ fontSize: "0.75rem", color: muted }}>{book.publisher} · {book.year}</div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {book.formats.map(f => (
                        <span key={f} className="px-2 py-0.5 rounded-md" style={{ backgroundColor: dm ? "#1E2D4F" : "#F3F4F6", color: muted, fontSize: "0.7rem" }}>{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between flex-shrink-0">
                    <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: `${book.coverColor}18`, color: book.coverColor, fontSize: "0.72rem", fontWeight: 500 }}>{book.category}</span>
                    <div style={{ fontSize: "0.8rem", color: "#FBBF24", fontWeight: 600 }}>★ {book.rating}</div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📚</div>
            <p style={{ color: muted, fontSize: "1rem" }}>{t(T.catalogPage.noResults)}</p>
            <button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); setSelectedFormat("all"); }}
              className="mt-4 px-5 py-2 rounded-xl" style={{ border: `1.5px solid ${border}`, color: text, fontSize: "0.875rem" }}>
              {t(T.catalogPage.resetFilter)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
