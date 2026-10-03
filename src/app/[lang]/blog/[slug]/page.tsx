import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const SITE_URL = "https://csukaviktor.com";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.titleEn,
    description: post.summaryEn,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      url: `${SITE_URL}/blog/${slug}`,
      title: post.titleEn,
      description: post.summaryEn,
      type: "article",
      publishedTime: post.date,
      authors: ["Csuka Viktor"],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "en";
  const isHu = locale === "hu";

  const title = isHu ? post.titleHu : post.titleEn;
  const content = isHu ? post.contentHu : post.contentEn;
  const formattedDate = new Date(post.date).toLocaleDateString(
    isHu ? "hu-HU" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "Csuka Viktor",
      url: SITE_URL,
    },
    description: isHu ? post.summaryHu : post.summaryEn,
    url: `${SITE_URL}/blog/${slug}`,
    keywords: post.tags.join(", "),
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-[780px] mx-auto px-6 py-32">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#0071e3] mb-12 hover:underline"
        >
          ← {isHu ? "Vissza a blogra" : "Back to blog"}
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#e8f1fb] text-[#0071e3]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-[40px] md:text-[48px] font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-6">
          {title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 text-[14px] text-[#86868b] mb-12 pb-8 border-b border-black/8">
          <span>Csuka Viktor</span>
          <span>·</span>
          <span>{formattedDate}</span>
          <span>·</span>
          <span>
            {post.readingTimeMin} {isHu ? "perc olvasás" : "min read"}
          </span>
        </div>

        {/* Content */}
        <article
          className="
            [&_h2]:text-[28px] [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[#1d1d1f] [&_h2]:mt-12 [&_h2]:mb-4
            [&_p]:text-[17px] [&_p]:text-[#3d3d3f] [&_p]:leading-[1.7] [&_p]:mb-5
            [&_ul]:pl-6 [&_ul]:mb-5 [&_ul]:list-disc
            [&_ol]:pl-6 [&_ol]:mb-5 [&_ol]:list-decimal
            [&_li]:text-[17px] [&_li]:text-[#3d3d3f] [&_li]:leading-[1.7] [&_li]:mb-1
            [&_a]:text-[#0071e3] [&_a]:no-underline hover:[&_a]:underline
            [&_code]:text-[#0071e3] [&_code]:bg-[#f0f6ff] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[14px] [&_code]:font-mono
            [&_pre]:bg-[#1d1d1f] [&_pre]:rounded-2xl [&_pre]:p-6 [&_pre]:mb-6 [&_pre]:overflow-x-auto
            [&_pre_code]:text-[#f5f5f7] [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-[14px]
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Bottom nav */}
        <div className="mt-16 pt-8 border-t border-black/8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-[15px] text-[#0071e3] hover:underline font-medium"
          >
            ← {isHu ? "Összes cikk" : "All articles"}
          </Link>
        </div>
      </div>
    </main>
  );
}
