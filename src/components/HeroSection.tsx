'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Eye, Phone } from 'lucide-react'

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen bg-neutral-900 flex items-center relative overflow-hidden">
      <div className="container mx-auto container-padding py-32 pt-32 md:pt-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左側內容區 */}
            <div className="text-center lg:text-left">
              {/* 認證標章 */}
              <motion.div 
                className="mb-8 lg:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center bg-accent-500 px-6 md:px-8 py-3 flat-button">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-white mr-2 md:mr-3" />
                  <span className="text-white text-xs md:text-sm font-medium tracking-wide">Apple IRP 獨立維修提供商認證</span>
                </div>
              </motion.div>

              {/* 主標題 */}
              <motion.h1 
                className="text-white mb-8 lg:mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4">
                  FixMaster
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-accent-500 mb-4 lg:mb-6">
                  維修大師 士林店
                </span>
                <span className="block text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-neutral-300">
                  Apple 原廠授權維修中心
                </span>
              </motion.h1>

              {/* 副標題 */}
              <motion.p 
                className="text-neutral-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 lg:mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <span className="block">我們知道手機對你很重要，交給我們，安心也要看得見。</span>
                <br className="hidden sm:block" />
                <span className="block mt-2 sm:mt-0">現場透明錄影｜原廠零件｜90 天安心保固｜士林在地最快 30 分鐘完修</span>
              </motion.p>

              {/* 特色亮點 */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 flat-card text-center lg:text-left">
                  <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-accent-500 mx-auto lg:mx-0 mb-2 lg:mb-3" />
                  <h3 className="text-white font-semibold mb-1 lg:mb-2 text-sm lg:text-base">最快 30 分鐘快速完修</h3>
                  <p className="text-neutral-300 text-xs lg:text-sm">現場等候即可，少等一分鐘，多一分安心</p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 flat-card text-center lg:text-left">
                  <Eye className="w-6 h-6 lg:w-8 lg:h-8 text-accent-500 mx-auto lg:mx-0 mb-2 lg:mb-3" />
                  <h3 className="text-white font-semibold mb-1 lg:mb-2 text-sm lg:text-base">全程透明錄影</h3>
                  <p className="text-neutral-300 text-xs lg:text-sm">每一步都清楚可見，放心跟著看</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-4 lg:p-6 flat-card text-center lg:text-left">
                  <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-accent-500 mx-auto lg:mx-0 mb-2 lg:mb-3" />
                  <h3 className="text-white font-semibold mb-1 lg:mb-2 text-sm lg:text-base">原廠零件保證</h3>
                  <p className="text-neutral-300 text-xs lg:text-sm">Apple IRP 認證技師親自服務</p>
                </div>
              </motion.div>

              {/* CTA 按鈕 */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <button 
                  className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-white px-8 lg:px-12 py-3 lg:py-4 flat-button font-semibold text-base lg:text-lg tracking-wide transition-colors duration-200"
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
                  🔧 立即預約維修
                </button>
                
                <button 
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 lg:px-12 py-3 lg:py-4 flat-button font-semibold text-base lg:text-lg tracking-wide transition-all duration-200"
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
                  📱 精選二手 iPhone
                </button>
              </motion.div>

              {/* 聯絡資訊 */}
              <motion.div 
                className="text-center lg:text-left mt-8 lg:mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
              >
                <a 
                  href="tel:+886-2-2816-6666" 
                  className="inline-flex items-center text-neutral-300 hover:text-white transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
                  <span className="text-base lg:text-lg font-medium">02-2816-6666</span>
                </a>
                <p className="text-neutral-400 text-sm lg:text-base mt-2 lg:mt-3">台北市士林區文林路60號</p>
              </motion.div>
            </div>

            {/* 右側圖片區 */}
            <div className="relative">
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <img
                  src="/Hero_1.png"
                  alt="FixMaster 維修大師 - 專業 iPhone 維修服務"
                  className="w-full h-auto max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0 drop-shadow-2xl"
                />
              </motion.div>
              
              {/* 裝飾性背景元素 */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 lg:w-48 lg:h-48 bg-accent-500/20 rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-24 h-24 lg:w-36 lg:h-36 bg-white/10 rounded-full blur-3xl"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 1.0 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 