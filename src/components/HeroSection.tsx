'use client'

import NextImage from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Sparkles, Shield, Clock, Eye, Phone } from 'lucide-react'
import Button from './ui/Button'
import Chip from './ui/Chip'
import SectionHeader from './ui/SectionHeader'
import { scrollToSectionId } from '@/lib/scroll'
import { trackClick } from '@/lib/tracking'
import { motionTimings } from '@/lib/motion'
import heroImg from '../../public/Hero_1.png'
import React from 'react'

const modelBadges = ['iPhone 17 系列', 'iPhone 15 系列', 'iPhone 14 系列', '到府收送']

const quickFacts = [
  { icon: Shield, title: 'IRP 官方授權', description: 'Apple 認證流程與零件' },
  { icon: Clock, title: '30 分鐘完修', description: '熱門維修可現場等候' },
  { icon: Phone, title: '到府收送', description: '台北市區快速取送' },
]

const highlightItems = [
  {
    icon: Clock,
    title: '30 分鐘完修',
    description: '熱門維修 30–60 分鐘交付，可現場等候。',
  },
  {
    icon: Eye,
    title: '全程透明紀錄',
    description: '拆裝與檢測完整錄影，紀錄可隨時索取。',
  },
  {
    icon: Shield,
    title: 'Apple IRP 認證',
    description: '原廠授權零件與技師執照，流程同步官方。',
  },
]

