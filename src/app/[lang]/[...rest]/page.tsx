import { notFound } from "next/navigation";

// Every unknown URL is rewritten under /[lang] by the proxy; route it to
// [lang]/not-found.tsx so it gets the localized layout and a real 404.
export default function CatchAll() {
  notFound();
}
