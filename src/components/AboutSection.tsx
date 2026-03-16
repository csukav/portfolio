"use client";

import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const { stats, values } = t.about;

  return (
    <section id="about" className="py-32 bg-[#f5f5f7]">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Section label */}
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          {t.about.label}
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <h2 className="section-headline mb-6">
              {t.about.headline}
            </h2>
            <p className="section-subheadline mb-6">
              {t.about.subheadline}
            </p>
            <p className="text-[17px] text-[#6e6e73] leading-[1.7]">
              {t.about.body}
            </p>
          </div>

          {/* Right: stats */}
          <div className="grid grid-cols-2 gap-px bg-[#d2d2d7] rounded-2xl overflow-hidden">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-[#f5f5f7] hover:bg-white transition-colors duration-200 p-8 flex flex-col gap-1"
              >
                <span className="text-[48px] font-bold tracking-tight text-[#1d1d1f] leading-none">
                  {stat.value}
                </span>
                <span className="text-[15px] text-[#6e6e73]">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="mt-20 bg-[#d2d2d7]" />

        {/* Values row */}
        <div className="grid md:grid-cols-3 gap-12 pt-16">
          {values.map((item) => (
            <div key={item.title}>
              <div className="text-3xl mb-4 text-[#0071e3]">{item.icon}</div>
              <h3 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">
                {item.title}
              </h3>
              <p className="text-[15px] text-[#6e6e73] leading-[1.6]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
