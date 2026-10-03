"use client";

import { blogPosts } from "@/lib/blog";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { localePath } from "@/lib/i18n";

const sorted = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function BlogSection() {
  const { t, locale } = useLanguage();
  const isHu = locale === "hu";

  return (
    <section id="blog" aria-label={t.nav.blog} className="py-32 bg-white">
      <div className="max-w-[980px] mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          Blog
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="section-headline max-w-[480px]">{t.blog.headline}</h2>
          <Link
            href={localePath(locale, "/blog")}
            className="hidden md:inline-flex items-center gap-1 text-[15px] text-[#0071e3] hover:underline font-medium shrink-0"
          >
            {t.blog.seeAll} →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sorted.slice(0, 3).map((post) => {
            const title = isHu ? post.titleHu : post.titleEn;
            const summary = isHu ? post.summaryHu : post.summaryEn;
            const formattedDate = new Date(post.date).toLocaleDateString(
              isHu ? "hu-HU" : "en-US",
              { year: "numeric", month: "short", day: "numeric" },
            );

            return (
              <Link
                key={post.slug}
                href={localePath(locale, `/blog/${post.slug}`)}
                className="group apple-card p-7 flex flex-col bg-white hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#e8f1fb] text-[#0071e3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-[18px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors mb-3 leading-snug flex-1">
                  {title}
                </h3>
                <p className="text-[14px] text-[#6e6e73] leading-[1.6] mb-5 line-clamp-2">
                  {summary}
                </p>
                <div className="flex items-center gap-3 text-[12px] text-[#86868b]">
                  <time dateTime={post.date}>{formattedDate}</time>
                  <span>·</span>
                  <span>
                    {post.readingTimeMin} {isHu ? "perc" : "min read"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex md:hidden">
          <Link
            href={localePath(locale, "/blog")}
            className="text-[15px] text-[#0071e3] hover:underline font-medium"
          >
            {t.blog.seeAll} →
          </Link>
        </div>
      </div>
    </section>
  );
}
