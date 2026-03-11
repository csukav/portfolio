"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ParticlesBackground = dynamic(
  () => import("@/components/ParticlesBackground"),
  { ssr: false }
);

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your backend / email service
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-32 bg-[#f5f5f7] overflow-hidden">
      <ParticlesBackground id="tsparticles-contact" />
      <div className="relative z-10 max-w-[980px] mx-auto px-6">
        <p className="text-[13px] uppercase tracking-[0.12em] text-[#0071e3] font-semibold mb-4">
          Kapcsolat
        </p>

        <div className="grid md:grid-cols-2 gap-20 items-start">
          {/* Left */}
          <div>
            <h2 className="section-headline mb-6">
              Kezdjük el
              <br />
              együtt.
            </h2>
            <p className="section-subheadline mb-10">
              Legyen szó új projektről, együttműközésről vagy csak egy kávés
              csevejről — szívesen hallom tőled.
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Email",
                  value: "hello@pelda.hu",
                  href: "mailto:hello@pelda.hu",
                },
                {
                  label: "LinkedIn",
                  value: "linkedin.com/in/nevem",
                  href: "https://linkedin.com",
                },
                {
                  label: "GitHub",
                  value: "github.com/nevem",
                  href: "https://github.com",
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
                  Üzenet elküldve!
                </p>
                <p className="text-[15px] text-[#6e6e73] text-center">
                  Hamarosan visszajelzek.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 text-[#0071e3] text-[15px] hover:underline"
                >
                  Új üzenet küldése
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1d1d1f]">
                    Neved
                  </label>
                  <Input
                    placeholder="Kis Péter"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    className="rounded-xl border-[#d2d2d7] bg-[#f5f5f7] focus-visible:ring-[#0071e3] text-[15px] py-3 px-4 h-auto"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1d1d1f]">
                    Email cím
                  </label>
                  <Input
                    type="email"
                    placeholder="kis.peter@email.hu"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                    className="rounded-xl border-[#d2d2d7] bg-[#f5f5f7] focus-visible:ring-[#0071e3] text-[15px] py-3 px-4 h-auto"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-medium text-[#1d1d1f]">
                    Üzenet
                  </label>
                  <Textarea
                    placeholder="Szia! Szeretnék veled dolgozni..."
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    required
                    rows={5}
                    className="rounded-xl border-[#d2d2d7] bg-[#f5f5f7] focus-visible:ring-[#0071e3] text-[15px] px-4 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="mt-2 w-full bg-[#0071e3] text-white text-[17px] font-normal py-3.5 rounded-full hover:bg-[#0077ed] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                >
                  Üzenet küldése
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
