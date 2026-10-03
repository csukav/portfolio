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
    shortDescription: string;
    jobTitle: string;
    personDescription: string;
    serviceName: string;
    offers: string[];
    keywords: string[];
  }
> = {
  hu: {
    title: `${FULL_NAME} — Full-Stack webfejlesztő és IT szolgáltató`,
    description:
      "Csuka Viktor full-stack webfejlesztő és informatikai szolgáltató. Webfejlesztés React, Next.js, TypeScript alapokon, valamint szerver- és cloud-menedzsment, rendszergazdai támogatás, biztonság és adatbázis-üzemeltetés vállalatoknak.",
    shortDescription:
      "Full-stack webfejlesztő és informatikai szolgáltató. Webfejlesztés React, Next.js, TypeScript alapokon, valamint rendszergazdai, cloud- és szerverüzemeltetési szolgáltatások vállalatoknak.",
    jobTitle: "Full-Stack webfejlesztő",
    personDescription:
      "Full-stack webfejlesztő és informatikai szolgáltató, aki React, Next.js, TypeScript és Node.js technológiákkal, valamint szerver-, cloud- és rendszergazdai szolgáltatásokkal dolgozik.",
    serviceName: `${FULL_NAME} — Webfejlesztés és IT szolgáltatások`,
    offers: [
      "Webfejlesztés (React, Next.js, TypeScript)",
      "Szerver- és cloud-menedzsment",
      "Biztonság és adatvédelem",
      "Adatbázis-menedzsment",
      "Monitoring és támogatás",
      "CI/CD pipeline felállítása",
      "Teljesítmény-optimalizálás",
    ],
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
      "Csuka Viktor is a full-stack web developer and IT service provider. Web development with React, Next.js and TypeScript, plus server and cloud management, sysadmin support, security and database operations for businesses.",
    shortDescription:
      "Full-stack web developer and IT service provider. React, Next.js and TypeScript web development, plus sysadmin, cloud and server operations for businesses.",
    jobTitle: "Full-Stack Web Developer",
    personDescription:
      "Full-stack web developer and IT service provider working with React, Next.js, TypeScript and Node.js, plus server, cloud and sysadmin services.",
    serviceName: `${FULL_NAME} — Web Development & IT Services`,
    offers: [
      "Web development (React, Next.js, TypeScript)",
      "Server & cloud management",
      "Security & data protection",
      "Database management",
      "Monitoring & support",
      "CI/CD pipeline setup",
      "Performance optimization",
    ],
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
      description: m.shortDescription,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.shortDescription,
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
        url: SITE_URL,
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
          itemListElement: m.offers.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(lang)) }}
        />
        {children}
        {/* Google tag (gtag.js) - AW-18115939358, loaded after hydration so it doesn't block rendering */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18115939358"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18115939358');`}
        </Script>
      </body>
    </html>
  );
}
