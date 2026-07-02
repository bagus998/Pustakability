import { useState } from "react";
import {
  Users, BookOpen, CheckCircle, XCircle, Clock,
  Trash2, Edit2, Shield, UserCheck, BarChart3,
} from "lucide-react";
import { useBooks } from "../contexts/BookContext";
import type { Book } from "../data/books";
import type { Page } from "../App";
import { EditBookModal } from "./EditBookModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

interface AdminDashboardProps {
  darkMode: boolean;
  onNavigate: (page: Page) => void;
}

type Tab = "overview" | "users" | "books" | "validasi";

const mockUsers = [
  { id: "1", name: "Siti Rahayu",   email: "mahasiswa@ub.ac.id",         role: "user",      faculty: "MIPA",        status: "active",  joined: "2024-03-10" },
  { id: "2", name: "Ahmad Fauzan",  email: "ahmad@student.ub.ac.id",     role: "user",      faculty: "Hukum",       status: "active",  joined: "2024-02-15" },
  { id: "3", name: "Budi Santoso",  email: "relawan@ub.ac.id",           role: "volunteer", faculty: "Teknik",      status: "active",  joined: "2024-01-20" },
  { id: "4", name: "Rizky Pratama", email: "rizky@student.ub.ac.id",     role: "user",      faculty: "Teknik",      status: "pending", joined: "2024-04-01" },
  { id: "5", name: "Dewi Lestari",  email: "dewi@student.ub.ac.id",      role: "volunteer", faculty: "Ilmu Budaya", status: "active",  joined: "2024-03-25" },
];

const roleColors:   Record<string, string>                           = { admin: "#BE185D", user: "#0A1172", volunteer: "#0D7070" };
const statusColors: Record<string, { bg: string; text: string }>    = {
  active:    { bg: "#DCFCE7", text: "#166534" },
  pending:   { bg: "#FEF9C3", text: "#854D0E" },
  suspended: { bg: "#FEE2E2", text: "#991B1B" },
};

