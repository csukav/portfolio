import Image from "next/image";
import type { Translations } from "@/lib/translations";

export default function ProjectsSection({ t }: { t: Translations }) {
  const { projects } = t;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="max-w-310 mx-auto px-4 sm:px-6 pt-20 md:pt-26 pb-12 scroll-mt-16">
      <p className="eyebrow mb-3">{projects.eyebrow}</p>
      <h2 id="projects-heading" className="section-title">
        {projects.h2}
      </h2>

      <div className="mt-10 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.items.map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-line rounded-2xl overflow-hidden flex flex-col hover:border-line-strong transition-colors"
          >
            <div className="relative aspect-16/10 bg-placeholder">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-6 flex flex-col gap-2.5 flex-1">
              <span className="self-start font-mono text-xs text-ink-soft border border-line-strong px-2 py-0.5 rounded-md">
                {p.tag}
              </span>
              <h3 className="text-[22px] font-semibold tracking-[-0.01em] group-hover:text-brand transition-colors">
                {p.title}
              </h3>
              <p className="text-base leading-normal text-ink-soft">{p.text}</p>
              <p className="mt-auto pt-1.5 font-mono text-[13px] text-ink-soft">{p.tags.join(" · ")}</p>
            </div>
          </a>
        ))}

        <a
          href="#contact"
          className="border-[1.5px] border-dashed border-night-muted rounded-2xl p-8 flex flex-col justify-center gap-3.5 min-h-80 hover:border-brand transition-colors"
        >
          <span className="font-mono text-[13px] text-brand">{projects.next.tag}</span>
          <span className="text-[26px] font-semibold tracking-[-0.02em] leading-tight">{projects.next.h3}</span>
          <span className="text-base leading-normal text-ink-soft">{projects.next.text}</span>
          <span className="font-medium text-brand">{projects.next.link}</span>
        </a>
      </div>
    </section>
  );
}
