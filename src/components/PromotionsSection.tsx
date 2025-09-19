'use client'

import { motion } from 'framer-motion'
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

export default function PromotionsSection() {
  const mainRef = useRef<HTMLDivElement>(null)
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
      originalPrice: 'Apple 官方 TBA',
      salePrice: '預約後告知',
      discount: '9折優惠',
      timeLeft: '48小時',
      icon: Smartphone,
    },
    {
      title: 'iPhone 17 電池更換（預約備料）',
      originalPrice: 'Apple官方 TBA',
      salePrice: '備料後通知',
      discount: '9折優惠',
      timeLeft: '72小時',
      icon: Battery,
    },
    {
      title: 'iPhone 17 全機檢測',
      originalPrice: '官方 TBA',
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
    <section id="promotions" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          {/* 區塊標題 */}
          <motion.div 
            className="text-center mb-14 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
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
                className="bg-white flat-card p-6 md:p-8 group relative overflow-hidden transition-all duration-200 flex-none w-[22rem] snap-start md:w-auto glass-highlight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* 移除背景漸層，改為純白卡片 */}
                
                {/* 標章 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-white glass-elevated flex items-center justify-center">
                    <promo.icon className="w-8 h-8 text-neutral-900" />
                  </div>
                  <div className="text-accent-600 text-sm font-medium">
                    {promo.badge}
                  </div>
                </div>

                {/* 標題與描述 */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {promo.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {promo.description}
                </p>

                {/* 價格 */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-neutral-400 text-sm line-through">
                      {promo.originalPrice}
                    </span>
                    <span className="text-neutral-900 text-lg font-semibold">
                      {promo.discountPrice}
                    </span>
                  </div>
                  <div className="text-neutral-500 text-sm">
                    有效期限：{promo.validUntil}
                  </div>
                </div>

                {/* 條件說明 */}
                <div className="space-y-2 mb-6">
                  {promo.terms.map((term, termIndex) => (
                    <div key={termIndex} className="flex items-center">
                      <Star className="w-4 h-4 text-neutral-900 mr-2 flex-shrink-0" />
                      <span className="text-neutral-600 text-sm">{term}</span>
                    </div>
                  ))}
                </div>

                {/* 立即使用按鈕 */}
                <button 
                  className="w-full flat-button font-medium bg-white/50 glass-elevated hover:bg-white/60 text-neutral-900 py-3 transition-colors duration-200"
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
            className="bg-white flat-card p-8 mb-14 md:mb-16"
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
                <div key={index} className="bg-white flat-card p-6 transition-colors duration-200 flex-none w-64 snap-start md:w-auto glass-highlight">
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
            className="bg-neutral-50 flat-card p-8 mb-14 md:mb-16"
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
                  className="bg-white flat-card p-6 text-center flex-none w-64 snap-start md:w-auto glass-highlight"
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
