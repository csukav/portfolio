import type { Translations } from "@/lib/translations";

export default function ProcessSection({ t }: { t: Translations }) {
  const { process } = t;

  return (
    <section aria-labelledby="process-heading" className="max-w-310 mx-auto px-4 sm:px-6 py-16 md:py-18">
      <p className="eyebrow mb-3">{process.eyebrow}</p>
      <h2 id="process-heading" className="section-title">
        {process.h2}
      </h2>
      <ol className="mt-10 md:mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {process.steps.map((step, i) => (
          <li key={step.h3} className="border-t-2 border-ink pt-5">
            <p className="font-mono text-sm text-ink-soft">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-2.5 mb-2 text-xl font-semibold">{step.h3}</h3>
            <p className="text-base leading-relaxed text-ink-soft">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
