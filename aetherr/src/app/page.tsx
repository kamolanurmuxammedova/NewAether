import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { PopularDeliveriesSection } from "@/components/landing/PopularDeliveriesSection";
import { BusinessSection } from "@/components/landing/BusinessSection";
import { CourierAdvantagesSection } from "@/components/landing/CourierAdvantagesSection";
import { PricingCalculatorSection } from "@/components/landing/PricingCalculatorSection";
import { LivePreviewSection } from "@/components/landing/LivePreviewSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { DownloadAppSection } from "@/components/landing/DownloadAppSection";
import { PartnersSection } from "@/components/landing/PartnersSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <HowItWorksSection />
      <CategoriesSection />
      <PopularDeliveriesSection />
      <LivePreviewSection />
      <BusinessSection />
      <CourierAdvantagesSection />
      <PricingCalculatorSection />
      <TestimonialsSection />
      <StatsSection />
      <FaqSection />
      <DownloadAppSection />
      <PartnersSection />
    </div>
  );
}
