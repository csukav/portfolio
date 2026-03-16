"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/context/LanguageContext";

const ParticlesBackground = dynamic(
  () => import("@/components/ParticlesBackground"),
  { ssr: false }
);

export default function ContactSection() {
  const { t } = useLanguage();
  const f = t.contact.form;

  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error");

      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError(f.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-[#f5f5f7] overflow-hidden">
      <ParticlesBackground id="tsparticles-contact" />
      <div className="relative z-10 max-w-[980px] mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          {t.contact.label}
        </p>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <h2 className="section-headline mb-6">
              {t.contact.headline1}
              <br />
              {t.contact.headline2}
            </h2>
            <p className="section-subheadline mb-10">
              {t.contact.subheadline}
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Email",
                  value: "csukav@gmail.com",
                  href: "mailto:csukav@gmail.com",
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/csukaviktor",
                  href: "https://linkedin.com/in/csukaviktor",
                },
                {
                  label: "GitHub",
                  value: "github.com/csukav",
                  href: "https://github.com/csukav",
                },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span className="text-[11px] uppercase tracking-widest text-[#6e6e73] font-medium">
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    className="text-[17px] text-[#0071e3] hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl p-10 shadow-sm">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <div className="text-5xl">✅</div>
                <p className="text-[22px] font-semibold text-[#1d1d1f] text-center">
                  {f.successTitle}
                </p>
                <p className="text-[15px] text-[#6e6e73] text-center">
                  {f.successBody}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-[#0071e3] text-[15px] hover:underline"
                >
                  {f.newMessage}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1d1d1f]">
                    {f.nameLabel}
                  </label>
                  <Input
                    placeholder={f.namePlaceholder}
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    className="rounded-xl border-[#d2d2d7] bg-[#f5f5f7] focus-visible:ring-[#0071e3] text-[15px] py-3 px-4 h-auto"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1d1d1f]">
                    {f.emailLabel}
                  </label>
                  <Input
                    type="email"
                    placeholder={f.emailPlaceholder}
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                    required
                    className="rounded-xl border-[#d2d2d7] bg-[#f5f5f7] focus-visible:ring-[#0071e3] text-[15px] py-3 px-4 h-auto"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1d1d1f]">
                    {f.messageLabel}
                  </label>
                  <Textarea
                    placeholder={f.messagePlaceholder}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, message: e.target.value }))
                    }
                    required
                    rows={5}
                    className="rounded-xl border-[#d2d2d7] bg-[#f5f5f7] focus-visible:ring-[#0071e3] text-[15px] px-4 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full bg-[#0071e3] text-white text-[17px] font-normal py-3.5 rounded-full hover:bg-[#0077ed] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading ? f.sending : f.submit}
                </button>
                {error && (
                  <p className="text-red-500 text-[13px] text-center">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
