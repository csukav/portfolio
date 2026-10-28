"use client";

import { createContext, useContext } from "react";
import type { Locale, Translations } from "@/lib/translations";

/** Only the strings the client components (Navbar, ContactSection) render. */
export type ClientTranslations = Pick<Translations, "nav" | "contact"> & {
  services: Pick<Translations["services"], "label">;
};

interface LanguageContextType {
  locale: Locale;
  t: ClientTranslations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Filled by the server-side LanguageProvider, so the full translations
// module (both languages) never ships in the client bundle.
export function LanguageContextProvider({
  children,
  locale,
  t,
}: {
  children: React.ReactNode;
  locale: Locale;
  t: ClientTranslations;
}) {
  return (
    <LanguageContext.Provider value={{ locale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
