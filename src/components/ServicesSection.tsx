'use client'

import { motion, useInView } from 'framer-motion'
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
import { trackClick, trackGenerateLead, trackViewPromotion } from '@/lib/tracking'
import SectionHeader from './ui/SectionHeader'
import Button from './ui/Button'
import { motionTimings, motionViewport } from '@/lib/motion'

export default function ServicesSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.3 })
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
    
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
      if (!el) return
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
          if (!a || !b) {
            setAdditionalActive(0)
          } else {
      const step = b.offsetLeft - a.offsetLeft
      if (step > 0) setAdditionalActive(Math.round(el.scrollLeft / step))
    }
          ticking = false
        })
        ticking = true
      }
    }
    
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll() // Initial check
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  useEffect(() => {
    if (isTitleInView) {
      trackViewPromotion({ section: 'services', label: '專業服務項目' })
    }
  }, [isTitleInView])

  // Mobile dots for flow
  const flowRef = useRef<HTMLDivElement>(null)
  const [flowActive, setFlowActive] = useState(0)
  useEffect(() => {
    const el = flowRef.current
    if (!el) return
    
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
      if (!el) return
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
          if (!a || !b) {
            setFlowActive(0)
          } else {
      const step = b.offsetLeft - a.offsetLeft
            if (step > 0) setFlowActive(Math.round(el.scrollLeft / step))
    }
          ticking = false
        })
        ticking = true
      }
    }

    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll() // Initial check
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
      className="section-padding relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-x-[-10%] -top-40 h-72 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),rgba(255,255,255,0))] blur-3xl"
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
              <p className="text-neutral-900 text-[15px] md:text-base text-pretty">
                iPhone 12–17 系列均支援免費檢測與備料預約。部分原廠料件供應量有限，建議先預約以安排最快時程。
              </p>
              <Button
                size="sm"
                className="w-full sm:w-auto motion-hover-pop text-[15px]"
                onClick={() => {
                  trackGenerateLead({ section: 'services', action: 'cta_click', target: 'book', label: 'iphone17_notice' })
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
            variants={
              {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 }
              }
            }
            initial="initial"
            whileInView="animate"
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <SectionHeader title="專業服務項目" description="專業 iPhone 維修與二手選購，透明報價、品質有保障。" />
            <p className="mt-4 text-sm md:text-[15px] text-neutral-500 text-pretty">
              免費檢測後再報價，不維修不收費；熱門機型多數 30–60 分鐘完修，保固與價格當場說清楚。
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
                        className="glass-panel flex flex-col gap-6 md:gap-8 p-6 md:p-8 motion-soft-enter tilt-hover specular"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={motionTimings.medium}
                        viewport={motionViewport}
                      >
                        {/* 服務圖示與標題 */}
                        <div className="flex flex-col items-center text-center gap-4">
                          <div className="glass-control w-20 h-20 flex items-center justify-center text-neutral-900 shadow-(--elev-2)">
                            <service.icon className="w-10 h-10" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight text-balance">
                              {service.title}
                            </h3>
                            <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-medium text-pretty">
                              {service.tagline}
                            </p>
                          </div>
                        </div>

                        {/* 服務詳細資訊 */}
                        <div className="glass-surface p-5 md:p-6 grid grid-cols-2 gap-4 md:gap-6 text-center bg-white/40">
                          <div className="space-y-1.5">
                            <span className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold block">維修時間</span>
                            <span className="text-neutral-900 text-sm md:text-[15px] font-bold block">{service.duration}</span>
                          </div>
                          <div className="space-y-1.5">
                            <span className="text-neutral-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold block">適用機型</span>
                            <span className="text-neutral-900 text-sm md:text-[15px] font-bold block">{service.models.join('、')}</span>
                          </div>
                        </div>

                        {/* 特色功能 */}
                        <ul className="grid gap-3.5 px-1">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start text-neutral-700 text-[15px] font-medium leading-tight">
                              <CheckCircle className="mr-3 h-5 w-5 text-[#00C805] shrink-0 mt-[1px]" />
                              <span className="text-pretty">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* 保固資訊 */}
                        <div className="glass-control px-4 py-3 flex items-center justify-center gap-2 text-neutral-900 text-sm font-bold bg-white/60">
                          <Shield className="h-4 w-4 shrink-0" />
                          <span>{service.warranty}</span>
                        </div>

                        {/* 價格和按鈕 */}
                        <div className="flex flex-col md:flex-row items-end md:items-center justify-between gap-6 pt-4 border-t border-neutral-200/50">
                          <div className="text-center md:text-left w-full md:w-auto flex flex-row md:flex-col items-baseline justify-between md:justify-start">
                            <div>
                              <span className="text-neutral-500 text-[11px] uppercase tracking-[0.2em] font-semibold block mb-1">預估費用</span>
                              <div className="text-neutral-900 tracking-tight flex items-baseline gap-1">
                                <span className="text-lg font-semibold">$</span>
                                <span className="text-3xl md:text-4xl font-bold">{service.price.replace(/[^0-9,]/g, '')}</span>
                                <span className="text-sm font-medium text-neutral-500">起</span>
                              </div>
                            </div>
                            <p className="text-neutral-400 text-[11px] mt-1 hidden md:block">不維修不收費</p>
                          </div>
                          <Button
                            className="w-full md:w-auto motion-hover-pop text-[15px] px-8 py-3 h-12 shadow-(--elev-2) hover:shadow-(--elev-3)"
                            onClick={() => {
                              trackGenerateLead({ section: 'services', action: 'cta_click', target: 'line', label: 'services_book', service: service.title })
                              const msg = encodeURIComponent(`您好，我想諮詢：${service.title}（FixMaster 官網）`)
                              window.open(`https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=services&utm_campaign=contact_line&text=${msg}`, '_blank')
                            }}
                          >
                            立即預約 / 諮詢
                          </Button>
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
            className="glass-panel mb-16 space-y-10 motion-soft-enter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="p-8 md:p-12 space-y-10">
              <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-8 md:mb-12">
                為什麼選擇 FixMaster？
              </h3>
            <div
              ref={additionalRef}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8 -mx-1 px-5 pb-4 md:px-1 md:pb-0"
              role="region"
              aria-roledescription="carousel"
              aria-label="為什麼選擇 FixMaster"
            >
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="glass-surface p-5 text-center flex-none w-64 snap-center md:w-auto tilt-hover bg-white/40 flex flex-col items-center justify-center border border-white/60"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...motionTimings.soft, delay: index * 0.08 }}
                  viewport={motionViewport}
                >
                  <div className="glass-control w-16 h-16 flex items-center justify-center mx-auto mb-4 text-neutral-900 shadow-[var(--elev-2)]">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-neutral-900 mb-2 tracking-tight text-lg text-balance">{service.title}</h4>
                  <p className="text-neutral-600 text-base leading-relaxed text-pretty">{service.description}</p>
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
            className="glass-panel text-center motion-soft-enter overflow-visible"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="p-8 md:p-12 space-y-10">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 md:text-3xl">標準化維修流程</h3>
                <p className="mt-3 text-[15px] md:text-base text-neutral-500 text-pretty max-w-2xl mx-auto leading-relaxed">
                  依照 Apple 原廠規範，我們建立了一套嚴謹的 6 步驟標準作業程序 (SOP)。<br className="hidden md:block"/>
                  從收件到交機，每個環節都透明、可追蹤，保障您的權益。
                </p>
              </div>
              
              <div
                ref={flowRef}
                className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative -mx-4 px-4 md:mx-0 md:px-0 pb-8 md:pb-0"
                role="region"
                aria-roledescription="carousel"
                aria-label="維修流程"
              >
                {[
                  { title: '客戶報修', desc: '線上預約或現場接待，初步確認裝置外觀與故障狀況。', icon: Smartphone },
                  { title: '專業檢測', desc: '使用 Apple 原廠診斷工具 (AST 2) 進行全機檢測，精準定位故障點。', icon: Monitor },
                  { title: '報價與確認', desc: '區分保內/保外，詳細解說費用與風險。經您同意後才開始施工。', icon: CheckCircle },
                  { title: '維修處理', desc: '由 IRP 認證技師在防靜電環境下施工，重要環節全程錄影存證。', icon: Wrench },
                  { title: '完修複測', desc: '維修後執行全功能壓力測試與防水氣密測試，確保功能 100% 正常。', icon: Shield },
                  { title: '通知取件', desc: '清潔外觀，交付更換下來的舊零件（除電池外），並提供數位保固卡。', icon: Truck },
                ].map((step, index) => (
                  <div key={index} className="glass-surface p-6 flex flex-col items-center text-center relative z-10 hover:bg-white/60 transition-colors group min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center md:snap-align-none">
                    <div className="absolute top-4 left-4 text-[10px] font-bold text-neutral-300">
                      STEP {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="glass-control w-14 h-14 flex items-center justify-center text-neutral-900 mb-4 shadow-(--elev-2) group-hover:scale-110 transition-transform duration-300 bg-white/80">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 mb-2 text-balance">{step.title}</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed text-pretty">{step.desc}</p>
                    
                    {/* 連接線 (Desktop only) */}
                    {index !== 5 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-neutral-200/50 z-0" 
                           style={{ display: (index + 1) % 3 === 0 ? 'none' : 'block' }} 
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <SliderDots
                count={6}
                activeIndex={flowActive}
                onDotClick={(i) => {
                  const el = flowRef.current
                  if (!el) return
                  const a = el.children[0] as HTMLElement | undefined
                  const b = el.children[1] as HTMLElement | undefined
                  const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
                  el.scrollTo({ left: i * step, behavior: 'smooth' })
                }}
                className="mt-4 md:hidden"
              />

              <div className="flex justify-center">
                <p className="text-xs text-neutral-400 max-w-lg mx-auto bg-neutral-100/50 px-4 py-2 rounded-lg">
                  * 若檢測後決定不維修，我們不會收取任何檢測費用（進水清洗與主機板檢測除外）。
                </p>
              </div>
            </div>
          </motion.div>

          
        </div>
      </div>
    </section>
  )
}
