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
    "Csuka Viktor full-stack webfejlesztő portfóliója. React, Next.js, TypeScript és Node.js projektekkel. Letisztult design, optimalizált teljesítmény.",
  keywords: [
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
      "Full-stack webfejlesztő portfóliója. React, Next.js, TypeScript és Node.js alapú modern webalkalmazások.",
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
      "Full-stack webfejlesztő portfóliója. React, Next.js, TypeScript és Node.js alapú modern webalkalmazások.",
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
    "Full-stack webfejlesztő, aki React, Next.js, TypeScript és Node.js technológiákkal dolgozik.",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Full-Stack Development",
    "Web Development",
  ],
  sameAs: [
    // Add your social media URLs here, e.g.:
    // "https://github.com/csukaviktor",
    // "https://linkedin.com/in/csukaviktor",
  ],
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
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
