import type { Translations } from "@/lib/translations";

export default function HeroSection({ t }: { t: Translations }) {
  const { hero, proof } = t;

  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="max-w-310 mx-auto px-4 sm:px-6 pt-14 pb-16 md:pt-22 md:pb-18 flex flex-wrap gap-10 md:gap-14 items-center"
      >
        <div className="flex-[999_1_560px] min-w-0 animate-fade-up">
          <p className="mb-5 font-mono text-sm text-ink-soft">{hero.eyebrow}</p>
          <h1
            id="hero-heading"
            className="text-[38px] sm:text-[52px] lg:text-[66px] leading-[1.05] tracking-[-0.035em] font-semibold"
          >
            {hero.h1}
          </h1>
          <p className="mt-6 md:mt-7 text-[17px] md:text-xl leading-[1.55] text-ink-soft max-w-150">
            {hero.intro}
          </p>
          <div className="mt-8 md:mt-9 flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              className="inline-flex items-center justify-center min-h-13 px-6 rounded-[10px] bg-brand text-white text-[17px] font-medium hover:bg-brand-dark transition-colors"
            >
              {hero.primaryCta}
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center min-h-13 px-6 rounded-[10px] bg-white border border-line-strong text-ink text-[17px] font-medium hover:border-ink transition-colors"
            >
              {hero.secondaryCta}
            </a>
          </div>
          <p className="mt-6 text-[15px] text-ink-soft">{hero.area}</p>
        </div>

        {/* Measured handover values – the page's signature element. */}
        <div className="flex-[1_1_360px] min-w-0 rounded-2xl bg-ink text-night-text p-6 md:p-7 font-mono">
          <div className="flex items-center justify-between gap-3 pb-4 border-b border-night-line">
            <span className="text-[13px] text-night-muted">{proof.file}</span>
            <span className="text-xs font-medium text-ink bg-brand-bright px-2.5 py-1 rounded-full">
              {proof.badge}
            </span>
          </div>
          <dl className="text-[15px]">
            {proof.rows.map((row, i) => (
              <div
                key={row.label}
                className={`flex justify-between gap-3 py-4 ${i < proof.rows.length - 1 ? "border-b border-night-row" : ""}`}
              >
                <dt className="text-night-muted">{row.label}</dt>
                <dd className="text-brand-bright text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[13px] leading-normal text-night-muted">{proof.note}</p>
        </div>
      </section>

      <section aria-label={t.trustLabel} className="border-y border-line bg-white">
        <div className="max-w-310 mx-auto px-4 sm:px-6 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.trust.map((item) => (
            <div key={item.value}>
              <p className="text-[21px] font-semibold tracking-[-0.02em]">{item.value}</p>
              <p className="mt-1 text-[15px] text-ink-soft">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
