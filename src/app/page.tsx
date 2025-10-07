import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import dynamic from 'next/dynamic'
const ServicesSection = dynamic(() => import('@/components/ServicesSection'))
const TestimonialsSection = dynamic(() => import('@/components/TestimonialsSection'))
const FAQSection = dynamic(() => import('@/components/FAQSection'))
const TrustSection = dynamic(() => import('@/components/TrustSection'))
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
        <div className="space-y-0">
          <div className="cv-auto section-bg-a"><ServicesSection /></div>
          <div className="cv-auto section-bg-b"><RepairCalculator /></div>
          <div className="cv-auto section-bg-a"><TestimonialsSection /></div>
          <div className="cv-auto section-bg-b"><FAQSection /></div>
          <div className="cv-auto section-bg-a"><TrustSection /></div>
          <div className="cv-auto section-bg-b"><Suspense fallback={null}><ContactSection /></Suspense></div>
        </div>
      </main>
      <Footer />
    </>
  )
} 
