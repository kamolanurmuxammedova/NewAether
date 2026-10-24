import { HeroSection } from "@/components/landing/HeroSection";
import { StatementSection } from "@/components/landing/StatementSection";
import { AnimatedStatsSection } from "@/components/landing/AnimatedStatsSection";
import { HowItWorksAnimated } from "@/components/landing/HowItWorksAnimated";
import { ScrollJourneySection } from "@/components/landing/ScrollJourneySection";
import { PricingCalculatorSection } from "@/components/landing/PricingCalculatorSection";
import { WaybillSection } from "@/components/landing/WaybillSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { BusinessSection } from "@/components/landing/BusinessSection";
import { CourierAdvantagesSection } from "@/components/landing/CourierAdvantagesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { DownloadAppSection } from "@/components/landing/DownloadAppSection";
import { PartnersSection } from "@/components/landing/PartnersSection";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Live Interactive City Radar Hero */}
      <HeroSection />

      {/* 2. Bold Apple-style statement */}
      <StatementSection />

      {/* 3. Animated count-up stats */}
      <AnimatedStatsSection />

      {/* 4. How it works — animated steps */}
      <HowItWorksAnimated />

      {/* 5. Interactive Scroll Journey */}
      <ScrollJourneySection />

      {/* 6. Neal.fun Pricing Calculator */}
      <PricingCalculatorSection />

      {/* 7. Waybill Aesthetic Studio */}
      <WaybillSection />

      {/* 8. Cargo Categories */}
      <CategoriesSection />

      {/* 9. Corporate & Enterprise */}
      <BusinessSection />

      {/* 10. Courier Ecosystem */}
      <CourierAdvantagesSection />

      {/* 11. Testimonials */}
      <TestimonialsSection />

      {/* 12. FAQ */}
      <FaqSection />

      {/* 13. Mobile App & Partners */}
      <DownloadAppSection />
      <PartnersSection />
    </div>
  );
}
