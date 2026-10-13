import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import {
  SITE_URL,
  FULL_NAME,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  OG_IMAGE,
} from "@/lib/site";
import {
  locales,
  isLocale,
  localePath,
  ogLocale,
  htmlLang,
  type Locale,
} from "@/lib/i18n";
import { translations } from "@/lib/translations";

// Inter is a variable font: one file covers every weight.
// latin-ext is required for Hungarian characters (ő, ű).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const META: Record<
  Locale,
  {
    title: string;
    description: string;
    jobTitle: string;
    personDescription: string;
    serviceName: string;
    /** The priced IT services come from translations.services. */
    webService: string;
    keywords: string[];
  }
> = {
  hu: {
    title: `${FULL_NAME} — Webfejlesztő és IT szolgáltatások kkv-knak`,
    // ~150 characters, ends with a CTA (same text for og:description).
    description:
      "Full-stack webfejlesztő – React, Next.js, TypeScript. Gyors weboldalak, szerver- és felhőüzemeltetés kis- és középvállalkozásoknak. Kérj ajánlatot!",
    jobTitle: "Full-Stack webfejlesztő",
    personDescription:
      "Full-stack webfejlesztő és informatikai szolgáltató, aki React, Next.js, TypeScript és Node.js technológiákkal, valamint szerver-, cloud- és rendszergazdai szolgáltatásokkal dolgozik.",
    serviceName: `${FULL_NAME} — Webfejlesztés és IT szolgáltatások`,
    webService: "Webfejlesztés (React, Next.js, TypeScript)",
    keywords: [
      "informatikai szolgáltatások",
      "IT szolgáltatások",
      "rendszergazdai szolgáltatás",
      "IT üzemeltetés",
      "szerver menedzsment",
      "cloud menedzsment",
      "IT support vállalatoknak",
      "full-stack fejlesztő",
      "webfejlesztő",
      "weboldal készítés",
      "React fejlesztő",
      "Next.js fejlesztő",
      "TypeScript",
      "Node.js",
      "Csuka Viktor",
    ],
  },
  en: {
    title: `${FULL_NAME} — Full-Stack Web Developer & IT Services`,
    description:
      "Full-stack web developer – React, Next.js, TypeScript. Fast websites plus server and cloud management for small businesses. Request a free quote!",
    jobTitle: "Full-Stack Web Developer",
    personDescription:
      "Full-stack web developer and IT service provider working with React, Next.js, TypeScript and Node.js, plus server, cloud and sysadmin services.",
    serviceName: `${FULL_NAME} — Web Development & IT Services`,
    webService: "Web development (React, Next.js, TypeScript)",
    keywords: [
      "full-stack developer",
      "web developer",
      "freelance web developer",
      "React developer",
      "Next.js developer",
      "TypeScript",
      "Node.js",
      "IT services",
      "server management",
      "cloud management",
      "sysadmin services",
      "Csuka Viktor",
    ],
  },
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const m = META[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.title,
      template: `%s | ${FULL_NAME}`,
    },
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: FULL_NAME, url: SITE_URL }],
    creator: FULL_NAME,
    publisher: FULL_NAME,
    formatDetection: { email: false, telephone: false, address: false },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: localePath(lang),
      siteName: FULL_NAME,
      title: m.title,
      description: m.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [OG_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

function buildJsonLd(lang: Locale) {
  const m = META[lang];
  const { services } = translations[lang];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: FULL_NAME,
        inLanguage: htmlLang[lang],
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: FULL_NAME,
        url: `${SITE_URL}${localePath(lang)}`,
        email: `mailto:${EMAIL}`,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        jobTitle: m.jobTitle,
        description: m.personDescription,
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "Full-Stack Development",
          "Web Development",
          "IT Services",
          "System Administration",
          "Cloud Management",
          "Server Operations",
        ],
        knowsLanguage: ["hu", "en"],
        sameAs: [GITHUB_URL, LINKEDIN_URL],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: m.serviceName,
        url: `${SITE_URL}${localePath(lang)}`,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        email: EMAIL,
        founder: { "@id": `${SITE_URL}/#person` },
        areaServed: { "@type": "Country", name: "Hungary" },
        knowsLanguage: ["hu", "en"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: lang === "hu" ? "Szolgáltatások" : "Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: m.webService },
            },
            // Same services and "from" prices as the visible Services section.
            ...services.items.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.title, description: s.desc },
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: s.minPrice,
                priceCurrency: services.currency,
              },
            })),
          ],
        },
      },
    ],
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(lang)).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        {/* Google tag (gtag.js) - Google Ads AW-18115939358 + Analytics G-0SDNKH1DK4.
            One gtag.js load serves both IDs. The queue is set up right away (tiny inline script); the ~150 KB library
            loads only after the page has finished loading, so it doesn't compete
            with rendering. Queued commands run in order once it arrives. */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18115939358');
gtag('config', 'G-0SDNKH1DK4');
// Oldalmegtekintés conversion - homepage only
if (location.pathname === '/hu' || location.pathname === '/en') {
  gtag('event', 'conversion', {'send_to': 'AW-18115939358/ySUcCJH18aEcEJ6Yrb5D'});
}`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18115939358"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
