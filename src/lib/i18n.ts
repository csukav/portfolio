import type { Locale } from "@/lib/translations";

export type { Locale };

export const locales: readonly Locale[] = ["hu", "en"];

/** Hungarian is served without a prefix (/, /blog), English under /en. */
export const defaultLocale: Locale = "hu";

/** Cookie storing the visitor's explicit language choice (set by the switcher). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "hu" ? "en" : "hu";
}

/** Public URL path of `path` (e.g. "/blog") in the given locale. */
export function localePath(locale: Locale, path = "/"): string {
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export const ogLocale: Record<Locale, string> = { hu: "hu_HU", en: "en_US" };
export const htmlLang: Record<Locale, string> = { hu: "hu-HU", en: "en-US" };

/** canonical + hreflang alternates for a page available in every locale. */
export function languageAlternates(locale: Locale, path = "/") {
  return {
    canonical: localePath(locale, path),
    languages: {
      "hu-HU": localePath("hu", path),
      "en-US": localePath("en", path),
      "x-default": localePath(defaultLocale, path),
    },
  };
}
