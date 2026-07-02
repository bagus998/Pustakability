import { createContext, useContext, useState, type ReactNode } from "react";
import { allBooks as initialBooks, pendingBooks as initialPending, type Book } from "../data/books";

interface BookContextValue {
  books: Book[];
  pendingBooks: Book[];
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  approvePending: (id: string) => void;
  rejectPending: (id: string) => void;
}

const BookContext = createContext<BookContextValue>({
  books: initialBooks,
  pendingBooks: initialPending,
  updateBook: () => {},
  deleteBook: () => {},
  approvePending: () => {},
  rejectPending: () => {},
});

export function BookProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [pendingBooks, setPendingBooks] = useState<Book[]>(initialPending);

  const updateBook = (id: string, updates: Partial<Book>) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));

  const deleteBook = (id: string) =>
    setBooks((prev) => prev.filter((b) => b.id !== id));

  const approvePending = (id: string) => {
    const book = pendingBooks.find((b) => b.id === id);
    if (book) {
      setBooks((prev) => [...prev, { ...book, status: "approved" }]);
      setPendingBooks((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const rejectPending = (id: string) =>
    setPendingBooks((prev) => prev.filter((b) => b.id !== id));

  return (
    <BookContext.Provider value={{ books, pendingBooks, updateBook, deleteBook, approvePending, rejectPending }}>
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  return useContext(BookContext);
}
