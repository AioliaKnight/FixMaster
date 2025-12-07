'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { Quote, Sparkles, Star, TrendingUp, Award, ShieldCheck, Clock } from 'lucide-react'

import SectionHeader from './ui/SectionHeader'
import { SliderDots } from './CarouselControls'
import { reviewsMeta } from '@/lib/reviews'
import { trackSelectPromotion, trackViewPromotion } from '@/lib/tracking'
import { motionTimings, motionViewport } from '@/lib/motion'

const stats = [
  { 
    label: 'Google 評價', 
    value: `${reviewsMeta.ratingValue}`, 
    detail: `基於 ${reviewsMeta.reviewCount}+ 則真實評論`,
    icon: Star
  },
  { 
    label: '當日完修率', 
    value: '92%', 
    detail: '多數維修於 1 小時內完成',
    icon: Clock
  },
  { 
    label: 'IRP 認證技師', 
    value: '6 位', 
    detail: '原廠受訓，定期考核認證',
    icon: Award
  },
  { 
    label: '保固追蹤', 
    value: '90 天', 
    detail: '完整的雲端履歷與保固',
    icon: ShieldCheck
  },
]

const testimonials = [
  {
    name: '張小姐',
    location: '士林區',
    service: 'iPhone 14 螢幕更換',
    comment:
      '維修過程全程錄影讓人很放心，約 40 分鐘就換好螢幕，色彩和觸控手感跟原廠完全一樣。維修前後都有做詳細檢測，很專業。',
    badge: '快速完修',
    date: '2025.03',
  },
  {
    name: '陳先生',
    location: '北投區',
    service: 'iPhone 13 電池更換',
    comment:
      '電池健康度掉到 72% 才來換。維修前會先檢測並說明，報價很透明。換完後續航力明顯回來了，還提醒保固內有問題隨時回來檢查。',
    badge: '續航回復',
    date: '2025.02',
  },
  {
    name: '王先生',
    location: '內湖區',
    service: '到府收送維修',
    comment:
      '晚上預約，隔天就有專人來收件。維修進度都會透過 LINE 回報，修好當天就送回來。全程都有照片紀錄，對上班族來說真的太方便。',
    badge: '省時便利',
    date: '2025.01',
  },
  {
    name: '李小姐',
    location: '天母',
    service: '二手 iPhone 嚴選',
    comment:
      '現場直接提供檢測報告單和保固卡，手機外觀跟新的一樣，價格比官網親民很多。已經用兩個月了，非常穩定，推薦！',
    badge: '品質保證',
    date: '2025.01',
  },
  {
    name: '黃小姐',
    location: '大同區',
    service: 'Face ID 排線檢測',
    comment:
      '原本以為要換整新機，結果技師檢測後確認只是排線問題。維修費用合理很多，現場還教我怎麼保養。Face ID 終於復活了。',
    badge: '原廠規範',
    date: '2024.12',
  },
  {
    name: '林先生',
    location: '士林區',
    service: 'iPhone 15 Pro 螢幕更換',
    comment:
      '找了幾家才選這間 IRP 認證門市。使用 Apple 認證零件，螢幕色準真的沒話說。全程透明錄影，45 分鐘搞定，還有 90 天保固。',
    badge: '原廠零件',
    date: '2025.03',
  },
  {
    name: '周小姐',
    location: '中山區',
    service: '到府收送（電池更換）',
    comment:
      '用 LINE 預約到府收送，流程很順暢。先免費檢測再報價，修完電池健康度回到 100%，不用請假跑一趟通訊行，真的很讚。',
    badge: '到府收送',
    date: '2025.02',
  },
  {
    name: '張先生',
    location: '北投區',
    service: 'Face ID 檢測與維修',
    comment:
      '依照 IRP 標準流程做檢測，維修前風險和時間都講得很清楚。完工後有提供詳細的檢測紀錄，用起來跟新的一樣順。',
    badge: 'IRP 認證',
    date: '2024.12',
  },
]

