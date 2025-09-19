'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Quote, Sparkles, Star } from 'lucide-react'

import SectionHeader from './ui/SectionHeader'
import { SliderDots } from './CarouselControls'

const stats = [
  { label: 'Google 評價', value: '4.8 / 5', detail: '超過 150 位客戶實際回饋' },
  { label: '當日完修率', value: '92%', detail: '主力維修 1 小時內完成' },
  { label: 'IRP 認證技師', value: '6 位', detail: '原廠授權，定期培訓考核' },
  { label: '保固追蹤', value: '90 天', detail: '雲端保固紀錄與提醒' },
]

const testimonials = [
  {
    name: '張小姐',
    location: '士林區',
    service: 'iPhone 14 螢幕更換',
    comment:
      '維修過程全程錄影，40 分鐘就換好螢幕，顯示色彩和觸控手感完全沒落差。維修前後還做檢測報告，超安心。',
    badge: '快速完修',
    date: '2025.03',
  },
  {
    name: '陳先生',
    location: '北投區',
    service: 'iPhone 13 電池更換',
    comment:
      '電池健康度掉到 72%，維修前先檢測、報價透明。換上後續航明顯回來，還貼心提醒保固內若有異常可免費檢查。',
    badge: '續航回復',
    date: '2025.02',
  },
  {
    name: '王先生',
    location: '內湖區',
    service: '到府收送維修',
    comment:
      '晚上預約，隔天專人收件，維修狀況即時回報，完成後當天送回。全程都有照片紀錄，讓我不用跑來跑去。',
    badge: '省時便利',
    date: '2025.01',
  },
  {
    name: '李小姐',
    location: '天母',
    service: '二手 iPhone 嚴選',
    comment:
      '現場提供檢測單與保固，手機外觀近新，價格比官網安心很多。後續使用兩個月都很穩，推薦！',
    badge: '品質保證',
    date: '2025.01',
  },
  {
    name: '黃小姐',
    location: '大同區',
    service: 'Face ID 排線檢測',
    comment:
      '先做免費檢測才確認問題是排線，維修費用合理，現場還教我保養方式。Face ID 馬上恢復正常。',
    badge: '原廠規範',
    date: '2024.12',
  },
]

export default function TestimonialsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const handleScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[]
      if (cards.length < 2) {
        setActiveIndex(0)
        return
      }
      const step = cards[1].offsetLeft - cards[0].offsetLeft
      if (step <= 0) return
      const index = Math.round(el.scrollLeft / step)
      setActiveIndex(Math.max(0, Math.min(cards.length - 1, index)))
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCard = (index: number) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = Array.from(el.children) as HTMLElement[]
    if (cards.length < 2) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }
    const step = cards[1].offsetLeft - cards[0].offsetLeft
    el.scrollTo({ left: index * step, behavior: 'smooth' })
  }

  return (
    <section id="testimonials" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-[-20%] top-0 h-72 bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.18),_rgba(239,68,68,0))] blur-[120px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto space-y-14 md:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <SectionHeader
              title="顧客真實好評"
              description="每一封評價，都是對 FixMaster 的信任與肯定。"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((item) => (
              <div
                key={item.label}
                className="glass-surface glass-strong flex flex-col gap-2 px-5 py-6 text-left"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-neutral-500">{item.label}</p>
                <p className="text-2xl font-semibold text-neutral-900">{item.value}</p>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </motion.div>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600">
                <Sparkles className="h-4 w-4 text-accent-500" />
                客戶推薦精選
              </span>
              <div className="hidden md:flex items-center gap-1 text-sm text-neutral-500">
                <Star className="h-4 w-4 text-yellow-400" />
                150+ 五星評價整合
              </div>
            </div>

            <div className="relative">
              <motion.div
                ref={scrollerRef}
                className="no-scrollbar -mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {testimonials.map((item) => (
                  <article
                    key={`${item.name}-${item.service}`}
                    className="glass-surface glass-strong flex min-w-[18rem] flex-col gap-5 px-6 py-6"
                  >
                    <div className="flex items-center justify-between text-sm text-neutral-500">
                      <span>{item.date}</span>
                      <span className="glass-control px-3 py-1 text-xs font-medium text-neutral-900">
                        {item.badge}
                      </span>
                    </div>
                    <Quote className="h-6 w-6 text-accent-500" aria-hidden="true" />
                    <p className="text-neutral-700 leading-relaxed">{item.comment}</p>
                    <footer className="mt-auto">
                      <p className="text-base font-semibold text-neutral-900">{item.name}</p>
                      <p className="text-sm text-neutral-500">{item.service}｜{item.location}</p>
                    </footer>
                  </article>
                ))}
              </motion.div>
              <SliderDots
                count={testimonials.length}
                activeIndex={activeIndex}
                onDotClick={(index) => {
                  setActiveIndex(index)
                  scrollToCard(index)
                }}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
