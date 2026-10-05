// app/sitemap.ts → https://www.csukaviktor.com/sitemap.xml
import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/seo";

const abs = (p: string) => (p === "/" ? `${SITE_URL}/` : `${SITE_URL}${p}`);

// Ha a blogposztok fájlból/CMS-ből jönnek, itt add vissza őket.
// Pl.: return (await getAllPosts()).map(p => ({ slug: p.slug, updated: p.date, hasEn: true }));
async function getBlogPosts(): Promise<{ slug: string; updated: string; hasEn: boolean }[]> {
  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const r of Object.values(ROUTES) as { hu: string; en?: string }[]) {
    const languages: Record<string, string> = { hu: abs(r.hu) };
    if (r.en) languages.en = abs(r.en);

    entries.push({ url: abs(r.hu), lastModified: now, alternates: { languages } });
    if (r.en) entries.push({ url: abs(r.en), lastModified: now, alternates: { languages } });
  }

  for (const post of await getBlogPosts()) {
    const hu = `/blog/${post.slug}`;
    const en = `/en/blog/${post.slug}`;
    const languages: Record<string, string> = { hu: abs(hu) };
    if (post.hasEn) languages.en = abs(en);

    entries.push({ url: abs(hu), lastModified: new Date(post.updated), alternates: { languages } });
    if (post.hasEn) {
      entries.push({ url: abs(en), lastModified: new Date(post.updated), alternates: { languages } });
    }
  }

  return entries;
}