import { SITE_URL, type Locale } from "@/lib/seo";

/** Biztonságos JSON-LD kiírás (a "<" escapelése megakadályozza a </script> kitörést) */
function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const services = {
  hu: [
    { name: "Szerver- és felhőüzemeltetés", desc: "AWS, Azure és Vercel infrastruktúra kezelése, frissítése és optimalizálása.", price: 450 },
    { name: "Biztonság és adatvédelem", desc: "SSL/TLS tanúsítványok, tűzfal, hálózatbiztonság és GDPR-megfelelés.", price: 350 },
    { name: "Adatbázis-kezelés", desc: "PostgreSQL, MySQL és NoSQL üzemeltetés, mentések, optimalizálás.", price: 320 },
    { name: "Monitorozás és támogatás", desc: "24/7 rendszerfelügyelet, riasztások, hibaelhárítás és karbantartás.", price: 250 },
    { name: "CI/CD pipeline kiépítése", desc: "Automatizált telepítés és tesztelés GitHub Actions és GitLab CI segítségével.", price: 400 },
    { name: "Teljesítményoptimalizálás", desc: "Terheléselosztás, cache-stratégia, CDN és alkalmazásoptimalizálás.", price: 380 },
  ],
  en: [
    { name: "Server & Cloud Management", desc: "AWS, Azure, and Vercel infrastructure management, updates, and optimization.", price: 450 },
    { name: "Security & Data Protection", desc: "SSL/TLS certificates, firewall configuration, network security, and GDPR compliance.", price: 350 },
    { name: "Database Management", desc: "PostgreSQL, MySQL, NoSQL database operations, backups, and optimization.", price: 320 },
    { name: "Monitoring & Support", desc: "24/7 system monitoring, alerting, troubleshooting, and proactive maintenance.", price: 250 },
    { name: "CI/CD Pipeline Setup", desc: "Automated deployment, testing, and release management with GitHub Actions and GitLab CI.", price: 400 },
    { name: "Performance Optimization", desc: "Load balancing, caching strategies, CDN configuration, and application optimization.", price: 380 },
  ],
} satisfies Record<Locale, { name: string; desc: string; price: number }[]>;

/** Főoldalra: Person + ProfessionalService + WebSite egy @graph-ban */
export function HomeStructuredData({ locale }: { locale: Locale }) {
  const pageUrl = `${SITE_URL}/${locale}`;
  const isHu = locale === "hu";

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Csuka Viktor",
        url: pageUrl,
        image: `${SITE_URL}/og-image.jpg`,
        jobTitle: isHu ? "Full-stack webfejlesztő" : "Full-Stack Web Developer",
        email: "mailto:csukav@gmail.com",
        knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "AWS", "Vercel"],
        sameAs: [
          "https://www.linkedin.com/in/csukaviktor",
          "https://github.com/csukav",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: isHu ? "Csuka Viktor — Webfejlesztés és IT szolgáltatások" : "Csuka Viktor — Web Development & IT Services",
        url: pageUrl,
        image: `${SITE_URL}/og-image.jpg`,
        email: "csukav@gmail.com",
        founder: { "@id": `${SITE_URL}/#person` },
        areaServed: { "@type": "Country", name: isHu ? "Magyarország" : "Hungary" },
        // Ha van publikus székhely/város, add hozzá:
        // address: { "@type": "PostalAddress", addressLocality: "…", addressCountry: "HU" },
        priceRange: "€€",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: isHu ? "IT szolgáltatások" : "IT Services",
          itemListElement: services[locale].map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.desc },
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: s.price,
              priceCurrency: "EUR",
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Csuka Viktor",
        inLanguage: isHu ? "hu-HU" : "en-US",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return <JsonLd data={data} />;
}

/** Blogcikk-oldalra */
export function BlogPostStructuredData({
  locale,
  slug,
  title,
  description,
  datePublished,
  dateModified,
  image = "/og-image.jpg",
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO, pl. "2026-02-10"
  dateModified?: string;
  image?: string;
}) {
  const url = `${SITE_URL}/${locale}/blog/${slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    datePublished,
    dateModified: dateModified ?? datePublished,
    inLanguage: locale === "hu" ? "hu-HU" : "en-US",
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Csuka Viktor",
      url: SITE_URL,
    },
    publisher: { "@id": `${SITE_URL}/#person` },
  };

  return <JsonLd data={data} />;
}