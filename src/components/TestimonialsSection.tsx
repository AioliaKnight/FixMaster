'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Star, Quote, User, CheckCircle, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [slidesPerView, setSlidesPerView] = useState(1)

  const testimonials = [
    {
      name: '陳小姐',
      rating: 5,
      comment: '螢幕摔破了很緊張，但 FixMaster 的師傅很專業，現場錄影讓我很安心。30分鐘就修好了，品質跟新的一樣！',
      service: 'iPhone 12 螢幕更換',
      location: '士林區',
      date: '2024年3月',
      highlight: '快速專業',
      avatar: '👩‍💼'
    },
    {
      name: '王先生',
      rating: 5,
      comment: '電池健康度只剩65%，換了原廠電池後又可以用一整天了。價格透明，服務很好，推薦給大家！',
      service: 'iPhone 13 電池更換',
      location: '天母區',
      date: '2024年3月',
      highlight: '原廠安心',
      avatar: '👨‍💻'
    },
    {
      name: '林小姐',
      rating: 5,
      comment: '在這裡買了一台二手iPhone 14，附完整檢測報告，還有保固，比其他店家安心多了！',
      service: '二手 iPhone 14 購買',
      location: '北投區',
      date: '2024年2月',
      highlight: '品質保證',
      avatar: '👩‍🎓'
    },
    {
      name: '張先生',
      rating: 5,
      comment: '工作太忙沒時間送修，到府收送服務太方便了！當天收件隔天就修好送回，超讚的服務！',
      service: '到府收送維修',
      location: '中山區',
      date: '2024年2月',
      highlight: '便民服務',
      avatar: '👨‍🔧'
    },
    {
      name: '黃小姐',
      rating: 5,
      comment: '很怕遇到黑心維修店，但這裡是Apple認證的，而且全程錄影，讓我很放心。師傅技術很好！',
      service: 'iPhone 11 螢幕更換',
      location: '大同區',
      date: '2024年1月',
      highlight: '透明維修',
      avatar: '👩‍🏫'
    },
    {
      name: '李先生',
      rating: 5,
      comment: '朋友推薦來的，果然沒讓我失望！師傅很細心，保固也很完整，以後iPhone有問題就來這裡！',
      service: 'iPhone 12 Pro 螢幕更換',
      location: '松山區',
      date: '2024年1月',
      highlight: '口碑推薦',
      avatar: '👨‍🚀'
    },
    // 新增更多真實評價
    {
      name: '吳小姐',
      rating: 5,
      comment: '現場維修透明又快速，還有詳細檢測報告，讓我很放心。推薦給身邊朋友！',
      service: 'iPhone 13 Pro Max 螢幕更換',
      location: '內湖區',
      date: '2024年2月',
      highlight: '透明快修',
      avatar: '👩‍🔬'
    },
    {
      name: '周先生',
      rating: 5,
      comment: '客服回覆超快，LINE預約很方便，維修師傅專業又親切，價格合理。',
      service: 'iPhone 14 Pro 電池更換',
      location: '信義區',
      date: '2024年3月',
      highlight: '客服親切',
      avatar: '👨‍🏫'
    },
    {
      name: '曾小姐',
      rating: 5,
      comment: '二手機品質超乎預期，外觀幾乎全新，還有保固，CP值很高！',
      service: '二手 iPhone 13 購買',
      location: '文山區',
      date: '2024年2月',
      highlight: '高CP值',
      avatar: '👩‍💻'
    },
    {
      name: '許先生',
      rating: 5,
      comment: '維修流程透明，現場拆裝全程錄影，完全不用擔心被換零件。',
      service: 'iPhone 12 主機板維修',
      location: '大安區',
      date: '2024年1月',
      highlight: '安心透明',
      avatar: '👨‍🔬'
    },
    {
      name: '鄭小姐',
      rating: 5,
      comment: '到府收送超方便，省去自己跑一趟的麻煩，服務很貼心。',
      service: 'iPhone 13 Pro Max 到府收送',
      location: '中正區',
      date: '2024年3月',
      highlight: '到府貼心',
      avatar: '👩‍🚒'
    },
    {
      name: '林先生',
      rating: 5,
      comment: '維修後手機像新的一樣，還有90天保固，真的很有保障。',
      service: 'iPhone 11 Pro Max 螢幕更換',
      location: '萬華區',
      date: '2024年2月',
      highlight: '保固保障',
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
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              顧客真實好評
            </h2>
            <p className="text-neutral-600 text-lg sm:text-xl max-w-2xl mx-auto">
              超過1000位顧客的信任與推薦，品質與服務獲得一致好評
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-8"></div>
          </motion.div>

          {/* 統計數據 */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white flat-card p-4 md:p-6">
                <div className="w-12 h-12 bg-accent-500 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{stat.number}</div>
                <div className="text-neutral-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* 評價輪播 */}
          <div className="relative mb-16">
            {/* 輪播控制按鈕 - 桌面版 */}
            {indicatorCount > 1 && (
              <div className="hidden md:flex items-center justify-between absolute top-1/2 left-0 right-0 z-10 pointer-events-none">
                <button
                  onClick={prevSlide}
                  className="pointer-events-auto bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 w-14 h-14 flex items-center justify-center transition-colors duration-200 ml-4 rounded-full shadow-md"
                  aria-label="上一則評價"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={nextSlide}
                  className="pointer-events-auto bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 w-14 h-14 flex items-center justify-center transition-colors duration-200 mr-4 rounded-full shadow-md"
                  aria-label="下一則評價"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>
            )}

            {/* 輪播內容 */}
            <div className="overflow-hidden relative">
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
                            className="bg-white flat-card p-5 md:p-8 border border-neutral-200 hover:border-accent-300 transition-all duration-200 h-full shadow-sm rounded-xl flex flex-col justify-between min-h-[340px] md:min-h-[320px]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            viewport={{ once: true }}
                          >
                            {/* 標籤與引號 */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="bg-accent-500 text-white px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-br-lg">
                                {testimonial.highlight}
                              </div>
                              <Quote className="w-6 h-6 text-neutral-300" />
                            </div>
                            {/* 評價內容 */}
                            <p className="text-neutral-700 mb-3 leading-relaxed text-base text-center flex-1">
                              "{testimonial.comment}"
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
                              <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center mr-3 rounded-full border border-neutral-200">
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
              <div className="flex items-center justify-center mt-8 space-x-3">
                {Array.from({ length: indicatorCount }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-4 h-4 rounded-full border-2 transition-colors duration-200 ${
                      index === currentSlide ? 'bg-accent-500 border-accent-500' : 'bg-neutral-200 border-neutral-300'
                    }`}
                    aria-label={`前往第 ${index + 1} 組評價`}
                  />
                ))}
              </div>
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
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium">
                Apple IRP 認證
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium">
                全程透明錄影
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium">
                90天保固
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium">
                30分鐘快修
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 