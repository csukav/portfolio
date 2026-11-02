import type { Translations } from "@/lib/translations";

/** "First clients" offer – shown only when homeHu.offer.enabled is true. */
export default function OfferSection({ t }: { t: Translations }) {
  const { offer } = t;
  if (!offer.enabled) return null;

  return (
    <section aria-labelledby="offer-heading" className="max-w-310 mx-auto px-4 sm:px-6 py-12">
      <div className="bg-brand-tint border border-brand-tint-line rounded-[20px] p-7 md:p-12 flex flex-wrap gap-8 items-center justify-between">
        <div className="flex-[999_1_520px] min-w-0">
          <p className="mb-3 font-mono text-sm text-brand-dark">{offer.eyebrow}</p>
          <h2 id="offer-heading" className="text-[28px] md:text-[38px] leading-[1.15] tracking-[-0.025em] font-semibold">
            {offer.h2}
          </h2>
          <p className="mt-4 text-[17px] md:text-lg leading-relaxed text-[#2d3b33] max-w-160">{offer.text}</p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center justify-center min-h-13 px-6 rounded-[10px] bg-ink text-white text-[17px] font-medium hover:bg-black transition-colors"
        >
          {offer.button}
        </a>
      </div>
    </section>
  );
}
