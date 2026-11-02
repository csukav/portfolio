import { blogPosts } from "@/lib/blog";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import { LanguageProvider } from "@/context/LanguageProvider";
import { translations } from "@/lib/translations";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL, FULL_NAME, OG_IMAGE } from "@/lib/site";
import {
  isLocale,
  localePath,
  languageAlternates,
  otherLocale,
  ogLocale,
  htmlLang,
} from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface Props {
  params: Promise<{ lang: string }>;
}

const DESCRIPTIONS = {
  hu: "Csuka Viktor cikkei weboldal- és webshopkészítésről: Next.js, React, online fizetés és tapasztalatok valós ügyfélprojektekből.",
  en: "Articles by Csuka Viktor on building websites and online stores: Next.js, React, online payments and lessons from real client projects.",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const description = DESCRIPTIONS[lang];
  return {
    title: "Blog",
    description,
    alternates: languageAlternates(lang, "/blog"),
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url: localePath(lang, "/blog"),
      siteName: FULL_NAME,
      title: `Blog | ${FULL_NAME}`,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog | ${FULL_NAME}`,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const isHu = lang === "hu";
  const blogUrl = `${SITE_URL}${localePath(lang, "/blog")}`;

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${blogUrl}#blog`,
        url: blogUrl,
        name: `Blog | ${FULL_NAME}`,
        description: DESCRIPTIONS[lang],
        inLanguage: htmlLang[lang],
        author: { "@id": `${SITE_URL}/#person` },
        blogPost: sorted.map((post) => ({
          "@type": "BlogPosting",
          headline: isHu ? post.titleHu : post.titleEn,
          url: `${SITE_URL}${localePath(lang, `/blog/${post.slug}`)}`,
          datePublished: post.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isHu ? "Főoldal" : "Home",
            item: `${SITE_URL}${localePath(lang)}`,
          },
          { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
        ],
      },
    ],
  };

  return (
    <LanguageProvider initialLocale={lang}>
    <Navbar hasContact={false} />
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="max-w-[780px] mx-auto px-6 py-14 md:py-20">
        <div className="flex items-center justify-between mb-12">
          <Link
            href={localePath(lang)}
            className="inline-flex items-center gap-1.5 text-[13px] text-brand hover:underline"
          >
            ← {isHu ? "Vissza a főoldalra" : "Back to home"}
          </Link>
          <LanguageSwitcher
            locale={lang}
            href={localePath(otherLocale(lang), "/blog")}
          />
        </div>
        <p className="text-[13px] uppercase tracking-[0.12em] text-brand font-semibold mb-4">
          Blog
        </p>
        <h1 className="text-[48px] font-semibold tracking-tight text-ink leading-[1.1] mb-6">
          {isHu ? "Fejlesztői gondolatok." : "Developer thoughts."}
        </h1>
        <p className="text-[19px] text-ink-soft leading-[1.55] mb-16 max-w-[520px]">
          {isHu
            ? "Tapasztalatok, tanulságok és technikai mélységek Full-Stack fejlesztőként."
            : "Experiences, lessons, and technical deep-dives as a Full-Stack developer."}
        </p>

        <div className="flex flex-col gap-px border border-line rounded-2xl overflow-hidden">
          {sorted.map((post, i) => {
            const title = isHu ? post.titleHu : post.titleEn;
            const summary = isHu ? post.summaryHu : post.summaryEn;
            const formattedDate = new Date(post.date).toLocaleDateString(
              isHu ? "hu-HU" : "en-US",
              { year: "numeric", month: "long", day: "numeric" },
            );

            return (
              <Link
                key={post.slug}
                href={localePath(lang, `/blog/${post.slug}`)}
                className={`group block bg-white hover:bg-paper transition-colors px-8 py-7 ${
                  i === 0 ? "" : "border-t border-line"
                }`}
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-tint text-brand"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-[21px] font-semibold tracking-tight text-ink group-hover:text-brand transition-colors mb-2 leading-snug">
                  {title}
                </h2>
                <p className="text-[15px] text-ink-soft leading-[1.55] mb-4">
                  {summary}
                </p>
                <div className="flex items-center gap-4 text-[13px] text-ink-soft">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <span>·</span>
                  <span>
                    {post.readingTimeMin} {isHu ? "perc olvasás" : "min read"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
    <Footer locale={lang} />
    <MobileCtaBar t={translations[lang]} contactHref={`${localePath(lang)}#contact`} />
    </LanguageProvider>
  );
}
