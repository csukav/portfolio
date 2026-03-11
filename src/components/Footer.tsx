import { Separator } from "@/components/ui/separator";

const links = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter / X", href: "https://x.com" },
  { label: "Email", href: "mailto:hello@pelda.hu" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1d1d1f] py-12 px-6">
      <div className="max-w-[980px] mx-auto">
        <Separator className="bg-[#3a3a3c] mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[13px] text-[#6e6e73]">
            © {year} Portfolio. Minden jog fenntartva.
          </p>

          <div className="flex gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-[13px] text-[#6e6e73] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <p className="text-center text-[12px] text-[#48484a] mt-8">
          Készült Next.js • Tailwind CSS • shadcn/ui — ❤︎ szenvedéllyel
        </p>
      </div>
    </footer>
  );
}
