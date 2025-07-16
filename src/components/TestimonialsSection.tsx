'use client'

import { motion } from 'framer-motion'
import { Star, Quote, User, CheckCircle } from 'lucide-react'

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: '陳小姐',
      rating: 5,
      comment: '螢幕摔破了很緊張，但 FixMaster 的師傅很專業，現場錄影讓我很安心。30分鐘就修好了，品質跟新的一樣！',
      service: 'iPhone 12 螢幕更換',
      location: '士林區',
      date: '2024年3月',
      highlight: '快速專業'
    },
    {
      name: '王先生',
      rating: 5,
      comment: '電池健康度只剩65%，換了原廠電池後又可以用一整天了。價格透明，服務很好，推薦給大家！',
      service: 'iPhone 13 電池更換',
      location: '天母區',
      date: '2024年3月',
      highlight: '原廠安心'
    },
    {
      name: '林小姐',
      rating: 5,
      comment: '在這裡買了一台二手iPhone 14，附完整檢測報告，還有保固，比其他店家安心多了！',
      service: '二手 iPhone 14 購買',
      location: '北投區',
      date: '2024年2月',
      highlight: '品質保證'
    },
    {
      name: '張先生',
      rating: 5,
      comment: '工作太忙沒時間送修，到府收送服務太方便了！當天收件隔天就修好送回，超讚的服務！',
      service: '到府收送維修',
      location: '中山區',
      date: '2024年2月',
      highlight: '便民服務'
    },
    {
      name: '黃小姐',
      rating: 5,
      comment: '很怕遇到黑心維修店，但這裡是Apple認證的，而且全程錄影，讓我很放心。師傅技術很好！',
      service: 'iPhone 11 螢幕更換',
      location: '大同區',
      date: '2024年1月',
      highlight: '透明維修'
    },
    {
      name: '劉先生',
      rating: 5,
      comment: '維修後還提供90天保固，真的很有誠意！後來朋友也都來這裡修手機，值得信賴的店家。',
      service: 'iPhone 12 Pro 電池更換',
      location: '士林區',
      date: '2024年1月',
      highlight: '保固安心'
    }
  ]

  const stats = [
    {
      number: '1000+',
      label: '滿意客戶',
      icon: User
    },
    {
      number: '99%',
      label: '好評率',
      icon: Star
    },
    {
      number: '30分鐘',
      label: '平均完修時間',
      icon: CheckCircle
    },
    {
      number: '90天',
      label: '保固期限',
      icon: CheckCircle
    }
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'fill-neutral-900 text-neutral-900' : 'text-neutral-400'}`}
      />
    ))
  }

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
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white flat-card p-6 md:p-8">
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-neutral-900" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{stat.number}</div>
                <div className="text-neutral-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* 評價卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white flat-card p-6 md:p-8 hover:border-neutral-400 transition-all duration-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* 引號圖示 */}
                <div className="flex items-center justify-between mb-6">
                  <Quote className="w-8 h-8 text-neutral-400" />
                  <div className="bg-accent-500 text-white px-3 py-1 text-xs font-medium">
                    {testimonial.highlight}
                  </div>
                </div>

                {/* 評價內容 */}
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>

                {/* 服務項目 */}
                <div className="text-sm text-neutral-500 mb-4">
                  服務項目：{testimonial.service}
                </div>

                {/* 評分 */}
                <div className="flex items-center mb-6">
                  {renderStars(testimonial.rating)}
                  <span className="ml-2 text-sm text-neutral-600">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* 客戶資訊 */}
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-neutral-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-500">
                        {testimonial.location} • {testimonial.date}
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-neutral-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-neutral-900" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 信任標章 */}
          <motion.div
            className="bg-white flat-card p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-neutral-900 mb-6">
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