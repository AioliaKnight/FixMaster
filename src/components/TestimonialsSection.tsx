'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { Star, Quote, User, CheckCircle } from 'lucide-react'
import { SliderArrows, SliderDots } from './CarouselControls'

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  // Mobile dots for stats scroller
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(0)
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const onScroll = () => {
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
      if (step > 0) setStatsActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  // Mobile dots for conclusion tags
  const tagsRef = useRef<HTMLDivElement>(null)
  const [tagsActive, setTagsActive] = useState(0)
  useEffect(() => {
    const el = tagsRef.current
    if (!el) return
    const onScroll = () => {
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
      if (step > 0) setTagsActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  const testimonials = [
    {
      name: '張小姐',
      rating: 5,
      comment: '手機螢幕碎了超慌，現場透明維修很安心，40 分鐘就搞定，色彩跟手感都很好。',
      service: 'iPhone 14 螢幕更換',
      location: '士林區',
      date: '2025年3月',
      highlight: '快速完修',
      avatar: '👩‍💼'
    },
    {
      name: '陳先生',
      rating: 5,
      comment: '電池健康 72% 幾乎一天充兩次，更換後續航明顯回來了，價格透明、過程也都有檢測。',
      service: 'iPhone 13 電池更換',
      location: '北投區',
      date: '2025年2月',
      highlight: '續航回復',
      avatar: '👨‍🔧'
    },
    {
      name: '李小姐',
      rating: 5,
      comment: '買了二手 iPhone 14 Pro，外觀近新，附檢測報告與保固，用到現在都很穩。',
      service: '二手 iPhone 14 Pro 購買',
      location: '天母',
      date: '2025年2月',
      highlight: '品質嚴選',
      avatar: '👩‍🎓'
    },
    {
      name: '王先生',
      rating: 5,
      comment: '到府收送真的省事，昨晚送修、隔天傍晚就送回了，過程都有通知與檢測結果。',
      service: '到府收送維修',
      location: '中山區',
      date: '2025年1月',
      highlight: '省時便利',
      avatar: '👨‍💻'
    },
    {
      name: '林先生',
      rating: 5,
      comment: '現場錄影拆裝，零件來源解釋得很清楚，維修後還做一輪完整測試，專業度很夠。',
      service: 'iPhone 12 相機維修',
      location: '內湖區',
      date: '2025年1月',
      highlight: '透明專業',
      avatar: '👨‍🏫'
    },
    {
      name: '黃小姐',
      rating: 5,
      comment: '原以為 Face ID 不能用了，結果是排線鬆脫，檢測後就排除問題，價格合理。',
      service: 'Face ID 排線檢測',
      location: '大同區',
      date: '2024年12月',
      highlight: '問題排除',
      avatar: '👩‍💻'
    },
    {
      name: '吳先生',
      rating: 5,
      comment: '手機進水立刻關機送修，店家有專業清洗與檢測，最後資料也救回來，感謝！',
      service: '進水清洗與資料救援',
      location: '中正區',
      date: '2024年12月',
      highlight: '資料救援',
      avatar: '👨‍🚒'
    },
    {
      name: '周小姐',
      rating: 5,
      comment: '客服回覆很快，報價清楚，維修完成後還提供檢測紀錄與保固，整體體驗很好。',
      service: 'iPhone 13 充電模組維修',
      location: '文山區',
      date: '2024年11月',
      highlight: '完整交付',
      avatar: '👩‍🔬'
    },
    {
      name: '許先生',
      rating: 5,
      comment: '價格比想像中合理，重點是專業、流程清楚，之後有需要還會再來。',
      service: 'iPhone 12 Pro Max 螢幕更換',
      location: '松山區',
      date: '2024年11月',
      highlight: '高CP值',
      avatar: '👨‍🎨'
    }
  ]

  const stats = [
    {
      icon: User,
      number: '1,200+',
      label: '滿意客戶'
    },
    {
      icon: Star,
      number: '4.9',
      label: '平均評分'
    },
    {
      icon: CheckCircle,
      number: '98%',
      label: '好評率'
    },
    {
      icon: Quote,
      number: '500+',
      label: '真實評價'
    }
  ]

  // 響應式處理
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3)
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2)
      } else {
        setSlidesPerView(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 計算指示器數量，添加防呆機制
  const indicatorCount = useMemo(() => {
    if (testimonials.length <= slidesPerView) {
      return 1 // 如果評價數量少於或等於每頁顯示數量，只顯示一個指示器
    }
    return Math.max(1, Math.ceil(testimonials.length / slidesPerView))
  }, [testimonials.length, slidesPerView])

  // 自動播放功能
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          return prev >= indicatorCount - 1 ? 0 : prev + 1
        })
      }, 4000)
    }
    return () => clearInterval(interval)
  }, [isAutoPlaying, indicatorCount])

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
    setCurrentSlide((prev) => {
      return prev >= indicatorCount - 1 ? 0 : prev + 1
    })
  }, [indicatorCount])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      return prev <= 0 ? indicatorCount - 1 : prev - 1
    })
  }, [indicatorCount])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`}
      />
    ))
  }

  const maxSlide = testimonials.length - slidesPerView

  return (
    <section id="testimonials" className="section-padding bg-neutral-50">
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
              顧客真實好評
            </h2>
            <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto">
              真實評價，來自每一次信賴。
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-8"></div>
          </motion.div>

          {/* 統計數據 */}
          <motion.div 
            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-4 md:gap-8 mb-3 md:mb-14 -mx-1 px-1"
            ref={statsRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="顧客評價統計數據"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white flat-card p-4 md:p-6 flex-none w-56 snap-start md:w-auto glass-highlight">
                <div className="w-12 h-12 bg-accent-500 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{stat.number}</div>
                <div className="text-neutral-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
          <SliderDots
            count={stats.length}
            activeIndex={statsActive}
            onDotClick={(i) => {
              const el = statsRef.current
              if (!el) return
              const a = el.children[0] as HTMLElement | undefined
              const b = el.children[1] as HTMLElement | undefined
              const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
              el.scrollTo({ left: i * step, behavior: 'smooth' })
            }}
            className="mb-12"
          />

          {/* 評價輪播 */}
          <div className="relative mb-14 md:mb-16" role="region" aria-label="顧客評價輪播">
            {indicatorCount > 1 && (
              <SliderArrows
                onPrev={prevSlide}
                onNext={nextSlide}
                ariaLabelPrev="上一則評價"
                ariaLabelNext="下一則評價"
              />
            )}

            {/* 輪播內容 */}
            <div
              className="overflow-hidden relative"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* 為每個頁面創建一個容器 */}
                {Array.from({ length: indicatorCount }, (_, pageIndex) => (
                  <div 
                    key={pageIndex}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className={`grid gap-4 md:gap-6 ${
                      slidesPerView === 1 ? 'grid-cols-1' : 
                      slidesPerView === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {testimonials
                        .slice(pageIndex * slidesPerView, (pageIndex + 1) * slidesPerView)
                        .map((testimonial, index) => (
                          <motion.div
                            key={pageIndex * slidesPerView + index}
                            className="bg-white flat-card p-6 transition-all duration-200 h-full flex flex-col justify-between min-h-[320px] glass-highlight"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            viewport={{ once: true }}
                          >
                            {/* 引號（去除色塊標籤） */}
                            <div className="flex items-center justify-end mb-3">
                              <Quote className="w-5 h-5 text-neutral-300" />
                            </div>
                            {/* 評價內容 */}
                             <p className="text-neutral-700 mb-3 leading-relaxed text-base text-center flex-1">
                               “{testimonial.comment}”
                             </p>
                            {/* 服務項目 */}
                            <div className="text-xs text-neutral-400 mb-2 text-center">{testimonial.service}</div>
                            {/* 評分 */}
                            <div className="flex items-center justify-center mb-3">
                              {renderStars(testimonial.rating)}
                              <span className="ml-2 text-xs text-neutral-500">{testimonial.rating}.0</span>
                            </div>
                            {/* 客戶資訊 */}
                            <div className="flex items-center justify-center mt-auto">
                              <div className="w-10 h-10 bg-white glass-elevated flex items-center justify-center mr-3">
                                <span className="text-lg">{testimonial.avatar}</span>
                              </div>
                              <div>
                                <div className="font-medium text-neutral-900 text-sm">{testimonial.name}</div>
                                <div className="text-neutral-400 text-xs">{testimonial.location} • {testimonial.date}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 輪播指示器 - 只在有多個頁面時顯示 */}
            {indicatorCount > 1 && (
              <SliderDots
                count={indicatorCount}
                activeIndex={currentSlide}
                onDotClick={goToSlide}
                className="mt-6 md:mt-8"
              />
            )}
          </div>

          {/* 結語 */}
          <motion.div
            className="bg-white flat-card p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
              值得信賴的維修專家
            </h3>
            <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
              我們致力於提供最優質的維修服務，每一位客戶的滿意都是我們前進的動力
            </p>
            <div
              ref={tagsRef}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-3 justify-start md:justify-center -mx-1 px-1"
              role="region"
              aria-roledescription="carousel"
              aria-label="信任結語標籤"
            >
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium flex-none snap-start">
                Apple IRP 認證
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium flex-none snap-start">
                全程透明錄影
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium flex-none snap-start">
                90天保固
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium flex-none snap-start">
                30分鐘快修
              </div>
            </div>
            <SliderDots
              count={4}
              activeIndex={tagsActive}
              onDotClick={(i) => {
                const el = tagsRef.current
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