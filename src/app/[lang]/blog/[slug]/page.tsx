import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import { LanguageProvider } from "@/context/LanguageProvider";
import { translations } from "@/lib/translations";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
import { pagesHu } from "@/content/content-hu";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !isLocale(lang)) return {};

  const isHu = lang === "hu";
  const title = isHu ? post.titleHu : post.titleEn;
  const seoTitle = (isHu ? post.seoTitleHu : post.seoTitleEn) ?? title;
  const description = isHu ? post.summaryHu : post.summaryEn;

  return {
    title: seoTitle,
    description,
    authors: [{ name: FULL_NAME, url: SITE_URL }],
    alternates: languageAlternates(lang, `/blog/${slug}`),
    openGraph: {
      type: "article",
      locale: ogLocale[lang],
      url: localePath(lang, `/blog/${slug}`),
      siteName: FULL_NAME,
      title,
      description,
      publishedTime: post.date,
      authors: [FULL_NAME],
      tags: post.tags,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !isLocale(lang)) return notFound();


  const isHu = lang === "hu";

  const title = isHu ? post.titleHu : post.titleEn;
  const description = isHu ? post.summaryHu : post.summaryEn;
  const content = isHu ? post.contentHu : post.contentEn;
  const url = `${SITE_URL}${localePath(lang, `/blog/${slug}`)}`;
  const blogUrl = `${SITE_URL}${localePath(lang, "/blog")}`;
  // Service pages exist only in Hungarian.
  const service = isHu && post.relatedService ? pagesHu[post.relatedService] : null;
  const formattedDate = new Date(post.date).toLocaleDateString(
    isHu ? "hu-HU" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: title,
        description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: htmlLang[lang],
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: `${SITE_URL}${OG_IMAGE.url}`,
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: FULL_NAME,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: FULL_NAME,
          url: SITE_URL,
        },
        isPartOf: { "@id": `${blogUrl}#blog` },
        keywords: post.tags.join(", "),
        timeRequired: `PT${post.readingTimeMin}M`,
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
          { "@type": "ListItem", position: 3, name: title, item: url },
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
        {/* Breadcrumb / back link */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between mb-12">
          <Link
            href={localePath(lang, "/blog")}
            className="inline-flex items-center gap-1.5 text-[13px] text-brand hover:underline"
          >
            ← {isHu ? "Vissza a blogra" : "Back to blog"}
          </Link>
          <LanguageSwitcher
            locale={lang}
            href={localePath(otherLocale(lang), `/blog/${slug}`)}
          />
        </nav>

        <article>
          <header>
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-tint text-brand"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-[40px] md:text-[48px] font-semibold tracking-tight text-ink leading-[1.1] mb-6">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-[14px] text-ink-soft mb-12 pb-8 border-b border-line">
              <Link href={localePath(lang)} rel="author" className="hover:text-brand">
                {FULL_NAME}
              </Link>
              <span>·</span>
              <time dateTime={post.date}>{formattedDate}</time>
              <span>·</span>
              <span>
                {post.readingTimeMin} {isHu ? "perc olvasás" : "min read"}
              </span>
            </div>
          </header>

          {/* Content */}
          <div
            className="
              [&_h2]:text-[28px] [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_h2]:mt-12 [&_h2]:mb-4
              [&_p]:text-[17px] [&_p]:text-ink-body [&_p]:leading-[1.7] [&_p]:mb-5
              [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:list-disc
              [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal
              [&_li]:text-[17px] [&_li]:text-ink-body [&_li]:leading-[1.7] [&_li]:mb-1
              [&_a]:text-brand [&_a]:no-underline hover:[&_a]:underline
              [&_code]:text-brand [&_code]:bg-brand-tint [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[14px] [&_code]:font-mono
              [&_pre]:bg-ink [&_pre]:rounded-2xl [&_pre]:p-6 [&_pre]:mb-6 [&_pre]:overflow-x-auto
              [&_pre_code]:text-night-text [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[14px]
            "
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>

        {service && (
          <aside className="mt-12 rounded-2xl bg-paper px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <p className="text-[19px] font-semibold text-ink leading-snug">{service.cta.text}</p>
            <Link
              href={localePath(lang, service.slug)}
              className="shrink-0 inline-flex items-center justify-center bg-brand text-white text-[15px] px-6 py-2.5 rounded-full hover:bg-brand-dark transition-colors"
            >
              {service.label} →
            </Link>
          </aside>
        )}

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-line">
          <Link
            href={localePath(lang, "/blog")}
            className="inline-flex items-center gap-1.5 text-[15px] text-brand hover:underline font-medium"
          >
            ← {isHu ? "Összes cikk" : "All articles"}
          </Link>
        </div>
      </div>
    </main>
    <Footer locale={lang} />
    <MobileCtaBar t={translations[lang]} contactHref={`${localePath(lang)}#contact`} />
    </LanguageProvider>
  );
}
