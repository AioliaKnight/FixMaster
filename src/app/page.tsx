import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import TrustSection from '@/components/TrustSection'
import PromotionsSection from '@/components/PromotionsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ClientAnalytics from './tracking'
import { Suspense } from 'react'

export default function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <ClientAnalytics />
      </Suspense>
      <Navbar />
      <main className="bg-gradient-to-b from-white via-neutral-50 to-white">
        <HeroSection />
        <div className="space-y-24 md:space-y-32">
          <ServicesSection />
          <TestimonialsSection />
          <FAQSection />
          <TrustSection />
          <PromotionsSection />
          <Suspense fallback={null}>
            <ContactSection />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
} 
