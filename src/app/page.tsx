import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import dynamic from 'next/dynamic'
const ServicesSection = dynamic(() => import('@/components/ServicesSection'))
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'))
const FAQSection = dynamic(() => import('@/components/FAQSection'))
const TrustSection = dynamic(() => import('@/components/TrustSection'))
const PromotionsSection = dynamic(() => import('@/components/PromotionsSection'))
const ContactSection = dynamic(() => import('@/components/ContactSection'))
const RepairCalculator = dynamic(() => import('@/components/RepairCalculator'))
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
          <div className="cv-auto"><ServicesSection /></div>
          <div className="cv-auto"><RepairCalculator /></div>
          <div className="cv-auto"><TestimonialsSection /></div>
          <div className="cv-auto"><FAQSection /></div>
          <div className="cv-auto"><TrustSection /></div>
          <div className="cv-auto"><PromotionsSection /></div>
          <div className="cv-auto"><Suspense fallback={null}><ContactSection /></Suspense></div>
        </div>
      </main>
      <Footer />
    </>
  )
} 
