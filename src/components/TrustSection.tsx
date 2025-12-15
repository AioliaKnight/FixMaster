'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { trackClick, trackSelectPromotion, trackViewPromotion } from '@/lib/tracking'
import { motionTimings, motionViewport } from '@/lib/motion'
import {
  ArrowRight,
  Award,
  Video,
  DollarSign,
  FileText,
  Shield,
  Clock,
  CheckCircle,
  Trophy,
  Star,
  Wrench,
  UserCog,
  Smile,
  Headset,
  BadgeCheck
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { SliderDots } from './CarouselControls'

export default function TrustSection() {
  const promisesId = 'trust-promises'
  const certsId = 'trust-certs'
  const titleRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: titleRef, offset: ['start end', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 6])

  // 滑動狀態與同步（promises）
  const promisesRef = useRef<HTMLDivElement>(null)
  const [promisesActive, setPromisesActive] = useState(0)
  useEffect(() => {
    const el = promisesRef.current
    if (!el) return
    const onScroll = () => {
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
      if (step > 0) setPromisesActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])

  // 滑動狀態與同步（certs）
  const certsRef = useRef<HTMLDivElement>(null)
  const [certsActive, setCertsActive] = useState(0)
  useEffect(() => {
    const el = certsRef.current
    if (!el) return
    const onScroll = () => {
      const a = el.children[0] as HTMLElement | undefined
      const b = el.children[1] as HTMLElement | undefined
      const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
      if (step > 0) setCertsActive(Math.round(el.scrollLeft / step))
    }
    el.addEventListener('scroll', onScroll, { passive: true } as AddEventListenerOptions)
    onScroll()
    return () => el.removeEventListener('scroll', onScroll as any)
  }, [])
  const promises = [
    {
      icon: Award,
      title: '原廠 IRP 認證技師',
      description: '把你的手機交給真正了解它的人。',
      details: [
        '官方認證技師執照',
        '定期技術培訓更新',
        '嚴格品質控制標準',
        '專業維修設備工具'
      ],
      badge: 'Apple 認證',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Video,
      title: '所有維修全程錄影',
      description: '每一步都看得見，安心是我們的承諾。',
      details: [
        '高清攝影完整記錄',
        '拆裝過程清楚可見',
        '零件更換全程錄影',
        '可提供影片副本'
      ],
      badge: '透明維修',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: DollarSign,
      title: '透明價目＋現場拆裝示意',
      description: '報價先講清楚，不修就不收。',
      details: [
        '事前詳細報價說明',
        '現場拆裝流程展示',
        '零件來源公開透明',
        '收費項目明細列表'
      ],
      badge: '價格透明',
      color: 'from-gold-500 to-gold-600'
    },
    {
      icon: FileText,
      title: '二手機皆有檢測報告＋配件保固',
      description: '每支都有身分證，買前更踏實。',
      details: [
        '30 項功能檢測',
        '電池健康度報告',
        '外觀狀況評級',
        '配件齊全保固'
      ],
      badge: '品質保證',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const certifications = [
    {
      title: 'Apple IRP 認證',
      description: '獨立維修商資格',
      icon: 'brand_logo'
    },
    {
      title: '原廠零件供應',
      description: '正品零件保證',
      icon: Wrench
    },
    {
      title: '專業技師執照',
      description: '經驗豐富團隊',
      icon: UserCog
    },
    {
      title: '品質管理認證',
      description: 'ISO 品質標準',
      icon: Trophy
    }
  ]

  const statistics = [
    {
      number: '5000+',
      label: '成功維修案例',
      icon: Wrench,
    },
    {
      number: '99.8%',
      label: '客戶滿意度',
      icon: Smile,
    },
    {
      number: '3年+',
      label: '專業經驗',
      icon: BadgeCheck,
    },
    {
      number: '24/7',
      label: '客服支援',
      icon: Headset,
    },
  ]

  return (
    <section id="trust" className="section-padding relative" aria-labelledby="trust-heading">
      <div className="pointer-events-none absolute inset-x-[-10%] -top-20 h-72 bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(255,255,255,0.08),_rgba(255,255,255,0))] blur-[120px]" aria-hidden="true" />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* 區塊標題 */}
          <motion.div 
            ref={titleRef}
            className="text-center mb-14 md:mb-16"
            variants={{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }}
            initial="initial"
            whileInView="animate"
            transition={motionTimings.soft}
            viewport={motionViewport}
            style={{ y: titleY }}
            onViewportEnter={() => trackViewPromotion({ section: 'trust', label: '我們的安心承諾' })}
          >
            <h2 id="trust-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6 sheen-hover text-balance">
              我們的安心承諾
            </h2>
            <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto text-pretty">
              IRP 認證 + 原廠零件 + 全程錄影存證 + 雲端保固，維修前後都有紀錄可查，不維修不收費。
            </p>
            <div className="w-16 h-1 bg-neutral-300 mx-auto mt-8"></div>
          </motion.div>

          {/* 主要承諾 */}
          <div className="space-y-12 md:space-y-14">
            <motion.div
              id={promisesId}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-10 -mx-1 px-1 pb-2"
              role="region"
              aria-roledescription="carousel"
              aria-label="主要承諾"
              ref={promisesRef}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              viewport={motionViewport}
            >
              {promises.map((promise, index) => (
                <motion.div
                  key={index}
                  className="glass-surface flex-none w-[22rem] snap-start md:w-auto motion-soft-enter tilt-hover sheen-hover flex flex-col"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...motionTimings.soft, delay: index * 0.08 }}
                  viewport={motionViewport}
                  whileHover={{ y: -4, scale: 1.01 }}
                >
                  <div className="p-6 md:p-8 space-y-6 md:space-y-7 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="glass-control w-14 h-14 flex items-center justify-center text-neutral-900 shadow-[var(--elev-2)]">
                        <promise.icon className="w-7 h-7" />
                      </div>
                      <span className="glass-control px-3 py-1.5 text-[13px] font-bold text-neutral-700 bg-white/50">
                        {promise.badge}
                      </span>
                    </div>
                    <div className="space-y-2.5">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 text-balance">{promise.title}</h3>
                      <p className="text-base text-neutral-600 leading-relaxed text-pretty">{promise.description}</p>
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {promise.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-3 text-[15px] text-neutral-700 font-medium">
                          <CheckCircle className="h-4 w-4 text-[#00C805] shrink-0" aria-hidden="true" />
                          <span className="text-pretty">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <SliderDots
              count={promises.length}
              activeIndex={promisesActive}
              onDotClick={(i) => {
                const el = promisesRef.current
                if (!el) return
                const a = el.children[0] as HTMLElement | undefined
                const b = el.children[1] as HTMLElement | undefined
                const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
                el.scrollTo({ left: i * step, behavior: 'smooth' })
              }}
              className="md:hidden mt-1"
            />
          </div>


{/* 認證資格 */}
<motion.div
  className="glass-panel mt-16 md:mt-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={motionTimings.soft}
  viewport={motionViewport}
>
  <div className="p-8 md:p-10 space-y-8 md:space-y-10">
    <div className="text-center space-y-3">
      <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 text-balance">專業認證與資格</h3>
      <p className="text-neutral-600 text-base md:text-lg text-pretty">
        每一張證書都對應 Apple 官方准許的維修流程與零件管控，維修全程可追溯。
      </p>
    </div>
    <div
      id={certsId}
      className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 -mx-1 px-1"
      role="region"
      aria-roledescription="carousel"
      aria-label="專業認證與資格"
      ref={certsRef}
    >
      {certifications.map((cert, index) => (
        <motion.div
          key={index}
          className="glass-surface p-6 md:p-8 text-center flex-none w-56 snap-start md:w-auto motion-soft-enter bg-white/40"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...motionTimings.soft, delay: index * 0.08 }}
          viewport={motionViewport}
        >
          <div className="glass-control mx-auto mb-5 flex h-16 w-16 items-center justify-center text-neutral-900 shadow-[var(--elev-2)]">
            {cert.icon === 'brand_logo' ? (
              <Image
                src="/logo.svg"
                alt="FixMaster 品牌標誌"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <cert.icon className="h-7 w-7" aria-hidden="true" />
            )}
          </div>
          <h4 className="font-bold text-neutral-900 mb-2 text-lg tracking-tight text-balance">{cert.title}</h4>
          <p className="text-neutral-600 text-sm leading-relaxed font-medium text-pretty">{cert.description}</p>
        </motion.div>
      ))}
    </div>
    <SliderDots
      count={certifications.length}
      activeIndex={certsActive}
      onDotClick={(i) => {
        const el = certsRef.current
        if (!el) return
        const a = el.children[0] as HTMLElement | undefined
        const b = el.children[1] as HTMLElement | undefined
        const step = a && b ? (b.offsetLeft - a.offsetLeft) : el.clientWidth
        el.scrollTo({ left: i * step, behavior: 'smooth' })
      }}
      className="md:hidden -mt-2"
    />
  </div>
</motion.div>

{/* Apple 官方認證驗證 */}
<motion.div
  className="glass-panel mt-16 md:mt-20"
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={motionTimings.soft}
  viewport={motionViewport}
>
  <div className="p-8 md:p-12 space-y-8 text-center">
    <div className="space-y-3">
      <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 text-balance">Apple 官方認證</h3>
      <p className="text-neutral-600 text-base md:text-lg text-pretty">
        透過 Apple 官方系統即可查詢 FixMaster 的獨立維修商資格，搜尋「聯豐通信」（台北市）。
      </p>
    </div>
    <div className="glass-surface p-6 md:p-8 flex flex-col items-center gap-5 text-neutral-700 text-sm bg-white/40 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Image src="/logo.svg" alt="FixMaster 品牌標誌" width={48} height={48} className="h-12 w-12 object-contain" />
        <div className="text-left">
          <p className="text-lg font-bold text-neutral-900 text-balance">聯豐通信有限公司</p>
          <p className="font-medium text-neutral-600 text-pretty">Apple 官方認證獨立維修中心</p>
        </div>
      </div>
      <p className="leading-relaxed text-base max-w-lg text-pretty">
        前往官方頁面後，於搜尋欄輸入「聯豐通信」並選擇地區「台北市」，即可看到 FixMaster 士林店的認證資訊。
      </p>
    </div>
    <a
      href="https://support.apple.com/zh-tw/repair/verify-repair-provider"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center justify-center btn-primary px-8 py-4 font-bold text-white motion-hover-pop text-[15px]"
      onClick={() => trackSelectPromotion({ section: 'trust', action: 'link_click', target: 'apple_verify', label: 'verify' })}
    >
      Apple 官方驗證頁面
      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  </div>
</motion.div>

          {/* 統計數據 */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mt-16 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            {statistics.map((stat, index) => (
              <div key={index} className="glass-surface p-6 md:p-8 text-center bg-white/40 backdrop-blur-[30px]">
                <div className="glass-control w-14 h-14 flex items-center justify-center mx-auto mb-4 text-neutral-900 shadow-[var(--elev-2)]">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-neutral-900 mb-1 tracking-tight">{stat.number}</div>
                <div className="text-neutral-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* 服務承諾 */}
          <motion.div
            className="glass-panel mt-16 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="p-8 md:p-12 text-center space-y-8">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 text-balance">
                  我們的服務承諾
                </h3>
                <p className="text-neutral-600 text-base md:text-lg max-w-3xl mx-auto text-pretty">
                  原廠零件、透明錄影存證、資料與零件雙重檢測。專注於士林、北投、大同、中山區 iPhone 用戶，提供最安心的在地維修體驗。
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {['30 分鐘快速完修', '90 天保固追蹤', 'Apple 認證零件', '全程透明錄影'].map((pill) => (
                  <span key={pill} className="glass-control px-6 py-3 text-[15px] font-bold text-neutral-900 motion-hover-pop shadow-[var(--elev-2)]">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
