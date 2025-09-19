'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { trackClick } from '@/lib/tracking'
import { 
  Award, 
  Video, 
  DollarSign, 
  FileText, 
  Shield, 
  Clock, 
  CheckCircle,
  Users,
  Trophy,
  Star
} from 'lucide-react'

export default function TrustSection() {
  const promisesId = 'trust-promises'
  const certsId = 'trust-certs'
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
      icon: 'apple_logo'
    },
    {
      title: '原廠零件供應',
      description: '正品零件保證',
      icon: '🔧'
    },
    {
      title: '專業技師執照',
      description: '經驗豐富團隊',
      icon: '👨‍🔧'
    },
    {
      title: '品質管理認證',
      description: 'ISO 品質標準',
      icon: '🏆'
    }
  ]

  const statistics = [
    {
      number: '5000+',
      label: '成功維修案例',
      icon: CheckCircle
    },
    {
      number: '99.8%',
      label: '客戶滿意度',
      icon: Star
    },
    {
      number: '3年+',
      label: '專業經驗',
      icon: Trophy
    },
    {
      number: '24/7',
      label: '客服支援',
      icon: Users
    }
  ]

  return (
    <section id="trust" className="section-padding bg-white">
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
              我們的安心承諾
            </h2>
            <p className="text-neutral-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Apple IRP 認證、原廠零件、全程錄影與明確保固，讓每一步都可驗證、可追溯。
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-8"></div>
          </motion.div>

          {/* 主要承諾 */}
          <div
            id={promisesId}
            className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 md:grid md:grid-cols-2 md:gap-8 mb-16 -mx-1 px-1"
            role="region"
            aria-roledescription="carousel"
            aria-label="主要承諾"
          >
            {promises.map((promise, index) => (
              <motion.div
                key={index}
                className="bg-white flat-card p-6 md:p-8 hover:border-neutral-400 transition-all duration-200 flex-none w-[22rem] snap-start md:w-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* 標章 */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 bg-white border border-neutral-200 flex items-center justify-center">
                    <promise.icon className="w-8 h-8 text-neutral-900" />
                  </div>
                  <div className="text-neutral-900 text-sm font-medium">
                    {promise.badge}
                  </div>
                </div>

                {/* 標題與描述 */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {promise.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {promise.description}
                </p>

                {/* 詳細項目 */}
                <div className="space-y-3">
                  {promise.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-neutral-900 mr-3 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          {/* dots replaced by unified SliderDots handled at higher level if needed */}

          {/* 認證資格 */}
          <motion.div
            className="bg-white flat-card p-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 text-center mb-8">
              專業認證與資格
            </h3>
            <div
              id={certsId}
              className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 -mx-1 px-1"
              role="region"
              aria-roledescription="carousel"
              aria-label="專業認證與資格"
            >
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  className="text-center group flex-none w-56 snap-start md:w-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl mb-4 flex justify-center">
                    {cert.icon === 'apple_logo' ? (
                      <Image 
                        src="/apple_logo.webp" 
                        alt="Apple Logo" 
                        width={48}
                        height={48}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      cert.icon
                    )}
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">{cert.title}</h4>
                  <p className="text-neutral-600 text-sm">{cert.description}</p>
                </motion.div>
              ))}
            </div>
            {/* dots replaced by unified SliderDots handled at higher level if needed */}
          </motion.div>

          {/* Apple 官方認證驗證 */}
          <motion.div
            className="bg-white flat-card p-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-accent-500 flex items-center justify-center mr-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    驗證 Apple 維修認證資格
                  </h3>
                  <p className="text-neutral-600">
                    透過 Apple 官方系統驗證獨立維修商資格
                  </p>
                </div>
              </div>
              
              <div className="bg-neutral-50 flat-card p-6 mb-6 border border-neutral-200">
                <div className="flex items-center justify-center mb-4">
                  <Image 
                    src="/apple_logo.webp" 
                    alt="Apple Logo" 
                    width={40}
                    height={40}
                    className="w-10 h-10 mr-3 object-contain"
                  />
                  <div>
                    <p className="text-lg font-semibold text-neutral-900">聯豐通信有限公司</p>
                    <p className="text-neutral-600">Apple 官方認證獨立維修中心</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-500 mb-4">
                  您可以透過 Apple 官方維修中心驗證頁面，查詢我們的認證資格
                </p>
              </div>

              <a 
                href="https://support.apple.com/zh-tw/repair/verify-repair-provider"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-accent-500 text-white px-8 py-4 font-semibold hover:bg-accent-600 transition-colors duration-200 group"
                onClick={() => trackClick('trust_apple_verify_click', { section: 'trust' })}
              >
                <Shield className="w-5 h-5 mr-3" />
                Apple 官方驗證頁面
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              
              <p className="text-xs text-neutral-500 mt-4">
                在搜尋欄位輸入「聯豐通信」及地區選擇「台北市」可找到我們的認證資訊
              </p>
            </div>
          </motion.div>

          {/* 統計數據 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            {statistics.map((stat, index) => (
              <div key={index} className="text-center bg-white flat-card p-6">
                <div className="w-16 h-16 bg-accent-500 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-2">{stat.number}</div>
                <div className="text-neutral-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* 服務承諾 */}
          <motion.div
            className="bg-white flat-card p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-6">
              我們的服務承諾
            </h3>
            <p className="text-neutral-600 text-lg sm:text-xl mb-8 max-w-3xl mx-auto">
              選擇 FixMaster 維修大師，您將享受到最專業、最透明、最安心的維修服務體驗
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium">
                30分鐘快速完修
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium">
                90天品質保固
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium">
                原廠零件保證
              </div>
              <div className="bg-neutral-100 text-neutral-900 px-6 py-3 text-sm font-medium">
                全程透明錄影
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 