"use client";

import { createContext, useContext } from "react";
import { translations, Locale, Translations } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: translations["en"],
});

// The locale is resolved on the server (middleware → x-locale header) and
// passed in, so the server-rendered HTML is already in the right language
// (no English → Hungarian flash after hydration).
export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  return (
    <LanguageContext.Provider
      value={{ locale: initialLocale, t: translations[initialLocale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
