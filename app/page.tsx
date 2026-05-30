import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { PromoMarquee } from "@/components/landing/promo-marquee";
import { AboutSection } from "@/components/landing/about-section";
import { CoachingSection } from "@/components/landing/coaching-section";
import { MotivationSection } from "@/components/landing/motivation-section";
import { LegalSection } from "@/components/landing/legal-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <Navigation />
      <HeroSection />
      <PromoMarquee />
      <AboutSection />
      <CoachingSection />
      <MotivationSection />
      <LegalSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
