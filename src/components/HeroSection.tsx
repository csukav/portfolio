"use client";

import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";
import { useLanguage } from "@/context/LanguageContext";

const ParticlesBackground = dynamic(
  () => import("@/components/ParticlesBackground"),
  { ssr: false }
);

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-white px-6">
      {/* Interactive particle canvas */}
      <ParticlesBackground />

      {/* Subtle background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,113,227,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[780px] mx-auto animate-fade-up">
        <Badge
          variant="secondary"
          className="mb-6 px-3 py-1 text-[13px] font-medium bg-[#f5f5f7] text-[#6e6e73] border-0 rounded-full"
        >
          {t.hero.badge}
        </Badge>

        <h1 className="text-[56px] md:text-[80px] font-bold leading-[1.04] tracking-[-0.025em] text-[#1d1d1f] mb-6">
          {t.hero.headline1}{" "}
          <span className="apple-blue-gradient-text">{t.hero.headline2}</span>
        </h1>

        <p className="text-[19px] md:text-[21px] leading-[1.5] text-[#6e6e73] font-light max-w-[580px] mx-auto mb-10">
          {t.hero.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center bg-[#0071e3] text-white text-[17px] font-normal px-6 py-3.5 rounded-full hover:bg-[#0077ed] transition-all duration-200 hover:scale-[1.02]"
          >
            {t.hero.cta1}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center text-[#0071e3] text-[17px] font-normal px-6 py-3.5 rounded-full border border-[#0071e3]/30 hover:bg-[#f5f5f7] transition-all duration-200 hover:scale-[1.02]"
          >
            {t.hero.cta2}
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[11px] tracking-widest uppercase text-[#6e6e73]">
          {t.hero.scroll}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#6e6e73] to-transparent" />
      </div>
    </section>
  );
}
