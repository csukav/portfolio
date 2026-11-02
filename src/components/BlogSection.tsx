import { blogPosts } from "@/lib/blog";
import type { Locale, Translations } from "@/lib/translations";
import Link from "next/link";
import { localePath } from "@/lib/i18n";

const sorted = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

export default function BlogSection({
  t,
  locale,
}: {
  t: Translations;
  locale: Locale;
}) {
  const isHu = locale === "hu";

  return (
    <section id="blog" aria-labelledby="blog-heading" className="max-w-310 mx-auto px-4 sm:px-6 py-16 md:py-18">
      <div className="flex flex-wrap justify-between items-end gap-4">
        <div>
          <p className="eyebrow mb-3">{t.blog.eyebrow}</p>
          <h2 id="blog-heading" className="section-title">
            {t.blog.headline}
          </h2>
        </div>
        <Link href={localePath(locale, "/blog")} className="font-medium text-brand hover:text-brand-dark">
          {t.blog.seeAll}
        </Link>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {sorted.slice(0, 3).map((post) => (
          <Link
            key={post.slug}
            href={localePath(locale, `/blog/${post.slug}`)}
            className="group border-t border-line-strong pt-5 flex flex-col gap-2.5"
          >
            <span className="font-mono text-[13px] text-ink-soft">
              {post.tags[0]} · {post.readingTimeMin} {t.blog.minutes}
            </span>
            <h3 className="text-[21px] leading-[1.3] font-semibold group-hover:text-brand transition-colors">
              {isHu ? post.titleHu : post.titleEn}
            </h3>
            <p className="text-[15px] leading-normal text-ink-soft line-clamp-2">
              {isHu ? post.summaryHu : post.summaryEn}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
