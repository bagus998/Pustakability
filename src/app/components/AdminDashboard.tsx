import { useState } from "react";
import {
  Users, BookOpen, CheckCircle, XCircle, Clock,
  Trash2, Edit2, Shield, UserCheck, BarChart3,
  RefreshCw, Wifi, WifiOff, FileText,
} from "lucide-react";
import { useBooks } from "../contexts/BookContext";
import type { Book } from "../data/books";
import type { Page } from "../App";
import { EditBookModal } from "./EditBookModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { EditUserModal, type AppUser } from "./EditUserModal";
import { DeleteUserModal } from "./DeleteUserModal";
import { EditChapterModal } from "./EditChapterModal";
import { useLanguage } from "../i18n/LanguageContext";
import { t as T } from "../i18n/translations";

interface AdminDashboardProps {
  darkMode: boolean;
  onNavigate: (page: Page) => void;
  users?: AppUser[];
  onUpdateUser?: (id: string, updates: Partial<AppUser>) => void;
  onDeleteUser?: (id: string) => void;
}

type Tab = "overview" | "users" | "books" | "validasi";

const INITIAL_USERS: AppUser[] = [
  { id: "1", name: "Siti Rahayu",   email: "mahasiswa@ub.ac.id",     role: "user",      faculty: "MIPA",        status: "active",  joined: "2024-03-10" },
  { id: "2", name: "Ahmad Fauzan",  email: "ahmad@student.ub.ac.id", role: "user",      faculty: "Hukum",       status: "active",  joined: "2024-02-15" },
  { id: "3", name: "Budi Santoso",  email: "relawan@ub.ac.id",       role: "volunteer", faculty: "Teknik",      status: "active",  joined: "2024-01-20" },
  { id: "4", name: "Rizky Pratama", email: "rizky@student.ub.ac.id", role: "user",      faculty: "Teknik",      status: "pending", joined: "2024-04-01" },
  { id: "5", name: "Dewi Lestari",  email: "dewi@student.ub.ac.id",  role: "volunteer", faculty: "Ilmu Budaya", status: "active",  joined: "2024-03-25" },
];

const roleColors: Record<string, string> = { admin: "#BE185D", user: "#0A1172", volunteer: "#0D7070" };
const statusColors: Record<string, { bg: string; text: string }> = {
  active:    { bg: "#DCFCE7", text: "#166534" },
  pending:   { bg: "#FEF9C3", text: "#854D0E" },
  suspended: { bg: "#FEE2E2", text: "#991B1B" },
};

