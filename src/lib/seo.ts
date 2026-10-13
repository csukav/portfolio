import type { Metadata } from "next";

/**
 * Egyetlen, végleges domain – minden canonical, og:url és JSON-LD erre mutat.
 * A www nélküli címet 301-gyel irányítsd ide (Vercel → Domains → Redirect).
 */
export const SITE_URL = "https://www.csukaviktor.com";

export const locales = ["hu", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "hu";

const copy = {
  hu: {
    // 48 karakter
    title: "Csuka Viktor — Webfejlesztő és IT szolgáltatások",
    // 138 karakter
    description:
      "Full-stack webfejlesztő és IT szolgáltató: gyors React és Next.js weboldalak, szerver- és felhőüzemeltetés kkv-knak. Kérj ajánlatot még ma!",
    ogLocale: "hu_HU",
    ogImageAlt: "Csuka Viktor — webfejlesztő és IT szolgáltatások",
  },
  en: {
    // 53 karakter
    title: "Csuka Viktor — Full-Stack Web Developer & IT Services",
    // 140 karakter
    description:
      "Full-stack web developer & IT services: fast React and Next.js websites, server and cloud management for small businesses. Request a quote!",
    ogLocale: "en_US",
    ogImageAlt: "Csuka Viktor — Full-Stack Web Developer",
  },
} satisfies Record<Locale, Record<string, string>>;

type BuildMetadataArgs = {
  locale: Locale;
  /** Az oldal útvonala nyelvi előtag nélkül, pl. "" a főoldalhoz, "/blog/nextjs-stripe-ecommerce" egy cikkhez */
  path?: string;
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
  /** Csak cikkeknél – ha az adott cikknek nincs fordítása, add meg false-szal */
  hasTranslation?: boolean;
};

/**
 * Közös metadata-építő: önmagára mutató canonical + hreflang minden oldalon.
 * Főoldal:  buildMetadata({ locale })
 * Blogcikk: buildMetadata({ locale, path: `/blog/${slug}`, title, description, type: "article" })
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  image = "/og-image.jpg",
  type = "website",
  hasTranslation = true,
}: BuildMetadataArgs): Metadata {
  const t = copy[locale];
  const other: Locale = locale === "hu" ? "en" : "hu";
  const url = `/${locale}${path}`;

  const languages: Record<string, string> = { [locale]: url };
  if (hasTranslation) {
    languages[other] = `/${other}${path}`;
    languages["x-default"] = `/${defaultLocale}${path}`;
  }

  const finalTitle = title ?? t.title;
  const finalDescription = description ?? t.description;

  return {
    metadataBase: new URL(SITE_URL),
    title: finalTitle,
    description: finalDescription,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type,
      url,
      siteName: "Csuka Viktor",
      title: finalTitle,
      description: finalDescription,
      locale: t.ogLocale,
      alternateLocale: hasTranslation ? [copy[other].ogLocale] : undefined,
      images: [{ url: image, width: 1200, height: 630, alt: t.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    authors: [{ name: "Csuka Viktor", url: SITE_URL }],
    creator: "Csuka Viktor",
  };
}