export default function HeroSection() {
  const { scrollYProgress } = useScroll()
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const sweepX = useTransform(scrollYProgress, [0, 1], ['-120%', '140%'])

  // 動態對比：根據背景亮度微調 glass 透明度（簡易取樣）
  React.useEffect(() => {
    try {
      const root = document.documentElement
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new window.Image()
      img.src = (heroImg as unknown as { src: string }).src || '/Hero_1.png'
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        canvas.width = 32
        canvas.height = 32
        if (!ctx) return
        ctx.drawImage(img, 0, 0, 32, 32)
        const data = ctx.getImageData(0, 0, 32, 32).data
        let sum = 0
        for (let i = 0; i < data.length; i += 4) {
          // perceived luminance
          const r = data[i], g = data[i + 1], b = data[i + 2]
          const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b
          sum += lum
        }
        const avg = sum / (data.length / 4)
        // 調整 token：暗背景→提高 top/bottom；亮背景→降低以更通透
        if (avg < 110) {
          root.style.setProperty('--glass-regular-top', 'rgba(255,255,255,0.52)')
          root.style.setProperty('--glass-regular-bottom', 'rgba(255,255,255,0.18)')
        } else if (avg > 180) {
          root.style.setProperty('--glass-regular-top', 'rgba(255,255,255,0.42)')
          root.style.setProperty('--glass-regular-bottom', 'rgba(255,255,255,0.08)')
        }
      }
    } catch {}
  }, [])
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-20 md:pt-32 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-x-[-15%] -top-32 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_rgba(255,255,255,0))] blur-[140px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="flex flex-col items-center gap-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,600px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,640px)]">
          <div className="order-2 w-full space-y-8 text-center lg:order-1 lg:space-y-10 lg:text-left">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full glass-control px-4 py-2 text-sm text-neutral-900 motion-soft-enter"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTimings.soft}
            >
              <NextImage
                src="/logo.svg"
                alt="FixMaster 品牌標誌"
                width={22}
                height={22}
                className="h-[22px] w-[22px]"
                priority
              />
              Apple IRP 認證維修中心
            </motion.div>

            <motion.div
              className="space-y-5 motion-soft-enter"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.06 }}
            >
              <SectionHeader
                title="IRP 認證 iPhone 維修｜30 分鐘完修"
                description="原廠零件・全程錄影存證・90 天保固，不維修不收費。可到店或到府收送，熱門機型多數 30–60 分鐘交件。"
                align="left"
                className="!mb-0 sheen-hover"
                as="h1"
              />
            </motion.div>

            <motion.div
              className="-mx-1 flex w-full gap-2 overflow-x-auto px-1 no-scrollbar lg:justify-start motion-soft-enter"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.12 }}
            >
              <div className="flex w-full justify-center gap-2 lg:w-auto lg:justify-start">
                {modelBadges.map((label) => (
                  <Chip
                    key={label}
                    onClick={() => {
                      trackClick('hero_model_chip_click', { label })
                      scrollToSectionId('services')
                    }}
                    aria-label={`查看 ${label} 維修項目`}
                    className="px-5 text-[15px]"
                  >
                    {label}
                  </Chip>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-surface px-6 py-6 text-left motion-soft-enter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.18 }}
            >
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                為什麼選擇 FixMaster
              </p>
              <ul className="space-y-3">
                {highlightItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 text-[15px] text-neutral-700">
                    <item.icon className="mt-0.5 h-4 w-4 text-neutral-900 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-neutral-900 text-balance">{item.title}</p>
                      <p className="text-neutral-600 text-pretty">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start motion-soft-enter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.24 }}
            >
              <Button
                className="w-full sm:w-auto motion-hover-pop cta-shine text-[15px]"
                onClick={() => {
                  trackClick('hero_primary_cta_click_line')
                  window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=hero&utm_campaign=contact_line', '_blank')
                }}
              >
                預約維修時段
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto motion-hover-pop text-[15px]"
                onClick={() => {
                  trackClick('hero_secondary_cta_click')
                  scrollToSectionId('services')
                }}
              >
                查看服務方案
              </Button>
            </motion.div>
            <motion.p
              className="text-sm text-neutral-500 motion-soft-enter text-pretty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.3 }}
            >
              線上預約成功後，我們將在 30 分鐘內回電確認並提供到府收送選項。
            </motion.p>

            <motion.div
              className="glass-surface px-6 py-6 text-left motion-soft-enter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.32 }}
            >
              <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="glass-control p-3 bg-white/50">
                      <Phone className="h-5 w-5 text-neutral-900" aria-hidden="true" />
                    </div>
                    <div>
                      <a
                        href="tel:+886-2-2816-6666"
                        className="text-lg font-bold text-neutral-900 hover:text-neutral-600 transition-colors tracking-tight"
                        onClick={() => trackClick('hero_support_phone_inline')}
                      >
                        02-2816-6666
                      </a>
                      <p className="text-sm text-neutral-500 font-medium">營業時間 14:00 – 23:00（每日）</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full sm:w-auto text-neutral-900 hover:bg-neutral-100/50"
                    onClick={() => {
                      trackClick('hero_support_line_inline')
                      window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=hero&utm_campaign=contact_line', '_blank')
                    }}
                  >
                    LINE 諮詢
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {quickFacts.map((fact) => (
                    <div key={fact.title} className="glass-control flex items-start gap-3 px-4 py-3.5 bg-white/40 hover:bg-white/60 transition-colors">
                      <fact.icon className="h-4 w-4 text-neutral-900 mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <p className="text-[13px] font-bold text-neutral-900 leading-tight mb-0.5 text-balance">{fact.title}</p>
                        <p className="text-[13px] text-neutral-600 leading-tight text-balance">{fact.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 w-full max-w-[520px] self-center lg:order-2 lg:w-auto lg:max-w-[600px] xl:max-w-[640px]">
            <motion.div
              className="glass-panel relative z-10 w-full overflow-hidden px-6 pt-6 pb-24 md:pb-28 lg:pb-32 shadow-[var(--elev-3)] motion-soft-enter border-white/40"
              initial={{ opacity: 0, x: 32, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: motionTimings.medium.duration, ease: motionTimings.medium.ease }}
              >
              <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.4),_rgba(255,255,255,0))] blur-3xl mix-blend-overlay" />
              <motion.div style={{ y: parallaxY }} className="relative z-10 mx-auto w-full aspect-[6/7] sm:aspect-[5/6] md:aspect-[4/5] lg:aspect-[7/8]">
                <motion.div style={{ scale: imageScale }} className="absolute inset-0">
                  <NextImage
                    src={heroImg}
                    alt="FixMaster 維修大師 - 專業 iPhone 維修服務"
                    fill
                    sizes="(max-width: 375px) 92vw, (max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
                    priority
                    placeholder="blur"
                    draggable={false}
                    className="object-contain"
                  />
                </motion.div>
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-6 -inset-x-10 sm:-inset-x-6 rounded-[var(--radius-xl)]"
                  style={{ x: sweepX }}
                >
                  <div className="h-full w-24 sm:w-32 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-2xl mix-blend-overlay" />
                </motion.div>
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 sm:h-24 md:h-28 bg-gradient-to-t from-white/90 via-white/60 to-transparent" aria-hidden="true" />
              <div className="glass-control absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 px-5 py-4 shadow-[var(--elev-2)]">
                <div>
                  <p className="font-bold flex items-center gap-2 text-neutral-900 tracking-tight">
                    <Sparkles className="h-4 w-4 text-amber-500" aria-hidden="true" />
                    今日可預約時段
                  </p>
                  <p className="text-sm text-neutral-600 font-medium mt-0.5">14:00 – 23:00 立即安排</p>
                </div>
                <Button
                  size="sm"
                  className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-black shadow-none text-[15px]"
                  onClick={() => {
                    trackClick('hero_image_cta')
                    scrollToSectionId('contact')
                  }}
                >
                  立即預約
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
