'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { Quote, Sparkles, Star, TrendingUp } from 'lucide-react'

import SectionHeader from './ui/SectionHeader'
import { SliderDots } from './CarouselControls'
import { reviewsMeta } from '@/lib/reviews'
import { trackSelectPromotion, trackViewPromotion } from '@/lib/tracking'
import { motionTimings, motionViewport } from '@/lib/motion'
import { testimonials } from '@/data/testimonials'
import { useScrollSpy } from '@/hooks/useScrollSpy'

export default function TestimonialsSection() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const activeIndex = useScrollSpy(scrollerRef)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 })

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
        className="pointer-events-none absolute inset-x-[-20%] top-0 h-72 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(255,255,255,0))] blur-[60px] md:blur-[120px]"
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
                className="glass-control pl-5 pr-6 py-3 text-base font-bold text-neutral-900 hover:bg-white transition-all duration-300 flex items-center gap-3.5 shadow-(--elev-2) hover:shadow-(--elev-3) hover:-translate-y-1 group bg-white/80"
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
