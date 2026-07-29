import { useState } from "react";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { t as T } from "./i18n/translations";
import { BookProvider, useBooks } from "./contexts/BookContext";
import { ToastProvider } from "./contexts/ToastContext";
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
import { LegalModal, type LegalTab } from "./components/LegalModal";
import { ProfileModal } from "./components/ProfileModal";

import type { AppUser } from "./components/EditUserModal";
import { allBooks } from "./data/books";
import {
  apiFetchUsers,
  apiLoginUser,
  apiRegisterUser,
  apiUpdateUser,
  apiDeleteUser,
} from "./api/users";
import { useEffect } from "react";

export type UserRole = "admin" | "user" | "volunteer" | "guest";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "volunteer";
}

export type Page = "home" | "catalog" | "login" | "register" | "ebook" | "admin" | "volunteer";

const INITIAL_USERS: AppUser[] = [];

const PAGE_TO_PATH: Record<Page, string> = {
  home: "/home",
  catalog: "/collections",
  login: "/login",
  register: "/register",
  ebook: "/reader",
  admin: "/dashboard/admin",
  volunteer: "/dashboard/volunteer",
};

const PATH_TO_PAGE: Record<string, Page> = {
  "/": "home",
  "/home": "home",
  "/collections": "catalog",
  "/catalog": "catalog",
  "/login": "login",
  "/register": "register",
  "/reader": "ebook",
  "/ebook": "ebook",
  "/dashboard/admin": "admin",
  "/admin": "admin",
  "/dashboard/volunteer": "volunteer",
  "/volunteer": "volunteer",
};

const getInitialUrlState = (): { page: Page; bookId: string | null; filter: { query?: string; format?: string } } => {
  const path = window.location.pathname.toLowerCase();
  const searchParams = new URLSearchParams(window.location.search);
  const bookId = searchParams.get("id");
  const query = searchParams.get("search") || searchParams.get("query") || undefined;
  const format = searchParams.get("format") || undefined;

  let page: Page = PATH_TO_PAGE[path] || "home";

  if (path === "/" || path === "") {
    const saved = localStorage.getItem("pustakability_page");
    const validPages: Page[] = ["home", "catalog", "login", "register", "ebook", "admin", "volunteer"];
    if (saved && validPages.includes(saved as Page)) {
      page = saved as Page;
    }
  }

  const savedBook = localStorage.getItem("pustakability_book");
  return {
    page,
    bookId: bookId || savedBook || null,
    filter: { query, format },
  };
};

