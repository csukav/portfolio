import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageProvider";
import { SITE_URL, FULL_NAME, OG_IMAGE, PHONE, PHONE_DISPLAY } from "@/lib/site";
import { isLocale, localePath, ogLocale, htmlLang } from "@/lib/i18n";
import { getServiceBySlug, pagesHu, serviceKeys } from "@/content/content-hu";

// Service landing pages (Google Ads sitelinks point here). Hungarian only for
// now: /en/<slug> is a 404, and no hreflang alternate is advertised.

interface Props {
  params: Promise<{ lang: string; service: string }>;
}

export function generateStaticParams({ params }: { params: { lang: string } }) {
  if (params.lang !== "hu") return [];
  return serviceKeys.map((k) => ({ service: pagesHu[k].slug.slice(1) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, service } = await params;
  const found = getServiceBySlug(service);
  if (lang !== "hu" || !found) return {};
  const { page } = found;
  const path = localePath(lang, page.slug);

  return {
    // The titles already end in "| Csuka Viktor" – skip the layout template.
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url: path,
      siteName: FULL_NAME,
      title: page.title,
      description: page.description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [OG_IMAGE.url],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { lang, service } = await params;
  const found = getServiceBySlug(service);
  if (!isLocale(lang) || lang !== "hu" || !found) notFound();
  const { key, page } = found;

  const url = `${SITE_URL}${localePath(lang, page.slug)}`;
  const homeUrl = `${SITE_URL}${localePath(lang)}`;
  const related = serviceKeys.filter((k) => k !== key).map((k) => pagesHu[k]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.h1,
        serviceType: page.label,
        description: page.description,
        url,
        inLanguage: htmlLang[lang],
        provider: { "@id": `${SITE_URL}/#person` },
        areaServed: [
          { "@type": "City", name: "Debrecen" },
          { "@type": "AdministrativeArea", name: "Hajdú-Bihar vármegye" },
          { "@type": "Country", name: "Magyarország" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Főoldal", item: homeUrl },
          { "@type": "ListItem", position: 2, name: page.label, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <LanguageProvider initialLocale={lang}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-white">
        <div className="max-w-195 mx-auto px-6 pt-32 pb-24">
          <nav aria-label="Breadcrumb" className="mb-12">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-[#86868b]">
              <li>
                <Link href={localePath(lang)} className="text-[#0071e3] hover:underline">
                  Főoldal
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{page.label}</li>
            </ol>
          </nav>

          <header className="mb-14">
            <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
              {page.label}
            </p>
            <h1 className="text-[40px] md:text-[48px] font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-6">
              {page.h1}
            </h1>
            <p className="text-[19px] text-[#6e6e73] leading-[1.55]">{page.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[#0071e3] text-white text-[17px] px-7 py-3 rounded-full hover:bg-[#0077ed] transition-colors"
              >
                {page.cta.button}
              </a>
              <a href={`tel:${PHONE}`} className="text-[17px] text-[#0071e3] hover:underline">
                vagy hívj: {PHONE_DISPLAY}
              </a>
            </div>
          </header>

          {page.sections.map((section) => (
            <section key={section.h2} className="mb-12">
              <h2 className="text-[28px] font-bold tracking-tight text-[#1d1d1f] mb-4">
                {section.h2}
              </h2>
              {section.body ? (
                <p className="text-[17px] text-[#3d3d3f] leading-[1.7] mb-5">{section.body}</p>
              ) : null}
              {section.bullets ? (
                <ul className="pl-6 list-disc">
                  {section.bullets.map((b) => (
                    <li key={b} className="text-[17px] text-[#3d3d3f] leading-[1.7] mb-1">
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className="mb-12">
            <h2 className="text-[28px] font-bold tracking-tight text-[#1d1d1f] mb-6">
              Gyakori kérdések
            </h2>
            <div className="flex flex-col gap-px border border-black/8 rounded-2xl overflow-hidden">
              {page.faq.map(({ q, a }, i) => (
                <details
                  key={q}
                  className={`group bg-white px-6 py-5 ${i === 0 ? "" : "border-t border-black/8"}`}
                >
                  <summary className="cursor-pointer list-none flex justify-between gap-4 text-[17px] font-semibold text-[#1d1d1f]">
                    <h3>{q}</h3>
                    <span aria-hidden="true" className="text-[#0071e3] group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] text-[#3d3d3f] leading-[1.7]">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <div className="mb-16 rounded-2xl bg-[#f5f5f7] px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="text-[19px] font-semibold text-[#1d1d1f] leading-snug">{page.cta.text}</p>
              <a href={`tel:${PHONE}`} className="mt-1 inline-block text-[15px] text-[#0071e3] hover:underline">
                Telefon: {PHONE_DISPLAY}
              </a>
            </div>
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center justify-center bg-[#0071e3] text-white text-[15px] px-6 py-2.5 rounded-full hover:bg-[#0077ed] transition-colors"
            >
              {page.cta.button}
            </a>
          </div>

          <section aria-labelledby="related">
            <h2 id="related" className="text-[21px] font-bold tracking-tight text-[#1d1d1f] mb-4">
              Kapcsolódó szolgáltatások
            </h2>
            <ul className="grid sm:grid-cols-3 gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={localePath(lang, r.slug)}
                    className="block h-full rounded-2xl border border-black/8 px-5 py-4 text-[15px] font-medium text-[#1d1d1f] hover:border-[#0071e3] hover:text-[#0071e3] transition-colors"
                  >
                    {r.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <ContactSection />
      </main>
      <Footer locale={lang} />
    </LanguageProvider>
  );
}
