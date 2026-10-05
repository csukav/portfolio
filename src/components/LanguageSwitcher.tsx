"use client";

import { LOCALE_COOKIE, otherLocale, type Locale } from "@/lib/i18n";

const LABELS: Record<Locale, { short: string; full: string }> = {
  hu: { short: "HU", full: "Magyar" },
  en: { short: "EN", full: "English" },
};

/**
 * Links to the same page in the other language and remembers the choice in a
 * cookie, so the proxy stops redirecting based on geo-IP.
 * A plain <a> (not next/link) so no prefetched redirect is reused.
 */
export default function LanguageSwitcher({
  locale,
  href,
  className = "",
}: {
  locale: Locale;
  href: string;
  className?: string;
}) {
  const target = otherLocale(locale);

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={LABELS[target].full}
      title={LABELS[target].full}
      onClick={() => {
        document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
      }}
      className={`text-[13px] font-medium text-[#1d1d1f] hover:text-[#0071e3] transition-colors ${className}`}
    >
      {LABELS[target].short}
    </a>
  );
}