function AppInner() {
  const [page, setPage] = useState<Page>(() => {
    return getInitialUrlState().page;
  });

  const [catalogFilter, setCatalogFilter] = useState<{ query?: string; format?: string }>(() => {
    return getInitialUrlState().filter;
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("pustakability_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [users, setUsers] = useState<AppUser[]>(() => {
    try {
      const saved = localStorage.getItem("pustakability_users");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_USERS;
  });
  const [darkMode, setDarkMode] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const [selectedBookId, setSelectedBookId] = useState<string | null>(() => {
    return getInitialUrlState().bookId;
  });

  useEffect(() => {
    try {
      localStorage.setItem("pustakability_users", JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("pustakability_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("pustakability_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("pustakability_page", page);
  }, [page]);

  useEffect(() => {
    if (selectedBookId) {
      localStorage.setItem("pustakability_book", selectedBookId);
    } else {
      localStorage.removeItem("pustakability_book");
    }
  }, [selectedBookId]);

  // Sync browser URL paths & history popstate (Back/Forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const { page: newPage, bookId: newBookId, filter: newFilter } = getInitialUrlState();
      setPage(newPage);
      if (newBookId) setSelectedBookId(newBookId);
      setCatalogFilter(newFilter);
    };

    // Ensure initial URL path is set nicely on first mount
    let initialPath = PAGE_TO_PATH[page] || "/home";
    if (page === "ebook" && selectedBookId) {
      initialPath = `/reader?id=${selectedBookId}`;
    }
    if (window.location.pathname === "/" && initialPath !== "/home") {
      window.history.replaceState({}, "", initialPath);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    apiFetchUsers()
      .then((data) => {
        if (data && data.length > 0) {
          setUsers((prev) => {
            // Merge remote users with local registered users
            const existingEmails = new Set(data.map((u) => u.email.toLowerCase()));
            const localOnly = prev.filter((u) => !existingEmails.has(u.email.toLowerCase()));
            return [...data, ...localOnly];
          });
        }
      })
      .catch((err) => {
        console.warn("Could not fetch users from Supabase Edge Function, using fallback state:", err);
      });
  }, []);

  const role: UserRole = user?.role ?? "guest";
  const { t } = useLanguage();
  const { books } = useBooks();

  const navigateTo = (p: Page, bookId?: string, filter?: { query?: string; format?: string }) => {
    setPage(p);
    const targetBookId = bookId !== undefined ? bookId : selectedBookId;
    if (bookId !== undefined) setSelectedBookId(bookId);

    if (filter) {
      setCatalogFilter(filter);
    } else if (p !== "catalog") {
      setCatalogFilter({});
    }

    let targetPath = PAGE_TO_PATH[p] || "/home";
    if (p === "ebook" && targetBookId) {
      targetPath = `/reader?id=${targetBookId}`;
    } else if (p === "catalog") {
      const queryToUse = filter?.query ?? catalogFilter.query;
      const formatToUse = filter?.format ?? catalogFilter.format;
      const params = new URLSearchParams();
      if (queryToUse) params.set("search", queryToUse);
      if (formatToUse && formatToUse !== "all") params.set("format", formatToUse);
      const queryString = params.toString();
      targetPath = `/collections${queryString ? `?${queryString}` : ""}`;
    }

    if (window.location.pathname + window.location.search !== targetPath) {
      window.history.pushState({}, "", targetPath);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; reason?: "invalid" | "pending" }> => {
    let loggedUser: AuthUser | null = null;
    try {
      const res = await apiLoginUser(email, password);
      if (res.success && res.user) {
        loggedUser = { id: res.user.id, name: res.user.name, email: res.user.email, role: res.user.role };
      } else if (res.reason === "pending") {
        return { success: false, reason: "pending" };
      }
    } catch {
      // API call failed
    }

    if (!loggedUser) {
      // Fallback check against local users list
      const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && (u.password === password || (!u.password && password === "User123")));
      if (!found) return { success: false, reason: "invalid" };
      if (found.status === "pending") return { success: false, reason: "pending" };
      loggedUser = { id: found.id, name: found.name, email: found.email, role: found.role };
    }

    setUser(loggedUser);
    localStorage.setItem("pustakability_user", JSON.stringify(loggedUser));
    return { success: true };
  };

  const registerUser = async (userData: {
    name: string;
    email: string;
    password: string;
    role: "user" | "volunteer";
    faculty: string;
    nim: string;
    disability?: string;
  }) => {
    const newUser: AppUser = {
      id: String(Date.now()),
      name: userData.name,
      email: userData.email.toLowerCase(),
      password: userData.password,
      role: userData.role,
      faculty: userData.faculty,
      status: "pending",
      joined: new Date().toISOString().split("T")[0],
    };

    setUsers((prev) => {
      const filtered = prev.filter((u) => u.email.toLowerCase() !== newUser.email);
      const updated = [...filtered, newUser];
      try {
        localStorage.setItem("pustakability_users", JSON.stringify(updated));
      } catch {}
      return updated;
    });

    try {
      await apiRegisterUser(userData);
    } catch (err) {
      console.warn("Failed to sync registered user to Supabase:", err);
    }
  };

  const updateUser = async (id: string, updates: Partial<AppUser>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    try {
      await apiUpdateUser(id, updates);
      const fresh = await apiFetchUsers();
      if (fresh?.length) setUsers(fresh);
    } catch (err) {
      console.warn("Failed to update user in Supabase:", err);
    }
  };

  const deleteUser = async (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    try {
      await apiDeleteUser(id);
      const fresh = await apiFetchUsers();
      if (fresh?.length) setUsers(fresh);
    } catch (err) {
      console.warn("Failed to delete user in Supabase:", err);
    }
  };

  const logout = () => {
    setUser(null);
    setPage("home");
    setSelectedBookId(null);
    localStorage.removeItem("pustakability_user");
    localStorage.removeItem("pustakability_page");
    localStorage.removeItem("pustakability_book");
    window.scrollTo({ top: 0 });
  };

  const openBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setPage("ebook");
    window.scrollTo({ top: 0 });
  };

  const selectedBook = books.find((b) => b.id === selectedBookId) ?? books[0] ?? allBooks[0];

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
        {t(T.nav.skipToMain)}
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
          onOpenProfile={() => setProfileOpen(true)}
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
            <section className="py-16" style={{ background: "linear-gradient(135deg, #0A1172, #0D7070)" }} aria-label="CTA">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-white" style={{ fontSize: "1.9rem", fontWeight: 700 }}>{t(T.cta.title)}</h2>
                <p className="mt-3 mb-8 text-blue-100" style={{ fontSize: "1rem" }}>{t(T.cta.body)}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button onClick={() => navigateTo("catalog")} className="px-8 py-3.5 rounded-xl font-semibold bg-white text-[#0A1172] hover:bg-gray-50 transition-colors">
                    {t(T.cta.browse)}
                  </button>
                  {!user && (
                    <button onClick={() => navigateTo("register")} className="px-8 py-3.5 rounded-xl font-medium border border-white/40 text-white hover:bg-white/10 transition-colors">
                      {t(T.cta.register)}
                    </button>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ── Catalog Page ── */}
        {page === "catalog" && (
          <CatalogPage
            darkMode={dm}
            role={role}
            onOpenBook={openBook}
            onNavigate={navigateTo}
            initialQuery={catalogFilter.query}
            initialFormat={catalogFilter.format}
          />
        )}

        {/* ── Login Page ── */}
        {page === "login" && (
          <LoginPage darkMode={dm} onLogin={login} onNavigate={navigateTo} />
        )}

        {/* ── Register Page ── */}
        {page === "register" && (
          <RegisterPage darkMode={dm} onNavigate={navigateTo} onRegister={registerUser} />
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
          <AdminDashboard
            darkMode={dm}
            onNavigate={navigateTo}
            users={users}
            onUpdateUser={updateUser}
            onDeleteUser={deleteUser}
          />
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
      {page !== "ebook" && (
        <Footer darkMode={dm} onNavigate={navigateTo} onOpenLegal={(tab) => setLegalTab(tab)} />
      )}

      {/* Legal Modals (Privacy Policy & Terms of Use) */}
      {legalTab && (
        <LegalModal
          initialTab={legalTab}
          darkMode={dm}
          onClose={() => setLegalTab(null)}
        />
      )}

      {/* User Profile Modal */}
      {profileOpen && user && (
        <ProfileModal
          user={users.find((u) => u.email.toLowerCase() === user.email.toLowerCase()) || {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            faculty: "Teknik",
            status: "active",
            joined: "2024-01-01",
          }}
          darkMode={dm}
          onClose={() => setProfileOpen(false)}
          onUpdateUser={(id, updates) => {
            updateUser(id, updates);
            if (user && updates.name) {
              setUser((prev) => (prev ? { ...prev, name: updates.name! } : null));
            }
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <LanguageProvider>
        <BookProvider>
          <AppInner />
        </BookProvider>
      </LanguageProvider>
    </ToastProvider>
  );
}
