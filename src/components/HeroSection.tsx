'use client'

import { motion } from 'framer-motion'
import { Shield, Clock, Eye, Phone } from 'lucide-react'
import Image from 'next/image'
import { scrollToSectionId } from '@/lib/scroll'
import { useEffect, useRef, useState } from 'react'

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen bg-white flex items-center mt-16 md:mt-20">
      <div className="container mx-auto container-padding pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左側內容區 */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              {/* 認證標章 */}
              <motion.div 
                className="mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center px-0 py-0">
                  <Image
                    src="/apple_logo.webp"
                    alt="Apple 認證標章"
                    width={20}
                    height={20}
                    className="w-5 h-5 mr-2 object-contain"
                    priority
                  />
                  <span className="text-neutral-900 text-sm font-medium tracking-wide">Apple IRP 認證</span>
                </div>
              </motion.div>

              {/* 主標題 */}
              <motion.h1 
                className="text-neutral-900 mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-2">
                  FixMaster
                </span>
                <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-900 mb-2 lg:mb-3">
                  維修大師｜士林店
                </span>
                <span className="block text-base sm:text-lg md:text-xl lg:text-2xl font-normal text-neutral-600">
                  現場透明錄影、Apple 認證零件、90 天保固，最快三十分鐘完修。
                </span>
              </motion.h1>

              {/* 副標題 */}
              <motion.p 
                className="text-neutral-600 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 lg:mb-10 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                專業 iPhone 維修，透明、安心、有效率。
              </motion.p>

              {/* 特色亮點 */}
              <motion.div 
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible mb-8 lg:mb-10 -mx-1 px-1"
                ref={(() => {
                  const ref = useRef<HTMLDivElement>(null)
                  const [, setInit] = useState(0)
                  const [active, setActive] = useState(0)
                  useEffect(() => {
                    const el = ref.current
                    if (!el) return
                    const onScroll = () => {
                      const children = el.children
                      if (children.length < 2) {
                        setActive(0)
                        return
                      }
                      const step = (children[1] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft
                      if (step <= 0) return
                      const idx = Math.round(el.scrollLeft / step)
                      setActive(Math.min(children.length - 1, Math.max(0, idx)))
                    }
                    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
                    onScroll()
                    return () => el.removeEventListener('scroll', onScroll as any)
                  }, [])
                  ;(globalThis as any).__heroHighlightsRef = ref
                  ;(globalThis as any).__setHeroHighlightsActive = (i: number) => {
                    const el = ref.current
                    if (!el) return
                    const children = el.children
                    if (children.length < 2) return
                    const step = (children[1] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft
                    el.scrollTo({ left: i * step, behavior: 'smooth' })
                    setInit(i)
                  }
                  ;(globalThis as any).__getHeroHighlightsActive = () => active
                  return ref
                })()}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="flex-none w-56 snap-start border border-neutral-200 p-4 text-center lg:text-left sm:border-0 sm:p-0 sm:w-auto">
                  <Clock className="w-6 h-6 lg:w-8 lg:h-8 text-neutral-900 mx-auto lg:mx-0 mb-2 lg:mb-3" />
                  <h3 className="text-neutral-900 font-medium mb-1 lg:mb-2 text-sm lg:text-base">最快 30 分鐘快速完修</h3>
                  <p className="text-neutral-600 text-xs lg:text-sm hidden sm:block">現場等候即可</p>
                </div>
                
                <div className="flex-none w-56 snap-start border border-neutral-200 p-4 text-center lg:text-left sm:border-0 sm:p-0 sm:w-auto">
                  <Eye className="w-6 h-6 lg:w-8 lg:h-8 text-neutral-900 mx-auto lg:mx-0 mb-2 lg:mb-3" />
                  <h3 className="text-neutral-900 font-medium mb-1 lg:mb-2 text-sm lg:text-base">全程透明錄影</h3>
                  <p className="text-neutral-600 text-xs lg:text-sm hidden sm:block">每一步都清楚可見</p>
                </div>

                <div className="flex-none w-56 snap-start border border-neutral-200 p-4 text-center lg:text-left sm:border-0 sm:p-0 sm:w-auto">
                  <Shield className="w-6 h-6 lg:w-8 lg:h-8 text-neutral-900 mx-auto lg:mx-0 mb-2 lg:mb-3" />
                  <h3 className="text-neutral-900 font-medium mb-1 lg:mb-2 text-sm lg:text-base">Apple 認證零件</h3>
                  <p className="text-neutral-600 text-xs lg:text-sm hidden sm:block">IRP 認證技師</p>
                </div>
              </motion.div>
              {/* 手機點點指示器 */}
              <div className="flex md:hidden items-center justify-center mt-2 mb-6 space-x-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => (globalThis as any).__setHeroHighlightsActive?.(i)}
                    aria-label={`前往第 ${i + 1} 個特色`}
                    className={(globalThis as any).__getHeroHighlightsActive?.() === i ? 'w-2.5 h-2.5 rounded-full bg-neutral-900' : 'w-2.5 h-2.5 rounded-full bg-neutral-300'}
                  />
                ))}
              </div>

              {/* CTA 按鈕 */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <button 
                  className="w-full sm:w-auto bg-neutral-900 hover:bg-black text-white px-8 lg:px-12 py-3 lg:py-4 flat-button font-medium text-base lg:text-lg tracking-wide transition-colors duration-200"
                  onClick={() => scrollToSectionId('contact')}
                >
                  立即預約維修
                </button>
                
                <button 
                  className="w-full sm:w-auto text-accent-600 hover:text-accent-700 border border-neutral-300 px-8 lg:px-12 py-3 lg:py-4 flat-button font-medium text-base lg:text-lg tracking-wide transition-all duration-200"
                  onClick={() => scrollToSectionId('services')}
                >
                  精選二手 iPhone
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
                  className="inline-flex items-center text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
                  <span className="text-base lg:text-lg font-medium">02-2816-6666</span>
                </a>
                <p className="text-neutral-500 text-sm lg:text-base mt-2 lg:mt-3">台北市士林區文林路60號</p>
              </motion.div>
            </div>

            {/* 右側圖片區 */}
            <div className="relative order-1 lg:order-2">
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              >
                <Image
                  src="/Hero_1.avif"
                  alt="FixMaster 維修大師 - 專業 iPhone 維修服務"
                  width={800}
                  height={800}
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                  className="w-full h-auto max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0"
                />
              </motion.div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 