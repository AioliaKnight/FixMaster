'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Shield, Clock, Eye, Phone } from 'lucide-react'

import Button from './ui/Button'
import Chip from './ui/Chip'
import SectionHeader from './ui/SectionHeader'
import { scrollToSectionId } from '@/lib/scroll'
import { trackClick } from '@/lib/tracking'
import { motionTimings } from '@/lib/motion'
import heroImg from '../../public/Hero_1.png'

const modelBadges = ['iPhone 17', 'iPhone Air', 'iPhone 17 Pro', 'iPhone 17 Pro Max']

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
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-20 md:pt-32 lg:pb-28">
      <div
        className="pointer-events-none absolute inset-x-[-15%] -top-32 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.18),_rgba(239,68,68,0))] blur-[140px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="flex flex-col items-center gap-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] xl:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
          <div className="order-2 w-full space-y-8 text-center lg:order-1 lg:space-y-10 lg:text-left">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full glass-control glass-strong px-4 py-2 text-sm text-neutral-900 motion-soft-enter"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTimings.soft}
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
              className="space-y-5 motion-soft-enter"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.06 }}
            >
              <SectionHeader
                title="iPhone 維修，30 分鐘就安心"
                description="原廠授權零件、透明錄影與 90 天保固，一通電話即可安排維修、換機或到府收送。"
                align="left"
                className="!mb-0"
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
                    className="px-5"
                  >
                    {label}
                  </Chip>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="glass-panel p-1 motion-soft-enter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.18 }}
            >
              <div className="glass-content px-6 py-6 text-left">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                  為什麼選擇 FixMaster
                </p>
                <ul className="space-y-3">
                  {highlightItems.map((item) => (
                    <li key={item.title} className="flex items-start gap-3 text-sm text-neutral-600">
                      <item.icon className="mt-0.5 h-4 w-4 text-neutral-900" aria-hidden="true" />
                      <div>
                        <p className="font-medium text-neutral-900">{item.title}</p>
                        <p>{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start motion-soft-enter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.24 }}
            >
              <Button
                className="w-full sm:w-auto motion-hover-pop"
                onClick={() => {
                  trackClick('hero_primary_cta_click')
                  scrollToSectionId('contact')
                }}
              >
                預約維修時段
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto motion-hover-pop"
                onClick={() => {
                  trackClick('hero_secondary_cta_click')
                  scrollToSectionId('services')
                }}
              >
                查看服務方案
              </Button>
            </motion.div>
            <motion.p
              className="text-sm text-neutral-500 motion-soft-enter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.3 }}
            >
              線上預約成功後，我們將在 30 分鐘內回電確認並提供到府收送選項。
            </motion.p>

            <motion.div
              className="glass-panel p-1 motion-soft-enter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...motionTimings.soft, delay: 0.32 }}
            >
              <div className="glass-content flex items-center gap-3 px-6 py-5 text-left">
                <Phone className="h-5 w-5 text-neutral-900" aria-hidden="true" />
                <div>
                  <a
                    href="tel:+886-2-2816-6666"
                    className="text-base font-semibold text-neutral-900 hover:text-neutral-950 transition-colors"
                    onClick={() => trackClick('hero_support_phone_inline')}
                  >
                    02-2816-6666
                  </a>
                  <p className="text-sm text-neutral-600">營業時間 14:00 – 23:00（每日）</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="order-1 w-full max-w-[520px] self-center lg:order-2 lg:w-auto">
            <motion.div
              className="glass-panel relative z-10 w-full overflow-hidden px-6 pt-6 pb-28 lg:pb-32 shadow-[var(--elev-2)] motion-soft-enter"
              initial={{ opacity: 0, x: 32, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: motionTimings.medium.duration, ease: motionTimings.medium.ease }}
              >
              <div className="absolute -top-24 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(239,68,68,0.22),_rgba(239,68,68,0))] blur-3xl" />
              <div className="relative z-10 mx-auto w-full aspect-[1/1] sm:aspect-[5/6] lg:aspect-[4/5]">
                <Image
                  src={heroImg}
                  alt="FixMaster 維修大師 - 專業 iPhone 維修服務"
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 60vw, 520px"
                  priority
                  placeholder="blur"
                  draggable={false}
                  className="object-contain"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-white/85 via-white/50 to-transparent" aria-hidden="true" />
              <div className="glass-control glass-elevated absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2 px-4 py-3 text-sm text-neutral-900">
                <div>
                  <p className="font-semibold flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent-500" aria-hidden="true" />
                    今日可預約時段
                  </p>
                  <p className="text-neutral-600">14:00 – 23:00 立即安排</p>
                </div>
                <Button
                  size="sm"
                  className="w-full sm:w-auto"
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
