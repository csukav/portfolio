import type { Translations } from "@/lib/translations";

/** Dark band: development, operations and support from one person. */
export default function WhySection({ t }: { t: Translations }) {
  const { why } = t;

  return (
    <section aria-labelledby="why-heading" className="bg-ink text-night-text mt-10 md:mt-14">
      <div className="max-w-310 mx-auto px-4 sm:px-6 py-20 md:py-26">
        <p className="mb-3 font-mono text-sm text-brand-bright">{why.eyebrow}</p>
        <h2 id="why-heading" className="section-title max-w-205">
          {why.h2}
        </h2>
        <div className="mt-12 md:mt-14 grid md:grid-cols-3 gap-px bg-night-line border border-night-line rounded-2xl overflow-hidden">
          {why.items.map((item) => (
            <div key={item.h3} className="bg-ink p-7 md:p-8">
              <p className="font-mono text-sm text-night-muted">{item.tag}</p>
              <h3 className="mt-3 mb-2.5 text-[22px] font-semibold">{item.h3}</h3>
              <p className="text-base leading-relaxed text-night-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
