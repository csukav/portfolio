"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useLanguage } from "@/context/LanguageContext";

// `link: null` → no public demo or repo; the card is rendered without a link.
const projectsMeta: {
  title: string;
  tags: string[];
  color: string;
  lightColor: string;
  number: string;
  emoji?: string;
  link: string | null;
  preview: boolean;
}[] = [
  {
    title: "E-Commerce Platform",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    color: "#0071e3",
    lightColor: "#e8f1fb",
    number: "01",
    emoji: "🛒",
    link: "https://www.hoodini.hu/",
    preview: true,
  },
  {
    title: "Spotify Clone",
    tags: ["Next.js", "Supabase", "Stripe", "Tailwind"],
    color: "#ff9f0a",
    lightColor: "#fff3e0",
    number: "02",
    link: "https://csukaviktor.vercel.app/",
    preview: true,
  },
  {
    title: "közös – Közösségi események",
    tags: ["Next.js", "TypeScript", "Vercel"],
    color: "#34c759",
    lightColor: "#e9f8ee",
    number: "03",
    emoji: "🤝",
    link: "https://kozoselmeny.vercel.app/",
    preview: true,
  },
];

/** Screenshot of the linked site's homepage, rendered by Microlink. */
function screenshotUrl(link: string) {
  const params = new URLSearchParams({
    url: link,
    screenshot: "true",
    "screenshot.type": "jpeg",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": "1280",
    "viewport.height": "800",
  });
  return `https://api.microlink.io/?${params}`;
}

function ProjectPreview({
  link,
  alt,
  color,
  fallback,
  className,
}: {
  link: string;
  alt: string;
  color: string;
  fallback?: string;
  className: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`${className} rounded-2xl overflow-hidden flex items-center justify-center text-6xl`}
      style={{ background: `${color}22` }}
    >
      {failed ? (
        fallback
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={screenshotUrl(link)}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top"
        />
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();

  const projects = projectsMeta.map((meta, i) => ({
    ...meta,
    description: t.projects.items[i].description,
    alt: t.projects.items[i].alt,
  }));

  // With exactly two projects, show them side by side as equal cards
  // instead of one featured card plus a grid.
  const sideBySide = projects.length === 2;
  const featured = sideBySide ? null : projects[0];
  const gridProjects = sideBySide ? projects : projects.slice(1);
  // Two cards in the grid get the wider two-column layout.
  const twoColumnGrid = gridProjects.length === 2;

  return (
    <section
      id="projects"
      aria-label={t.nav.projects}
      className="relative py-32 bg-white overflow-hidden"
    >
      <ParticlesBackground id="tsparticles-projects" />
      <div className="relative z-10 max-w-245 mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          {t.projects.label}
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <h2 className="section-headline max-w-120">{t.projects.headline}</h2>
          <p className="section-subheadline max-w-[320px] text-right hidden md:block">
            {t.projects.subheadline}
          </p>
        </div>

        {/* Featured project (large) */}
        {featured && (
          <a
            href={featured.link!}
            target="_blank"
            rel="noopener noreferrer"
            className="apple-card p-10 mb-6 cursor-pointer block"
            style={{ background: featured.lightColor }}
          >
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="flex-1">
                <span
                  className="text-[11px] font-semibold tracking-widest uppercase mb-3 block"
                  style={{ color: featured.color }}
                >
                  {featured.number}
                </span>
                <h3 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-4">
                  {featured.title}
                </h3>
                <p className="text-[17px] text-[#6e6e73] leading-[1.6] mb-6">
                  {featured.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[13px] font-medium px-3 py-1 rounded-full border-0"
                      style={{
                        background: `${featured.color}18`,
                        color: featured.color,
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <ProjectPreview
                link={featured.link!}
                alt={featured.alt}
                color={featured.color}
                fallback={featured.emoji}
                className="w-full md:w-80 h-48 md:h-52 shrink-0"
              />
            </div>
          </a>
        )}

        {/* Other projects grid */}
        <div
          className={`grid gap-6 ${twoColumnGrid ? "md:grid-cols-2" : "md:grid-cols-3"}`}
        >
          {gridProjects.map((project) => {
            const Card = project.link ? "a" : "div";
            return (
              <Card
                key={project.number}
                {...(project.link && {
                  href: project.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={`apple-card p-8 block ${project.link ? "cursor-pointer" : ""}`}
                style={{ background: project.lightColor }}
              >
                {project.preview && project.link && (
                  <ProjectPreview
                    link={project.link}
                    alt={project.alt}
                    color={project.color}
                    fallback={project.emoji}
                    className={`w-full mb-6 ${twoColumnGrid ? "h-56" : "h-40"}`}
                  />
                )}
                <span
                  className="text-[11px] font-semibold tracking-widest uppercase mb-3 block"
                  style={{ color: project.color }}
                >
                  {project.number}
                </span>
                <h3 className="text-[22px] font-bold tracking-tight text-[#1d1d1f] mb-3">
                  {project.title}
                </h3>
                <p className="text-[15px] text-[#6e6e73] leading-[1.6] mb-5">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[12px] font-medium px-2.5 py-0.5 rounded-full border-0"
                      style={{
                        background: `${project.color}18`,
                        color: project.color,
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
