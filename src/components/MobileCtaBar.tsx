import { PHONE } from "@/lib/site";
import type { Translations } from "@/lib/translations";

/** Fixed call / quote buttons at the bottom of the screen on phones. */
export default function MobileCtaBar({
  t,
  contactHref = "#contact",
}: {
  t: Translations;
  contactHref?: string;
}) {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] grid grid-cols-2 gap-2.5">
      <a
        href={`tel:${PHONE}`}
        className="flex items-center justify-center gap-2 min-h-12 rounded-[10px] border border-line-strong text-ink font-medium"
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
        {t.nav.call}
      </a>
      <a
        href={contactHref}
        className="flex items-center justify-center min-h-12 rounded-[10px] bg-brand text-white font-medium"
      >
        {t.nav.quote}
      </a>
    </div>
  );
}
