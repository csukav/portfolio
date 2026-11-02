import Image from "next/image";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import type { Translations } from "@/lib/translations";

export default function AboutSection({ t }: { t: Translations }) {
  const { about } = t;

  return (
    <section id="about" aria-labelledby="about-heading" className="max-w-310 mx-auto px-4 sm:px-6 py-16 md:py-18 scroll-mt-16">
      <div className="flex flex-wrap gap-10 md:gap-14 items-center">
        <div className="relative flex-[1_1_280px] max-w-60 sm:max-w-[440px] aspect-4/5 rounded-2xl overflow-hidden bg-ink">
          {about.photo ? (
            <Image src={about.photo} alt="Csuka Viktor" fill sizes="(min-width: 768px) 440px, 100vw" className="object-cover" />
          ) : (
            // Placeholder until a real portrait is added (homeHu.about.photo).
            <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-mono text-[96px] text-brand-bright">
              CV
            </div>
          )}
        </div>
        <div className="flex-[999_1_480px] min-w-0">
          <p className="eyebrow mb-3">{about.eyebrow}</p>
          <h2 id="about-heading" className="section-title">
            {about.h2}
          </h2>
          <p className="mt-6 text-lg leading-[1.65] text-ink-soft max-w-170">{about.text}</p>
          <div className="mt-7 flex flex-wrap gap-5 text-base font-medium">
            <a href={LINKEDIN_URL} target="_blank" rel="me noopener noreferrer" className="text-ink hover:text-brand">
              LinkedIn ↗
            </a>
            <a href={GITHUB_URL} target="_blank" rel="me noopener noreferrer" className="text-ink hover:text-brand">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
