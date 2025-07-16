'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Eye, Phone } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen bg-neutral-900 flex items-center">
      <div className="container mx-auto container-padding py-32 pt-32 md:pt-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* 認證標章 */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="inline-flex items-center bg-accent-500 px-8 py-3 flat-button">
              <Shield className="w-5 h-5 text-white mr-3" />
              <span className="text-white text-sm font-medium tracking-wide">Apple IRP 獨立維修提供商認證</span>
            </div>
          </motion.div>

          {/* 主標題 */}
          <motion.h1 
            className="text-white mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              FixMaster
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl font-medium text-accent-500 mb-6">
              維修大師 士林店
            </span>
            <span className="block text-lg sm:text-xl md:text-2xl font-normal text-neutral-300">
              Apple 原廠授權維修中心
            </span>
          </motion.h1>

          {/* 副標題 */}
          <motion.p 
            className="text-neutral-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed px-4 md:px-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="block md:inline">現場維修透明錄影 • 原廠零件保證 • 90天安心保固</span>
            <br />
            <span className="text-white font-medium">快速專業 • 價格透明 • 品質保證</span>
          </motion.p>

          {/* 特色亮點 */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="bg-white p-6 md:p-8 flat-card text-center">
              <Clock className="w-8 h-8 md:w-10 md:h-10 text-neutral-900 mx-auto mb-3 md:mb-4" />
              <h3 className="text-neutral-900 font-semibold mb-2 text-base md:text-lg">30分鐘快速完修</h3>
              <p className="text-neutral-600 text-sm">現場等候即可完成</p>
            </div>
            <div className="bg-white p-6 md:p-8 flat-card text-center">
              <Eye className="w-8 h-8 md:w-10 md:h-10 text-neutral-900 mx-auto mb-3 md:mb-4" />
              <h3 className="text-neutral-900 font-semibold mb-2 text-base md:text-lg">全程透明錄影</h3>
              <p className="text-neutral-600 text-sm">維修過程完整記錄</p>
            </div>
            <div className="bg-white p-6 md:p-8 flat-card text-center">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-neutral-900 mx-auto mb-3 md:mb-4" />
              <h3 className="text-neutral-900 font-semibold mb-2 text-base md:text-lg">原廠零件保證</h3>
              <p className="text-neutral-600 text-sm">Apple IRP 認證品質</p>
            </div>
          </motion.div>

          {/* CTA 按鈕 */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <button 
              className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-white px-8 sm:px-12 py-4 flat-button font-semibold text-base sm:text-lg tracking-wide"
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  const rect = contactSection.getBoundingClientRect()
                  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                  const navbarHeight = window.innerWidth >= 768 ? 80 : 64
                  const targetPosition = rect.top + scrollTop - navbarHeight - 20
                  
                  window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                  })
                }
              }}
            >
              立即預約維修
            </button>
            
            <button 
              className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 px-8 sm:px-12 py-4 flat-button font-semibold text-base sm:text-lg tracking-wide"
              onClick={() => {
                const servicesSection = document.getElementById('services')
                if (servicesSection) {
                  const rect = servicesSection.getBoundingClientRect()
                  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                  const navbarHeight = window.innerWidth >= 768 ? 80 : 64
                  const targetPosition = rect.top + scrollTop - navbarHeight - 20
                  
                  window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                  })
                }
              }}
            >
              查看二手機
            </button>
          </motion.div>

          {/* 聯絡資訊 */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <a 
              href="tel:+886-2-2816-6666" 
              className="inline-flex items-center text-neutral-300 hover:text-white transition-colors duration-200"
            >
              <Phone className="w-5 h-5 mr-3" />
              <span className="text-lg font-medium">02-2816-6666</span>
            </a>
            <p className="text-neutral-400 text-sm mt-3">台北市士林區文林路60號</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 