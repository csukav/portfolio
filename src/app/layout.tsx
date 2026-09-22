import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const SITE_URL = "https://csukaviktor.com";
const FULL_NAME = "Csuka Viktor";
const JOB_TITLE = "Full-Stack Web Developer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${FULL_NAME} — ${JOB_TITLE}`,
    template: `%s | ${FULL_NAME}`,
  },
  description:
    "Csuka Viktor full-stack webfejlesztő és informatikai szolgáltató. Webfejlesztés React, Next.js, TypeScript alapokon, valamint szerver- és cloud-menedzsment, rendszergazdai támogatás, biztonság és adatbázis-üzemeltetés vállalatoknak.",
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
    "React fejlesztő",
    "Next.js fejlesztő",
    "TypeScript",
    "Node.js",
    "portfólió",
    "Csuka Viktor",
    "full-stack developer",
    "web developer",
    "IT services",
    "frontend",
    "backend",
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  openGraph: {
    type: "website",
    locale: "hu_HU",
    alternateLocale: "en_US",
    url: SITE_URL,
    siteName: `${FULL_NAME} — Portfólió`,
    title: `${FULL_NAME} — ${JOB_TITLE}`,
    description:
      "Full-stack webfejlesztő és informatikai szolgáltató. Webfejlesztés React, Next.js, TypeScript alapokon, valamint rendszergazdai, cloud- és szerverüzemeltetési szolgáltatások vállalatoknak.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} — ${JOB_TITLE}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${FULL_NAME} — ${JOB_TITLE}`,
    description:
      "Full-stack webfejlesztő és informatikai szolgáltató. Webfejlesztés React, Next.js, TypeScript alapokon, valamint rendszergazdai, cloud- és szerverüzemeltetési szolgáltatások vállalatoknak.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "hu-HU": SITE_URL,
      "en-US": SITE_URL,
    },
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: FULL_NAME,
  url: SITE_URL,
  jobTitle: JOB_TITLE,
  description:
    "Full-stack webfejlesztő és informatikai szolgáltató, aki React, Next.js, TypeScript és Node.js technológiákkal, valamint szerver-, cloud- és rendszergazdai szolgáltatásokkal dolgozik.",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Full-Stack Development",
    "Web Development",
    "Informatikai szolgáltatások",
    "IT szolgáltatások",
    "Rendszergazdai szolgáltatások",
    "Cloud menedzsment",
    "Szerverüzemeltetés",
  ],
  sameAs: [
    "https://github.com/csukaviktor",
    "https://linkedin.com/in/csukaviktor",
  ],
  makesOffer: {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: "Informatikai szolgáltatások",
      serviceType: "IT szolgáltatás",
      description:
        "Szerver- és cloud-menedzsment, biztonság és adatvédelem, adatbázis-menedzsment, monitoring és támogatás, CI/CD pipeline felállítása, teljesítmény-optimalizálás.",
      provider: {
        "@type": "Person",
        name: FULL_NAME,
      },
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "en";

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google tag (gtag.js) - AW-18115939358 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18115939358"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());

gtag('config', 'AW-18115939358');`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
