import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-[480px]">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          404
        </p>
        <h1 className="text-[40px] font-bold tracking-tight text-[#1d1d1f] leading-[1.1] mb-6">
          Az oldal nem található.
          <br />
          <span className="text-[#6e6e73]">Page not found.</span>
        </h1>
        <div className="flex gap-6 justify-center text-[15px] font-medium">
          <Link href="/" hrefLang="hu" className="text-[#0071e3] hover:underline">
            ← Főoldal
          </Link>
          <Link href="/en" hrefLang="en" className="text-[#0071e3] hover:underline">
            ← Home
          </Link>
        </div>
      </div>
    </main>
  );
}