export function AdminDashboard({ darkMode: dm, onNavigate, users: propsUsers, onUpdateUser, onDeleteUser }: AdminDashboardProps) {
  const { t } = useLanguage();
  const {
    books, pendingBooks,
    updateBook, deleteBook,
    approvePending, rejectPending,
    refreshBooks, apiAvailable, loading,
  } = useBooks();

  const [tab, setTab] = useState<Tab>("overview");

  // book modals
  const [editBook,    setEditBook]    = useState<Book | null>(null);
  const [deleteBook_, setDeleteBook_] = useState<Book | null>(null);
  const [editChaptersBook, setEditChaptersBook] = useState<Book | null>(null);

  // user state + modals
  const [internalUsers, setInternalUsers] = useState<AppUser[]>(INITIAL_USERS);
  const [editUser,   setEditUser]   = useState<AppUser | null>(null);
  const [deleteUser, setDeleteUser] = useState<AppUser | null>(null);

  const users = propsUsers ?? internalUsers;

  // Sorting state for Users table
  const [userSortField, setUserSortField] = useState<keyof AppUser>("name");
  const [userSortOrder, setUserSortOrder] = useState<"asc" | "desc">("asc");

  // Sorting state for Books table
  const [bookSortField, setBookSortField] = useState<keyof Book>("title");
  const [bookSortOrder, setBookSortOrder] = useState<"asc" | "desc">("asc");

  const toggleUserSort = (field: keyof AppUser) => {
    if (userSortField === field) {
      setUserSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setUserSortField(field);
      setUserSortOrder("asc");
    }
  };

  const toggleBookSort = (field: keyof Book) => {
    if (bookSortField === field) {
      setBookSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setBookSortField(field);
      setBookSortOrder("asc");
    }
  };

  const sortedUsersList = [...users].sort((a, b) => {
    const valA = a[userSortField] ?? "";
    const valB = b[userSortField] ?? "";
    const comp = String(valA).localeCompare(String(valB), undefined, { numeric: true, sensitivity: "base" });
    return userSortOrder === "asc" ? comp : -comp;
  });

  const sortedBooksList = [...books].sort((a, b) => {
    const valA = a[bookSortField] ?? "";
    const valB = b[bookSortField] ?? "";
    const comp = typeof valA === "number" && typeof valB === "number"
      ? valA - valB
      : String(valA).localeCompare(String(valB), undefined, { numeric: true, sensitivity: "base" });
    return bookSortOrder === "asc" ? comp : -comp;
  });

  const handleUpdateUser = (id: string, updates: Partial<AppUser>) => {
    if (onUpdateUser) {
      onUpdateUser(id, updates);
    } else {
      setInternalUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updates } : u)));
    }
  };

  const handleDeleteUser = (id: string) => {
    if (onDeleteUser) {
      onDeleteUser(id);
    } else {
      setInternalUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const bg       = dm ? "#0D1117" : "#F5F7FF";
  const card     = dm ? "#161B2E" : "#FFFFFF";
  const border   = dm ? "#1E2D4F" : "#E5E7EB";
  const text     = dm ? "#F1F5F9" : "#0F1B35";
  const muted    = dm ? "#94A3B8" : "#6B7280";
  const rowHover = dm ? "rgba(255,255,255,0.03)" : "#FAFAFA";

  const thStyle: React.CSSProperties = {
    fontSize: "0.72rem", fontWeight: 700, color: muted,
    textTransform: "uppercase", letterSpacing: "0.06em",
    padding: "0.75rem 1.25rem", textAlign: "left", whiteSpace: "nowrap",
  };
  const tdStyle: React.CSSProperties = {
    padding: "0.875rem 1.25rem", fontSize: "0.875rem",
    color: text, verticalAlign: "middle",
  };

  const tabs: { id: Tab; label: string; icon: React.FC<any> }[] = [
    { id: "overview", label: t(T.admin.tabs.overview),                             icon: BarChart3 },
    { id: "users",    label: t(T.admin.tabs.users),                                icon: Users },
    { id: "books",    label: `${t(T.admin.tabs.books)} (${books.length})`,         icon: BookOpen },
    { id: "validasi", label: `${t(T.admin.tabs.validasi)} (${pendingBooks.length})`, icon: Clock },
  ];

  return (
    <>
      <div className="min-h-screen pt-16" style={{ backgroundColor: bg }}>
        {/* Header */}
        <div className="py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: dm ? "#0F1623" : "#0A1172" }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-1">
              <Shield className="w-6 h-6 text-[#00D4AC]" aria-hidden="true" />
              <h1 className="text-white" style={{ fontSize: "1.75rem", fontWeight: 700 }}>
                {t(T.admin.title)}
              </h1>
            </div>
            <p className="text-blue-200" style={{ fontSize: "0.9rem" }}>
              {t(T.admin.subtitle)}
            </p>
            {/* API status */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5">
                {apiAvailable
                  ? <><Wifi className="w-4 h-4 text-[#00D4AC]" aria-hidden="true" /><span className="text-[#00D4AC]" style={{ fontSize: "0.78rem" }}>{t(T.admin.connectedToSupabase)}</span></>
                  : <><WifiOff className="w-4 h-4 text-yellow-400" aria-hidden="true" /><span className="text-yellow-400" style={{ fontSize: "0.78rem" }}>Mode offline — data lokal</span></>
                }
              </div>
              <button
                onClick={refreshBooks}
                disabled={loading}
                className="flex items-center gap-1 px-3 py-1 rounded-lg"
                style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "white", fontSize: "0.75rem" }}
                aria-label={t(T.admin.refresh)}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
                {t(T.admin.refresh)}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Bar */}
        <div style={{ backgroundColor: card, borderBottom: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto" role="tablist">
              {tabs.map((tb) => {
                const Icon = tb.icon;
                return (
                  <button
                    key={tb.id}
                    role="tab"
                    aria-selected={tab === tb.id}
                    onClick={() => setTab(tb.id)}
                    className="flex items-center gap-2 px-4 py-4 whitespace-nowrap transition-colors border-b-2"
                    style={{
                      borderBottomColor: tab === tb.id ? "#3B5BDB" : "transparent",
                      color: tab === tb.id ? "#3B5BDB" : muted,
                      fontSize: "0.875rem", fontWeight: tab === tb.id ? 600 : 400,
                    }}
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {tb.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* ── Overview ── */}
          {tab === "overview" && (
            <div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                  { label: t(T.admin.overview.totalUsers),  value: users.length,   sub: t(T.admin.overview.thisWeek),   icon: Users,     color: "#3B5BDB" },
                  { label: t(T.admin.overview.totalBooks),  value: books.length,   sub: t(T.admin.overview.categories), icon: BookOpen,  color: "#0D7070" },
                  { label: t(T.admin.overview.pending),     value: pendingBooks.length, sub: t(T.admin.overview.volSubmit), icon: Clock, color: "#D97706" },
                  { label: t(T.admin.overview.activeUsers), value: users.filter((u) => u.status === "active").length, sub: t(T.admin.overview.thisMonth), icon: UserCheck, color: "#16A34A" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${stat.color}18` }}>
                        <Icon className="w-5 h-5" style={{ color: stat.color }} aria-hidden="true" />
                      </div>
                      <div style={{ fontSize: "1.75rem", fontWeight: 700, color: text, lineHeight: 1 }}>{stat.value}</div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500, color: text, marginTop: "0.25rem" }}>{stat.label}</div>
                      <div style={{ fontSize: "0.75rem", color: muted, marginTop: "0.2rem" }}>{stat.sub}</div>
                    </div>
                  );
                })}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: t(T.admin.quickActions.viewPending), action: () => setTab("validasi"), color: "#D97706", icon: Clock },
                  { label: t(T.admin.quickActions.manageUsers), action: () => setTab("users"),   color: "#3B5BDB", icon: Users },
                  { label: t(T.admin.quickActions.manageBooks), action: () => setTab("books"),   color: "#0D7070", icon: BookOpen },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <button key={i} onClick={a.action} className="flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:scale-[1.02]" style={{ backgroundColor: card, border: `1px solid ${border}`, color: text }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${a.color}18` }}>
                        <Icon className="w-5 h-5" style={{ color: a.color }} aria-hidden="true" />
                      </div>
                      <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>{a.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Users ── */}
          {tab === "users" && (
            <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
              <div className="p-5 flex items-center justify-between" style={{ borderBottom: `1px solid ${border}` }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>
                  {t(T.admin.users.title)}{" "}
                  <span style={{ color: muted, fontWeight: 400 }}>({users.length} {t(T.admin.users.name).toLowerCase()})</span>
                </h2>
              </div>

              {users.length === 0 ? (
                <div className="p-16 text-center">
                  <Users className="w-12 h-12 mx-auto mb-3" style={{ color: muted }} aria-hidden="true" />
                  <p style={{ color: muted }}>Tidak ada pengguna terdaftar.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead style={{ borderBottom: `1px solid ${border}`, backgroundColor: dm ? "#0F1623" : "#F9FAFB" }}>
                      <tr>
                        {[
                          { key: "name" as const, label: t(T.admin.users.name) },
                          { key: "email" as const, label: t(T.admin.users.email) },
                          { key: "role" as const, label: t(T.admin.users.role) },
                          { key: "faculty" as const, label: t(T.admin.users.faculty) },
                          { key: "status" as const, label: t(T.admin.users.status) },
                          { key: "joined" as const, label: t(T.admin.users.joined) },
                        ].map((col) => (
                          <th
                            key={col.key}
                            style={{ ...thStyle, cursor: "pointer", userSelect: "none" }}
                            onClick={() => toggleUserSort(col.key)}
                            title={`Urutkan berdasarkan ${col.label}`}
                          >
                            <div className="flex items-center gap-1.5">
                              <span>{col.label}</span>
                              <span style={{ fontSize: "0.68rem", opacity: userSortField === col.key ? 1 : 0.4 }}>
                                {userSortField === col.key ? (userSortOrder === "asc" ? "▲" : "▼") : "↕"}
                              </span>
                            </div>
                          </th>
                        ))}
                        <th style={thStyle}>{t(T.admin.users.action)}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedUsersList.map((u, i) => (
                        <tr
                          key={u.id}
                          style={{ borderBottom: i < users.length - 1 ? `1px solid ${border}` : "none" }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = rowHover)}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                        >
                          <td style={tdStyle}>
                            <div className="flex items-center gap-2.5">
                              {u.avatarUrl ? (
                                <img
                                  src={u.avatarUrl}
                                  alt={u.name}
                                  className="w-8 h-8 rounded-full object-cover border border-[#3B5BDB]/20 flex-shrink-0"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: roleColors[u.role] ?? "#0A1172", fontSize: "0.75rem", fontWeight: 700 }} aria-hidden="true">
                                  {u.name.charAt(0)}
                                </div>
                              )}
                              <span style={{ fontWeight: 500 }}>{u.name}</span>
                            </div>
                          </td>
                          <td style={{ ...tdStyle, color: muted }}>{u.email}</td>
                          <td style={tdStyle}>
                            <span className="px-2.5 py-1 rounded-full capitalize" style={{ backgroundColor: `${roleColors[u.role]}18`, color: roleColors[u.role], fontSize: "0.75rem", fontWeight: 600 }}>
                              {u.role}
                            </span>
                          </td>
                          <td style={{ ...tdStyle, color: muted }}>{u.faculty}</td>
                          <td style={tdStyle}>
                            <span className="px-2.5 py-1 rounded-full" style={{ backgroundColor: statusColors[u.status]?.bg, color: statusColors[u.status]?.text, fontSize: "0.75rem", fontWeight: 600 }}>
                              {u.status === "active" ? t(T.admin.users.active) : u.status === "pending" ? t(T.admin.users.pending) : t(T.admin.users.suspended)}
                            </span>
                          </td>
                          <td style={{ ...tdStyle, color: muted }}>{u.joined}</td>
                          <td style={tdStyle}>
                            <div className="flex items-center gap-1.5">
                              {u.status === "pending" && (
                                <button
                                  onClick={() => handleUpdateUser(u.id, { status: "active" })}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-white transition-opacity hover:opacity-90"
                                  style={{ backgroundColor: "#16A34A", fontSize: "0.78rem" }}
                                  title={`Setujui Akun: ${u.name}`}
                                >
                                  <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
                                  {t(T.admin.validation.approve)}
                                </button>
                              )}
                              <button
                                onClick={() => setEditUser(u)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium"
                                style={{ backgroundColor: dm ? "#1E3A8A18" : "#EEF2FF", color: "#3B5BDB", fontSize: "0.78rem" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DBEAFE")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E3A8A18" : "#EEF2FF")}
                                title={`Edit: ${u.name}`}
                              >
                                <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                                {t(T.admin.books.action).split(" ")[0] === "Aksi" ? "Edit" : "Edit"}
                              </button>
                              <button
                                onClick={() => setDeleteUser(u)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium"
                                style={{ backgroundColor: "#FEF2F2", color: "#DC2626", fontSize: "0.78rem" }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                                title={`Hapus: ${u.name}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                {t(T.admin.validation.reject).includes("Tolak") ? "Hapus" : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── Books ── */}
          {tab === "books" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>
                  {t(T.admin.books.title)}{" "}
                  <span style={{ color: muted, fontWeight: 400 }}>({books.length})</span>
                </h2>
              </div>

              {books.length === 0 ? (
                <div className="rounded-2xl p-16 text-center" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                  <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: muted }} aria-hidden="true" />
                  <p style={{ color: muted }}>Tidak ada buku dalam koleksi.</p>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead style={{ borderBottom: `1px solid ${border}`, backgroundColor: dm ? "#0F1623" : "#F9FAFB" }}>
                        <tr>
                          {[
                            { key: "title" as const, label: t(T.admin.books.bookTitle) },
                            { key: "author" as const, label: t(T.admin.books.author) },
                            { key: "category" as const, label: t(T.admin.books.category) },
                            { key: "year" as const, label: "Tahun" },
                          ].map((col) => (
                            <th
                              key={col.key}
                              style={{ ...thStyle, cursor: "pointer", userSelect: "none" }}
                              onClick={() => toggleBookSort(col.key)}
                              title={`Urutkan berdasarkan ${col.label}`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span>{col.label}</span>
                                <span style={{ fontSize: "0.68rem", opacity: bookSortField === col.key ? 1 : 0.4 }}>
                                  {bookSortField === col.key ? (bookSortOrder === "asc" ? "▲" : "▼") : "↕"}
                                </span>
                              </div>
                            </th>
                          ))}
                          <th style={thStyle}>{t(T.admin.books.format)}</th>
                          <th style={thStyle}>Bab</th>
                          <th style={thStyle}>{t(T.admin.books.action)}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sortedBooksList.map((b, i) => (
                          <tr
                            key={b.id}
                            style={{ borderBottom: i < books.length - 1 ? `1px solid ${border}` : "none" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = rowHover)}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            {/* Cover + Title */}
                            <td style={tdStyle}>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ border: `1px solid ${border}` }}>
                                  <img src={b.coverImage} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                  <div className="truncate max-w-[180px]" style={{ fontWeight: 500 }} title={b.title}>{b.title}</div>
                                  <div style={{ fontSize: "0.72rem", color: muted }}>{b.publisher}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ ...tdStyle, color: muted }}><div className="truncate max-w-[140px]" title={b.author}>{b.author}</div></td>
                            <td style={tdStyle}>
                              <span className="px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: `${b.coverColor}18`, color: b.coverColor, fontSize: "0.75rem", fontWeight: 500 }}>
                                {b.category}
                              </span>
                            </td>
                            <td style={tdStyle}>
                              <div className="flex flex-wrap gap-1">
                                {b.formats.map((f) => (
                                  <span key={f} className="px-1.5 py-0.5 rounded" style={{ backgroundColor: dm ? "#1E2D4F" : "#F3F4F6", color: muted, fontSize: "0.68rem", whiteSpace: "nowrap" }}>{f}</span>
                                ))}
                              </div>
                            </td>
                            {/* Chapter count */}
                            <td style={{ ...tdStyle, color: muted }}>
                              {b.chapterCount ?? b.chapters?.length ?? "—"}
                            </td>
                            {/* Actions */}
                            <td style={tdStyle}>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                {/* Edit metadata */}
                                <button
                                  onClick={() => setEditBook(b)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium"
                                  style={{ backgroundColor: dm ? "#1E3A8A18" : "#EEF2FF", color: "#3B5BDB", fontSize: "0.75rem" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DBEAFE")}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E3A8A18" : "#EEF2FF")}
                                  title="Edit metadata buku"
                                >
                                  <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
                                  Edit
                                </button>
                                {/* Edit chapters */}
                                <button
                                  onClick={() => setEditChaptersBook(b)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium"
                                  style={{ backgroundColor: dm ? "#0D507018" : "#F0FDF4", color: "#0D7070", fontSize: "0.75rem" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DCFCE7")}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = dm ? "#0D507018" : "#F0FDF4")}
                                  title="Edit konten bab"
                                >
                                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                                  {t(T.admin.tabs.books).includes("Koleksi") ? "Bab" : "Chapters"}
                                </button>
                                {/* Delete */}
                                <button
                                  onClick={() => setDeleteBook_(b)}
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-medium"
                                  style={{ backgroundColor: "#FEF2F2", color: "#DC2626", fontSize: "0.75rem" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                                  title="Hapus buku"
                                >
                                  <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                  {t(T.admin.validation.reject).includes("Tolak") ? "Hapus" : "Delete"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Validasi ── */}
          {tab === "validasi" && (
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, color: text, marginBottom: "1rem" }}>
                {t(T.admin.validation.title)}
              </h2>
              {pendingBooks.length === 0 ? (
                <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#16A34A" }} aria-hidden="true" />
                  <p style={{ fontSize: "1rem", color: muted }}>{t(T.admin.validation.empty)}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {pendingBooks.map((book) => (
                    <div key={book.id} className="rounded-2xl p-5 flex items-start gap-4" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                      <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={book.coverImage} alt="" className="w-full h-full object-cover" style={{ backgroundColor: book.coverColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>{book.title}</h3>
                            <p style={{ fontSize: "0.85rem", color: muted }}>{book.author} · {book.category} · {book.year}</p>
                            <p style={{ fontSize: "0.8rem", color: muted, marginTop: "0.375rem", lineHeight: 1.5 }}>{book.description}</p>
                            {book.chapterCount != null && (
                              <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.25rem" }}>
                                {book.chapterCount} bab · {book.fileType?.toUpperCase() || "—"}
                              </p>
                            )}
                            <div className="flex gap-1.5 mt-2">
                              {book.formats.map((f) => (
                                <span key={f} className="px-2 py-0.5 rounded-full" style={{ backgroundColor: dm ? "#1E2D4F" : "#F3F4F6", color: muted, fontSize: "0.7rem" }}>{f}</span>
                              ))}
                            </div>
                            <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.5rem" }}>
                              {t(T.admin.validation.submittedBy)}{" "}
                              <span style={{ color: dm ? "#93C5FD" : "#3B5BDB" }}>{book.submittedBy}</span>
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#FEF9C3", color: "#854D0E", fontSize: "0.75rem", fontWeight: 600 }}>
                            {t(T.admin.validation.pending)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {/* Preview chapters before approving */}
                          <button
                            onClick={() => setEditChaptersBook(book)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium"
                            style={{ border: `1px solid ${dm ? "#1E2D4F" : "#E5E7EB"}`, color: text, fontSize: "0.875rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E2D4F" : "#F9FAFB")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                          >
                            <FileText className="w-4 h-4" aria-hidden="true" />
                            Lihat &amp; Edit Bab
                          </button>
                          <button
                            onClick={() => approvePending(book.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium"
                            style={{ backgroundColor: "#16A34A", fontSize: "0.875rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803D")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
                          >
                            <CheckCircle className="w-4 h-4" aria-hidden="true" />
                            {t(T.admin.validation.approve)}
                          </button>
                          <button
                            onClick={() => rejectPending(book.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium"
                            style={{ border: "1px solid #FCA5A5", color: "#DC2626", backgroundColor: "#FEF2F2", fontSize: "0.875rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                          >
                            <XCircle className="w-4 h-4" aria-hidden="true" />
                            {t(T.admin.validation.reject)}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {editBook && (
        <EditBookModal
          book={editBook}
          darkMode={dm}
          onSave={(id, updates) => { updateBook(id, updates); setEditBook(null); }}
          onClose={() => setEditBook(null)}
        />
      )}
      {deleteBook_ && (
        <DeleteConfirmModal
          book={deleteBook_}
          darkMode={dm}
          onConfirm={(id) => { deleteBook(id); setDeleteBook_(null); }}
          onClose={() => setDeleteBook_(null)}
        />
      )}
      {editChaptersBook && (
        <EditChapterModal
          book={editChaptersBook}
          darkMode={dm}
          onClose={() => setEditChaptersBook(null)}
        />
      )}
      {editUser && (
        <EditUserModal
          user={editUser}
          darkMode={dm}
          onSave={(id, updates) => { handleUpdateUser(id, updates); setEditUser(null); }}
          onClose={() => setEditUser(null)}
        />
      )}
      {deleteUser && (
        <DeleteUserModal
          user={deleteUser}
          darkMode={dm}
          onConfirm={(id) => { handleDeleteUser(id); setDeleteUser(null); }}
          onClose={() => setDeleteUser(null)}
        />
      )}
    </>
  );
}
