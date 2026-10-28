import { translations, type Locale } from "@/lib/translations";
import { LanguageContextProvider } from "@/context/LanguageContext";

// The locale is resolved on the server (from the [lang] segment) and passed
// in, so the server-rendered HTML is already in the right language.
export function LanguageProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: Locale;
}) {
  const { nav, contact, services } = translations[initialLocale];
  return (
    <LanguageContextProvider
      locale={initialLocale}
      t={{ nav, contact, services: { label: services.label } }}
    >
      {children}
    </LanguageContextProvider>
  );
}
