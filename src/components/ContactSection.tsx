"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { EMAIL, PHONE, PHONE_DISPLAY } from "@/lib/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const inputClass =
  "w-full rounded-lg border border-line-strong bg-white px-3.5 text-base text-ink placeholder:text-ink-soft/70 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-1";

export default function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;
  const f = c.form;

  const [form, setForm] = useState({ name: "", email: "", topic: f.topics[0] as string, message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          // The API takes a plain message; the topic goes in its first line.
          message: `${f.topicLabel} ${form.topic}\n\n${form.message}`,
        }),
      });

      if (!res.ok) throw new Error("Error");

      // Google Ads "Ajánlatkérés – űrlap" conversion - only after the message was actually sent
      window.gtag?.("event", "conversion", {
        send_to: "AW-18115939358/IJqwCPyorKEdEJ6Yrb5D",
      });
      // GA4 lead event
      window.gtag?.("event", "generate_lead");

      setSent(true);
      setForm({ name: "", email: "", topic: f.topics[0], message: "" });
    } catch {
      setError(f.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-heading" className="max-w-310 mx-auto px-4 sm:px-6 pt-16 pb-20 md:pt-18 md:pb-26 scroll-mt-16">
      <div className="bg-white border border-line rounded-[20px] p-6 sm:p-8 md:p-12 flex flex-wrap gap-10 md:gap-14">
        <div className="flex-[1_1_320px] min-w-0">
          <p className="eyebrow mb-3">{c.eyebrow}</p>
          <h2 id="contact-heading" className="section-title">
            {c.h2}
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-ink-soft">{c.text}</p>
          <dl className="mt-9 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3.5 text-base">
            <dt className="font-mono text-sm text-ink-soft pt-0.5">{c.phoneLabel}</dt>
            <dd>
              <a href={`tel:${PHONE}`} className="text-brand hover:text-brand-dark font-medium">
                {PHONE_DISPLAY}
              </a>
            </dd>
            <dt className="font-mono text-sm text-ink-soft pt-0.5">{c.emailLabel}</dt>
            <dd>
              <a href={`mailto:${EMAIL}`} className="text-brand hover:text-brand-dark font-medium break-all">
                {EMAIL}
              </a>
            </dd>
            <dt className="font-mono text-sm text-ink-soft pt-0.5">{c.areaLabel}</dt>
            <dd>{c.area}</dd>
          </dl>
        </div>

        <div className="flex-[1_1_420px] min-w-0">
          {sent ? (
            <div role="status" className="h-full min-h-64 flex flex-col items-start justify-center gap-3">
              <span className="size-12 rounded-full bg-brand-tint flex items-center justify-center text-brand">
                <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L20 7" />
                </svg>
              </span>
              <p className="text-[22px] font-semibold">{f.successTitle}</p>
              <p className="text-base text-ink-soft">{f.successBody}</p>
              <button type="button" onClick={() => setSent(false)} className="mt-2 font-medium text-brand hover:text-brand-dark">
                {f.newMessage}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
              <div className="grid sm:grid-cols-2 gap-4.5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-name" className="text-[15px] font-medium">
                    {f.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    placeholder={f.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                    className={`${inputClass} h-12`}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-[15px] font-medium">
                    {f.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder={f.emailPlaceholder}
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    required
                    className={`${inputClass} h-12`}
                  />
                </div>
              </div>

              <fieldset>
                <legend className="text-[15px] font-medium mb-2.5">{f.topicLabel}</legend>
                <div className="flex flex-wrap gap-2">
                  {f.topics.map((topic) => (
                    <label
                      key={topic}
                      className="inline-flex items-center gap-2 min-h-11 px-4 rounded-full border border-line-strong text-[15px] cursor-pointer has-checked:border-brand has-checked:bg-brand-tint has-focus-visible:outline-2 has-focus-visible:outline-brand"
                    >
                      <input
                        type="radio"
                        name="topic"
                        value={topic}
                        checked={form.topic === topic}
                        onChange={() => setForm((prev) => ({ ...prev, topic }))}
                        className="accent-brand"
                      />
                      {topic}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-message" className="text-[15px] font-medium">
                  {f.messageLabel}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder={f.messagePlaceholder}
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  required
                  rows={4}
                  className={`${inputClass} py-3 resize-y`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="self-start inline-flex items-center justify-center min-h-13 px-7 rounded-[10px] bg-brand text-white text-[17px] font-medium hover:bg-brand-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? f.sending : f.submit}
              </button>
              {error && (
                <p role="alert" className="text-[15px] text-red-700">
                  {error}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
