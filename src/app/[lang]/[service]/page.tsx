import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import { Check } from "@/components/ServicesSection";
import { LanguageProvider } from "@/context/LanguageProvider";
import { SITE_URL, FULL_NAME, OG_IMAGE, PHONE, PHONE_DISPLAY } from "@/lib/site";
import { isLocale, localePath, ogLocale, htmlLang } from "@/lib/i18n";
import { getServiceBySlug, homeHu, pagesHu, serviceKeys } from "@/content/content-hu";
import { translations } from "@/lib/translations";

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
  const price = homeHu.services.items.find((s) => s.route === key)?.price;
  const t = translations[lang];
  const facts = [
    ...(price ? [{ label: "Ár", value: price }] : []),
    { label: "Első egyeztetés", value: "ingyenes" },
    { label: "Ajánlat", value: "fix ár, írásban" },
    { label: "Terület", value: "Debrecen, Hajdú-Bihar" },
  ];

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main>
        <header className="max-w-310 mx-auto px-4 sm:px-6 pt-8 pb-16 md:pb-20">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-soft">
              <li>
                <Link href={localePath(lang)} className="hover:text-brand">
                  Főoldal
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {page.label}
              </li>
            </ol>
          </nav>

          <div className="mt-10 md:mt-14 flex flex-wrap gap-10 md:gap-14 items-start">
            <div className="flex-[999_1_560px] min-w-0">
              <p className="eyebrow mb-4">{page.label} · Debrecen és Hajdú-Bihar</p>
              <h1 className="text-[36px] sm:text-[46px] lg:text-[56px] leading-[1.06] tracking-[-0.035em] font-semibold">
                {page.h1}
              </h1>
              <p className="mt-6 md:mt-7 text-[17px] md:text-xl leading-[1.55] text-ink-soft max-w-160">{page.intro}</p>
              <div className="mt-8 md:mt-9 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center min-h-13 px-6 rounded-[10px] bg-brand text-white text-[17px] font-medium hover:bg-brand-dark transition-colors"
                >
                  {page.cta.button}
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex items-center justify-center min-h-13 px-6 rounded-[10px] bg-white border border-line-strong text-ink text-[17px] font-medium font-mono hover:border-ink transition-colors"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <aside aria-label="Röviden" className="flex-[1_1_320px] min-w-0 rounded-2xl bg-ink text-night-text p-6 md:p-7 font-mono">
              <p className="pb-4 border-b border-night-line text-[13px] text-night-muted">röviden.txt</p>
              <dl className="text-[15px]">
                {facts.map((f, i) => (
                  <div
                    key={f.label}
                    className={`flex justify-between gap-3 py-4 ${i < facts.length - 1 ? "border-b border-night-row" : ""}`}
                  >
                    <dt className="text-night-muted">{f.label}</dt>
                    <dd className="text-brand-bright text-right">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </header>

        <div className="bg-white border-y border-line">
          <div className="max-w-195 mx-auto px-4 sm:px-6 py-16 md:py-24">
            {page.sections.map((section) => (
              <section key={section.h2} className="mb-14 last:mb-0">
                <h2 className="text-[26px] md:text-[30px] leading-[1.15] tracking-[-0.02em] font-semibold mb-4">
                  {section.h2}
                </h2>
                {section.body ? (
                  <p className="text-[17px] md:text-lg leading-[1.7] text-ink-body mb-5">{section.body}</p>
                ) : null}
                {section.bullets ? (
                  <ul className="flex flex-col gap-3">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 items-start text-[17px] leading-[1.6] text-ink-body">
                        <Check />
                        {b}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        <FaqSection faq={page.faq} title={t.faqTitle} />

        <section aria-label={page.cta.text} className="bg-ink text-night-text">
          <div className="max-w-310 mx-auto px-4 sm:px-6 py-16 md:py-22 flex flex-wrap gap-8 items-center justify-between">
            <p className="flex-[999_1_480px] min-w-0 text-[28px] md:text-[38px] leading-[1.15] tracking-[-0.025em] font-semibold">
              {page.cta.text}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center min-h-13 px-6 rounded-[10px] bg-brand-bright text-ink text-[17px] font-semibold hover:bg-white transition-colors"
              >
                {page.cta.button}
              </a>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center min-h-13 px-6 rounded-[10px] border border-[#3a424e] text-night-text text-[17px] font-mono hover:border-night-text transition-colors"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>

        <section aria-labelledby="related" className="max-w-310 mx-auto px-4 sm:px-6 pt-16 md:pt-18">
          <h2 id="related" className="text-[22px] font-semibold tracking-[-0.01em] mb-5">
            Kapcsolódó szolgáltatások
          </h2>
          <ul className="grid sm:grid-cols-3 gap-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  href={localePath(lang, r.slug)}
                  className="flex items-center justify-between h-full min-h-14 rounded-xl bg-white border border-line px-5 py-4 text-base font-medium hover:border-brand hover:text-brand transition-colors"
                >
                  {r.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <ContactSection />
      </main>
      <Footer locale={lang} />
      <MobileCtaBar t={t} />
    </LanguageProvider>
  );
}
