'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Shield, DollarSign, Smartphone, CheckCircle, AlertCircle, Monitor, Tablet, Wrench, Zap, Settings, HelpCircle } from 'lucide-react'
import { useState } from 'react'

export default function FAQSection() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)
  const [selectedFaqIndex, setSelectedFaqIndex] = useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)

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
        }
      ]
    }
  ]

  // 依據當前選取的分類取得 FAQ 清單
  const currentFaqs = faqCategories[selectedCategoryIndex]?.faqs ?? []

  const quickAnswers = [
    {
      question: '需要預約嗎？',
      answer: '建議先預約，但也接受現場服務',
      icon: '📅'
    },
    {
      question: '支援哪些付款方式？',
      answer: '現金、銀行轉帳、街口支付',
      icon: '💳'
    },
    {
      question: '有到府收送服務嗎？',
      answer: '台北市區提供到府收送，滿額免費',
      icon: '🚚'
    },
    {
      question: '維修期間有備用機嗎？',
      answer: '可提供備用機借用服務（需押金）',
      icon: '📱'
    },
    {
      question: '支援 iPad 維修嗎？',
      answer: 'iPad 螢幕、電池、充電孔等維修',
      icon: '📟'
    },
    {
      question: '有 Mac 維修服務嗎？',
      answer: 'MacBook 螢幕、鍵盤、主機板維修',
      icon: '💻'
    },
    {
      question: '進水手機能救嗎？',
      answer: '24小時內送修，成功率85%',
      icon: '💧'
    },
    {
      question: '維修多久保固？',
      answer: '90天維修保固，業界最長',
      icon: '🛡️'
    }
  ]

  return (
    <section id="faq" className="section-padding bg-neutral-50">
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          {/* 區塊標題 */}
          <motion.div 
            className="text-center mb-8 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 md:mb-6">
              常見問答
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              更快找到答案：分類、掃描、點擊展開詳情
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-6 md:mt-8"></div>
          </motion.div>

          {/* 分類 chips（可橫向滑動） */}
          <div className="mb-6 md:mb-8 -mx-4 px-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 md:gap-3 w-max">
              {faqCategories.map((category, index) => (
                <button
                  key={category.title}
                  onClick={() => {
                    setSelectedCategoryIndex(index)
                    setSelectedFaqIndex(null)
                  }}
                  className={`whitespace-nowrap px-4 py-2 text-sm border flat-button ${
                    selectedCategoryIndex === index
                      ? 'bg-accent-500 text-white border-accent-500'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
                  }`}
                  aria-pressed={selectedCategoryIndex === index}
                >
                  {category.title}
                </button>
              ))}
            </div>
          </div>

          {/* 問題卡片網格（行動 1 欄、平板 2 欄、桌面 3 欄） */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            {currentFaqs.map((faq, index) => (
              <button
                key={`${faq.question}-${index}`}
                onClick={() => {
                  setSelectedFaqIndex(index)
                  setIsSheetOpen(true)
                }}
                className="text-left bg-white p-6 border border-neutral-200 hover:border-neutral-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white rounded-none"
                aria-haspopup="dialog"
                aria-controls="faq-bottom-sheet"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <faq.icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-neutral-900 text-sm md:text-base mb-1 line-clamp-2">
                      {faq.question}
                    </h3>
                    <div className="text-neutral-600 text-xs md:text-sm font-medium mb-2">
                      {faq.category}
                    </div>
                    <p className="text-neutral-600 text-xs md:text-sm line-clamp-2 whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>

          {/* 底部彈出層 Bottom Sheet */}
          <AnimatePresence>
            {isSheetOpen && selectedFaqIndex !== null && (
              <motion.div
                className="fixed inset-0 z-[10000] flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="faq-sheet-title"
              >
                {/* 背景遮罩 */}
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={() => setIsSheetOpen(false)}
                />

                {/* Sheet 內容容器 */}
                <motion.div
                  className="mt-auto bg-white border-t border-neutral-200"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  id="faq-bottom-sheet"
                >
                  {/* 把手 */}
                  <div className="pt-3 flex justify-center">
                    <div className="w-12 h-1 bg-neutral-200" />
                  </div>

                  {/* 標題列 */}
                  <div className="flex items-start justify-between px-4 md:px-6 py-3 md:py-4">
                    <div className="pr-6">
                      <h3 id="faq-sheet-title" className="text-base md:text-lg font-semibold text-neutral-900">
                        {currentFaqs[selectedFaqIndex].question}
                      </h3>
                      <div className="text-xs md:text-sm text-neutral-500 mt-1">
                        {currentFaqs[selectedFaqIndex].category}
                      </div>
                    </div>
                    <button
                      aria-label="關閉"
                      className="p-2 text-neutral-600 hover:text-neutral-900"
                      onClick={() => setIsSheetOpen(false)}
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* 內文 */}
                  <div className="px-4 md:px-6 pb-6 md:pb-8 max-h-[60vh] overflow-y-auto">
                    <div className="text-neutral-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
                      {currentFaqs[selectedFaqIndex].answer}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 結尾 CTA */}
          <motion.div
            className="mt-12 md:mt-16 bg-neutral-900 p-8 md:p-12 text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              還有其他問題嗎？
            </h3>
            <p className="text-neutral-300 mb-6 md:mb-8 max-w-2xl mx-auto">
              我們的專業客服團隊隨時為您解答，歡迎透過以下方式聯絡我們
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <a 
                href="tel:+886-2-2816-6666" 
                className="bg-white text-neutral-900 px-6 md:px-8 py-3 md:py-4 flat-button font-semibold hover:bg-neutral-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
                直接撥打電話
              </a>
              <a 
                href="https://line.me/R/ti/p/@fixmaster" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-500 text-white px-6 md:px-8 py-3 md:py-4 flat-button font-semibold hover:bg-accent-600 transition-colors duration-200 inline-flex items-center justify-center"
              >
                LINE 線上諮詢
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 