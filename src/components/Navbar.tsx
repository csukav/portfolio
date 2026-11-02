"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { localePath, otherLocale } from "@/lib/i18n";
import { PHONE, PHONE_DISPLAY } from "@/lib/site";
import LanguageSwitcher from "@/components/LanguageSwitcher";

/**
 * `hasContact`: the page has its own #contact section (home, service pages).
 * Elsewhere (blog) the quote button goes to the homepage's contact section.
 */
export default function Navbar({ hasContact = true }: { hasContact?: boolean }) {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const home = localePath(locale);
  // Section links work from every page: on the homepage they stay in-page.
  const section = (id: string) => (pathname === home ? `#${id}` : `${home}#${id}`);
  const contactHref = hasContact ? "#contact" : section("contact");

  const navLinks = [
    { label: t.nav.services, href: section("services") },
    { label: t.nav.projects, href: section("projects") },
    { label: t.nav.about, href: section("about") },
    { label: t.nav.blog, href: localePath(locale, "/blog") },
    { label: t.nav.contact, href: contactHref },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <nav className="max-w-310 mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href={home} className="flex items-center gap-2.5 text-ink shrink-0">
          <span
            aria-hidden="true"
            className="size-9 rounded-lg bg-ink text-white flex items-center justify-center font-mono text-sm font-medium"
          >
            CV
          </span>
          <span className="font-semibold text-[17px] tracking-[-0.01em]">Csuka Viktor</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.href} className="text-[15px] text-ink hover:text-brand transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-5">
          <a href={`tel:${PHONE}`} className="font-mono text-sm text-ink-soft hover:text-brand transition-colors">
            {PHONE_DISPLAY}
          </a>
          <LanguageSwitcher locale={locale} href={localePath(otherLocale(locale))} />
          <a
            href={contactHref}
            className="inline-flex items-center min-h-11 px-4.5 rounded-lg bg-brand text-white text-[15px] font-medium hover:bg-brand-dark transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden size-11 flex items-center justify-center rounded-[10px] border border-line"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t.nav.menuLabel}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </>
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-line bg-white px-4 py-3 flex flex-col">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="py-3 text-[17px] text-ink border-b border-line last:border-0"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher
            locale={locale}
            href={localePath(otherLocale(locale))}
            className="py-3 text-[17px]"
          />
        </div>
      )}
    </header>
  );
}
