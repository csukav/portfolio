import type { Faq } from "@/content/content-hu";

/** FAQ list, used on the homepage and the service pages. */
export default function FaqSection({
  faq,
  title = "Gyakori kérdések",
}: {
  faq: Faq[];
  title?: string;
}) {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="max-w-225 mx-auto px-4 sm:px-6 py-16 md:py-18">
      <h2 id="faq-heading" className="section-title mb-8">
        {title}
      </h2>
      <div className="border-b border-line-strong">
        {faq.map(({ q, a }) => (
          <details key={q} className="group border-t border-line-strong py-5">
            <summary className="cursor-pointer list-none flex justify-between gap-4 text-lg md:text-[19px] font-semibold">
              <h3>{q}</h3>
              <span aria-hidden="true" className="text-brand text-2xl leading-none group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3.5 text-[17px] leading-[1.65] text-ink-soft">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
