'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { Quote, Sparkles, Star, TrendingUp } from 'lucide-react'

import SectionHeader from './ui/SectionHeader'
import { SliderDots } from './CarouselControls'
import { reviewsMeta } from '@/lib/reviews'
import { trackSelectPromotion, trackViewPromotion } from '@/lib/tracking'
import { motionTimings, motionViewport } from '@/lib/motion'

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
    name: '蔡先生',
    location: '信義區',
    service: 'iPhone 12 Pro 電池更換',
    comment:
      '原本很耗電一天要充三次，換完現在可以用一整天。店員還順便幫我清潔了積滿棉絮的充電孔，接觸不良也修好了，推推！',
    badge: '續航復活',
    date: '2025.03',
  },
  {
    name: '陳先生',
    location: '北投區',
    service: 'iPhone 13 電池更換',
    comment:
      '電池健康度掉到 72% 才來換。維修前會先檢測並說明，報價很透明。換完後續航力明顯回來了，還提醒保固內有問題隨時回來檢查。',
    badge: '透明報價',
    date: '2025.02',
  },
  {
    name: '陳小姐',
    location: '大安區',
    service: 'MacBook Air 螢幕維修',
    comment:
      '不小心夾到耳機導致螢幕裂開，原廠報價太貴，朋友介紹來這裡。價格合理很多，重點是當天就好，不用留機好幾天，對工作影響降到最低。',
    badge: '當日交件',
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
    name: '許同學',
    location: '文山區',
    service: 'iPad mini 充電異常',
    comment:
      '上課作筆記用的 iPad 突然充不進去，以為電池壞了。結果老闆檢測說是尾插髒了，清一清就好，完全沒收費，真的是良心店家！',
    badge: '良心檢測',
    date: '2025.03',
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
    name: '郭先生',
    location: '松山區',
    service: 'iPhone 11 相機維修',
    comment:
      '鏡頭抖動不能對焦，拍照都模糊的。換了原廠相機模組後終於復活。老闆技術很好，拆裝很細心，還教我怎麼貼鏡頭貼才不會影響畫質。',
    badge: '技術精湛',
    date: '2025.02',
  },
  {
    name: '黃小姐',
    location: '大同區',
    service: 'Face ID 排線檢測',
    comment:
      '原本以為要換整新機，結果技師檢測後確認只是排線問題。維修費用合理很多，現場還教我怎麼保養。Face ID 終於復活了。',
    badge: '精準維修',
    date: '2024.12',
  },
  {
    name: '羅小姐',
    location: '中正區',
    service: '資料救援',
    comment:
      '手機突然白蘋果開不了機，裡面小孩的照片都沒備份。本來絕望了，還好這裡救回來，雖然花了一點時間處理主機板，但資料無價！',
    badge: '資料救援',
    date: '2025.01',
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
    name: '曾先生',
    location: '南港區',
    service: '二手 iPad Air',
    comment:
      '買了一台二手 iPad 給小孩上視訊課，機況很好幾乎全新，還有送保護貼跟充電線。CP 值很高，比買全新的划算太多了。',
    badge: '超值選購',
    date: '2025.02',
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
  {
    name: '吳先生',
    location: '中山區',
    service: 'MacBook Pro 清潔保養',
    comment:
      '電腦最近燙得嚇人，風扇也很大聲。送來做深度清潔和換散熱膏，現場拆開灰塵真的超多！保養後溫度降了快 10 度，風扇也不吵了，大推！',
    badge: '電腦保養',
    date: '2025.02',
  },
  {
    name: '鄭小姐',
    location: '士林區',
    service: 'iPad Air 彎曲校正',
    comment:
      'iPad 放包包被壓彎了，原本很擔心要換整台殼。老闆用專業工具幫我校正回來，幾乎看不出痕跡，還省了一大筆換殼費，技術真的很好。',
    badge: '板金校正',
    date: '2025.01',
  },
  {
    name: '劉先生',
    location: '大同區',
    service: 'iPhone 13 Pro 泡水救援',
    comment:
      '手機掉進水裡無法開機，送來這邊急救，老闆第一時間拆機清洗除潮，最後成功救回資料。提醒大家進水千萬別充電，趕快送修才是真的。',
    badge: '泡水急救',
    date: '2025.03',
  },
  {
    name: '林經理',
    location: '企業客戶',
    service: '公司公務機批次維修',
    comment:
      '公司有一批公務機需要換電池和修螢幕，FixMaster 提供企業專案價，還派人來公司收送，配合度很高，發票開立也很規範。',
    badge: '企業服務',
    date: '2025.02',
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
        <div className="max-w-6xl mx-auto space-y-12 md:space-y-16">
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
              description="Google 4.9+/5，累積超過 2,000 則真實五星好評。我們珍惜每一次服務的機會，用心解決您的問題。"
            />
            <div className="mt-6 flex items-center justify-center">
              <a 
                href={reviewsMeta.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-control pl-5 pr-6 py-3 text-base font-bold text-neutral-900 hover:bg-white transition-all duration-300 flex items-center gap-3.5 shadow-[var(--elev-2)] hover:shadow-[var(--elev-3)] hover:-translate-y-1 group bg-white/80"
                onClick={() => trackSelectPromotion({ section: 'testimonials', action: 'link_click', target: 'google_reviews', label: 'rating_badge' })}
              >
                <div className="flex -space-x-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="w-5 h-5 fill-[#FBBC04] text-[#FBBC04]" />
                  ))}
                </div>
                <div className="flex items-baseline gap-2 border-l-2 border-neutral-200 pl-3.5">
                  <span className="text-neutral-900 font-bold text-xl leading-none">{reviewsMeta.ratingValue}</span>
                  <span className="text-neutral-500 text-xs font-bold tracking-wide uppercase">{reviewsMeta.reviewCount} 則評論</span>
                </div>
              </a>
            </div>
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
                transition={{ ...motionTimings.soft, delay: 0.1 }}
                role="region"
                aria-label="客戶推薦卡片"
              >
                {testimonials.map((item, index) => (
                  <article
                    key={`${item.name}-${item.service}-${index}`}
                    className="glass-surface flex min-w-[300px] w-[85vw] max-w-[400px] lg:min-w-0 lg:w-auto flex-col gap-6 px-6 py-7 snap-center md:snap-start tilt-hover h-full bg-white/40 border border-white/60"
                  >
                    <div className="flex items-center justify-between">
                      <span className="glass-control px-3 py-1.5 text-[11px] font-bold text-neutral-900 tracking-wide shadow-none bg-white/50">
                        {item.badge}
                      </span>
                      <span className="text-xs font-medium text-neutral-400 font-mono">{item.date}</span>
                    </div>
                    <div className="flex-1">
                      <Quote className="h-5 w-5 text-neutral-300 mb-3" aria-hidden="true" />
                      <p className="text-[15px] text-neutral-700 leading-relaxed text-pretty font-medium">{item.comment}</p>
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
