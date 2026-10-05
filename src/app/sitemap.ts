import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { locales, localePath, htmlLang } from "@/lib/i18n";

type Entry = MetadataRoute.Sitemap[number];

/** One sitemap entry per locale, each listing every language version (hreflang). */
function localized(
  path: string,
  options: Omit<Entry, "url" | "alternates">,
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [htmlLang[l], `${SITE_URL}${localePath(l, path)}`]),
  );
  return locales.map((locale) => ({
    url: `${SITE_URL}${localePath(locale, path)}`,
    alternates: { languages },
    ...options,
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = blogPosts.reduce(
    (latest, p) => (p.date > latest ? p.date : latest),
    blogPosts[0]?.date ?? "",
  );

  return [
    ...localized("/", {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    }),
    ...localized("/blog", {
      lastModified: latestPost ? new Date(latestPost) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    ...blogPosts.flatMap((post) =>
      localized(`/blog/${post.slug}`, {
        lastModified: new Date(post.date),
        changeFrequency: "yearly",
        priority: 0.7,
      }),
    ),
  ];
}
