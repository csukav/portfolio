import Link from "next/link";
import type { Metadata } from "next";

// Own title instead of the homepage's; noindex is also added by Next.js automatically.
export const metadata: Metadata = {
  title: { absolute: "Az oldal nem található (404) | Csuka Viktor" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-[480px]">
        <p className="text-[13px] uppercase tracking-[0.12em] text-brand font-semibold mb-4">
          404
        </p>
        <h1 className="text-[40px] font-semibold tracking-tight text-ink leading-[1.1] mb-6">
          Az oldal nem található.
          <br />
          <span className="text-ink-soft">Page not found.</span>
        </h1>
        <div className="flex gap-6 justify-center text-[15px] font-medium">
          <Link href="/hu" hrefLang="hu" className="text-brand hover:underline">
            ← Főoldal
          </Link>
          <Link href="/en" hrefLang="en" className="text-brand hover:underline">
            ← Home
          </Link>
        </div>
      </div>
    </main>
  );
}
