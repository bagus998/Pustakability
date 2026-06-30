import { useState } from "react";
import { Search, Menu, X, Moon, Sun, ChevronDown, LogOut, Shield, BookPlus } from "lucide-react";
import type { AuthUser, UserRole, Page } from "../App";
import logoImg from "../../imports/logo.png";
import { useTranslation } from "react-i18next";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  user: AuthUser | null;
  role: UserRole;
  onLogout: () => void;
}

const languages = [
  { code: "id", label: "Indonesia", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Flag_of_Indonesia.svg/960px-Flag_of_Indonesia.svg.png", short: "ID" },
  { code: "en", label: "English",   flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/500px-Flag_of_the_United_States.svg.png", short: "EN" },
];

export function Navbar({ currentPage, onNavigate, darkMode: dm, onDarkModeToggle, user, role, onLogout }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langOpen, setLangOpen]       = useState(false);
  
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];
  const setLang = (l: typeof languages[0]) => i18n.changeLanguage(l.code);

  const navBg     = dm ? "#0F1623" : "#0A1172";
  const navBorder = dm ? "#1E2D4F" : "rgba(255,255,255,0.1)";

  const navLinks = [
    { id: "home"    as Page, label: t("navbar.home") },
    { id: "catalog" as Page, label: t("navbar.catalog") },
  ];

  const roleLabel: Record<UserRole, string> = {
    admin:     "Administrator",
    user:      "Pengguna",
    volunteer: "Volunteer",
    guest:     "Tamu",
  };

  const roleBadgeColor: Record<UserRole, string> = {
    admin:     "#BE185D",
    user:      "#00D4AC",
    volunteer: "#0D7070",
    guest:     "#6B7280",
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-lg"
      style={{ backgroundColor: navBg, borderBottom: `1px solid ${navBorder}` }}
      role="navigation"
      aria-label="Navigasi utama"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-3 group"
            aria-label="Pustakability — Beranda"
          >
            <img
              src={logoImg}
              alt="Logo Pustakability"
              className="w-10 h-10 object-contain"
              style={{ filter: dm ? "brightness(1.1)" : "brightness(1)" }}
            />
            <div className="flex flex-col text-left">
              <span className="text-white font-semibold leading-tight" style={{ fontSize: "0.95rem" }}>
                Pustakability
              </span>
              <span className="text-blue-200/70 leading-none" style={{ fontSize: "0.6rem" }}>
                PLD Universitas Brawijaya
              </span>
            </div>
          </button>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: currentPage === link.id ? "rgba(255,255,255,0.15)" : "transparent",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: currentPage === link.id ? 500 : 400,
                }}
                aria-current={currentPage === link.id ? "page" : undefined}
              >
                {link.label}
              </button>
            ))}

            {role === "admin" && (
              <button
                onClick={() => onNavigate("admin")}
                className="px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                style={{
                  backgroundColor: currentPage === "admin" ? "rgba(255,255,255,0.15)" : "transparent",
                  color: currentPage === "admin" ? "white" : "rgba(255,255,255,0.7)",
                  fontSize: "0.875rem",
                }}
              >
                <Shield className="w-3.5 h-3.5" />
                {t("navbar.admin")}
              </button>
            )}

            {(role === "volunteer" || role === "admin") && (
              <button
                onClick={() => onNavigate("volunteer")}
                className="px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                style={{
                  backgroundColor: currentPage === "volunteer" ? "rgba(255,255,255,0.15)" : "transparent",
                  color: currentPage === "volunteer" ? "white" : "rgba(255,255,255,0.7)",
                  fontSize: "0.875rem",
                }}
              >
                <BookPlus className="w-3.5 h-3.5" />
                {t("navbar.volunteer")}
              </button>
            )}
          </div>

          {/* ── Right Controls ── */}
          <div className="flex items-center gap-1.5">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)" }}
              aria-label="Cari"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.7)" }}
              aria-label={dm ? "Mode terang" : "Mode gelap"}
              aria-pressed={dm}
            >
              {dm ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* ── Language Switcher ── */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => { setLangOpen(!langOpen); setUserMenuOpen(false); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors hover:bg-white/10"
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-label="Pilih bahasa"
              >
                <img src={currentLang.flag} alt={currentLang.label} className="w-5 h-auto rounded-sm shadow-sm" />
                <span className="text-white" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                  {currentLang.short}
                </span>
                <ChevronDown
                  className="w-3 h-3 transition-transform"
                  style={{ color: "rgba(255,255,255,0.6)", transform: langOpen ? "rotate(180deg)" : "none" }}
                />
              </button>

              {langOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setLangOpen(false)} />
                  <div
                    className="absolute right-0 top-full mt-2 rounded-2xl shadow-xl z-20 py-2 overflow-hidden min-w-[160px]"
                    style={{
                      backgroundColor: dm ? "#161B2E" : "white",
                      border: `1px solid ${dm ? "#1E2D4F" : "#E5E7EB"}`,
                    }}
                    role="listbox"
                    aria-label="Pilih bahasa"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        role="option"
                        aria-selected={currentLang.code === l.code}
                        onClick={() => { setLang(l); setLangOpen(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
                        style={{
                          backgroundColor:
                            currentLang.code === l.code
                              ? dm ? "rgba(59,91,219,0.2)" : "#EEF2FF"
                              : "transparent",
                          color: dm ? "#F1F5F9" : "#0F1B35",
                        }}
                        onMouseEnter={(e) => {
                          if (currentLang.code !== l.code)
                            e.currentTarget.style.backgroundColor = dm ? "rgba(255,255,255,0.05)" : "#F9FAFB";
                        }}
                        onMouseLeave={(e) => {
                          if (currentLang.code !== l.code)
                            e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <img src={l.flag} alt={l.label} className="w-6 h-auto rounded-sm shadow-sm" />
                        <span style={{ fontSize: "0.875rem", fontWeight: currentLang.code === l.code ? 600 : 400 }}>
                          {l.label}
                        </span>
                        {currentLang.code === l.code && (
                          <span className="ml-auto" style={{ color: "#3B5BDB", fontSize: "0.65rem", fontWeight: 700 }}>
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* ── User Menu / Auth Buttons ── */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => { setUserMenuOpen(!userMenuOpen); setLangOpen(false); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl transition-colors hover:bg-white/10"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: roleBadgeColor[role], fontSize: "0.75rem", fontWeight: 700 }}
                    aria-hidden="true"
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-white leading-tight" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      {user.name.split(" ")[0]}
                    </span>
                    <span style={{ fontSize: "0.65rem", color: roleBadgeColor[role] }}>
                      {roleLabel[role]}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-white/60 hidden sm:block" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div
                      className="absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-xl z-20 py-1 overflow-hidden"
                      style={{
                        backgroundColor: dm ? "#161B2E" : "white",
                        border: `1px solid ${dm ? "#1E2D4F" : "#E5E7EB"}`,
                      }}
                    >
                      <div className="px-4 py-3" style={{ borderBottom: `1px solid ${dm ? "#1E2D4F" : "#F3F4F6"}` }}>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: dm ? "#F1F5F9" : "#0F1B35" }}>
                          {user.name}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: dm ? "#94A3B8" : "#6B7280" }}>{user.email}</div>
                        <span
                          className="inline-block mt-1 px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: `${roleBadgeColor[role]}18`, color: roleBadgeColor[role], fontSize: "0.7rem", fontWeight: 600 }}
                        >
                          {roleLabel[role]}
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => { setUserMenuOpen(false); onNavigate("catalog"); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                          style={{ color: dm ? "#CBD5E1" : "#374151", fontSize: "0.875rem" }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "rgba(255,255,255,0.04)" : "#F9FAFB")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <BookPlus className="w-4 h-4" />
                          {t("navbar.catalog")}
                        </button>

                        {(role === "volunteer" || role === "admin") && (
                          <button
                            onClick={() => { setUserMenuOpen(false); onNavigate("volunteer"); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                            style={{ color: dm ? "#CBD5E1" : "#374151", fontSize: "0.875rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "rgba(255,255,255,0.04)" : "#F9FAFB")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            <BookPlus className="w-4 h-4" />
                            {t("navbar.volunteer")}
                          </button>
                        )}

                        {role === "admin" && (
                          <button
                            onClick={() => { setUserMenuOpen(false); onNavigate("admin"); }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                            style={{ color: dm ? "#CBD5E1" : "#374151", fontSize: "0.875rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "rgba(255,255,255,0.04)" : "#F9FAFB")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            <Shield className="w-4 h-4" />
                            {t("navbar.admin")}
                          </button>
                        )}

                        <div style={{ height: "1px", backgroundColor: dm ? "#1E2D4F" : "#F3F4F6", margin: "0.25rem 0" }} />

                        <button
                          onClick={() => { setUserMenuOpen(false); onLogout(); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
                          style={{ color: "#DC2626", fontSize: "0.875rem" }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <LogOut className="w-4 h-4" />
                          {t("navbar.logout")}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => onNavigate("login")}
                  className="px-4 py-1.5 rounded-lg transition-colors"
                  style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.875rem" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                >
                  {t("navbar.login")}
                </button>
                <button
                  onClick={() => onNavigate("register")}
                  className="px-4 py-1.5 rounded-lg font-medium"
                  style={{ backgroundColor: "#00D4AC", color: "#0A1172", fontSize: "0.875rem" }}
                >
                  {t("navbar.register")}
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: "rgba(255,255,255,0.7)" }}
              aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-3 pt-2 border-t border-white/10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-300" />
              <input
                type="search"
                placeholder="Cari judul, penulis, atau kategori..."
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-lg outline-none bg-white/10 border border-white/20 text-white placeholder-blue-300"
                style={{ fontSize: "0.875rem" }}
                onFocus={(e) => (e.target.style.borderColor = "#00D4AC")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.2)")}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
                  className="text-left px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10"
                  style={{ fontSize: "0.875rem" }}
                >
                  {link.label}
                </button>
              ))}
              {role === "admin" && (
                <button onClick={() => { onNavigate("admin"); setMobileOpen(false); }} className="text-left px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 flex items-center gap-2" style={{ fontSize: "0.875rem" }}>
                  <Shield className="w-4 h-4" /> Admin
                </button>
              )}
              {(role === "volunteer" || role === "admin") && (
                <button onClick={() => { onNavigate("volunteer"); setMobileOpen(false); }} className="text-left px-3 py-2.5 rounded-lg text-white/80 hover:bg-white/10 flex items-center gap-2" style={{ fontSize: "0.875rem" }}>
                  <BookPlus className="w-4 h-4" /> {t("navbar.volunteer")}
                </button>
              )}

              {/* Language switcher mobile */}
              <div className="flex items-center gap-2 px-3 py-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors"
                    style={{
                      backgroundColor: currentLang.code === l.code ? "rgba(255,255,255,0.15)" : "transparent",
                      color: "white",
                      fontSize: "0.8rem",
                      border: currentLang.code === l.code ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
                    }}
                  >
                    <img src={l.flag} alt={l.label} className="w-5 h-auto rounded-sm shadow-sm" />
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 px-3 mt-1">
                {user ? (
                  <button onClick={() => { onLogout(); setMobileOpen(false); }} className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-red-400/40 text-red-300" style={{ fontSize: "0.875rem" }}>
                    <LogOut className="w-4 h-4" /> {t("navbar.logout")}
                  </button>
                ) : (
                  <>
                    <button onClick={() => { onNavigate("login"); setMobileOpen(false); }} className="px-4 py-1.5 rounded-lg border border-white/20 text-white/80" style={{ fontSize: "0.875rem" }}>{t("navbar.login")}</button>
                    <button onClick={() => { onNavigate("register"); setMobileOpen(false); }} className="px-4 py-1.5 rounded-lg font-medium" style={{ backgroundColor: "#00D4AC", color: "#0A1172", fontSize: "0.875rem" }}>{t("navbar.register")}</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
