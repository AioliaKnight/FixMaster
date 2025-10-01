'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { scrollToSectionId } from '@/lib/scroll'
import {
  Gift,
  Truck,
  Tag,
  Clock,
  Star,
  Zap,
  ShoppingCart,
  Smartphone,
  Battery,
  Search,
  Award,
  Medal,
  Crown,
  CheckCircle
} from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { SliderDots } from './CarouselControls'
import { trackClick } from '@/lib/tracking'
import { motionTimings, motionViewport } from '@/lib/motion'

export default function PromotionsSection() {
  const mainRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 6])
  const [mainActive, setMainActive] = useState(0)
  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const onScroll = () => {
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
      if (step > 0) setMainActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  const flashRef = useRef<HTMLDivElement>(null)
  const [flashActive, setFlashActive] = useState(0)
  useEffect(() => {
    const el = flashRef.current
    if (!el) return
    const onScroll = () => {
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
      if (step > 0) setFlashActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  const memberRef = useRef<HTMLDivElement>(null)
  const [memberActive, setMemberActive] = useState(0)
  useEffect(() => {
    const el = memberRef.current
    if (!el) return
    const onScroll = () => {
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
      if (step > 0) setMemberActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])
  const mainPromotions = [
    {
      icon: Gift,
      title: 'iPhone 17 上市月｜免費健檢 + 玻璃貼',
      description: '完成維修即贈 9H 玻璃貼，上市月享免費檢測',
      originalPrice: '原價 $299',
      discountPrice: '到店免費',
      badge: '限時優惠',
      color: 'from-pink-500 to-pink-600',
      terms: ['限上市月', '完成維修', '當場施作'],
      validUntil: '上市月'
    },
    {
      icon: Truck,
      title: '到府收送更貼心',
      description: '維修滿額，台北市區來回都交給我們',
      originalPrice: '原價 $200',
      discountPrice: '滿 $1,500 免收送',
      badge: '超值服務',
      color: 'from-blue-500 to-blue-600',
      terms: ['台北市區限定', '滿 $1,500 免收送', '當日收件處理'],
      validUntil: '長期優惠'
    },
    {
      icon: Tag,
      title: '本月二手機精選',
      description: '嚴選好機，價格漂亮，數量有限，錯過可惜',
      originalPrice: '市價優惠',
      discountPrice: '最低8折',
      badge: '數量限定',
      color: 'from-purple-500 to-purple-600',
      terms: ['限當月特選機種', '電池健康度 80% 以上', '保固 30 天'],
      validUntil: '每月更新'
    }
  ]

  const flashDeals = [
    {
      title: 'iPhone 17 螢幕更換（暫估）',
      originalPrice: '價格將依原廠公告',
      salePrice: '預約後告知',
      discount: '9折優惠',
      timeLeft: '48小時',
      icon: Smartphone,
    },
    {
      title: 'iPhone 17 電池更換（預約備料）',
      originalPrice: '價格將依原廠公告',
      salePrice: '備料後通知',
      discount: '9折優惠',
      timeLeft: '72小時',
      icon: Battery,
    },
    {
      title: 'iPhone 17 全機檢測',
      originalPrice: '價格將依原廠公告',
      salePrice: '上市月免費',
      discount: '9折優惠',
      timeLeft: '24小時',
      icon: Search,
    },
  ]

  const loyaltyProgram = [
    {
      level: '銅牌會員',
      requirement: '累積維修 1 次',
      benefits: ['95折優惠', '優先預約'],
      icon: Medal,
    },
    {
      level: '銀牌會員',
      requirement: '累積維修 3 次',
      benefits: ['9折優惠', '免費檢測', '延長保固'],
      icon: Award,
    },
    {
      level: '金牌會員',
      requirement: '累積維修 5 次',
      benefits: ['85折優惠', '免費收送', 'VIP 通道'],
      icon: Crown,
    },
  ]



  return (
    <section id="promotions" className="section-padding relative">
      <div className="pointer-events-none absolute inset-x-[-10%] -top-24 h-80 bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(239,68,68,0.08),_rgba(239,68,68,0))] blur-[100px]" aria-hidden="true" />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* 區塊標題 */}
          <motion.div 
            ref={titleRef}
            className="text-center mb-14 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            style={{ y: titleY }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6 sheen-hover">
              限時優惠活動
            </h2>
            <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto">
              多重優惠等您來享受，讓您的維修體驗更加超值
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-8"></div>
          </motion.div>

          {/* 主要優惠 */}
          <div
            ref={mainRef}
            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:gap-8 mb-14 md:mb-16 -mx-1 px-1"
            role="region"
            aria-roledescription="carousel"
            aria-label="主要優惠"
          >
            {mainPromotions.map((promo, index) => (
              <motion.div
                key={index}
                className="glass-panel p-1 group relative overflow-hidden transition-all duration-200 flex-none w-[22rem] snap-start md:w-auto motion-soft-enter tilt-hover specular"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...motionTimings.soft, delay: index * 0.1 }}
                viewport={motionViewport}
                whileHover={{ scale: 1.02 }}
              >
                <div className="glass-content p-6 md:p-7 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="glass-control glass-elevated w-14 h-14 flex items-center justify-center text-neutral-900">
                      <promo.icon className="w-7 h-7" />
                    </div>
                    <div className="glass-control glass-elevated px-3 py-1 text-xs font-semibold text-accent-600">
                      {promo.badge}
                    </div>
                  </div>

                {/* 標題與描述 */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-neutral-900">
                      {promo.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {promo.description}
                    </p>
                  </div>

                {/* 價格 */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 text-sm line-through">
                        {promo.originalPrice}
                      </span>
                      <span className="text-neutral-900 text-lg font-semibold">
                        {promo.discountPrice}
                      </span>
                    </div>
                    <p className="text-neutral-500 text-xs flex items-center gap-2">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      有效期限：{promo.validUntil}
                    </p>
                  </div>

                {/* 條件說明 */}
                  <div className="space-y-2">
                    {promo.terms.map((term, termIndex) => (
                      <div key={termIndex} className="flex items-center gap-2 text-sm text-neutral-600">
                        <Star className="h-4 w-4 text-neutral-900" aria-hidden="true" />
                        <span>{term}</span>
                      </div>
                    ))}
                    <div className="text-xs text-neutral-500">
                      <button
                        className="underline underline-offset-2 hover:text-neutral-700"
                        onClick={() => trackClick('promo_terms_click', { title: promo.title })}
                      >
                        適用條件
                      </button>
                    </div>
                  </div>

                {/* 立即使用按鈕 */}
                  <button 
                  className="w-full flat-button font-medium glass-control glass-elevated text-neutral-900 py-3 motion-hover-pop"
                  onClick={() => {
                    trackClick('promo_apply_click', { section: 'promotions', promo: promo.title })
                    scrollToSectionId('contact')
                    setTimeout(() => {
                      const messageTextarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement
                      if (messageTextarea) {
                        messageTextarea.value = `我想使用「${promo.title}」優惠，請協助預約維修服務。`
                        messageTextarea.dispatchEvent(new Event('input', { bubbles: true }))
                      }
                    }, 1000)
                  }}
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Gift className="h-4 w-4" aria-hidden="true" />
                      立即享受優惠
                    </span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          <SliderDots
            count={mainPromotions.length}
            activeIndex={mainActive}
            onDotClick={(i) => {
              const el = mainRef.current
              if (!el) return
              const a = el.children[0] as HTMLElement | undefined
              const b = el.children[1] as HTMLElement | undefined
              const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
              el.scrollTo({ left: i * step, behavior: 'smooth' })
            }}
            className="-mt-10 mb-14"
          />

          {/* 限時搶購 */}
          <motion.div
            className="flat-card p-8 mb-14 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-neutral-900">
                限時優惠
              </h3>
              <div className="bg-accent-500 text-white px-4 py-2 text-sm font-medium animate-pulse">
                限時優惠中
              </div>
            </div>
            
            <div
              ref={flashRef}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-6 -mx-1 px-1"
              role="region"
              aria-roledescription="carousel"
              aria-label="限時優惠"
            >
              {flashDeals.map((deal, index) => (
                <div key={index} className="flat-card p-6 transition-colors duration-200 flex-none w-64 snap-start md:w-auto glass-highlight tilt-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className="glass-control glass-strong h-10 w-10 flex items-center justify-center text-neutral-900">
                      <deal.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div className="bg-white/60 glass-elevated text-accent-600 px-2 py-1 text-sm font-medium">
                      {deal.discount}
                    </div>
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">{deal.title}</h4>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-neutral-400 text-sm line-through">{deal.originalPrice}</span>
                    <span className="text-accent-500 text-lg font-bold">{deal.salePrice}</span>
                  </div>
                  <div className="flex items-center text-neutral-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    剩餘 {deal.timeLeft}
                  </div>
                </div>
              ))}
            </div>
            <SliderDots
              count={flashDeals.length}
              activeIndex={flashActive}
              onDotClick={(i) => {
                const el = flashRef.current
                if (!el) return
                const a = el.children[0] as HTMLElement | undefined
                const b = el.children[1] as HTMLElement | undefined
                const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
                el.scrollTo({ left: i * step, behavior: 'smooth' })
              }}
              className="mt-4"
            />
          </motion.div>

          {/* 會員制度 */}
          <motion.div
            className="flat-card p-8 mb-14 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 text-center mb-8">
              會員專屬優惠
            </h3>
            <div
              ref={memberRef}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-6 -mx-1 px-1"
              role="region"
              aria-roledescription="carousel"
              aria-label="會員專屬優惠"
            >
              {loyaltyProgram.map((level, index) => (
                <div
                  key={index}
                  className="flat-card p-6 text-center flex-none w-64 snap-start md:w-auto glass-highlight"
                >
                  <div className="glass-control glass-strong mx-auto mb-4 flex h-16 w-16 items-center justify-center text-neutral-900">
                    <level.icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <h4 className="font-bold text-xl text-neutral-900 mb-2">{level.level}</h4>
                  <p className="text-neutral-600 text-sm mb-4">{level.requirement}</p>
                  <div className="space-y-2">
                    {level.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center justify-center text-neutral-700">
                        <CheckCircle className="mr-2 h-4 w-4 text-accent-500" aria-hidden="true" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <SliderDots
              count={loyaltyProgram.length}
              activeIndex={memberActive}
              onDotClick={(i) => {
                const el = memberRef.current
                if (!el) return
                const a = el.children[0] as HTMLElement | undefined
                const b = el.children[1] as HTMLElement | undefined
                const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
                el.scrollTo({ left: i * step, behavior: 'smooth' })
              }}
              className="mt-4"
            />
          </motion.div>


        </div>
      </div>
    </section>
  )
} 
