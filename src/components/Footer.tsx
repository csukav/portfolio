import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { EMAIL, FULL_NAME, GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import { localePath, type Locale } from "@/lib/i18n";

const getLinks = (locale: Locale) => [
  { label: "Blog", href: localePath(locale, "/blog") },
  { label: "GitHub", href: GITHUB_URL },
  { label: "LinkedIn", href: LINKEDIN_URL },
  { label: "Email", href: `mailto:${EMAIL}` },
];

export default function Footer({ locale }: { locale: Locale }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1d1d1f] py-12 px-6">
      <div className="max-w-245 mx-auto">
        <Separator className="bg-[#3a3a3c] mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13px] text-[#6e6e73]">
            © {year} {FULL_NAME}
          </p>

          <nav className="flex gap-6">
            {getLinks(locale).map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[13px] text-[#6e6e73] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "me noopener noreferrer" : undefined}
                  className="text-[13px] text-[#6e6e73] hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
