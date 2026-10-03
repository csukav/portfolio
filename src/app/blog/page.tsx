import { blogPosts } from "@/lib/blog";
import { headers } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";

const SITE_URL = "https://csukaviktor.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Csuka Viktor cikkei full-stack webfejlesztésről: Next.js, React, Supabase, React Native és modern web technológiák.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    url: `${SITE_URL}/blog`,
    title: "Blog | Csuka Viktor",
    description:
      "Cikkek full-stack webfejlesztésről: Next.js, React, Supabase és modern web technológiák.",
  },
};

export default async function BlogPage() {
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "en";
  const isHu = locale === "hu";

  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-[780px] mx-auto px-6 py-32">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#0071e3] mb-12 hover:underline"
        >
          ← {isHu ? "Vissza a főoldalra" : "Back to home"}
        </Link>

        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          Blog
        </p>
        <h1 className="text-[48px] font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-6">
          {isHu ? "Fejlesztői gondolatok." : "Developer thoughts."}
        </h1>
        <p className="text-[19px] text-[#6e6e73] leading-[1.55] mb-16 max-w-[520px]">
          {isHu
            ? "Tapasztalatok, tanulságok és technikai mélységek Full-Stack fejlesztőként."
            : "Experiences, lessons, and technical deep-dives as a Full-Stack developer."}
        </p>

        <div className="flex flex-col gap-px border border-black/8 rounded-2xl overflow-hidden">
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
                href={`/blog/${post.slug}`}
                className={`group block bg-white hover:bg-[#f5f5f7] transition-colors px-8 py-7 ${
                  i === 0 ? "" : "border-t border-black/8"
                }`}
              >
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#e8f1fb] text-[#0071e3]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-[21px] font-bold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors mb-2 leading-snug">
                  {title}
                </h2>
                <p className="text-[15px] text-[#6e6e73] leading-[1.55] mb-4">
                  {summary}
                </p>
                <div className="flex items-center gap-4 text-[13px] text-[#86868b]">
                  <span>{formattedDate}</span>
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
  );
}
