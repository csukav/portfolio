import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhySection from "@/components/WhySection";
import ProjectsSection from "@/components/ProjectsSection";
import OfferSection from "@/components/OfferSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import BlogSection from "@/components/BlogSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/context/LanguageProvider";
import { isLocale, languageAlternates } from "@/lib/i18n";
import { translations } from "@/lib/translations";
import { homeHu } from "@/content/content-hu";
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
        <ServicesSection t={t} />
        <WhySection t={t} />
        <ProjectsSection t={t} />
        <OfferSection t={t} />
        <ProcessSection t={t} />
        <AboutSection t={t} />
        <BlogSection t={t} locale={lang} />
        {lang === "hu" ? <FaqSection faq={homeHu.faq} title={t.faqTitle} /> : null}
        <ContactSection />
      </main>
      <Footer locale={lang} />
      <MobileCtaBar t={t} />
      <Analytics />
      <SpeedInsights />
    </LanguageProvider>
  );
}
