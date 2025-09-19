'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Clock, Eye, Phone, Shield } from 'lucide-react'

import Button from './ui/Button'
import Chip from './ui/Chip'
import SectionHeader from './ui/SectionHeader'
import { SliderArrows, SliderDots } from './CarouselControls'
import { scrollToSectionId } from '@/lib/scroll'
import { trackClick } from '@/lib/tracking'

const modelBadges = ['iPhone 17', 'iPhone Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max']

const highlightItems = [
  {
    icon: Clock,
    title: '30 分鐘完修',
    description: '現場維修同步錄影，流程透明可追溯。',
  },
  {
    icon: Eye,
    title: '全程透明紀錄',
    description: '拆裝與檢測完整留存，客戶可即時查閱。',
  },
  {
    icon: Shield,
    title: 'Apple IRP 認證',
    description: '原廠規範維修流程，零件與保固同步官方。',
  },
]

const quickFacts = [
  '專業 IRP 認證技師團隊',
  'Apple 原廠零件與校準設備',
  '90 天延伸保固與換修支援',
]

export default function HeroSection() {
  const [activeHighlight, setActiveHighlight] = useState(0)
  const highlightScrollerRef = useRef<HTMLDivElement>(null)

  const scrollToHighlight = (index: number, behavior: ScrollBehavior = 'auto') => {
    const scroller = highlightScrollerRef.current
    if (!scroller) return
    const cards = Array.from(scroller.children) as HTMLElement[]
    if (cards.length < 2) {
      scroller.scrollTo({ left: 0, behavior })
      return
    }
    const step = cards[1].offsetLeft - cards[0].offsetLeft
    scroller.scrollTo({ left: index * step, behavior })
  }

  useEffect(() => {
    const scroller = highlightScrollerRef.current
    if (!scroller) return

    const handleScroll = () => {
      const cards = Array.from(scroller.children) as HTMLElement[]
      if (cards.length < 2) {
        setActiveHighlight(0)
        return
      }
      const step = cards[1].offsetLeft - cards[0].offsetLeft
      if (step <= 0) return
      const index = Math.round(scroller.scrollLeft / step)
      setActiveHighlight(Math.max(0, Math.min(cards.length - 1, index)))
    }

    scroller.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => scroller.removeEventListener('scroll', handleScroll)
  }, [])

  const highlightAria = useMemo(() => highlightItems.map((item) => item.title).join('、'), [])

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 md:pt-36 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.22),_rgba(239,68,68,0))] blur-3xl"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,560px)] items-center">
          <div className="order-2 space-y-10 text-center lg:order-1 lg:text-left">
            <motion.div
              className="inline-flex items-center gap-3 rounded-full glass-control glass-strong px-4 py-2 text-sm text-neutral-900"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/apple_logo.webp"
                alt="Apple 認證"
                width={20}
                height={20}
                className="h-5 w-5"
                priority
              />
              Apple IRP 認證維修中心
            </motion.div>

            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              <SectionHeader
                title="FixMaster 維修大師"
                description="士林 iPhone 專業維修｜原廠認證零件｜30 分鐘完修"
                align="left"
                className="!mb-0"
              />
              <p className="text-neutral-600 text-base sm:text-lg lg:text-xl max-w-3xl lg:max-w-none">
                透明維修錄影、原廠零件、90 天保固，提供到府收送與嚴選二手 iPhone，讓維修與換機都更安心。
              </p>
            </motion.div>

            <motion.div
              className="-mx-1 flex w-full gap-2 overflow-x-auto px-1 no-scrollbar"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {modelBadges.map((label) => (
                <Chip
                  key={label}
                  onClick={() => {
                    trackClick('hero_model_chip_click', { label })
                    scrollToSectionId('services')
                  }}
                  aria-label={`查看 ${label} 維修項目`}
                >
                  {label}
                </Chip>
              ))}
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.16 }}
            >
              <SliderArrows
                onPrev={() => {
                  const target = Math.max(0, activeHighlight - 1)
                  setActiveHighlight(target)
                  scrollToHighlight(target, 'smooth')
                }}
                onNext={() => {
                  const target = Math.min(highlightItems.length - 1, activeHighlight + 1)
                  setActiveHighlight(target)
                  scrollToHighlight(target, 'smooth')
                }}
                ariaLabelPrev="上一個服務亮點"
                ariaLabelNext="下一個服務亮點"
              />
              <motion.div
                ref={highlightScrollerRef}
                className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
                role="region"
                aria-roledescription="carousel"
                aria-label={`服務亮點：${highlightAria}`}
              >
                {highlightItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="glass-surface glass-strong flex min-w-[14rem] snap-start flex-col gap-3 px-5 py-6 text-left"
                  >
                    <item.icon className="h-6 w-6 text-neutral-900" aria-hidden="true" />
                    <h3 className="text-base font-semibold text-neutral-900">{item.title}</h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </motion.div>
              <SliderDots
                count={highlightItems.length}
                activeIndex={activeHighlight}
                onDotClick={(index) => {
                  setActiveHighlight(index)
                  scrollToHighlight(index, 'smooth')
                }}
                className="mt-2"
              />
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Button
                className="w-full sm:w-auto"
                onClick={() => {
                  trackClick('hero_primary_cta_click')
                  scrollToSectionId('contact')
                }}
              >
                立即預約維修
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => {
                  trackClick('hero_secondary_cta_click')
                  scrollToSectionId('services')
                }}
              >
                精選二手 iPhone
              </Button>
            </motion.div>

            <motion.div
              className="glass-surface glass-strong flex flex-col gap-4 px-6 py-5 text-left"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.26 }}
            >
              <div className="flex items-center gap-3 text-neutral-900">
                <Phone className="h-5 w-5" />
                <a
                  href="tel:+886-2-2816-6666"
                  className="text-base font-semibold text-neutral-900 hover:text-neutral-950 transition-colors"
                >
                  02-2816-6666
                </a>
              </div>
              <p className="text-sm text-neutral-600">台北市士林區文林路 60 號（捷運劍潭站步行 3 分鐘）</p>
              <ul className="grid gap-2 text-sm text-neutral-600">
                {quickFacts.map((fact) => (
                  <li key={fact} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-accent-500" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="relative order-1 flex justify-center lg:order-2">
            <motion.div
              className="glass-surface glass-strong relative z-10 w-full max-w-[420px] overflow-hidden px-6 pb-8 pt-6 shadow-[var(--elev-2)] sm:max-w-[480px] lg:max-w-[520px]"
              initial={{ opacity: 0, x: 32, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.22),_rgba(239,68,68,0))] blur-3xl" />
              <Image
                src="/Hero_1.png"
                alt="FixMaster 維修大師 - 專業 iPhone 維修服務"
                width={780}
                height={780}
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 520px"
                priority
                className="relative z-10 h-auto w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
