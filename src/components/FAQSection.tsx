'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Shield, DollarSign, Smartphone, CheckCircle, AlertCircle, Monitor, Tablet, Wrench, Zap, Settings, HelpCircle, ArrowRight, Navigation, FileText, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { trackClick } from '@/lib/tracking'
import FAQCategoryNav from './FAQCategoryNav'
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
  const categoriesRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const faqCategories = [
    {
      title: 'iPhone 維修專區',
      faqs: [
        {
          icon: Smartphone,
          question: 'iPhone 系列目前支援哪些維修？',
          answer: '支援全系列 iPhone 維修，包含：螢幕總成更換、電池更換、前後相機模組、背蓋玻璃、充電孔清潔/更換、聽筒/喇叭清潔等。iPhone 12 至 iPhone 15 系列零件庫存充足，多數項目可當日完修。',
          category: 'iPhone維修'
        },
        {
          icon: Settings,
          question: '維修 Face ID 或 Touch ID 會影響功能嗎？',
          answer: '生物辨識模組與主機板配對，維修需極高精密度。若是周邊排線或模組移位可修復；若涉及主機板加密晶片損壞，我們會先檢測並告知修復機率與風險，絕不貿然施工。',
          category: 'iPhone維修'
        },
        {
          icon: Zap,
          question: '換螢幕後，顯示色彩或觸控會變差嗎？',
          answer: '我們提供「Apple 原廠零件」與「嚴選高品質零件」兩種選擇。原廠零件經 Apple 系統校正，色彩與觸控保證與出廠一致；嚴選零件亦經儀器測試色準與靈敏度，並提供 90 天保固，確保使用體驗。',
          category: 'iPhone維修'
        },
        {
          icon: Shield,
          question: '更換螢幕後 True Tone (原彩顯示) 功能還在嗎？',
          answer: '會的。我們擁有專業燒錄設備，更換螢幕時會將原螢幕的 True Tone 序號移植到新螢幕，確保原彩顯示功能正常運作（前提是原螢幕的感光排線功能正常）。',
          category: 'iPhone維修'
        },
        {
          icon: Wrench,
          question: '背蓋玻璃破裂一定要換整支手機嗎？',
          answer: '不需要。FixMaster 引進雷射拆屏設備，可單獨更換 iPhone 背蓋玻璃，無需更換整個機殼總成，費用僅需原廠換整新機的 1/3 左右，且保留無線充電功能。',
          category: 'iPhone維修'
        },
        {
          icon: Clock,
          question: '現場維修大概需要多久？',
          answer: '一般維修參考時程：\n• 電池更換：約 30 分鐘\n• 螢幕更換：約 45–60 分鐘\n• 其他模組：約 1 小時\n• 主機板維修：需留機檢測 1–3 個工作天\n\n建議先預約時段，可減少現場等待時間。',
          category: 'iPhone維修'
        },
        {
          icon: Shield,
          question: '你們是 Apple 原廠授權維修中心嗎？',
          answer: '是的，FixMaster 是 Apple 獨立維修中心 (IRP)，擁有 Apple 官方認證技師與原廠診斷工具，可合法採購並使用 Apple 原廠零件，維修紀錄也會同步至 Apple 官方系統，品質有保障。',
          category: 'iPhone維修'
        },
        {
          icon: Zap,
          question: '螢幕只是玻璃裂開，顯示跟觸控都正常，可以只換玻璃嗎？',
          answer: '可以，這稱為「螢幕翻新」。若您的內層顯示器 (OLED/LCD) 完好無損，我們可以協助單獨更換表層玻璃，費用比換整組螢幕更划算，且保留原廠顯示面板。',
          category: 'iPhone維修'
        }
      ]
    },
    {
      title: '手機維修通用',
      faqs: [
        {
          icon: AlertCircle,
          question: '手機進水了，第一時間該怎麼辦？',
          answer: '1. 立即關機，切勿嘗試開機。\n2. 切勿充電，以免短路燒毀主機板。\n3. 擦乾表面水分，移除 SIM 卡托。\n4. 盡快送修，進行專業拆機清潔與除潮。\n\n切勿使用吹風機熱風吹或放入米缸，這可能加速內部腐蝕或將水氣吹入更深處。',
          category: '進水救援'
        },
        {
          icon: Shield,
          question: '維修時會偷看我的照片或資料嗎？',
          answer: '絕無可能。我們嚴格遵守個資保護規範，技師均簽署保密協議。維修過程多數不需要解鎖密碼（除非需測試特定功能並取得您同意）。若您擔心，可在維修時現場旁觀，全程錄影保障雙方權益。',
          category: '資料隱私'
        },
        {
          icon: CheckCircle,
          question: '維修後會做哪些測試？',
          answer: '完修後會依照標準 SOP 進行全功能檢測，包含：螢幕顯示、觸控靈敏度、相機前後鏡頭、Face ID/Touch ID、通話功能、麥克風收音、喇叭外放、充電電流、無線充電、Wi-Fi/藍牙訊號等，確保交機時功能 100% 正常。',
          category: '完修測試'
        },
        {
          icon: Clock,
          question: '維修需要預約嗎？直接過去可以嗎？',
          answer: '可以直接來店，但若現場客滿可能需要等候。強烈建議透過 LINE 或電話提前預約，我們能預先為您保留零件與技師時段，讓您到場即修，節省寶貴時間。',
          category: '維修流程'
        },
        {
          icon: Shield,
          question: '維修後手機還能防水嗎？',
          answer: '手機的防水功能是透過邊框膠條密封，拆機維修後我們會重新補上專用防水膠條，但防水能力仍可能不如出廠時完美（IP68 等級）。建議維修後將手機視為「生活防潑水」，避免直接沖洗或浸泡水中。',
          category: '維修風險'
        },
        {
          icon: Settings,
          question: '送修前我需要先備份資料嗎？',
          answer: '雖然更換螢幕、電池等零件通常不會動到資料，但電子產品維修仍有極低機率的風險。為了保險起見，強烈建議您送修前先透過 iCloud 或電腦 iTunes 進行備份，以防萬一。',
          category: '手機維修'
        },
        {
          icon: DollarSign,
          question: '檢測需要費用嗎？如果不修會收錢嗎？',
          answer: 'FixMaster 提供「免費檢測」服務。技師檢測後會告知故障原因與準確報價，由您決定是否維修。如果您決定不修，我們不會收取任何檢測費或拆機費（進水清洗與特殊主板檢測除外，會先行告知）。',
          category: '手機維修'
        }
      ]
    },
    {
      title: 'iPad / Mac 專區',
      faqs: [
        {
          icon: Tablet,
          question: 'iPad 螢幕破裂維修要多久？',
          answer: 'iPad 螢幕膠合面積大，拆裝需更謹慎，一般約需 2–4 小時。建議預留半天時間，或早上送件、傍晚取件。我們會確保膠體完全固化後才交機，避免日後螢幕翹起。',
          category: 'iPad維修'
        },
        {
          icon: Zap,
          question: 'iPad 充電很慢或充不進去，是電池壞了嗎？',
          answer: '不一定。除了電池老化，常見原因還有充電孔積塵、氧化或尾插排線損壞，甚至是主機板充電 IC 故障。我們會先進行交叉測試，確認是哪個環節問題再報價維修，避免您花冤枉錢。',
          category: 'iPad維修'
        },
        {
          icon: Monitor,
          question: 'MacBook 電池顯示「建議維修」該換嗎？',
          answer: '建議更換。當電池循環次數過高或健康度低於 80%，系統會提示維修。此時電池可能有膨脹風險，不僅續航力差，還可能壓迫觸控板或鍵盤造成損壞。更換電池約 1–2 小時可完成。',
          category: 'Mac維修'
        },
        {
          icon: Settings,
          question: 'MacBook 運作很慢、風扇很吵，可以改善嗎？',
          answer: '通常是因為內部累積灰塵影響散熱，導致降頻跑不快。我們提供「深度清潔保養」服務，包含拆機除塵、更換高效散熱膏，能顯著降低運作溫度，讓效能與靜音回復水準。',
          category: 'Mac維護'
        },
        {
          icon: FileText,
          question: '我想升級 MacBook 的硬碟 (SSD) 容量可以嗎？',
          answer: '這取決於機型。2017 年以前的舊款 MacBook Air/Pro 多數可更換 SSD；2018 年後的機型 SSD 多焊死在主機板上，無法單獨升級，僅能透過外接硬碟擴充。請提供型號讓我們幫您查詢。',
          category: 'Mac升級'
        }
      ]
    },
    {
      title: '服務與保固',
      faqs: [
        {
          icon: CheckCircle,
          question: '維修後的保固期是多久？',
          answer: '• 電池/螢幕/一般零件：提供 90 天保固。\n• 主機板維修：提供 90 天保固。\n\n保固期間內，若出現非人為因素的相同故障（如觸控不良、電池異常），我們將免費為您處理到好。',
          category: '保固服務'
        },
        {
          icon: AlertCircle,
          question: '台北市到府收送服務要運費嗎？',
          answer: '只要維修費用滿 $1,500 元，台北市區內（士林、北投、中山、大同、內湖等）皆享「免運費」到府收送。未滿額則酌收 $150–$300 元運費。',
          category: '服務與物流'
        },
        {
          icon: CreditCard,
          question: '付款方式有哪些？可以刷卡嗎？',
          answer: '門市支援：現金、信用卡（Visa/Master/JCB/銀聯）、Apple Pay、LINE Pay、街口支付。\n到府收送：可透過匯款轉帳或線上刷卡連結付款。',
          category: '付款方式'
        },
        {
          icon: FileText,
          question: '維修會開立發票嗎？可以打統編嗎？',
          answer: '當然可以。我們是合法登記的有限公司，所有服務皆開立統一發票，若需公司報帳，請於結帳時告知統一編號與公司抬頭。',
          category: '憑證與保固'
        },
        {
          icon: HelpCircle,
          question: '人為損壞有保固嗎？',
          answer: '保固範圍僅限「零件本身的瑕疵」或「施工不良」。若是維修後因再次摔機、進水、壓傷等人為因素導致的故障，則不在保固範圍內，但我們會提供老客戶維修折扣。',
          category: '保固條款'
        },
        {
          icon: Smartphone,
          question: '維修期間有提供備用機嗎？',
          answer: '一般 iPhone 維修多在一小時內完成，通常無需備用機。若遇主機板維修需留機較多天，我們門市備有少量備用機（iPhone 8/X 等級）可供借用，依現場庫存為準。',
          category: '備援裝置'
        }
      ]
    }
  ]

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

  const goPrevFaq = () => {
    if (!currentFaqs.length || selectedFaqIndex === null) return
    const next = Math.max(0, selectedFaqIndex - 1)
    setSelectedFaqIndex(next)
  }

  const goNextFaq = () => {
    if (!currentFaqs.length || selectedFaqIndex === null) return
    const next = Math.min(currentFaqs.length - 1, selectedFaqIndex + 1)
    setSelectedFaqIndex(next)
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

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrevFaq()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNextFaq()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSheetOpen])

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-[-20%] top-0 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.10),_rgba(255,255,255,0))] blur-[120px]"
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

          {/* 新分類導航 */}
          <div className="sticky top-16 md:top-20 z-30 mb-6 md:mb-8 -mx-4 px-4 bg-white/5 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none py-2 md:py-0">
            <FAQCategoryNav
              categories={faqCategories.map(c => ({
                title: c.title,
                count: c.faqs.length,
                Icon: c.title.includes('iPhone') ? Smartphone
                  : c.title.includes('iPad') ? Tablet
                  : c.title.includes('Mac') ? Monitor
                  : c.title.includes('服務') ? Shield
                  : HelpCircle
              }))}
              selectedIndex={selectedCategoryIndex}
              onChange={(i) => {
                setSelectedCategoryIndex(i)
                setSelectedFaqIndex(null)
                const grid = gridRef.current
                if (grid) {
                  const offset = 140 
                  const elementPosition = grid.getBoundingClientRect().top + window.scrollY
                  const offsetPosition = elementPosition - offset
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" })
                }
              }}
            />
          </div>

          {/* 問題卡片網格 */}
          <motion.div
            id="faq-panel"
            role="tabpanel"
            aria-labelledby={`faq-tab-${selectedCategoryIndex}`}
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            {currentFaqs.map((faq, index) => (
              <motion.button
                key={`${faq.question}-${index}`}
                type="button"
                onClick={(event) => openFaqDetail(event.currentTarget, index)}
                className="text-left glass-surface p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:ring-offset-2 hover:-translate-y-1 motion-soft-enter group"
                aria-haspopup="dialog"
                aria-controls="faq-bottom-sheet"
                aria-expanded={isSheetOpen && selectedFaqIndex === index}
                initial={{ opacity: 0, scale: 0.98, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...motionTimings.soft, delay: index * 0.03 }}
              >
                <div className="glass-content flex flex-col gap-4 p-6 h-full bg-white/40 group-hover:bg-white/60 transition-colors">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="glass-control flex h-10 w-10 flex-shrink-0 items-center justify-center md:h-12 md:w-12 shadow-[var(--elev-2)] bg-white/80">
                      <faq.icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1.5 text-[15px] md:text-base font-bold text-neutral-900 line-clamp-2 leading-tight text-balance">
                        {faq.question}
                      </h3>
                      <div className="mb-2 text-xs font-medium text-neutral-500 md:text-sm">
                        {faq.category}
                      </div>
                      <p className="text-xs text-neutral-600 md:text-sm line-clamp-2 whitespace-pre-line leading-relaxed text-pretty">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-500 md:text-sm mt-auto pt-2 border-t border-neutral-200/30">
                    <span>查看完整解答</span>
                    <span className="inline-flex p-1 rounded-full glass-control shadow-sm group-hover:bg-white transition-colors">
                      <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Bottom Sheet */}
          {mounted && createPortal(
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
                  <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                    onClick={closeFaqDetail}
                    aria-hidden="true"
                  />

                  <motion.div
                    ref={sheetRef}
                    className="mt-auto glass-panel border border-white/40 motion-soft-enter shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    id="faq-bottom-sheet"
                    style={{ borderRadius: '24px 24px 0 0' }}
                  >
                    <div className="glass-content overflow-hidden pb-safe bg-white/90 backdrop-blur-xl" style={{ maxHeight: '85dvh', borderRadius: '24px 24px 0 0' }}>
                      <div className="flex justify-center pt-3 pb-1" onClick={closeFaqDetail}>
                        <div className="h-1.5 w-12 rounded-full bg-neutral-300/80" aria-hidden="true" />
                      </div>

                      <div className="flex items-start justify-between px-5 py-4 md:px-8 md:py-6 border-b border-neutral-100">
                        <div className="flex items-start gap-4 pr-4">
                          <div className="glass-control flex h-12 w-12 items-center justify-center text-neutral-900 shadow-[var(--elev-2)] bg-white">
                            <currentFaq.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 id="faq-sheet-title" className="text-lg md:text-xl font-bold text-neutral-900 leading-tight text-balance">
                              {currentFaq.question}
                            </h3>
                            <div className="mt-1.5 text-sm font-medium text-neutral-500">
                              {currentFaq.category}
                            </div>
                          </div>
                        </div>
                        <button
                          ref={closeButtonRef}
                          type="button"
                          aria-label="關閉"
                          className="glass-control p-2.5 text-neutral-500 transition-colors duration-200 hover:text-neutral-900 hover:bg-white active:scale-95"
                          onClick={closeFaqDetail}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="px-5 md:px-8 pt-6 pb-4 overscroll-contain overflow-y-auto text-neutral-800 leading-relaxed text-[15px] md:text-lg whitespace-pre-line font-medium text-pretty" style={{ maxHeight: 'calc(85dvh - 180px)' }} id="faq-sheet-description">
                        {currentFaq.answer}
                      </div>

                      <div className="px-5 md:px-8 py-5 border-t border-neutral-100 bg-white/50">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <button
                            type="button"
                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-30"
                            onClick={goPrevFaq}
                            disabled={(selectedFaqIndex ?? 0) <= 0}
                          >
                            <ChevronLeft className="h-4 w-4" /> 上一題
                          </button>
                          <span className="text-xs font-medium text-neutral-400">
                            {selectedFaqIndex !== null ? selectedFaqIndex + 1 : 0} / {currentFaqs.length}
                          </span>
                          <button
                            type="button"
                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-30"
                            onClick={goNextFaq}
                            disabled={(selectedFaqIndex ?? 0) >= currentFaqs.length - 1}
                          >
                            下一題 <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="glass-control px-4 py-3 text-sm font-medium text-neutral-600 mb-4 shadow-sm bg-white/60 flex items-start gap-2" aria-hidden="true">
                          <div className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
                          仍有疑問？歡迎直接聯繫，我們將提供更詳細的說明。
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                          <Button
                            variant="outline"
                            className="sm:w-auto motion-hover-pop font-bold text-[15px]"
                            onClick={() => {
                              trackClick('faq_sheet_contact_line')
                              window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=faq_sheet&utm_campaign=contact_line', '_blank')
                            }}
                          >
                            透過 LINE 詢問
                          </Button>
                          <Button
                            className="sm:w-auto motion-hover-pop font-bold shadow-lg text-[15px]"
                            onClick={() => {
                              trackClick('faq_sheet_contact_book_line')
                              window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=faq_sheet&utm_campaign=contact_line', '_blank')
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
            </AnimatePresence>,
            document.body
          )}

          {/* 結尾 CTA */}
          <motion.div
            className="mt-12 md:mt-16 glass-panel p-1 text-center motion-soft-enter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="glass-content px-6 py-8 text-center md:px-10 md:py-12 space-y-6 bg-white/40">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-neutral-900 md:text-3xl text-balance">
                  還有其他問題嗎？
                </h3>
                <p className="mx-auto max-w-2xl text-neutral-600 text-base font-medium text-pretty">
                  我們的專業客服團隊隨時為您解答，歡迎透過以下方式聯絡我們。
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  className="px-8 py-4 text-[15px] font-bold motion-hover-pop w-full sm:w-auto"
                  onClick={() => trackClick('faq_tel_click', { section: 'faq' })}
                >
                  直接撥打電話
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 text-[15px] font-bold motion-hover-pop w-full sm:w-auto"
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
