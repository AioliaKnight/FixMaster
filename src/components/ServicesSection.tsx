'use client'

import { motion } from 'framer-motion'
import { 
  Smartphone, 
  Battery, 
  Monitor, 
  Shield, 
  Truck, 
  Video, 
  CheckCircle, 
  Star,
  Clock,
  Award
} from 'lucide-react'

export default function ServicesSection() {
  const services = [
    {
      icon: Monitor,
      title: 'iPhone 原廠螢幕更換',
      description: 'Apple IRP 認證原廠螢幕，現場更換，品質保證',
      features: ['原廠 OLED 螢幕', '觸控完美運作', '色彩準確度 100%', '90天保固'],
      price: '依機型而定',
      highlight: '最受歡迎'
    },
    {
      icon: Battery,
      title: '電池健康度修復',
      description: '原廠電池更換，恢復最佳續航力',
      features: ['原廠電池芯片', '電池健康度 100%', '快速充電支援', '90天保固'],
      price: '依機型而定',
      highlight: ''
    },
    {
      icon: Smartphone,
      title: '二手 iPhone 嚴選',
      description: '精選二手 iPhone，完整檢測報告與保固',
      features: ['全機功能檢測', '外觀評級分類', '配件齊全', '30天保固'],
      price: '價格透明',
      highlight: '熱門推薦'
    },
    {
      icon: Truck,
      title: '到府收送服務',
      description: '忙碌上班族專屬服務，免出門輕鬆維修',
      features: ['台北市區免費', '當日收件修復', '完修後送回', '全程保險'],
      price: '滿額免費',
      highlight: ''
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
      title: '30分鐘快速完修',
      description: '現場等候，快速完成維修'
    },
    {
      icon: Award,
      title: 'Apple IRP 認證',
      description: '官方認證技師，品質有保障'
    }
  ]

  return (
    <section id="services" className="section-padding bg-neutral-50">
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
              我們的專業服務
            </h2>
            <p className="text-neutral-600 text-lg sm:text-xl max-w-2xl mx-auto">
              Apple 授權獨立維修商，提供最專業的 iPhone 維修與二手機服務
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-8"></div>
          </motion.div>

          {/* 主要服務卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="relative bg-white flat-card p-6 md:p-8 group hover:border-neutral-400 transition-all duration-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* 推薦標籤 */}
                {service.highlight && (
                  <div className="absolute top-0 left-0 bg-accent-500 text-white px-4 py-2 text-sm font-medium">
                    {service.highlight}
                  </div>
                )}

                {/* 服務圖示 */}
                <div className="flex items-center mb-6 mt-4">
                  <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-neutral-900" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">{service.title}</h3>
                    <p className="text-neutral-600 text-sm">{service.description}</p>
                  </div>
                </div>

                {/* 特色功能 */}
                <div className="space-y-4 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-neutral-900 mr-4 flex-shrink-0" />
                      <span className="text-neutral-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* 價格和按鈕 */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-neutral-500 text-sm">價格</span>
                    <div className="text-lg font-semibold text-neutral-900">{service.price}</div>
                  </div>
                  <button className="w-full sm:w-auto bg-accent-500 hover:bg-accent-600 text-white px-6 sm:px-8 py-3 flat-button font-medium transition-colors duration-200">
                    立即預約
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 附加服務 */}
          <motion.div
            className="bg-white p-12 flat-card mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-neutral-900 text-center mb-12">
              為什麼選擇 FixMaster？
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-neutral-900" />
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">{service.title}</h4>
                  <p className="text-neutral-600 text-sm">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 服務流程 */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 mb-8">
              簡單三步驟，輕鬆完成維修
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">聯絡預約</h4>
                <p className="text-neutral-600 text-sm">LINE 或電話快速預約</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">現場檢測</h4>
                <p className="text-neutral-600 text-sm">免費檢測，透明報價</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-500 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">快速完修</h4>
                <p className="text-neutral-600 text-sm">30分鐘完修取件</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 