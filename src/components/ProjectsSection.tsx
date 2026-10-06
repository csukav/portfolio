"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useLanguage } from "@/context/LanguageContext";

const projectsMeta = [
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
    title: "SaaS Dashboard",
    tags: ["React", "D3.js", "Node.js", "PostgreSQL"],
    color: "#34c759",
    lightColor: "#eaf8ec",
    number: "02",
    link: "https://github.com",
    preview: false,
  },
  {
    title: "Spotify Clone",
    tags: ["Next.js", "OpenAI", "Redis", "Tailwind"],
    color: "#ff9f0a",
    lightColor: "#fff3e0",
    number: "03",
    link: "https://github.com/csukav/spotify-clone-master",
    preview: true,
  },
  {
    title: "Mobile Companion App",
    tags: ["React Native", "Expo", "SQLite", "Redux"],
    color: "#bf5af2",
    lightColor: "#f5eeff",
    number: "04",
    link: "https://github.com",
    preview: false,
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
  title,
  color,
  fallback,
  className,
}: {
  link: string;
  title: string;
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
          alt={`${title} preview`}
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
  }));

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
          <h2 className="section-headline max-w-120">
            {t.projects.headline}
          </h2>
          <p className="section-subheadline max-w-[320px] text-right hidden md:block">
            {t.projects.subheadline}
          </p>
        </div>

        {/* Featured project (large) */}
        <a
          href={projects[0].link}
          target="_blank"
          rel="noopener noreferrer"
          className="apple-card p-10 mb-6 cursor-pointer block"
          style={{ background: projects[0].lightColor }}
        >
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="flex-1">
              <span
                className="text-[11px] font-semibold tracking-widest uppercase mb-3 block"
                style={{ color: projects[0].color }}
              >
                {projects[0].number}
              </span>
              <h3 className="text-[32px] font-bold tracking-tight text-[#1d1d1f] mb-4">
                {projects[0].title}
              </h3>
              <p className="text-[17px] text-[#6e6e73] leading-[1.6] mb-6">
                {projects[0].description}
              </p>
              <div className="flex flex-wrap gap-2">
                {projects[0].tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-[13px] font-medium px-3 py-1 rounded-full border-0"
                    style={{
                      background: `${projects[0].color}18`,
                      color: projects[0].color,
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <ProjectPreview
              link={projects[0].link}
              title={projects[0].title}
              color={projects[0].color}
              fallback={projects[0].emoji}
              className="w-full md:w-80 h-48 md:h-52 shrink-0"
            />
          </div>
        </a>

        {/* Other projects grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.slice(1).map((project) => (
            <a
              key={project.number}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="apple-card p-8 cursor-pointer block"
              style={{ background: project.lightColor }}
            >
              {project.preview && (
                <ProjectPreview
                  link={project.link}
                  title={project.title}
                  color={project.color}
                  className="w-full h-40 mb-6"
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
