'use client'

import { motion } from 'framer-motion'
import { scrollToSectionId } from '@/lib/scroll'
import { useState, useEffect, useCallback, useRef } from 'react'
import { 
  Smartphone, 
  Battery, 
  Monitor, 
  Shield, 
  Truck, 
  Video, 
  CheckCircle, 
  Clock,
  Award,
  Wrench
} from 'lucide-react'
import { SliderArrows, SliderDots } from './CarouselControls'
import { trackClick } from '@/lib/tracking'
import SectionHeader from './ui/SectionHeader'
import Button from './ui/Button'
import { motionTimings, motionViewport } from '@/lib/motion'

export default function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Mobile dots for additional services
  const additionalRef = useRef<HTMLDivElement>(null)
  const [additionalActive, setAdditionalActive] = useState(0)
  useEffect(() => {
    const el = additionalRef.current
    if (!el) return
    const onScroll = () => {
      if (!el) return
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      if (!a || !b) { setAdditionalActive(0); return }
      const step = b.offsetLeft - a.offsetLeft
      if (step > 0) setAdditionalActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  // Mobile dots for steps
  const stepsRef = useRef<HTMLDivElement>(null)
  const [stepsActive, setStepsActive] = useState(0)
  useEffect(() => {
    const el = stepsRef.current
    if (!el) return
    const onScroll = () => {
      if (!el) return
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      if (!a || !b) { setStepsActive(0); return }
      const step = b.offsetLeft - a.offsetLeft
      if (step > 0) setStepsActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  const services = [
    {
      icon: Monitor,
      title: 'iPhone 原廠螢幕更換',
      tagline: '觸控靈敏、色準穩定，體驗如新。',
      features: ['原廠 OLED 顯示', '觸控零延遲', '色彩準確穩定', '90 天功能保固'],
      price: '$8,900 起',
      duration: '約 30–60 分鐘',
      models: ['iPhone 12–17 系列'],
      warranty: '90 天螢幕功能保固',
    },
    {
      icon: Battery,
      title: '原廠電池更換',
      tagline: '健康度回復穩定，續航重現。',
      features: ['原廠電池芯片', '健康度回復穩定', '支援快充', '90 天電池保固'],
      price: '$2,990 起',
      duration: '約 30–45 分鐘',
      models: ['iPhone 11–17 系列'],
      warranty: '90 天電池效能保固',
    },
    {
      icon: Smartphone,
      title: '二手 iPhone 嚴選',
      tagline: '附完整檢測與保固，嚴選可信賴。',
      features: ['30 項功能檢測', '外觀等級清楚標示', '配件齊全', '30 天硬體保固'],
      price: '$8,000 起',
      duration: '現場挑選',
      models: ['iPhone 11-14 系列'],
      warranty: '30 天硬體功能保固',
    },
    {
      icon: Truck,
      title: '到府收送服務',
      tagline: '台北市區到府收送，方便省時。',
      features: ['台北市區專送', '當日收件處理', '完修後送回', '全程保險保障'],
      price: '滿 $1,500 免費',
      duration: '1-2 個工作天',
      models: ['所有 iPhone 機型'],
      warranty: '與維修項目相同',
    },
    {
      icon: Wrench,
      title: '資料救援 / 主機板級維修',
      tagline: '專案級處理，透明評估風險與成功率。',
      features: ['免費初檢與評估', '進水/摔落/短路故障處理', '資料救援評估', '施工流程與風險說明'],
      price: '檢測後報價',
      duration: '約 2–4 小時起（視狀況）',
      models: ['iPhone 11–17 系列'],
      warranty: '依項目提供保固',
    }
  ]

  const additionalServices = [
    {
      icon: Video,
      title: '全程錄影服務',
      description: '維修過程完整記錄，透明安心'
    },
    {
      icon: Shield,
      title: '90天安心保固',
      description: '維修品質保證，問題免費處理'
    },
    {
      icon: Clock,
      title: '1 小時內完修',
      description: '現場等候，快速完成維修'
    },
    {
      icon: Award,
      title: 'Apple IRP 認證',
      description: '官方認證技師，品質有保障'
    }
  ]

  // 自動播放功能
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % services.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, services.length])

  // 遵循使用者「減少動態」偏好：預設關閉自動播放
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      setIsAutoPlaying(false)
    }
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsAutoPlaying(false)
    }
    mediaQuery.addEventListener?.('change', handleChange)
    return () => mediaQuery.removeEventListener?.('change', handleChange)
  }, [])

  // 觸控手勢處理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }, [services.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }, [services.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // 計算是否需要顯示輪播控制項
  const shouldShowControls = services.length > 1

  return (
    <section
      id="services"
      className="section-padding relative overflow-hidden bg-gradient-to-b from-neutral-100 via-white to-neutral-50"
    >
      <div
        className="pointer-events-none absolute inset-x-[-10%] -top-40 h-72 rounded-full bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.18),rgba(239,68,68,0))] blur-3xl"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* iPhone 系列支援提示 */}
          <motion.div 
            className="glass-surface p-1 mb-10 motion-soft-enter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="glass-content flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-4 py-4 md:px-6 md:py-5">
              <p className="text-neutral-900 text-sm md:text-base">
                iPhone 12–17 系列均支援免費檢測與備料預約。部分原廠料件供應量有限，建議先預約以安排最快時程。
              </p>
              <Button
                size="sm"
                className="w-full sm:w-auto motion-hover-pop"
                onClick={() => {
                  trackClick('services_precheck_cta', { section: 'services', from: 'iphone17_notice' })
                  scrollToSectionId('contact')
                }}
              >
                立即預約檢測
              </Button>
            </div>
          </motion.div>
          {/* 區塊標題 */}
          <motion.div 
            className="text-center mb-14 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <SectionHeader title="專業服務項目" description="專業 iPhone 維修與二手選購，透明報價、品質有保障。" />
            <p className="mt-4 text-sm text-neutral-500">
              依照維修類型為您推薦最快速的完修方案，保固說明與價格均會於檢測後再次確認。
            </p>
          </motion.div>

          {/* 服務輪播 */}
          <div className="relative mb-14 md:mb-16" role="region" aria-label="服務項目輪播">
            {shouldShowControls && (
              <SliderArrows
                onPrev={prevSlide}
                onNext={nextSlide}
                ariaLabelPrev="上一個服務"
                ariaLabelNext="下一個服務"
              />
            )}

            {/* 輪播內容 */}
            <div
              className="overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {services.map((service, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="max-w-2xl mx-auto">
                      <motion.div
                        className="glass-panel p-1 flex flex-col gap-4 motion-soft-enter tilt-hover specular"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={motionTimings.medium}
                        viewport={motionViewport}
                      >
                        <div className="glass-content flex flex-col gap-8 p-8 md:p-10">
                        {/* 服務圖示與標題 */}
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="glass-control w-20 h-20 flex items-center justify-center text-accent-500">
                            <service.icon className="w-10 h-10" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 tracking-tight">
                              {service.title}
                            </h3>
                            <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                              {service.tagline}
                            </p>
                          </div>
                        </div>

                        {/* 服務詳細資訊 */}
                        <div className="surface-muted p-4 md:p-5 grid grid-cols-2 gap-4 text-center">
                          <div className="space-y-1">
                            <span className="text-neutral-500 text-xs uppercase tracking-[0.2em]">維修時間</span>
                            <span className="text-neutral-900 text-sm font-semibold">{service.duration}</span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-neutral-500 text-xs uppercase tracking-[0.2em]">適用機型</span>
                            <span className="text-neutral-900 text-sm font-semibold">{service.models.join('、')}</span>
                          </div>
                        </div>

                        {/* 特色功能 */}
                        <ul className="grid gap-3">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-neutral-700 text-sm">
                              <CheckCircle className="mr-3 h-5 w-5 text-accent-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* 保固資訊 */}
                        <div className="glass-control glass-strong px-4 py-3 flex items-center justify-center gap-2 text-neutral-900 text-sm font-semibold">
                          <Shield className="h-4 w-4" />
                          <span>{service.warranty}</span>
                        </div>

                        {/* 價格和按鈕 */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                          <div className="text-center md:text-left">
                            <span className="text-neutral-500 text-xs uppercase tracking-[0.2em]">起價</span>
                            <div className="mt-1 text-2xl md:text-3xl font-semibold text-neutral-900">{service.price}</div>
                            <p className="text-neutral-500 text-xs mt-1">價格透明，無隱藏費用</p>
                            <p className="text-neutral-400 text-[11px] mt-1">實際價格以檢測後為準</p>
                          </div>
                          <Button
                            className="w-full md:w-auto motion-hover-pop"
                            onClick={() => {
                              trackClick('services_book_cta_line', { section: 'services', service: service.title })
                              const msg = encodeURIComponent(`您好，我想諮詢：${service.title}（FixMaster 官網）`)
                              window.open(`https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=services&utm_campaign=contact_line&text=${msg}`, '_blank')
                            }}
                          >
                            立即預約
                          </Button>
                        </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 輪播指示器 - 只在有多個服務時顯示 */}
            {shouldShowControls && (
              <SliderDots
                count={services.length}
                activeIndex={currentSlide}
                onDotClick={goToSlide}
                className="mt-6 md:mt-8"
              />
            )}
          </div>

          {/* 附加服務 */}
          <motion.div
            className="glass-panel p-1 mb-16 space-y-10 motion-soft-enter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="glass-content p-8 md:p-12 space-y-10">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-8 md:mb-12">
                為什麼選擇 FixMaster？
              </h3>
            <div
              ref={additionalRef}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 -mx-1 px-1"
              role="region"
              aria-roledescription="carousel"
              aria-label="為什麼選擇 FixMaster"
            >
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="text-center flex-none w-56 snap-start md:w-auto tilt-hover"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...motionTimings.soft, delay: index * 0.08 }}
                  viewport={motionViewport}
                >
                  <div className="glass-control w-16 h-16 flex items-center justify-center mx-auto mb-4 text-neutral-900">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2 tracking-tight">{service.title}</h4>
                  <p className="text-neutral-600 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
            <SliderDots
              count={additionalServices.length}
              activeIndex={additionalActive}
              onDotClick={(i) => {
                const el = additionalRef.current
                if (!el) return
                const a = el.children[0] as HTMLElement | undefined
                const b = el.children[1] as HTMLElement | undefined
                const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
                el.scrollTo({ left: i * step, behavior: 'smooth' })
              }}
              className="mt-3"
            />
            </div>
          </motion.div>

          {/* 服務流程 */}
          <motion.div
            className="glass-panel p-1 text-center motion-soft-enter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="glass-content p-8 md:p-10 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900">簡單三步驟，輕鬆完成維修</h3>
                <p className="mt-3 text-sm text-neutral-500">
                  無論現場或到府收送，每一步都有人員即時回報，保障維修進度與資料安全。
                </p>
              </div>
              <div
                ref={stepsRef}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-3 md:gap-8 -mx-1 px-1"
                role="region"
                aria-roledescription="carousel"
                aria-label="維修流程三步驟"
              >
                {[
                  { title: '聯絡預約', description: 'LINE 或電話快速預約' },
                  { title: '現場檢測', description: '免費檢測，透明報價' },
                  { title: '快速完修', description: '1小時內完修取件' },
                ].map((step, stepIndex) => (
                  <div key={step.title} className="text-center flex-none w-56 snap-start md:w-auto">
                    <div className="glass-control glass-strong w-16 h-16 flex items-center justify-center text-2xl font-semibold text-neutral-900 mx-auto mb-4">
                      {stepIndex + 1}
                    </div>
                    <h4 className="font-semibold text-neutral-900 mb-2">{step.title}</h4>
                    <p className="text-neutral-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
              <SliderDots
                count={3}
                activeIndex={stepsActive}
                onDotClick={(i) => {
                  const el = stepsRef.current
                  if (!el) return
                  const a = el.children[0] as HTMLElement | undefined
                  const b = el.children[1] as HTMLElement | undefined
                  const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
                  el.scrollTo({ left: i * step, behavior: 'smooth' })
                }}
                className="mt-3"
              />
            </div>
          </motion.div>

          
        </div>
      </div>
    </section>
  )
} 
