'use client'

import { motion } from 'framer-motion'
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Mail, 
  Calendar,
  Navigation,
  Star,
  CheckCircle,
  Send
} from 'lucide-react'
import { useState } from 'react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device: '',
    issue: '',
    preferredTime: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 這裡可以添加表單提交邏輯
    console.log('Form submitted:', formData)
    alert('預約已送出！我們將儘快與您聯繫確認。')
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: '店面地址',
      content: '台北市士林區文林路60號',
      subContent: '捷運劍潭站1號出口步行3分鐘',
      action: '前往導航',
      actionType: 'navigation'
    },
    {
      icon: Phone,
      title: '聯絡電話',
      content: '02-2816-6666',
      subContent: '服務時間內立即接聽',
      action: '立即撥打',
      actionType: 'phone'
    },
    {
      icon: MessageCircle,
      title: 'LINE 諮詢',
      content: '@fixmaster',
      subContent: '24小時線上客服',
      action: '加入好友',
      actionType: 'line'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'service@fixmaster.com.tw',
      subContent: '24小時內回覆',
      action: '發送郵件',
      actionType: 'email'
    }
  ]

  const businessHours = [
    { day: '週一至週五', hours: '10:00 - 21:00' },
    { day: '週六', hours: '10:00 - 18:00' },
    { day: '週日', hours: '12:00 - 18:00' },
    { day: '國定假日', hours: '依公告調整' }
  ]

  const features = [
    { icon: '⚡', title: '快速回應', description: '30分鐘內回覆' },
    { icon: '📞', title: '電話預約', description: '立即確認時間' },
    { icon: '💬', title: 'LINE 諮詢', description: '隨時線上詢問' },
    { icon: '🚗', title: '交通便利', description: '捷運站步行3分鐘' }
  ]

  return (
    <section id="contact" className="section-padding bg-neutral-900">
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              聯絡我們
            </h2>
            <p className="text-neutral-300 text-lg sm:text-xl max-w-2xl mx-auto">
              多種聯絡方式，讓您輕鬆預約維修服務
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-8"></div>
          </motion.div>

          {/* 聯絡方式 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="bg-white flat-card p-4 md:p-6 text-center hover:border-neutral-400 transition-all duration-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-accent-500 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-neutral-900 font-semibold mb-2">{info.title}</h3>
                <p className="text-neutral-700 font-medium mb-1">{info.content}</p>
                <p className="text-neutral-600 text-sm mb-4">{info.subContent}</p>
                {info.actionType === 'line' ? (
                  <a
                    href="https://line.me/R/ti/p/@fixmaster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 flat-button text-sm font-medium transition-colors duration-200"
                  >
                    {info.action}
                  </a>
                ) : (
                  <button className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 flat-button text-sm font-medium transition-colors duration-200">
                    {info.action}
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          {/* 主要內容區 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* 預約表單 */}
            <motion.div
                              className="bg-white flat-card p-6 md:p-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                線上預約
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 text-sm mb-2">姓名</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-accent-500"
                      placeholder="請輸入您的姓名"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm mb-2">手機</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-accent-500"
                      placeholder="請輸入手機號碼"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 text-sm mb-2">裝置型號</label>
                    <select
                      name="device"
                      value={formData.device}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2 text-neutral-900 focus:outline-none focus:border-accent-500"
                      required
                    >
                      <option value="">請選擇裝置</option>
                      <option value="iPhone 15 Pro Max">iPhone 15 Pro Max</option>
                      <option value="iPhone 15 Pro">iPhone 15 Pro</option>
                      <option value="iPhone 15">iPhone 15</option>
                      <option value="iPhone 14 Pro Max">iPhone 14 Pro Max</option>
                      <option value="iPhone 14 Pro">iPhone 14 Pro</option>
                      <option value="iPhone 14">iPhone 14</option>
                      <option value="iPhone 13 Pro Max">iPhone 13 Pro Max</option>
                      <option value="iPhone 13 Pro">iPhone 13 Pro</option>
                      <option value="iPhone 13">iPhone 13</option>
                      <option value="iPhone 12 Pro Max">iPhone 12 Pro Max</option>
                      <option value="iPhone 12 Pro">iPhone 12 Pro</option>
                      <option value="iPhone 12">iPhone 12</option>
                      <option value="其他機型">其他機型</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm mb-2">問題類型</label>
                    <select
                      name="issue"
                      value={formData.issue}
                      onChange={handleInputChange}
                      className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2 text-neutral-900 focus:outline-none focus:border-accent-500"
                      required
                    >
                      <option value="">請選擇問題</option>
                      <option value="螢幕破裂">螢幕破裂</option>
                      <option value="電池老化">電池老化</option>
                      <option value="無法開機">無法開機</option>
                      <option value="進水損壞">進水損壞</option>
                      <option value="按鍵失靈">按鍵失靈</option>
                      <option value="相機故障">相機故障</option>
                      <option value="充電異常">充電異常</option>
                      <option value="其他問題">其他問題</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-neutral-700 text-sm mb-2">希望時間</label>
                  <input
                    type="datetime-local"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2 text-neutral-900 focus:outline-none focus:border-accent-500"
                  />
                </div>
                
                <div>
                  <label className="block text-neutral-700 text-sm mb-2">補充說明</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-accent-500"
                    placeholder="請描述問題詳細狀況"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white py-3 flat-button font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  送出預約
                </button>
              </form>
            </motion.div>

            {/* 營業時間與地圖 */}
            <motion.div
              className="bg-white flat-card p-6 md:p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2" />
                營業時間
              </h3>
              
              <div className="space-y-3 mb-6">
                {businessHours.map((time, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-neutral-600">{time.day}</span>
                    <span className="text-neutral-900 font-medium">{time.hours}</span>
                  </div>
                ))}
              </div>
              
              <div className="bg-neutral-50 flat-card p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-4 flex items-center">
                  <Navigation className="w-6 h-6 mr-2" />
                  店面位置
                </h3>
                <div className="bg-neutral-100 p-4 mb-4">
                  <div className="text-neutral-900 text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-accent-500" />
                    <p className="font-medium">台北市士林區文林路60號</p>
                    <p className="text-neutral-600 text-sm">捷運劍潭站1號出口步行3分鐘</p>
                  </div>
                </div>
                <button className="w-full bg-accent-500 hover:bg-accent-600 text-white py-2 flat-button font-medium transition-colors duration-200">
                  Google Maps 導航
                </button>
              </div>
            </motion.div>
          </div>

          {/* 服務特色 */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <div key={index} className="bg-white flat-card p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl mb-3">{feature.icon}</div>
                <h4 className="text-neutral-900 font-semibold mb-2">{feature.title}</h4>
                <p className="text-neutral-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          {/* 最終 CTA */}
          <motion.div
            className="bg-white flat-card p-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-neutral-900 mb-6">
              立即預約，享受專業維修服務！
            </h3>
            <p className="text-neutral-600 text-xl mb-8 max-w-2xl mx-auto">
              FixMaster 維修大師，您身邊最值得信賴的 iPhone 維修專家
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
              <a 
                href="tel:+886-2-2816-6666" 
                className="w-full sm:w-auto bg-accent-500 text-white px-6 sm:px-8 py-4 flat-button font-semibold hover:bg-accent-600 transition-colors duration-200 inline-flex items-center justify-center"
              >
                立即撥打預約
              </a>
              <a 
                href="https://line.me/R/ti/p/@fixmaster" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-neutral-900 text-white px-6 sm:px-8 py-4 flat-button font-semibold hover:bg-neutral-800 transition-colors duration-200 inline-flex items-center justify-center"
              >
                LINE 快速諮詢
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 