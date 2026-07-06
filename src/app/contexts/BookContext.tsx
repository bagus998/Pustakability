import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { allBooks as localBooks, pendingBooks as localPending, type Book } from "../data/books";
import {
  apiFetchBooks,
  apiFetchPendingBooks,
  apiUpdateBook,
  apiDeleteBook,
  apiApproveBook,
  apiRejectBook,
} from "../api/books";

interface BookContextValue {
  books:           Book[];
  pendingBooks:    Book[];
  loading:         boolean;
  apiAvailable:    boolean;
  updateBook:      (id: string, updates: Partial<Book>) => Promise<void>;
  deleteBook:      (id: string) => Promise<void>;
  approvePending:  (id: string) => Promise<void>;
  rejectPending:   (id: string) => Promise<void>;
  refreshBooks:    () => Promise<void>;
  addLocalBook:    (book: Book) => void; // used after volunteer upload
}

const BookContext = createContext<BookContextValue>({
  books: localBooks, pendingBooks: localPending, loading: false, apiAvailable: false,
  updateBook: async () => {}, deleteBook: async () => {},
  approvePending: async () => {}, rejectPending: async () => {},
  refreshBooks: async () => {}, addLocalBook: () => {},
});

export function BookProvider({ children }: { children: ReactNode }) {
  const [books,        setBooks]        = useState<Book[]>(localBooks);
  const [pendingBooks, setPendingBooks] = useState<Book[]>(localPending);
  const [loading,      setLoading]      = useState(true);
  const [apiAvailable, setApiAvailable] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const [approved, pending] = await Promise.all([
        apiFetchBooks(),
        apiFetchPendingBooks(),
      ]);
      // Merge: API books first, then local demo books not already in API
      const apiIds = new Set(approved.map((b) => b.id));
      const merged = [
        ...approved,
        ...localBooks.filter((b) => !apiIds.has(b.id)),
      ];
      setBooks(merged);
      setPendingBooks(pending);
      setApiAvailable(true);
    } catch (e) {
      console.warn("Supabase unreachable, using local data:", e);
      setApiAvailable(false);
      setBooks(localBooks);
      setPendingBooks(localPending);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  // Optimistic helpers
  const updateBook = async (id: string, updates: Partial<Book>) => {
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    setPendingBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    if (apiAvailable) {
      try { await apiUpdateBook(id, updates); }
      catch (e) { console.error("updateBook API error:", e); refresh(); }
    }
  };

  const deleteBook = async (id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
    setPendingBooks((prev) => prev.filter((b) => b.id !== id));
    if (apiAvailable) {
      try { await apiDeleteBook(id); }
      catch (e) { console.error("deleteBook API error:", e); refresh(); }
    }
  };

  const approvePending = async (id: string) => {
    const book = pendingBooks.find((b) => b.id === id);
    if (book) {
      const approved = { ...book, status: "approved" as const };
      setBooks((prev) => [...prev, approved]);
      setPendingBooks((prev) => prev.filter((b) => b.id !== id));
    }
    if (apiAvailable) {
      try { await apiApproveBook(id); }
      catch (e) { console.error("approvePending API error:", e); refresh(); }
    }
  };

  const rejectPending = async (id: string) => {
    setPendingBooks((prev) => prev.filter((b) => b.id !== id));
    if (apiAvailable) {
      try { await apiRejectBook(id); }
      catch (e) { console.error("rejectPending API error:", e); refresh(); }
    }
  };

  // After a volunteer uploads a book, add it to pending locally
  const addLocalBook = (book: Book) => {
    setPendingBooks((prev) => [book, ...prev]);
  };

  return (
    <BookContext.Provider value={{
      books, pendingBooks, loading, apiAvailable,
      updateBook, deleteBook, approvePending, rejectPending,
      refreshBooks: refresh, addLocalBook,
    }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  return useContext(BookContext);
}
