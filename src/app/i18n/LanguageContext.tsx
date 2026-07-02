import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "./translations";
import { tr } from "./translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Shorthand helper so components can do: t(entry) */
  t: <T extends { id: string; en: string }>(entry: T) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "id",
  setLang: () => {},
  t: (entry) => entry.id,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  const translate = <T extends { id: string; en: string }>(entry: T) => tr(entry, lang);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
