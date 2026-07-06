import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Menu, Moon, Sun, BookOpen, Lock, Loader2 } from "lucide-react";
import type { Book } from "../data/books";
import type { UserRole, Page } from "../App";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { apiFetchChapters, type ApiChapter } from "../api/books";

interface EbookReaderProps {
  book:             Book;
  darkMode:         boolean;
  role:             UserRole;
  onClose:          () => void;
  onNavigate:       (page: Page) => void;
  onDarkModeToggle: () => void;
}

export function EbookReader({ book, darkMode: dm, role, onClose, onNavigate, onDarkModeToggle }: EbookReaderProps) {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [sidebarOpen,    setSidebarOpen]    = useState(true);
  const [apiChapters,    setApiChapters]    = useState<ApiChapter[] | null>(null);
  const [chaptersLoading, setChaptersLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const isGuest   = role === "guest";
  const canReadFull = !isGuest;

  // Determine chapters to display
  const chapters: ApiChapter[] = apiChapters ?? book.chapters ?? [];
  const previewCount = isGuest ? 1 : chapters.length;
  const isLocked = isGuest && currentChapter >= previewCount;
  const chapter  = chapters[Math.min(currentChapter, chapters.length - 1)] ?? { title: "", content: "" };

  // Fetch chapters from API if book has an API-assigned ID (UUID format)
  useEffect(() => {
    const isApiBook = /^[0-9a-f]{8}-[0-9a-f]{4}-/.test(book.id);
    if (!isApiBook) return; // local demo book, use embedded chapters

    setChaptersLoading(true);
    apiFetchChapters(book.id)
      .then((chs) => {
        if (chs.length > 0) setApiChapters(chs);
        else setApiChapters(book.chapters ?? []);
      })
      .catch(() => setApiChapters(book.chapters ?? []))
      .finally(() => setChaptersLoading(false));
  }, [book.id]);

  // Scroll reading area to top when chapter changes
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentChapter]);

  const goNext = () => {
    if (isGuest && currentChapter + 1 >= previewCount) return;
    if (currentChapter < chapters.length - 1) setCurrentChapter((c) => c + 1);
  };
  const goPrev = () => {
    if (currentChapter > 0) setCurrentChapter((c) => c - 1);
  };

  const readingBg   = dm ? "#1A1A2E" : "#FFFFFF";
  const bg          = dm ? "#0D1117" : "#FAFAF8";
  const sidebar     = dm ? "#0F1623" : "#F5F7FF";
  const sdBorder    = dm ? "#1E2D4F" : "#E5E7EB";
  const headerBg    = dm ? "#0F1623" : "#FFFFFF";
  const headerBorder= dm ? "#1E2D4F" : "#E5E7EB";
  const bodyText    = dm ? "#E2E8F0" : "#1A1A2A";
  const mutedText   = dm ? "#94A3B8" : "#6B7280";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: bg, fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}
      role="application"
      aria-label={`Pembaca buku: ${book.title}`}
    >
      {/* Skip link for screen readers */}
      <a
        href="#reader-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-1.5 focus:rounded-lg focus:bg-[#0A1172] focus:text-white"
      >
        Lewati ke konten buku
      </a>

      {/* ── Top bar ── */}
      <header
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ backgroundColor: headerBg, borderBottom: `1px solid ${headerBorder}`, height: "56px" }}
        role="banner"
      >
        {/* Left: sidebar toggle + book info */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg transition-colors"
            style={{ color: mutedText }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            aria-label={sidebarOpen ? "Sembunyikan daftar isi" : "Tampilkan daftar isi"}
            aria-expanded={sidebarOpen}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <div className="w-7 h-7 rounded overflow-hidden flex-shrink-0" aria-hidden="true">
              <ImageWithFallback src={book.coverImage} alt="" className="w-full h-full object-cover" />
            </div>
            <div aria-label={`${book.title} oleh ${book.author}`}>
              <div style={{ fontSize: "0.8rem", fontWeight: 600, color: bodyText, lineHeight: 1.2 }}>{book.title}</div>
              <div style={{ fontSize: "0.68rem", color: mutedText }}>{book.author}</div>
            </div>
          </div>
        </div>

        {/* Centre: current chapter */}
        {chapter.title && (
          <div
            className="hidden sm:block text-center max-w-xs truncate"
            style={{ fontSize: "0.78rem", fontWeight: 500, color: mutedText }}
            aria-live="polite"
            aria-label={`Bab saat ini: ${chapter.title}`}
          >
            {chapter.title}
          </div>
        )}

        {/* Right: controls */}
        <div className="flex items-center gap-1.5">
          {isGuest && (
            <div
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{ backgroundColor: "#FEF3C7", color: "#92400E", fontSize: "0.75rem", fontWeight: 500 }}
              aria-label="Mode preview — login untuk akses penuh"
            >
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              Mode Preview
            </div>
          )}

          <button
            onClick={onDarkModeToggle}
            className="p-2 rounded-lg transition-colors"
            style={{ color: mutedText }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            aria-label={dm ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
            aria-pressed={dm}
          >
            {dm ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-colors"
            style={{ color: mutedText }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F3F4F6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            aria-label="Tutup pembaca buku"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar: Table of Contents */}
        {sidebarOpen && (
          <aside
            className="w-64 flex-shrink-0 overflow-y-auto"
            style={{ backgroundColor: sidebar, borderRight: `1px solid ${sdBorder}` }}
            aria-label="Daftar isi buku"
          >
            <nav className="p-4">
              <h2
                style={{ fontSize: "0.72rem", fontWeight: 700, color: mutedText, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.75rem" }}
                id="toc-heading"
              >
                Daftar Isi
              </h2>

              {chaptersLoading ? (
                <div className="flex items-center gap-2 py-4 justify-center" aria-live="polite" aria-label="Memuat daftar isi...">
                  <Loader2 className="w-4 h-4 animate-spin" style={{ color: mutedText }} />
                  <span style={{ fontSize: "0.8rem", color: mutedText }}>Memuat...</span>
                </div>
              ) : (
                <ol aria-labelledby="toc-heading" className="flex flex-col gap-1">
                  {chapters.map((ch, i) => {
                    const locked = isGuest && i >= previewCount;
                    return (
                      <li key={i}>
                        <button
                          onClick={() => !locked && setCurrentChapter(i)}
                          disabled={locked}
                          className="w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2"
                          style={{
                            backgroundColor: currentChapter === i ? (dm ? "#1E2D4F" : "#EEF2FF") : "transparent",
                            color: locked ? (dm ? "#374151" : "#D1D5DB") : currentChapter === i ? "#3B5BDB" : bodyText,
                            cursor: locked ? "not-allowed" : "pointer",
                            fontSize: "0.8rem",
                            fontWeight: currentChapter === i ? 600 : 400,
                            lineHeight: 1.4,
                          }}
                          aria-current={currentChapter === i ? "true" : undefined}
                          aria-label={locked ? `${ch.title} — terkunci, login untuk membaca` : ch.title}
                        >
                          {locked ? (
                            <Lock className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                          ) : (
                            <span
                              className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-xs"
                              style={{
                                backgroundColor: currentChapter === i ? "#3B5BDB" : "transparent",
                                color: currentChapter === i ? "white" : mutedText,
                                fontWeight: 700,
                              }}
                              aria-hidden="true"
                            >
                              {i + 1}
                            </span>
                          )}
                          <span className="truncate">{ch.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              )}

              {/* Guest CTA in sidebar */}
              {isGuest && (
                <div
                  className="mt-4 p-3 rounded-xl"
                  style={{ backgroundColor: dm ? "#1E2D4F" : "#EEF2FF", border: `1px solid ${dm ? "#2A3F6F" : "#C7D2FE"}` }}
                  aria-label={`${previewCount} dari ${chapters.length} bab tersedia untuk tamu`}
                >
                  <p style={{ fontSize: "0.75rem", color: dm ? "#93C5FD" : "#3730A3", lineHeight: 1.5 }}>
                    {previewCount} dari {chapters.length} bab tersedia untuk tamu.
                  </p>
                  <button
                    onClick={() => onNavigate("register")}
                    className="mt-2 w-full py-1.5 rounded-lg text-white"
                    style={{ backgroundColor: "#3B5BDB", fontSize: "0.75rem", fontWeight: 600 }}
                  >
                    Daftar untuk Akses Penuh
                  </button>
                </div>
              )}
            </nav>
          </aside>
        )}

        {/* ── Reading Area ── */}
        <main
          id="reader-content"
          ref={contentRef}
          className="flex-1 overflow-y-auto flex flex-col items-center py-10 px-4"
          style={{ backgroundColor: bg }}
          tabIndex={-1}
        >
          {chaptersLoading ? (
            <div className="flex flex-col items-center gap-3 py-20" aria-live="polite" role="status">
              <Loader2 className="w-10 h-10 animate-spin" style={{ color: "#3B5BDB" }} aria-hidden="true" />
              <p style={{ color: mutedText }}>Memuat konten buku...</p>
            </div>
          ) : isLocked ? (
            /* Lock Screen */
            <div className="flex flex-col items-center justify-center flex-1 max-w-md text-center py-20" role="main" aria-label="Konten terkunci">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: dm ? "#1E2D4F" : "#EEF2FF" }}>
                <Lock className="w-10 h-10" style={{ color: "#3B5BDB" }} aria-hidden="true" />
              </div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: bodyText, marginBottom: "0.75rem" }}>
                Konten Terkunci
              </h1>
              <p style={{ fontSize: "0.95rem", color: mutedText, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                Anda telah membaca bagian preview. Daftar sebagai pengguna Pustakability untuk mengakses{" "}
                <strong>{chapters.length} bab</strong> penuh dari buku ini.
              </p>
              <div className="flex flex-col gap-3 w-full">
                <button onClick={() => onNavigate("register")} className="py-3.5 rounded-xl font-semibold text-white" style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)", fontSize: "1rem" }}>
                  Daftar Sekarang — Gratis
                </button>
                <button onClick={() => onNavigate("login")} className="py-3 rounded-xl" style={{ border: `1.5px solid ${dm ? "#1E2D4F" : "#E5E7EB"}`, color: bodyText, fontSize: "0.9rem" }}>
                  Sudah punya akun? Masuk
                </button>
              </div>
            </div>
          ) : (
            /* Book Content */
            <article
              className="w-full max-w-2xl rounded-2xl shadow-sm"
              style={{ backgroundColor: readingBg, border: `1px solid ${dm ? "#1E2D4F" : "#F0F0F0"}` }}
              aria-labelledby={`ch-title-${currentChapter}`}
              lang="id"
            >
              {/* Chapter header */}
              <header
                className="px-10 pt-10 pb-6"
                style={{ borderBottom: `1px solid ${dm ? "#1E2D4F" : "#F5F5F5"}` }}
              >
                <p
                  style={{ fontSize: "0.72rem", color: mutedText, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}
                  aria-hidden="true"
                >
                  Bab {currentChapter + 1} dari {canReadFull ? chapters.length : previewCount}
                </p>
                <h1
                  id={`ch-title-${currentChapter}`}
                  style={{ fontSize: "1.5rem", fontWeight: 700, color: bodyText, lineHeight: 1.3 }}
                >
                  {chapter.title}
                </h1>
              </header>

              {/* Chapter body — rendered as semantic paragraphs */}
              <div
                className="px-10 py-8"
                style={{ fontSize: "1rem", lineHeight: 1.9, color: bodyText }}
                aria-live="polite"
              >
                {(chapter.content ?? "")
                  .split("\n\n")
                  .filter((p) => p.trim())
                  .map((para, i) => (
                    <p key={i} style={{ marginBottom: "1.25rem" }}>
                      {para.trim()}
                    </p>
                  ))}

                {/* Preview end prompt for guests */}
                {isGuest && (
                  <div
                    className="mt-8 p-6 rounded-xl text-center"
                    style={{ backgroundColor: dm ? "#1E2D4F" : "#EEF2FF", border: `2px dashed ${dm ? "#2A3F6F" : "#C7D2FE"}` }}
                    aria-label="Akhir dari preview. Daftar untuk membaca selengkapnya."
                  >
                    <BookOpen className="w-8 h-8 mx-auto mb-3" style={{ color: "#3B5BDB" }} aria-hidden="true" />
                    <p style={{ fontSize: "0.9rem", fontWeight: 600, color: dm ? "#93C5FD" : "#3730A3" }}>
                      Ini adalah akhir dari preview bab pertama
                    </p>
                    <p style={{ fontSize: "0.8rem", color: mutedText, marginTop: "0.375rem", marginBottom: "1rem" }}>
                      Daftar gratis untuk membaca {chapters.length - 1} bab berikutnya
                    </p>
                    <button onClick={() => onNavigate("register")} className="px-6 py-2.5 rounded-xl text-white font-semibold" style={{ background: "linear-gradient(135deg, #0A1172, #3B5BDB)", fontSize: "0.875rem" }}>
                      Daftar Sekarang
                    </button>
                  </div>
                )}
              </div>
            </article>
          )}
        </main>
      </div>

      {/* ── Bottom nav bar ── */}
      {!isLocked && (
        <footer
          className="flex items-center justify-between px-6 py-3 flex-shrink-0"
          style={{ backgroundColor: headerBg, borderTop: `1px solid ${headerBorder}`, height: "56px" }}
          role="navigation"
          aria-label="Navigasi bab"
        >
          <button
            onClick={goPrev}
            disabled={currentChapter === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
            style={{
              color:  currentChapter === 0 ? (dm ? "#374151" : "#D1D5DB") : bodyText,
              border: `1px solid ${currentChapter === 0 ? (dm ? "#1E2D4F" : "#E5E7EB") : (dm ? "#2A3F6F" : "#CBD5E1")}`,
              cursor: currentChapter === 0 ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
            }}
            aria-label="Bab sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            Bab Sebelumnya
          </button>

          <div
            style={{ fontSize: "0.8rem", color: mutedText }}
            aria-live="polite"
            aria-label={`Bab ${currentChapter + 1} dari ${canReadFull ? chapters.length : previewCount}`}
          >
            {currentChapter + 1} / {canReadFull ? chapters.length : previewCount}
          </div>

          <button
            onClick={goNext}
            disabled={currentChapter >= (canReadFull ? chapters.length - 1 : previewCount - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-white"
            style={{
              backgroundColor: currentChapter >= (canReadFull ? chapters.length - 1 : previewCount - 1) ? (dm ? "#1E2D4F" : "#E5E7EB") : "#3B5BDB",
              color: currentChapter >= (canReadFull ? chapters.length - 1 : previewCount - 1) ? mutedText : "white",
              cursor: currentChapter >= (canReadFull ? chapters.length - 1 : previewCount - 1) ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
            }}
            aria-label="Bab berikutnya"
          >
            Bab Berikutnya
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </footer>
      )}
    </div>
  );
}
