import Link from "next/link";
import type { Locale, Translations } from "@/lib/translations";
import { localePath } from "@/lib/i18n";
import { pagesHu, serviceKeys } from "@/content/content-hu";

export default function ServicesSection({
  t,
  locale,
}: {
  t: Translations;
  locale: Locale;
}) {
  return (
    <section id="services" aria-label={t.services.label} className="py-32 bg-black">
      <div className="max-w-245 mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          {t.services.label}
        </p>
        <h2 className="mb-6 text-[56px] md:text-[72px] font-bold leading-[1.04] tracking-[-0.025em] text-white">
          {t.services.headline1}
          <br />
          <span className="text-[48px] text-[#6e6e73]">{t.services.headline2}</span>
        </h2>
        <p className="text-[19px] text-[#6e6e73] max-w-125 mb-20">
          {t.services.subheadline}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.services.items.map((service, idx) => (
            <div
              key={idx}
              className="group p-8 bg-[#1d1d1f] rounded-lg border border-[#424245] hover:border-[#0071e3] transition-all duration-300 hover:shadow-lg hover:shadow-[#0071e3]/20"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              {service.price ? (
                <p className="text-sm font-semibold text-[#07f] mb-4">
                  {service.price}
                </p>
              ) : null}
              <p className="text-[15px] text-[#a1a1a6] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Links to the Hungarian service pages (also the Google Ads sitelink targets). */}
        {locale === "hu" ? (
          <nav aria-label="Szolgáltatásoldalak" className="mt-16">
            <ul className="flex flex-wrap gap-3">
              {serviceKeys.map((k) => (
                <li key={k}>
                  <Link
                    href={localePath("hu", pagesHu[k].slug)}
                    className="inline-flex items-center rounded-full border border-[#424245] px-5 py-2 text-[15px] text-white hover:border-[#0071e3] hover:text-[#0071e3] transition-colors"
                  >
                    {pagesHu[k].label} →
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
