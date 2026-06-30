import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsSection } from "./components/StatsSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { BookCatalogSection } from "./components/BookCatalogSection";
import { HowToAccessSection } from "./components/HowToAccessSection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { Footer } from "./components/Footer";
import { CatalogPage } from "./components/CatalogPage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { EbookReader } from "./components/EbookReader";
import { AdminDashboard } from "./components/AdminDashboard";
import { VolunteerDashboard } from "./components/VolunteerDashboard";
import { allBooks } from "./data/books";

export type UserRole = "admin" | "user" | "volunteer" | "guest";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "volunteer";
}

export type Page = "home" | "catalog" | "login" | "register" | "ebook" | "admin" | "volunteer";

const MOCK_CREDENTIALS = [
  { id: "1", email: "admin@ub.ac.id", password: "Admin123", name: "Administrator", role: "admin" as const },
  { id: "2", email: "mahasiswa@ub.ac.id", password: "User123", name: "Siti Rahayu", role: "user" as const },
  { id: "3", email: "relawan@ub.ac.id", password: "Vol123", name: "Budi Santoso", role: "volunteer" as const },
];

export default function App() {
  const { t } = useTranslation();
  const [page, setPage] = useState<Page>("home");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

  const role: UserRole = user?.role ?? "guest";

  const navigateTo = (p: Page, bookId?: string) => {
    setPage(p);
    if (bookId !== undefined) setSelectedBookId(bookId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = (email: string, password: string): boolean => {
    const found = MOCK_CREDENTIALS.find((u) => u.email === email && u.password === password);
    if (found) {
      setUser({ id: found.id, name: found.name, email: found.email, role: found.role });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setPage("home");
    window.scrollTo({ top: 0 });
  };

  const openBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setPage("ebook");
    window.scrollTo({ top: 0 });
  };

  const selectedBook = allBooks.find((b) => b.id === selectedBookId) ?? allBooks[0];

  const dm = darkMode;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        backgroundColor: dm ? "#0D1117" : "#FFFFFF",
        color: dm ? "#F1F5F9" : "#0F1B35",
      }}
    >
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#0A1172] focus:text-white"
        style={{ fontSize: "0.875rem" }}
      >
        Lewati ke konten utama
      </a>

      {/* Navbar — hidden only inside full-screen ebook reader */}
      {page !== "ebook" && (
        <Navbar
          currentPage={page}
          onNavigate={navigateTo}
          darkMode={dm}
          onDarkModeToggle={() => setDarkMode((v) => !v)}
          user={user}
          role={role}
          onLogout={logout}
        />
      )}

      <main id="main-content">
        {/* ── Home Page ── */}
        {page === "home" && (
          <>
            <Hero darkMode={dm} onNavigate={navigateTo} />
            <StatsSection darkMode={dm} />
            <FeaturesSection darkMode={dm} />
            <BookCatalogSection
              darkMode={dm}
              onNavigate={navigateTo}
              role={role}
              onOpenBook={openBook}
            />
            <HowToAccessSection darkMode={dm} />
            <TestimonialsSection darkMode={dm} />

            {/* CTA Banner */}
            <section
              className="py-16"
              style={{ background: "linear-gradient(135deg, #0A1172, #0D7070)" }}
              aria-label="Ajakan bergabung"
            >
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-white" style={{ fontSize: "1.9rem", fontWeight: 700 }}>
                  {t("cta.title")}
                </h2>
                <p className="mt-3 mb-8 text-blue-100" style={{ fontSize: "1rem" }}>
                  {t("cta.desc")}
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button
                    onClick={() => navigateTo("catalog")}
                    className="px-8 py-3.5 rounded-xl font-semibold bg-white text-[#0A1172] hover:bg-gray-50 transition-colors"
                  >
                    {t("cta.btn_explore")}
                  </button>
                  {!user && (
                    <button
                      onClick={() => navigateTo("register")}
                      className="px-8 py-3.5 rounded-xl font-medium border border-white/40 text-white hover:bg-white/10 transition-colors"
                    >
                      {t("cta.btn_register")}
                    </button>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── Catalog Page ── */}
        {page === "catalog" && (
          <CatalogPage darkMode={dm} role={role} onOpenBook={openBook} onNavigate={navigateTo} />
        )}

        {/* ── Login Page ── */}
        {page === "login" && (
          <LoginPage darkMode={dm} onLogin={login} onNavigate={navigateTo} />
        )}

        {/* ── Register Page ── */}
        {page === "register" && (
          <RegisterPage darkMode={dm} onNavigate={navigateTo} />
        )}

        {/* ── E-book Reader (full screen, no navbar/footer) ── */}
        {page === "ebook" && (
          <EbookReader
            book={selectedBook}
            darkMode={dm}
            role={role}
            onClose={() => navigateTo("catalog")}
            onNavigate={navigateTo}
            onDarkModeToggle={() => setDarkMode((v) => !v)}
          />
        )}

        {/* ── Admin Dashboard ── */}
        {page === "admin" && role === "admin" && (
          <AdminDashboard darkMode={dm} onNavigate={navigateTo} />
        )}

        {/* ── Volunteer Dashboard ── */}
        {page === "volunteer" && (role === "volunteer" || role === "admin") && (
          <VolunteerDashboard darkMode={dm} user={user!} onNavigate={navigateTo} />
        )}

        {/* Unauthorized access fallback */}
        {((page === "admin" && role !== "admin") || (page === "volunteer" && role === "guest" && role === "user")) && (
          <div
            className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-4"
            style={{ backgroundColor: dm ? "#0D1117" : "#F5F7FF" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔒</div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: dm ? "#F1F5F9" : "#0F1B35" }}>
              Akses Ditolak
            </h2>
            <p style={{ color: dm ? "#94A3B8" : "#6B7280", marginTop: "0.5rem" }}>
              Anda tidak memiliki izin untuk mengakses halaman ini.
            </p>
            <button
              onClick={() => navigateTo("home")}
              className="mt-6 px-6 py-3 rounded-xl text-white"
              style={{ backgroundColor: "#0A1172" }}
            >
              Kembali ke Beranda
            </button>
          </div>
        )}
      </main>

      {/* Footer — hidden in ebook reader */}
      {page !== "ebook" && <Footer darkMode={dm} onNavigate={navigateTo} />}
    </div>
  );
}
