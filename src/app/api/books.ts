import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import type { Book } from "../data/books";

const BASE = `https://${projectId}.supabase.co/functions/v1/make-server-d4405fa6`;
const AUTH = { Authorization: `Bearer ${publicAnonKey}` };

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: { ...AUTH, ...options.headers },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data as T;
}

// ── Books ───────────────────────────────────────────────────────────
export async function apiFetchBooks(): Promise<Book[]> {
  try {
    const data = await request<{ books: Book[] }>("/books");
    return data.books ?? [];
  } catch (err) {
    console.warn("API fetch books unavailable, using local fallback:", err);
    return [];
  }
}

export async function apiFetchPendingBooks(): Promise<Book[]> {
  try {
    const data = await request<{ books: Book[] }>("/books/pending");
    return data.books ?? [];
  } catch (err) {
    console.warn("API fetch pending books unavailable:", err);
    return [];
  }
}

export async function apiFetchBook(id: string): Promise<Book | null> {
  try {
    const data = await request<{ book: Book }>(`/books/${id}`);
    return data.book ?? null;
  } catch {
    return null;
  }
}

export async function apiUpdateBook(
  id: string,
  updates: Partial<Book>
): Promise<Book> {
  const data = await request<{ book: Book }>(`/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return data.book;
}

export async function apiDeleteBook(id: string): Promise<void> {
  await request(`/books/${id}`, { method: "DELETE" });
}

export async function apiApproveBook(id: string): Promise<Book> {
  const data = await request<{ book: Book }>(`/books/${id}/approve`, {
    method: "PUT",
  });
  return data.book;
}

export async function apiRejectBook(id: string): Promise<Book> {
  const data = await request<{ book: Book }>(`/books/${id}/reject`, {
    method: "PUT",
  });
  return data.book;
}

// ── Upload + process a book file ────────────────────────────────────
export interface UploadBookPayload {
  title:       string;
  author:      string;
  publisher:   string;
  category:    string;
  year:        number;
  description: string;
  submittedBy: string;
  formats:     string[];
  coverImage?: string;
  file?:       File;
}

export interface UploadBookResult {
  book:               Book;
  chaptersProcessed:  number;
}

export async function apiUploadBook(
  payload: UploadBookPayload,
  onProgress?: (pct: number) => void
): Promise<UploadBookResult> {
  const form = new FormData();
  form.append("title",       payload.title);
  form.append("author",      payload.author);
  form.append("publisher",   payload.publisher);
  form.append("category",    payload.category);
  form.append("year",        String(payload.year));
  form.append("description", payload.description);
  form.append("submittedBy", payload.submittedBy);
  form.append("formats",     JSON.stringify(payload.formats));
  if (payload.coverImage) form.append("coverImage", payload.coverImage);
  if (payload.file)       form.append("file",       payload.file);

  // Simulate progress phases (real XHR progress would need XMLHttpRequest)
  onProgress?.(10);
  const res = await fetch(`${BASE}/books`, {
    method: "POST",
    headers: { ...AUTH },
    body: form,
  });
  onProgress?.(90);
  const data = await res.json();
  onProgress?.(100);
  if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
  return data as UploadBookResult;
}

// ── Chapters ────────────────────────────────────────────────────────
export interface ApiChapter {
  title:   string;
  content: string;
}

export async function apiUpdateChapter(
  bookId: string,
  index: number,
  updates: Partial<ApiChapter>
): Promise<ApiChapter> {
  const data = await request<{ chapter: ApiChapter }>(
    `/books/${bookId}/chapters/${index}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }
  );
  return data.chapter;
}

export async function apiFetchChapters(bookId: string): Promise<ApiChapter[]> {
  try {
    const data = await request<{ chapters: ApiChapter[] }>(
      `/books/${bookId}/chapters`
    );
    return (data.chapters ?? []).filter(Boolean);
  } catch {
    return [];
  }
}
