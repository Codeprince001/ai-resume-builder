'use client';

import Hero from '@/components/Hero';
import { GetItOnMobile } from '@/components/MobileApp';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import TestimonialCarousel from '@/components/Testimonial';
import ToolsGrid from '@/components/ToolsGrid';
import HowItWorksSection from '@/components/Work';

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero/>

      <ToolsGrid/>

      <HowItWorksSection/>

      <TestimonialCarousel/>

      <GetItOnMobile/>

      <Pricing/>

      <main className="flex flex-1 px-6 py-12 gap-12 max-w-7xl mx-auto flex-col md:flex-row">
        {/* Add grid + tools content here */}
      </main>
    </div>
  );
}
