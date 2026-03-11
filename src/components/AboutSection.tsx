import { Separator } from "@/components/ui/separator";

const stats = [
  { value: "2+", label: "Év tapasztalat" },
  { value: "10+", label: "Projekt leszállítva" },
  { value: "10+", label: "Elégedett ügyfél" },
  { value: "∞", label: "Kávé elfogyasztva" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 bg-[#f5f5f7]">
      <div className="max-w-[980px] mx-auto px-6">
        {/* Section label */}
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          Rólam
        </p>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <h2 className="section-headline mb-6">
              Szenvedéllyel, precizitással.
            </h2>
            <p className="section-subheadline mb-6">
              Full-stack fejlesztőként hiszek abban, hogy a legjobb szoftver
              ott születik, ahol a technikai kiválóság találkozik az esztétikai
              érzékenységgel.
            </p>
            <p className="text-[17px] text-[#6e6e73] leading-[1.7]">
              React, Next.js, TypeScript és Node.js eszközökkel dolgozom nap
              mint nap. Szeretem a tiszta kódot, az átgondolt UI-t és az olyan
              megoldásokat, amelyek valóban megoldanak egy problémát — nem csak
              komplikálják azt.
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
          {[
            {
              icon: "◈",
              title: "Tiszta kód",
              desc: "Olvasható, karbantartható és jól dokumentált. A kódom holnap is érthető legyen.",
            },
            {
              icon: "◎",
              title: "Teljesítmény",
              desc: "Milliszekundumok számítanak. Minden projektet optimalizálva szállítok.",
            },
            {
              icon: "◉",
              title: "Részletek",
              desc: "Az ördög a részletekben lakik — és a kiváló felhasználói élmény is.",
            },
          ].map((item) => (
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
