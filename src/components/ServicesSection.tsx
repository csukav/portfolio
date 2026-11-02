import Link from "next/link";
import type { Translations } from "@/lib/translations";

const ICONS = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M7 6.5h.01" />
      <path d="M10 6.5h.01" />
    </>
  ),
  it: (
    <>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7.5h.01" />
      <path d="M7 16.5h.01" />
    </>
  ),
};

export function Check() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 mt-0.5 text-brand"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export default function ServicesSection({ t }: { t: Translations }) {
  const { pillars } = t;

  return (
    <section id="services" aria-labelledby="services-heading" className="max-w-310 mx-auto px-4 sm:px-6 pt-20 md:pt-26 pb-12 scroll-mt-16">
      <p className="eyebrow mb-3">{pillars.eyebrow}</p>
      <h2 id="services-heading" className="section-title max-w-190">
        {pillars.h2}
      </h2>

      <div className="mt-10 md:mt-12 grid md:grid-cols-2 gap-5">
        {pillars.items.map((p) => (
          <article key={p.h3} className="bg-white border border-line rounded-2xl p-7 md:p-9 flex flex-col gap-5">
            <div className="size-12 rounded-[10px] bg-brand-tint flex items-center justify-center">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                {ICONS[p.icon]}
              </svg>
            </div>
            <h3 className="text-[26px] md:text-[28px] font-semibold tracking-[-0.02em]">{p.h3}</h3>
            <p className="text-[17px] leading-relaxed text-ink-soft">{p.text}</p>
            <ul className="flex flex-col gap-3 text-base">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2.5 items-start">
                  <Check />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-5 border-t border-line flex flex-wrap justify-between items-center gap-x-5 gap-y-3">
              <span className="font-mono text-[15px] text-ink-soft">{p.price}</span>
              <span className="flex flex-wrap gap-x-5 gap-y-2">
                {p.links.map((l) => (
                  <Link key={l.href + l.label} href={l.href} className="font-medium text-brand hover:text-brand-dark">
                    {l.label}
                  </Link>
                ))}
              </span>
            </div>
          </article>
        ))}
      </div>

      {pillars.extra ? (
        <p className="mt-5 text-base text-ink-soft">
          {pillars.extra.text}{" "}
          <Link href={pillars.extra.href} className="text-brand hover:text-brand-dark font-medium">
            {pillars.extra.label}
          </Link>
        </p>
      ) : null}
    </section>
  );
}