export default function TestimonialsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 })

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

  useEffect(() => {
    if (titleInView) {
      trackViewPromotion({ section: 'testimonials', label: '顧客真實好評' })
    }
  }, [titleInView])

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
        className="pointer-events-none absolute inset-x-[-20%] top-0 h-72 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_rgba(255,255,255,0))] blur-[120px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
          <motion.div
            className="text-center"
            variants={{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }}
            initial="initial"
            whileInView="animate"
            viewport={motionViewport}
            transition={motionTimings.soft}
            ref={titleRef}
          >
            <SectionHeader
              title="顧客真實好評"
              description="Google 4.9+/5，高分來源：IRP 認證、原廠零件、錄影存證、到府收送與 90 天保固。"
            />
            <div className="mt-6 flex items-center justify-center">
              <a 
                href={reviewsMeta.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-control px-5 py-2 text-sm font-medium text-neutral-900 hover:bg-white/80 transition-colors flex items-center gap-2 shadow-[var(--elev-1)]"
                onClick={() => trackSelectPromotion({ section: 'testimonials', action: 'link_click', target: 'google_reviews', label: 'rating_badge' })}
              >
                <span className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-neutral-900 font-bold">{reviewsMeta.ratingValue}</span>
                </span>
                <span className="text-neutral-400">/</span>
                <span className="text-neutral-600">5.0</span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-600 underline decoration-neutral-300 underline-offset-4">{reviewsMeta.reviewCount} 則評論</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={motionViewport}
            transition={{ ...motionTimings.soft, delay: 0.1 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
              {stats.map((item, i) => (
                <div
                  key={item.label}
                  className="glass-surface flex flex-col gap-3 p-6 md:p-8 text-left hover:bg-white/60 transition-colors"
                >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">{item.label}</p>
                  <item.icon className="w-4 h-4 text-neutral-400" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">{item.value}</p>
                <p className="text-sm text-neutral-600 font-medium leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </motion.div>

          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1">
              <span className="inline-flex items-center gap-2.5 text-[15px] font-bold text-neutral-800">
                <Sparkles className="h-4 w-4 text-amber-500" />
                精選實際案例（錄影 / 到府 / 二手機）
              </span>
              <a
                href={reviewsMeta.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1 group"
                onClick={() => trackSelectPromotion({ section: 'testimonials', action: 'link_click', target: 'google_reviews', label: 'see_more' })}
              >
                查看全部評論
                <TrendingUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="relative">
              <motion.div
                ref={scrollerRef}
                className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-8 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0 lg:mx-0 lg:px-0"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={motionViewport}
                transition={{ ...motionTimings.soft, delay: 0.2 }}
                role="region"
                aria-label="客戶推薦卡片"
              >
                {testimonials.map((item, index) => (
                  <article
                    key={`${item.name}-${item.service}`}
                    className="glass-surface flex min-w-[85vw] sm:min-w-[400px] lg:min-w-0 flex-col gap-6 px-7 py-7 snap-center md:snap-start tilt-hover h-full bg-white/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="glass-control px-3 py-1.5 text-[11px] font-bold text-neutral-900 tracking-wide shadow-none bg-white/50">
                        {item.badge}
                      </span>
                      <span className="text-xs font-medium text-neutral-400 font-mono">{item.date}</span>
                    </div>
                    <div className="flex-1">
                      <Quote className="h-5 w-5 text-neutral-300 mb-3" aria-hidden="true" />
                      <p className="text-[15px] text-neutral-700 leading-relaxed font-medium text-balance">{item.comment}</p>
                    </div>
                    <div className="pt-5 border-t border-neutral-200/50 mt-auto">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[15px] font-bold text-neutral-900">{item.name}</p>
                          <p className="text-xs text-neutral-500 mt-0.5">{item.location}</p>
                        </div>
                        <p className="text-xs font-medium text-neutral-500 bg-neutral-100/80 px-2 py-1 rounded-md">{item.service}</p>
                      </div>
                    </div>
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
                className="mt-4 lg:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
