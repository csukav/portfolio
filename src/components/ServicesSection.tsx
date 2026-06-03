"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-32 bg-black">
      <div className="max-w-[980px] mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          {t.services.label}
        </p>
        <h2 className="mb-6 text-[56px] md:text-[72px] font-bold leading-[1.04] tracking-[-0.025em] text-white">
          {t.services.headline1}
          <br />
          <span className="text-[#6e6e73]">{t.services.headline2}</span>
        </h2>
        <p className="text-[19px] text-[#6e6e73] max-w-[500px] mb-20">
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
              <p className="text-[15px] text-[#a1a1a6] leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
