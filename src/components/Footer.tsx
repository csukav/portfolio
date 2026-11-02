import Link from "next/link";
import { EMAIL, FULL_NAME, GITHUB_URL, LINKEDIN_URL, PHONE, PHONE_DISPLAY } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import { pagesHu, serviceKeys } from "@/content/content-hu";

export default function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();
  const t = translations[locale];
  const home = localePath(locale);

  const columns = [
    // Service pages exist in Hungarian only.
    ...(locale === "hu"
      ? [
          {
            title: t.footer.servicesTitle,
            links: serviceKeys.map((k) => ({ label: pagesHu[k].label, href: localePath("hu", pagesHu[k].slug) })),
          },
        ]
      : []),
    {
      title: t.footer.siteTitle,
      links: [
        { label: t.nav.projects, href: `${home}#projects` },
        { label: t.nav.about, href: `${home}#about` },
        { label: t.nav.blog, href: localePath(locale, "/blog") },
        { label: t.nav.contact, href: `${home}#contact` },
      ],
    },
    {
      title: t.footer.contactTitle,
      links: [
        { label: PHONE_DISPLAY, href: `tel:${PHONE}` },
        { label: EMAIL, href: `mailto:${EMAIL}` },
        { label: "LinkedIn", href: LINKEDIN_URL },
        { label: "GitHub", href: GITHUB_URL },
      ],
    },
  ];

  return (
    // Bottom padding on phones keeps the fixed MobileCtaBar from covering the footer.
    <footer className="bg-ink text-night-muted pb-20 md:pb-0">
      <div className="max-w-310 mx-auto px-4 sm:px-6 pt-14 pb-10 flex flex-wrap gap-10 justify-between">
        <div className="flex-[1_1_280px] max-w-90">
          <p className="text-night-text font-semibold text-[17px]">{FULL_NAME}</p>
          {/* Service area, worded like the ProfessionalService JSON-LD. */}
          <p className="mt-2.5 text-[15px] leading-relaxed">{t.footer.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-x-12 gap-y-8 text-[15px]">
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-2.5">
              <p className="mb-1 font-mono text-[13px]">{col.title}</p>
              {col.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link key={link.label} href={link.href} className="text-night-text hover:text-brand-bright transition-colors">
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "me noopener noreferrer" : undefined}
                    className="text-night-text hover:text-brand-bright transition-colors"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </nav>
          ))}
        </div>
      </div>
      <div className="max-w-310 mx-auto px-4 sm:px-6 py-6 border-t border-night-line text-sm">
        © {year} {FULL_NAME}
      </div>
    </footer>
  );
}
