const skillGroups = [
  {
    category: "Frontend",
    color: "#0071e3",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 80 },
    ],
  },
  {
    category: "Backend",
    color: "#34c759",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "Supabase", level: 80 },
    ],
  },
  {
    category: "Eszközök & Egyéb",
    color: "#bf5af2",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "AWS / Vercel", level: 80 },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 bg-[#1d1d1f]">
      <div className="max-w-[980px] mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          Képességek
        </p>
        <h2
          className="mb-6 text-[56px] md:text-[72px] font-bold leading-[1.04] tracking-[-0.025em] text-white"
        >
          A technológiai
          <br />
          <span className="text-[#6e6e73]">eszköztáram.</span>
        </h2>
        <p className="text-[19px] text-[#6e6e73] max-w-[500px] mb-20">
          Elsősorban a modern web ökoszisztémában dolgozom, de nem ijedek
          meg az ismeretlen technológiáktól sem.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3
                className="text-[13px] uppercase tracking-[0.12em] font-semibold mb-8"
                style={{ color: group.color }}
              >
                {group.category}
              </h3>
              <div className="flex flex-col gap-6">
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[15px] text-[#f5f5f7] font-medium">
                        {skill.name}
                      </span>
                      <span
                        className="text-[13px] font-semibold"
                        style={{ color: group.color }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1 bg-[#3a3a3c] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${group.color}90, ${group.color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech pill row */}
        <div className="mt-20 flex flex-wrap gap-2">
          {[
            "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js",
            "PostgreSQL", "Supabase", "AWS", "Vercel",
            "Figma", "Git",
          ].map((tech) => (
            <span
              key={tech}
              className="text-[13px] text-[#98989d] border border-[#3a3a3c] hover:border-[#6e6e73] hover:text-[#f5f5f7] rounded-full px-3 py-1.5 transition-colors duration-200 cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
