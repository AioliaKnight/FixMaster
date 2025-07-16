'use client'

import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Clock, Shield, DollarSign, Smartphone, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      icon: Clock,
      question: '維修時間需要多長？',
      answer: '大部分維修項目我們都能在 30 分鐘內完成，包括螢幕更換、電池更換等。複雜的主板維修可能需要 1-2 小時。我們提供現場等候服務，讓您不用跑兩趟。',
      category: '維修時間'
    },
    {
      icon: Shield,
      question: '如何判斷是否為原廠零件？',
      answer: '我們是 Apple IRP 認證的獨立維修商，所有零件都是原廠正品。每個零件都有序號可查證，我們也會提供購買憑證。此外，原廠零件在系統設定中會正確顯示型號資訊。',
      category: '零件品質'
    },
    {
      icon: CheckCircle,
      question: '有沒有維修後保固？',
      answer: '我們提供 90 天的維修保固，涵蓋零件本身和施工品質。保固期內如果出現相同問題，我們免費重新處理。保固不包括人為損壞或其他新的故障。',
      category: '保固服務'
    },
    {
      icon: Smartphone,
      question: '買二手 iPhone 有什麼保障？',
      answer: '我們的二手 iPhone 都經過 30 項專業檢測，提供完整的檢測報告。包含 30 天保固、原廠配件、電池健康度檢測報告。所有手機都已清除資料並重新設定。',
      category: '二手機保障'
    },
    {
      icon: DollarSign,
      question: '維修費用如何計算？',
      answer: '我們採用透明定價，所有價格都會事先告知。不同機型的維修費用不同，現場檢測後會提供詳細報價單。沒有隱藏費用，收費合理公開。',
      category: '價格透明'
    },
    {
      icon: AlertCircle,
      question: '什麼情況無法維修？',
      answer: '主板嚴重燒毀、進水腐蝕過於嚴重、或維修成本超過購買新機的 70% 時，我們會建議您考慮其他選擇。我們會誠實告知維修的可行性和成本效益。',
      category: '維修限制'
    }
  ]

  const quickAnswers = [
    {
      question: '需要預約嗎？',
      answer: '建議先預約，但也接受現場服務',
      icon: '📅'
    },
    {
      question: '支援哪些付款方式？',
      answer: '現金、信用卡、LINE Pay、街口支付',
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
    }
  ]

  return (
    <section id="faq" className="section-padding bg-neutral-50">
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
              常見問答
            </h2>
            <p className="text-neutral-600 text-lg sm:text-xl max-w-2xl mx-auto">
              為您解答維修相關的常見疑問，讓您更安心地選擇我們的服務
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-8"></div>
          </motion.div>

          {/* 快速問答 */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {quickAnswers.map((item, index) => (
              <div key={index} className="bg-white flat-card p-6 md:p-8 text-center">
                <div className="text-2xl md:text-3xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-neutral-900 mb-3 text-sm">
                  {item.question}
                </h3>
                <p className="text-neutral-600 text-xs">{item.answer}</p>
              </div>
            ))}
          </motion.div>

          {/* 詳細問答 */}
          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white flat-card overflow-hidden hover:border-neutral-400 transition-all duration-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 md:px-8 py-6 md:py-8 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4 md:space-x-6">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-neutral-100 flex items-center justify-center">
                      <faq.icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-base md:text-lg">
                        {faq.question}
                      </h3>
                      <span className="text-neutral-600 text-sm font-medium">
                        {faq.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-6 h-6 text-neutral-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-neutral-600" />
                    )}
                  </div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openItems.includes(index) ? 'auto' : 0,
                    opacity: openItems.includes(index) ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 md:px-8 pb-6 md:pb-8 ml-14 md:ml-18">
                    <p className="text-neutral-700 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* 聯絡資訊 */}
          <motion.div
            className="mt-16 bg-neutral-900 p-12 text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">
              還有其他問題嗎？
            </h3>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              我們的專業客服團隊隨時為您解答，歡迎透過以下方式聯絡我們
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="tel:+886-2-2816-6666" 
                className="bg-white text-neutral-900 px-8 py-4 flat-button font-semibold hover:bg-neutral-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
                直接撥打電話
              </a>
              <a 
                href="https://line.me/R/ti/p/@fixmaster" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent-500 text-white px-8 py-4 flat-button font-semibold hover:bg-accent-600 transition-colors duration-200 inline-flex items-center justify-center"
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