export function AdminDashboard({ darkMode: dm, onNavigate }: AdminDashboardProps) {
  const { books, pendingBooks, updateBook, deleteBook, approvePending, rejectPending } = useBooks();

  const [tab, setTab]         = useState<Tab>("overview");
  const [editBook, setEditBook]     = useState<Book | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Book | null>(null);

  const bg         = dm ? "#0D1117" : "#F5F7FF";
  const card       = dm ? "#161B2E" : "#FFFFFF";
  const border     = dm ? "#1E2D4F" : "#E5E7EB";
  const text       = dm ? "#F1F5F9" : "#0F1B35";
  const muted      = dm ? "#94A3B8" : "#6B7280";
  const headerBg   = dm ? "#0F1623" : "#0A1172";
  const rowHover   = dm ? "rgba(255,255,255,0.03)" : "#FAFAFA";

  const tabs: { id: Tab; label: string; icon: React.FC<any> }[] = [
    { id: "overview", label: "Ringkasan",                      icon: BarChart3  },
    { id: "users",    label: "Pengguna",                       icon: Users      },
    { id: "books",    label: `Koleksi Buku (${books.length})`, icon: BookOpen   },
    { id: "validasi", label: `Validasi (${pendingBooks.length})`, icon: Clock   },
  ];

  const thStyle: React.CSSProperties = {
    fontSize: "0.72rem",
    fontWeight: 700,
    color: muted,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    padding: "0.75rem 1.25rem",
    textAlign: "left",
    whiteSpace: "nowrap",
  };

  const tdStyle: React.CSSProperties = {
    padding: "0.875rem 1.25rem",
    fontSize: "0.875rem",
    color: text,
    verticalAlign: "middle",
  };

  return (
    <>
      <div className="min-h-screen pt-16" style={{ backgroundColor: bg }}>
        {/* Header */}
        <div className="py-8 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: headerBg }}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-1">
              <Shield className="w-6 h-6 text-[#00D4AC]" />
              <h1 className="text-white" style={{ fontSize: "1.75rem", fontWeight: 700 }}>Admin Dashboard</h1>
            </div>
            <p className="text-blue-200" style={{ fontSize: "0.9rem" }}>
              Kelola pengguna, koleksi buku, dan validasi kontribusi volunteer
            </p>
          </div>
        </div>

        {/* Tab Bar */}
        <div style={{ backgroundColor: card, borderBottom: `1px solid ${border}` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto">
              {tabs.map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className="flex items-center gap-2 px-4 py-4 whitespace-nowrap transition-colors border-b-2"
                    style={{
                      borderBottomColor: tab === t.id ? "#3B5BDB" : "transparent",
                      color: tab === t.id ? "#3B5BDB" : muted,
                      fontSize: "0.875rem",
                      fontWeight: tab === t.id ? 600 : 400,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {t.label}
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
                  { label: "Total Pengguna",       value: mockUsers.length, sub: "+2 minggu ini",        icon: Users,      color: "#3B5BDB" },
                  { label: "Total Buku",           value: books.length,     sub: `${books.length} kategori`, icon: BookOpen,   color: "#0D7070" },
                  { label: "Menunggu Validasi",    value: pendingBooks.length, sub: "Pengajuan volunteer", icon: Clock,      color: "#D97706" },
                  { label: "Pengguna Aktif",       value: mockUsers.filter(u => u.status === "active").length, sub: "Bulan ini", icon: UserCheck, color: "#16A34A" },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div key={i} className="rounded-2xl p-5" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}18` }}>
                          <Icon className="w-5 h-5" style={{ color: stat.color }} />
                        </div>
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
                  { label: "Lihat Validasi Tertunda", action: () => setTab("validasi"), color: "#D97706", icon: Clock },
                  { label: "Kelola Pengguna",         action: () => setTab("users"),   color: "#3B5BDB", icon: Users },
                  { label: "Manajemen Buku",           action: () => setTab("books"),   color: "#0D7070", icon: BookOpen },
                ].map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <button key={i} onClick={a.action} className="flex items-center gap-3 p-4 rounded-xl text-left transition-all hover:scale-[1.02]" style={{ backgroundColor: card, border: `1px solid ${border}`, color: text }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${a.color}18` }}>
                        <Icon className="w-5 h-5" style={{ color: a.color }} />
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
              <div className="p-5" style={{ borderBottom: `1px solid ${border}` }}>
                <h2 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>Daftar Pengguna</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ borderBottom: `1px solid ${border}`, backgroundColor: dm ? "#0F1623" : "#F9FAFB" }}>
                    <tr>
                      {["Nama", "Email", "Peran", "Fakultas", "Status", "Bergabung", "Aksi"].map((h) => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((u, i) => (
                      <tr
                        key={u.id}
                        style={{ borderBottom: i < mockUsers.length - 1 ? `1px solid ${border}` : "none" }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = rowHover)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                      >
                        <td style={tdStyle}>
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ backgroundColor: roleColors[u.role] ?? "#0A1172", fontSize: "0.75rem", fontWeight: 700 }}>
                              {u.name.charAt(0)}
                            </div>
                            <span style={{ fontWeight: 500 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ ...tdStyle, color: muted }}>{u.email}</td>
                        <td style={tdStyle}>
                          <span className="px-2.5 py-1 rounded-full capitalize" style={{ backgroundColor: `${roleColors[u.role]}18`, color: roleColors[u.role], fontSize: "0.75rem", fontWeight: 600 }}>{u.role}</span>
                        </td>
                        <td style={{ ...tdStyle, color: muted }}>{u.faculty}</td>
                        <td style={tdStyle}>
                          <span className="px-2.5 py-1 rounded-full" style={{ backgroundColor: statusColors[u.status]?.bg, color: statusColors[u.status]?.text, fontSize: "0.75rem", fontWeight: 600 }}>
                            {u.status === "active" ? "Aktif" : u.status === "pending" ? "Menunggu" : "Ditangguhkan"}
                          </span>
                        </td>
                        <td style={{ ...tdStyle, color: muted }}>{u.joined}</td>
                        <td style={tdStyle}>
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 rounded-lg transition-colors" title="Edit" style={{ color: "#3B5BDB" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EEF2FF")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg transition-colors" title="Hapus" style={{ color: "#DC2626" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                              <Trash2 className="w-4 h-4" />
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

          {/* ── Books ── */}
          {tab === "books" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>
                  Koleksi Buku{" "}
                  <span style={{ color: muted, fontWeight: 400 }}>({books.length} buku)</span>
                </h2>
              </div>

              {books.length === 0 ? (
                <div className="rounded-2xl p-16 text-center" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                  <BookOpen className="w-12 h-12 mx-auto mb-3" style={{ color: muted }} />
                  <p style={{ color: muted }}>Tidak ada buku dalam koleksi.</p>
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead style={{ borderBottom: `1px solid ${border}`, backgroundColor: dm ? "#0F1623" : "#F9FAFB" }}>
                        <tr>
                          {["Sampul & Judul", "Penulis", "Kategori", "Format", "Tahun", "Aksi"].map((h) => (
                            <th key={h} style={thStyle}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {books.map((b, i) => (
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
                                  <div className="truncate max-w-[200px]" style={{ fontWeight: 500 }} title={b.title}>{b.title}</div>
                                  <div style={{ fontSize: "0.75rem", color: muted }}>{b.publisher}</div>
                                </div>
                              </div>
                            </td>

                            {/* Author */}
                            <td style={{ ...tdStyle, color: muted, maxWidth: "160px" }}>
                              <div className="truncate" title={b.author}>{b.author}</div>
                            </td>

                            {/* Category */}
                            <td style={tdStyle}>
                              <span className="px-2 py-0.5 rounded-full whitespace-nowrap" style={{ backgroundColor: `${b.coverColor}18`, color: b.coverColor, fontSize: "0.75rem", fontWeight: 500 }}>
                                {b.category}
                              </span>
                            </td>

                            {/* Formats */}
                            <td style={tdStyle}>
                              <div className="flex flex-wrap gap-1">
                                {b.formats.map((f) => (
                                  <span key={f} className="px-1.5 py-0.5 rounded" style={{ backgroundColor: dm ? "#1E2D4F" : "#F3F4F6", color: muted, fontSize: "0.68rem", whiteSpace: "nowrap" }}>{f}</span>
                                ))}
                              </div>
                            </td>

                            {/* Year */}
                            <td style={{ ...tdStyle, color: muted }}>{b.year}</td>

                            {/* Actions */}
                            <td style={tdStyle}>
                              <div className="flex items-center gap-1.5">
                                {/* Edit */}
                                <button
                                  onClick={() => setEditBook(b)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium"
                                  style={{ backgroundColor: dm ? "#1E3A8A18" : "#EEF2FF", color: "#3B5BDB", fontSize: "0.78rem" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DBEAFE")}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = dm ? "#1E3A8A18" : "#EEF2FF")}
                                  title={`Edit: ${b.title}`}
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                  Edit
                                </button>

                                {/* Delete */}
                                <button
                                  onClick={() => setDeleteTarget(b)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all font-medium"
                                  style={{ backgroundColor: "#FEF2F2", color: "#DC2626", fontSize: "0.78rem" }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                                  title={`Hapus: ${b.title}`}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  Hapus
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
                Pengajuan Volunteer Menunggu Validasi
              </h2>
              {pendingBooks.length === 0 ? (
                <div className="rounded-2xl p-12 text-center" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                  <CheckCircle className="w-12 h-12 mx-auto mb-3" style={{ color: "#16A34A" }} />
                  <p style={{ fontSize: "1rem", color: muted }}>Tidak ada pengajuan yang perlu divalidasi.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {pendingBooks.map((book) => (
                    <div key={book.id} className="rounded-2xl p-5 flex items-start gap-4" style={{ backgroundColor: card, border: `1px solid ${border}` }}>
                      <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-full h-full" style={{ backgroundColor: book.coverColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: text }}>{book.title}</h3>
                            <p style={{ fontSize: "0.85rem", color: muted }}>{book.author} · {book.category} · {book.year}</p>
                            <p style={{ fontSize: "0.8rem", color: muted, marginTop: "0.375rem", lineHeight: 1.5 }}>{book.description}</p>
                            <div className="flex gap-1.5 mt-2">
                              {book.formats.map((f) => (
                                <span key={f} className="px-2 py-0.5 rounded-full" style={{ backgroundColor: dm ? "#1E2D4F" : "#F3F4F6", color: muted, fontSize: "0.7rem" }}>{f}</span>
                              ))}
                            </div>
                            <p style={{ fontSize: "0.75rem", color: muted, marginTop: "0.5rem" }}>
                              Diajukan oleh: <span style={{ color: dm ? "#93C5FD" : "#3B5BDB" }}>{book.submittedBy}</span>
                            </p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full flex-shrink-0" style={{ backgroundColor: "#FEF9C3", color: "#854D0E", fontSize: "0.75rem", fontWeight: 600 }}>
                            Menunggu
                          </span>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button
                            onClick={() => approvePending(book.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-medium transition-colors"
                            style={{ backgroundColor: "#16A34A", fontSize: "0.875rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#15803D")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#16A34A")}
                          >
                            <CheckCircle className="w-4 h-4" />
                            Setujui
                          </button>
                          <button
                            onClick={() => rejectPending(book.id)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors"
                            style={{ border: "1px solid #FCA5A5", color: "#DC2626", backgroundColor: "#FEF2F2", fontSize: "0.875rem" }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEE2E2")}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                          >
                            <XCircle className="w-4 h-4" />
                            Tolak
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

      {/* ── Edit Modal ── */}
      {editBook && (
        <EditBookModal
          book={editBook}
          darkMode={dm}
          onSave={(id, updates) => { updateBook(id, updates); setEditBook(null); }}
          onClose={() => setEditBook(null)}
        />
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteTarget && (
        <DeleteConfirmModal
          book={deleteTarget}
          darkMode={dm}
          onConfirm={(id) => { deleteBook(id); setDeleteTarget(null); }}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
