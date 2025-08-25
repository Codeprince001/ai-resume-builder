import React from 'react'
import Hero from '../Hero'
import ToolsGrid from '../ToolsGrid'
import HowItWorksSection from '../Work'
import TestimonialCarousel from '../Testimonial'
import { GetItOnMobile } from '../MobileApp'
import Pricing from '../Pricing'
import { FAQSection } from '../FAQ'

const Landingpage = () => {
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
  )
}

export default Landingpage