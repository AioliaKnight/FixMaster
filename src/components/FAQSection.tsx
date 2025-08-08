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
          icon: Clock,
          question: 'iPhone 維修時間需要多長？',
          answer: 'iPhone 各項維修的標準時間：\n\n螢幕更換：30-60分鐘\n電池更換：30-45分鐘\n主機板維修：2-4小時\n相機維修：60-90分鐘\n充電孔維修：60-90分鐘\n複雜問題：1-2個工作天\n\n我們提供現場等候服務，也可預約時間避免等待。實際時間視機型和問題複雜度而定。',
          category: 'iPhone維修'
        },
        {
          icon: Shield,
          question: 'iPhone 如何判斷是否為原廠零件？',
          answer: '我們是 Apple IRP 認證的獨立維修商，所有iPhone零件都是原廠正品或Apple認證零件：\n\n• 每個零件都有原廠序號可查證\n• 提供零件購買憑證和保固卡\n• 原廠零件在「設定」中會正確顯示型號\n• 功能完全正常，無相容性問題\n• 現場展示零件包裝和認證標籤\n• Touch ID、Face ID 完全正常\n• 原廠品質，非副廠仿製品',
          category: 'iPhone維修'
        },
        {
          icon: Zap,
          question: 'iPhone 螢幕破裂一定要換嗎？',
          answer: 'iPhone 螢幕破裂的處理建議：\n\n輕微裂痕：\n• 可先貼保護膜防止擴大\n• 不影響觸控可暫時使用\n• 建議儘早更換避免惡化\n\n嚴重破裂：\n• 影響觸控必須立即更換\n• 玻璃碎片可能傷手\n• 內層LCD可能受損\n• 延遲維修成本更高\n\n我們提供免費檢測，評估最佳處理方案。',
          category: 'iPhone維修'
        },
        {
          icon: Smartphone,
          question: 'iPhone 電池健康度多少需要更換？',
          answer: 'iPhone 電池更換的判斷標準：\n\n建議更換時機：\n• 電池健康度低於80%\n• 一天需要充電2次以上\n• 突然關機或重開機\n• 充電速度明顯變慢\n• 手機明顯發熱\n\n我們的電池服務：\n• 使用原廠電池\n• 30-45分鐘專業更換\n• 90天功能保固\n• 現場檢測電池健康度\n• 更換後恢復最佳續航力',
          category: 'iPhone維修'
        }
      ]
    },
    {
      title: '手機維修通用',
      faqs: [
        {
          icon: Wrench,
          question: '手機進水了該怎麼辦？',
          answer: '手機進水的緊急處理步驟：\n\n立即處理：\n• 馬上關機，不要嘗試開機\n• 取出SIM卡和記憶卡\n• 用乾布擦拭外部水分\n• 不要用吹風機加熱\n• 不要搖晃手機\n\n送修處理：\n• 24小時內送修成功率最高\n• 我們有專業烘乾設備\n• 主機板清洗除鏽服務\n• 數據救援成功率85%\n• 提供詳細檢測報告\n\n越快送修，救回機率越高！',
          category: '手機維修'
        },
        {
          icon: Settings,
          question: '手機維修會不會洩漏個人資料？',
          answer: '我們非常重視客戶隱私保護：\n\n資料保護措施：\n• 維修前建議客戶自行備份\n• 技師簽署保密協議\n• 維修過程不查看個人檔案\n• 現場錄影確保透明度\n• 維修完成當面確認功能\n\n建議客戶：\n• 送修前先備份重要資料\n• 登出所有帳號\n• 關閉自動同步功能\n• 設定臨時密碼\n\n我們承諾絕不侵犯客戶隱私。',
          category: '手機維修'
        },
        {
          icon: DollarSign,
          question: '手機維修費用如何計算？',
          answer: '我們採用完全透明的定價制度：\n\n定價原則：\n• 現場免費檢測和報價\n• 價格表公開透明，無隱藏費用\n• 不同機型有固定價格標準\n• 維修前提供詳細報價單\n• 可比較市場行情，絕不哄抬\n\n付款方式：\n• 現金付款\n• 銀行轉帳\n• 街口支付\n\n如不維修，檢測費用全免。價格公道，品質保證。',
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
          answer: 'iPad 螢幕維修的詳細時間：\n\n維修時間：\n• iPad Air/Pro：2-4小時\n• iPad mini：2-3小時\n• iPad 一般版：1.5-2.5小時\n• 複雜案例：1-2個工作天\n\n維修難度較iPhone高的原因：\n• 螢幕尺寸較大，拆裝複雜\n• 需要專業加熱設備\n• 膠條黏性強，需仔細處理\n• 內部排線較多，需專業技術\n\n我們有專業iPad維修設備，確保品質。',
          category: 'iPad維修'
        },
        {
          icon: Zap,
          question: 'iPad 充電孔壞了可以修嗎？',
          answer: 'iPad 充電問題的維修方案：\n\n常見充電問題：\n• 充電孔接觸不良\n• 充電線插不緊\n• 充電速度變慢\n• 完全無法充電\n\n維修方式：\n• 清潔充電孔內部\n• 更換充電排線\n• 檢測充電IC\n• 主機板維修\n\n維修時間：2-3小時\n保固期間：90天\n\n建議定期清潔充電孔，延長使用壽命。',
          category: 'iPad維修'
        },
        {
          icon: Settings,
          question: 'iPad 觸控不靈敏怎麼辦？',
          answer: 'iPad 觸控問題的解決方案：\n\n常見觸控問題：\n• 部分區域無法觸控\n• 觸控延遲或不準確\n• 誤觸或跳點\n• 完全無法觸控\n\n可能原因：\n• 螢幕破裂影響觸控\n• 觸控IC故障\n• 排線接觸不良\n• 主機板問題\n\n維修方案：\n• 更換觸控螢幕總成\n• 維修觸控IC\n• 重新連接排線\n• 主機板級維修\n\n我們提供專業檢測，找出根本原因。',
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
          answer: 'MacBook 螢幕維修的費用說明：\n\n影響價格因素：\n• MacBook 機型（Air/Pro）\n• 螢幕尺寸（13"/14"/16"）\n• 是否為 Retina 顯示器\n• 是否需要更換整個上蓋\n\n大致價格範圍：\n• MacBook Air 13"：$8,000-12,000\n• MacBook Pro 13"：$10,000-15,000\n• MacBook Pro 16"：$15,000-25,000\n\n我們提供：\n• 免費檢測評估\n• 透明報價\n• 原廠品質螢幕\n• 90天保固\n\n實際價格以現場檢測為準。',
          category: 'Mac維修'
        },
        {
          icon: Zap,
          question: 'MacBook 無法開機怎麼辦？',
          answer: 'MacBook 無法開機的診斷流程：\n\n初步檢測：\n• 確認電源適配器正常\n• 檢查電池狀態\n• 重置 SMC 和 PRAM\n• 嘗試安全模式開機\n\n可能原因：\n• 電池完全沒電\n• 主機板故障\n• 記憶體問題\n• 硬碟故障\n• 系統檔案損壞\n\n維修方案：\n• 更換電池或充電器\n• 主機板級維修\n• 記憶體更換\n• SSD 更換或修復\n• 系統重新安裝\n\n我們有專業Mac維修設備和經驗。',
          category: 'Mac維修'
        },
        {
          icon: HelpCircle,
          question: 'Mac 維修會影響保固嗎？',
          answer: 'Mac 維修與保固的關係說明：\n\n原廠保固期內：\n• 建議先聯絡Apple客服\n• 可至Apple Store檢測\n• 非人為損壞可免費維修\n• 人為損壞需付費維修\n\n保固期外：\n• 可選擇我們的維修服務\n• 價格較原廠優惠\n• 使用相容性零件\n• 提供90天維修保固\n\n我們的優勢：\n• 維修經驗豐富\n• 價格透明合理\n• 快速維修服務\n• 專業技術團隊\n\n協助您在成本和品質間找到平衡。',
          category: 'Mac維修'
        }
      ]
    },
    {
      title: '服務與保固',
      faqs: [
        {
          icon: CheckCircle,
          question: '維修後的保固範圍有哪些？',
          answer: '我們提供業界最完整的維修保固：\n\n保固期間：90天\n\n保固範圍：\n• 更換零件本身品質\n• 維修施工品質\n• 相同故障免費重修\n• 功能正常運作\n\n保固服務：\n• 提供保固卡和維修記錄\n• 全台服務據點都可保固\n• 保固期內免費檢測\n• 詳細保固條款說明\n\n不包含項目：\n• 人為損壞（摔落、進水）\n• 其他新發生的故障\n• 超出正常使用範圍\n\n我們會詳細說明保固範圍，讓您安心。',
          category: '保固服務'
        },
        {
          icon: Smartphone,
          question: '二手 Apple 產品有什麼保障？',
          answer: '我們的二手 Apple 產品經過嚴格把關：\n\n品質保證：\n• 30項專業功能檢測\n• 電池健康度80%以上\n• 外觀9成新以上\n• 原廠配件齊全\n• 已清除前用戶資料\n\n保固服務：\n• iPhone：30天硬體功能保固\n• iPad：30天硬體功能保固\n• Mac：30天硬體功能保固\n• 完整檢測報告\n• 可現場試用確認功能\n\n購買保障：\n• 7天鑑賞期\n• 功能不符可退換\n• 提供購買憑證\n• 專業售後服務',
          category: '二手機保障'
        },
        {
          icon: AlertCircle,
          question: '什麼情況下建議不要維修？',
          answer: '以下情況我們會誠實建議您考慮其他選擇：\n\n不建議維修的情況：\n• 主機板嚴重燒毀或腐蝕\n• 進水時間過長造成多重損壞\n• 維修成本超過購買新機的70%\n• 機型過於老舊，零件停產\n• 多次維修仍無法根治的問題\n• 外觀損壞過於嚴重\n\n替代方案：\n• 推薦購買二手機\n• 協助數據救援\n• 零件回收估價\n• 提供換機優惠\n\n我們絕不勉強維修，提供最誠實的專業建議。',
          category: '維修限制'
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
                className="text-left bg-white flat-card p-4 md:p-6 hover:border-neutral-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white"
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
                  className="mt-auto bg-white border-t border-neutral-200 shadow-xl"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  id="faq-bottom-sheet"
                >
                  {/* 把手 */}
                  <div className="pt-3 flex justify-center">
                    <div className="w-12 h-1.5 bg-neutral-200" />
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