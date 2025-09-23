'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Shield, DollarSign, Smartphone, CheckCircle, AlertCircle, Monitor, Tablet, Wrench, Zap, Settings, HelpCircle, ArrowRight, Navigation, FileText } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { trackClick } from '@/lib/tracking'
import Chip from './ui/Chip'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import { motionTimings, motionViewport } from '@/lib/motion'

const focusableSelector = 'button, a[href], textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function FAQSection() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
  const [selectedFaqIndex, setSelectedFaqIndex] = useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const faqCategories = [
    {
      title: 'iPhone 維修專區',
      faqs: [
        {
          icon: Smartphone,
          question: 'iPhone 17 系列目前支援哪些維修？',
          answer: '上市月提供免費檢測與備料預約。常見項目包含：螢幕總成、電池、相機模組、背蓋玻璃與充電模組。實際交期依原廠料件到貨為準。',
          category: 'iPhone17'
        },
        {
          icon: Settings,
          question: 'iPhone 17 Face ID／Touch ID 維修與校準需要注意什麼？',
          answer: '生物辨識模組與主板綁定，維修流程需經過原廠規格檢測。可維修項目含排線與鏡頭模組異常；若涉及主板更動將於施工前完整告知風險與時程。',
          category: 'iPhone17'
        },
        {
          icon: Zap,
          question: 'iPhone 17 螢幕維修會影響顯示或觸控體驗嗎？',
          answer: '不會。使用 Apple 認證零件並完成色域/亮度/True Tone 檢測校正，觸控靈敏、顯示準確。完修後提供檢測紀錄與 90 天保固。',
          category: 'iPhone17'
        },
        {
          icon: Clock,
          question: 'iPhone 維修需要多長時間？',
          answer: '一般參考：\n\n螢幕更換：30–60 分鐘\n電池更換：30–45 分鐘\n相機/喇叭/充電模組：60–90 分鐘\n主機板級維修：2–4 小時（視狀況）\n\n可現場等候或預約時段，實際以檢測為準。',
          category: 'iPhone維修'
        },
        {
          icon: Shield,
          question: '是否使用 Apple 認證零件？',
          answer: '我們為 Apple IRP 認證維修商，使用 Apple 認證零件，並提供 90 天保固。維修完成後，功能與相容性均依標準流程逐項檢測。',
          category: 'iPhone維修'
        },
        {
          icon: Zap,
          question: '螢幕破裂該怎麼評估與處理？',
          answer: '輕微裂痕：可先貼保護膜觀察，避免裂痕擴大。\n觸控異常或出現彩線：建議立即更換，以免二度損傷。\n玻璃碎屑：請避免摩擦臉部與耳朵，儘速處理較安全。',
          category: 'iPhone維修'
        },
        {
          icon: Smartphone,
          question: '更換螢幕會影響 Face ID／Touch ID 嗎？',
          answer: '不會。Face ID／Touch ID 模組獨立於螢幕，維修時會完整轉移並檢測。若原件損壞，我們會於檢測報告中明確說明處理方案與風險。',
          category: 'iPhone維修'
        },
        {
          icon: HelpCircle,
          question: '維修是否影響原廠保固？',
          answer: '在原廠保固期內，建議先洽 Apple 官方。保固外維修不會影響您對裝置的使用，但第三方維修可能不在 Apple 原廠保固範圍。我们提供 90 天維修保固作為保障。',
          category: 'iPhone維修'
        },
        {
          icon: Shield,
          question: '更換電池／主機板會影響 Face ID／Touch ID 嗎？',
          answer: '更換電池：不會影響 Face ID／Touch ID。更換主機板：與生物辨識綁定，有風險需評估並簽署同意；我們會於施工前說明可行方案與影響並於完工後逐項測試。',
          category: 'iPhone維修'
        },
        {
          icon: Settings,
          question: 'Face ID 無法設定的常見原因？',
          answer: '常見為原深感相機模組（點陣投影、泛光感測）或前鏡頭排線受損，亦可能因撞擊或進水。建議檢測相機模組與排線，確認可修復性與風險後再行施工。',
          category: 'iPhone維修'
        }
      ]
    },
    {
      title: '手機維修通用',
      faqs: [
        {
          icon: AlertCircle,
          question: 'iPhone 17 進水怎麼辦？',
          answer: '立刻關機、勿充電與加熱，保持裝置原狀送修。24 小時內處理成功率最高。我們提供主機板清洗與資料救援評估，並完整告知風險。',
          category: '進水救援'
        },
        {
          icon: Shield,
          question: '維修過程我的資料隱私如何保障？',
          answer: '技師簽署保密協議、維修不查看個人資料、必要時於您在場或錄影下進行開機測試；全程留存交接與檢測紀錄，建議事前備份並登出敏感服務。',
          category: '資料隱私'
        },
        {
          icon: CheckCircle,
          question: '維修後我們如何測試確保功能正常？',
          answer: '依項目逐項檢測：觸控/顯示、相機前後/錄影、喇叭/麥克風/聽筒、充電/電流、感測器、Face ID/Touch ID、通話/網路。完修提供檢測紀錄與保固。',
          category: '完修測試'
        },
        {
          icon: Wrench,
          question: '手機進水了該怎麼辦？',
          answer: '盡快關機，切勿充電與吹風機加熱，勿搖晃。保留原狀送修，24 小時內處理成功率最高。我們提供主機板清洗與除鏽、資料救援評估。',
          category: '手機維修'
        },
        {
          icon: Settings,
          question: '維修前需要先備份嗎？',
          answer: '建議先自行備份重要資料（iCloud／iTunes）。維修過程不會查看個人檔案，技師均簽署保密，同時提供現場透明錄影。',
          category: '手機維修'
        },
        {
          icon: DollarSign,
          question: '維修價格如何計算？',
          answer: '免費檢測與報價、透明價目、無隱藏費用。不同機型有固定標準，施工前會提供書面或口頭報價並徵得同意。若不維修不收費。',
          category: '手機維修'
        },
        {
          icon: AlertCircle,
          question: '手機進水可以用米／吹風機自救嗎？',
          answer: '不建議。米與乾燥劑無法深入機板，殘留水分與礦物質可能加速腐蝕；熱風易使水汽擴散並造成排線變形。建議關機、勿充電，儘速送修專業乾燥與清洗。',
          category: '手機維修'
        },
        {
          icon: Wrench,
          question: '進水檢測與處理流程、時程與費用？',
          answer: '流程：初檢（免費）→ 拆機乾燥／酒精或超音波清洗 → 檢測腐蝕區 → 報價確認施工。一般 2–4 小時完成初步處理與評估；資料救援屬選配專案，將先行告知風險與費用。',
          category: '手機維修'
        }
      ]
    },
    {
      title: 'iPad 維修專區',
      faqs: [
        {
          icon: Tablet,
          question: 'iPad 螢幕維修需要多久時間？',
          answer: '一般 2–4 小時，依機型與損傷程度調整。由於膠體黏著面積較大、排線較多，需以專業設備與流程處理以避免二次損傷。',
          category: 'iPad維修'
        },
        {
          icon: Zap,
          question: 'iPad 充電異常怎麼處理？',
          answer: '常見原因包含充電孔接觸不良、排線老化、充電 IC 異常。可先嘗試更換充電線與變壓器，若仍異常建議檢測充電模組與主機板。',
          category: 'iPad維修'
        },
        {
          icon: Settings,
          question: 'iPad 觸控不靈敏怎麼辦？',
          answer: '若特定區域遲滯或跳點，可能為觸控層或觸控 IC 問題。可先重啟與更新系統，若持續發生，建議更換螢幕總成或進一步檢測。',
          category: 'iPad維修'
        }
      ]
    },
    {
      title: 'Mac 維修專區',
      faqs: [
        {
          icon: Monitor,
          question: 'MacBook 螢幕維修費用如何？',
          answer: '費用與機型、尺寸、是否 Retina、是否更換上蓋總成相關。提供免費檢測與透明報價，施工前先說明備選方案與交期。',
          category: 'Mac維修'
        },
        {
          icon: Zap,
          question: 'MacBook 無法開機怎麼辦？',
          answer: '可先嘗試：檢查電源與充電器、SMC/PRAM 重置、安全模式。若仍無法開機，可能為電池、SSD 或主機板異常，需專業檢測。',
          category: 'Mac維修'
        },
        {
          icon: HelpCircle,
          question: 'Mac 維修會影響原廠保固嗎？',
          answer: '保固內建議先與 Apple 官方確認。保固外之第三方維修，不在原廠保固範圍。我們提供 90 天維修保固與檢測報告留存。',
          category: 'Mac維修'
        }
      ]
    },
    {
      title: '服務與保固',
      faqs: [
        {
          icon: CheckCircle,
          question: '維修保固的範圍與申請方式？',
          answer: '保固 90 天，含更換零件本身與施工品質、相同故障免費重修（不含人為損壞與新故障）。出示維修紀錄或保固卡，即可申請檢測與處理。',
          category: '保固服務'
        },
        {
          icon: Smartphone,
          question: '二手 iPhone 有哪些保障？',
          answer: '附 30 天硬體保固與完整檢測報告；電池健康度 80% 以上；可現場試用確認功能，並提供購買憑證與售後諮詢。',
          category: '二手機保障'
        },
        {
          icon: AlertCircle,
          question: '到府收送服務的範圍與時段？',
          answer: '台北市區提供到府收送，滿 $1,500 免收送。一般於營業時段內收件與配送（14:00–23:00），可於預約時確認可行時段。',
          category: '服務與物流'
        },
        {
          icon: Shield,
          question: '維修過程如何保障個資與隱私？',
          answer: '技師簽署保密協議；維修不查看個人檔案；如需開機測試將於您在場或錄影下進行；設備交接與流程全程留存紀錄，並建議您事前完成備份與登出敏感服務。',
          category: '隱私與安全'
        },
        {
          icon: Settings,
          question: '維修前建議設定與準備？',
          answer: '建議先備份資料、關閉 Apple Pay 與移除 eSIM、停用尋找我的 iPhone（如需主機板級維修）、登出社群帳號與雲端同步，並記下螢幕鎖以便現場功能測試。',
          category: '維修前準備'
        },
        {
          icon: CheckCircle,
          question: '維修後的測試流程包含哪些項目？',
          answer: '依項目執行：觸控/多點觸控、顯示色偏/亮度、相機前後/對焦/錄影、喇叭/麥克風/聽筒、充電/電流、感測器（距離/環境光/陀螺儀）、網路與通話、Face ID/Touch ID；完成後提供檢測紀錄與保固憑證。',
          category: '測試流程'
        },
        {
          icon: DollarSign,
          question: '維修價格如何計算？是否有隱藏費用？',
          answer: '先免費檢測再報價；價格依機型與維修類型（螢幕/電池/相機/主機板）而定，現場/LINE 皆提供明細，不維修不收費。到府收送台北市區滿 $1,500 免收送。',
          category: '價格與報價'
        },
        {
          icon: Navigation,
          question: '怎麼到 FixMaster 士林店？附近停車與交通？',
          answer: '地址：台北市士林區文林路 60 號；捷運劍潭站 1 號出口步行 3 分鐘。附近有嘟嘟房、路邊停車格；也可改用到府收送服務。',
          category: '交通資訊'
        },
        {
          icon: Shield,
          question: '什麼是 Apple IRP 認證？對維修有什麼幫助？',
          answer: 'IRP（Independent Repair Provider）為 Apple 官方授權計畫，提供認證零件與流程、技師訓練與檢測規範。使用 Apple 認證零件、完成色準/True Tone/相容性檢測，品質一致。',
          category: 'IRP 認證'
        },
        {
          icon: FileText,
          question: '維修是否開立發票與保固憑證？',
          answer: '可開立統一發票；維修完成提供保固憑證與檢測紀錄。保固 90 天（人為損壞與新故障除外）。',
          category: '憑證與保固'
        }
      ]
    }
  ]

  // 依據當前選取的分類取得 FAQ 清單
  const currentFaqs = faqCategories[selectedCategoryIndex]?.faqs ?? []
  const currentFaq = selectedFaqIndex !== null ? currentFaqs[selectedFaqIndex] : null

  const openFaqDetail = (target: HTMLElement, index: number) => {
    previousFocusRef.current = target
    setSelectedFaqIndex(index)
    setIsSheetOpen(true)
  }

  const closeFaqDetail = () => {
    setIsSheetOpen(false)
    setSelectedFaqIndex(null)
  }

  useEffect(() => {
    if (!isSheetOpen) {
      document.body.classList.remove('no-scroll')
      previousFocusRef.current?.focus()
      return
    }

    document.body.classList.add('no-scroll')
    const getFocusables = () => {
      const node = sheetRef.current
      return node ? (Array.from(node.querySelectorAll(focusableSelector)) as HTMLElement[]) : []
    }

    const focusables = getFocusables()
    const initialFocus = closeButtonRef.current ?? focusables[0]
    initialFocus?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeFaqDetail()
        return
      }

      if (event.key !== 'Tab') return
      const items = getFocusables()
      if (items.length === 0) return
      const firstEl = items[0]
      const lastEl = items[items.length - 1]

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('no-scroll')
    }
  }, [isSheetOpen])

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-[-20%] top-0 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.16),_rgba(239,68,68,0))] blur-[120px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* 區塊標題 */}
          <motion.div
            className="mb-10 md:mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <SectionHeader
              title="常見問答"
              description="針對維修流程、保固與服務收錄最常見的提問，一次解答。"
            />
          </motion.div>

          {/* 分類 chips（可橫向滑動） */}
          <div className="sticky top-16 md:top-20 z-30 mb-6 md:mb-8 -mx-4 px-4">
            <div 
              className="relative overflow-x-auto no-scrollbar glass-panel rounded-[28px] px-3 py-3"
              role="tablist"
              aria-label="FAQ 分類"
              onKeyDown={(e) => {
                const max = faqCategories.length - 1
                let next = selectedCategoryIndex
                if (e.key === 'ArrowRight') next = Math.min(max, selectedCategoryIndex + 1)
                if (e.key === 'ArrowLeft') next = Math.max(0, selectedCategoryIndex - 1)
                if (e.key === 'Home') next = 0
                if (e.key === 'End') next = max
                if (next !== selectedCategoryIndex) {
                  e.preventDefault()
                  setSelectedCategoryIndex(next)
                  setSelectedFaqIndex(null)
                  const btn = document.getElementById(`faq-tab-${next}`) as HTMLButtonElement | null
                  btn?.focus()
                }
              }}
            >
              <div className="flex items-center gap-2 md:gap-3 w-max">
                {faqCategories.map((category, index) => (
                  <Chip
                    key={category.title}
                    id={`faq-tab-${index}`}
                    role="tab"
                    aria-selected={selectedCategoryIndex === index}
                    aria-controls="faq-panel"
                    active={selectedCategoryIndex === index}
                    onClick={() => {
                      setSelectedCategoryIndex(index)
                      setSelectedFaqIndex(null)
                    }}
                  >
                    {category.title}
                  </Chip>
                ))}
              </div>
              {/* Scroll fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 rounded-[28px] bg-gradient-to-r from-white/80 to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 rounded-[28px] bg-gradient-to-l from-white/80 to-transparent" />
            </div>
          </div>

          {/* 問題卡片網格（行動 1 欄、平板 2 欄、桌面 3 欄） */}
          <motion.div
            id="faq-panel"
            role="tabpanel"
            aria-labelledby={`faq-tab-${selectedCategoryIndex}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            {currentFaqs.map((faq, index) => (
              <button
                key={`${faq.question}-${index}`}
                type="button"
                onClick={(event) => openFaqDetail(event.currentTarget, index)}
                className="text-left glass-surface p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-transparent hover:-translate-y-0.5 motion-soft-enter"
                aria-haspopup="dialog"
                aria-controls="faq-bottom-sheet"
                aria-expanded={isSheetOpen && selectedFaqIndex === index}
              >
                <div className="glass-content flex flex-col gap-4 p-6">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="glass-control glass-elevated flex h-10 w-10 flex-shrink-0 items-center justify-center md:h-12 md:w-12">
                      <faq.icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1 text-sm md:text-base font-semibold text-neutral-900 line-clamp-2">
                        {faq.question}
                      </h3>
                      <div className="mb-2 text-xs font-medium text-neutral-500 md:text-sm">
                        {faq.category}
                      </div>
                      <p className="text-xs text-neutral-600 md:text-sm line-clamp-2 whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-500 md:text-sm">
                    <span>查看完整解答</span>
                    <ArrowRight className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                  </div>
                </div>
              </button>
            ))}
          </motion.div>

          {/* 底部彈出層 Bottom Sheet */}
          <AnimatePresence>
            {isSheetOpen && currentFaq && (
              <motion.div
                className="fixed inset-0 z-[10000] flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="faq-sheet-title"
                aria-describedby="faq-sheet-description"
              >
                {/* 背景遮罩 */}
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={closeFaqDetail}
                  aria-hidden="true"
                />

                {/* Sheet 內容容器 */}
                <motion.div
                  ref={sheetRef}
                  className="mt-auto glass-panel p-1 border border-white/25 motion-soft-enter"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  id="faq-bottom-sheet"
                >
                  <div className="glass-content max-h-[70vh] overflow-hidden">
                    <div className="flex justify-center pt-3">
                      <div className="h-1 w-12 rounded-full bg-white/50" aria-hidden="true" />
                    </div>

                    <div className="flex items-start justify-between px-4 py-3 md:px-6 md:py-4 border-b border-white/20">
                      <div className="flex items-start gap-3 pr-4 md:pr-6">
                        <div className="glass-control glass-elevated flex h-10 w-10 items-center justify-center text-neutral-900 md:h-12 md:w-12">
                          <currentFaq.icon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 id="faq-sheet-title" className="text-base md:text-lg font-semibold text-neutral-900">
                            {currentFaq.question}
                          </h3>
                          <div className="mt-1 text-xs text-neutral-500 md:text-sm">
                            {currentFaq.category}
                          </div>
                        </div>
                      </div>
                      <button
                        ref={closeButtonRef}
                        type="button"
                        aria-label="關閉"
                        className="glass-control glass-elevated p-2 text-neutral-700 transition-colors duration-200 hover:text-neutral-900"
                        onClick={closeFaqDetail}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="px-4 md:px-6 pt-4 pb-0 max-h-[calc(70vh-140px)] overflow-y-auto text-neutral-700 leading-relaxed text-sm md:text-base whitespace-pre-line" id="faq-sheet-description">
                      {currentFaq.answer}
                    </div>

                    <div className="px-4 md:px-6 py-4 border-t border-white/20">
                      <div className="glass-control glass-strong px-4 py-3 text-xs text-neutral-600 md:text-sm mb-4" aria-hidden="true">
                        仍不確定？我們可以協助安排檢測、提供即時報價或線上諮詢。
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                        <Button
                          variant="outline"
                          className="sm:w-auto motion-hover-pop"
                          onClick={() => {
                            trackClick('faq_sheet_contact_line')
                            window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=faq_sheet&utm_campaign=contact_line', '_blank')
                          }}
                        >
                          透過 LINE 詢問
                        </Button>
                        <Button
                          className="sm:w-auto motion-hover-pop"
                          onClick={() => {
                            trackClick('faq_sheet_contact_book')
                            closeFaqDetail()
                            setTimeout(() => {
                              const contactSection = document.getElementById('contact')
                              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }, 100)
                          }}
                        >
                          預約維修時段
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 結尾 CTA */}
          <motion.div
            className="mt-12 md:mt-16 glass-panel p-1 text-center motion-soft-enter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="glass-content px-6 py-8 text-center md:px-10 md:py-12 space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-neutral-900 md:text-3xl">
                  還有其他問題嗎？
                </h3>
                <p className="mx-auto max-w-2xl text-neutral-600">
                  我們的專業客服團隊隨時為您解答，歡迎透過以下方式聯絡我們。
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  className="px-6 py-3 md:px-8 md:py-4 motion-hover-pop"
                  onClick={() => trackClick('faq_tel_click', { section: 'faq' })}
                >
                  直接撥打電話
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-3 md:px-8 md:py-4 motion-hover-pop"
                  onClick={() => trackClick('faq_line_click', { section: 'faq' })}
                >
                  LINE 線上諮詢
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 
