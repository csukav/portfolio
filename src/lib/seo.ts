// seo.ts – központi SEO-beállítások (pl. src/lib/seo.ts)
//
// Felépítés:
//   - A MAGYAR verzió a gyökérben él:  https://www.csukaviktor.com/
//   - Az ANGOL verzió /en alatt:        https://www.csukaviktor.com/en
//   - Nincs automatikus nyelvfelismerés/átirányítás (lásd middleware.ts),
//     így a Googlebot mindkét nyelvet látja és indexeli.
//   - Egy kanonikus host: www.csukaviktor.com (a csupasz domain 301/308-cal ide irányít).

import type { Metadata } from "next";

export const SITE_URL = "https://www.csukaviktor.com";
export const LOCALES = ["hu", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "hu";

// Oldalpárok: melyik magyar oldal melyik angolnak felel meg (hreflang-hoz).
// Ha egy oldalnak még nincs angol párja, az "en" kulcsot hagyd ki – akkor
// az angol alternate sem kerül be.
export const ROUTES = {
  home: { hu: "/", en: "/en" },
  webdev: { hu: "/weboldal-keszites", en: "/en/web-development" },
  webshop: { hu: "/webshop-keszites", en: "/en/ecommerce-development" },
  ads: { hu: "/online-hirdetes", en: "/en/online-advertising" },
  it: { hu: "/it-uzemeltetes", en: "/en/it-services" },
  blog: { hu: "/blog", en: "/en/blog" },
} satisfies Record<string, { hu: string; en?: string }>;

export type RouteKey = keyof typeof ROUTES;

const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

type BuildMetadataArgs = {
  route?: RouteKey;
  /** Ha nem fix útvonal (pl. blogposzt), add meg közvetlenül. */
  paths?: { hu: string; en?: string };
  locale: Locale;
  title: string;
  description: string;
  image?: string;
};

/**
 * Használat egy page.tsx-ben:
 *
 *   import { buildMetadata } from "@/lib/seo";
 *   import { pagesHu } from "@/content/content-hu";
 *
 *   export const metadata = buildMetadata({
 *     route: "webdev",
 *     locale: "hu",
 *     title: pagesHu.webdev.title,
 *     description: pagesHu.webdev.description,
 *   });
 */
export function buildMetadata({
  route,
  paths,
  locale,
  title,
  description,
  image = "/og-image.jpg",
}: BuildMetadataArgs): Metadata {
  const p = paths ?? (route ? ROUTES[route] : undefined);
  if (!p) throw new Error("buildMetadata: route vagy paths kötelező");

  const ownPath = locale === "en" && p.en ? p.en : p.hu;
  const url = abs(ownPath);

  const languages: Record<string, string> = { hu: abs(p.hu), "x-default": abs(p.hu) };
  if (p.en) languages.en = abs(p.en);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url, // mindig az oldal SAJÁT címe, sosem a másik nyelvé
      languages,
    },
    openGraph: {
      type: "website",
      url,
      siteName: "Csuka Viktor",
      title,
      description,
      locale: locale === "hu" ? "hu_HU" : "en_US",
      alternateLocale: locale === "hu" ? ["en_US"] : ["hu_HU"],
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    robots: { index: true, follow: true },
  };
}

/**
 * Strukturált adat a főoldalra (a magyar layoutba vagy a főoldalba):
 *
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd()) }}
 *   />
 */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Csuka Viktor – Weboldal és webshop készítés",
    url: `${SITE_URL}/`,
    image: `${SITE_URL}/og-image.jpg`,
    email: "csukav@gmail.com",
    // telephone: "+36 XX XXX XXXX",           // ← töltsd ki, ugyanúgy, mint a Cégprofilban
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Debrecen" },
      { "@type": "AdministrativeArea", name: "Hajdú-Bihar vármegye" },
      { "@type": "Country", name: "Magyarország" },
    ],
    knowsLanguage: ["hu", "en"],
    founder: {
      "@type": "Person",
      name: "Csuka Viktor",
      jobTitle: "Webfejlesztő",
    },
    sameAs: ["https://www.linkedin.com/in/csukaviktor", "https://github.com/csukav"],
  };
}

/**
 * GYIK strukturált adat a szolgáltatásoldalakra. A Google ma már ritkán ad
 * belőle külön találati megjelenést, de segít megérteni a tartalmat – nem árt.
 */
export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}