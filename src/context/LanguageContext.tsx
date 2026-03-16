"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, Locale, Translations } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  t: translations["en"],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
    const cookieLocale = match?.[1] as Locale | undefined;
    if (cookieLocale === "hu" || cookieLocale === "en") {
      setLocale(cookieLocale);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
