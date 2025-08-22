import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import HowItWorksSection from "@/components/Work";
import TestimonialCarousel from "@/components/Testimonial";
import { GetItOnMobile } from "@/components/MobileApp";
import Pricing from "@/components/Pricing";
import { FAQSection } from "@/components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Hero />
      <ToolsGrid />
      <HowItWorksSection />
      <TestimonialCarousel />
      <GetItOnMobile />
      <Pricing />
      <FAQSection />
    </div>
  );
}
