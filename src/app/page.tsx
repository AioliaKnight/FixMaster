import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import TrustSection from '@/components/TrustSection'
import PromotionsSection from '@/components/PromotionsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <TrustSection />
        <PromotionsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
} 