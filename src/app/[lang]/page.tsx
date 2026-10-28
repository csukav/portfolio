import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/context/LanguageProvider";
import { isLocale, languageAlternates } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { alternates: languageAlternates(lang, "/") };
}

export default async function Home({ params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = translations[lang];

  return (
    <LanguageProvider initialLocale={lang}>
      <Navbar />
      <main>
        <HeroSection t={t} />
        <AboutSection t={t} />
        <ProjectsSection t={t} />
        <SkillsSection t={t} />
        <ServicesSection t={t} locale={lang} />
        <BlogSection t={t} locale={lang} />
        <ContactSection />
      </main>
      <Footer locale={lang} />
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
}
