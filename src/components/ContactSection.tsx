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

  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // 清除該欄位的錯誤訊息
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      errors.name = '請輸入您的姓名'
    } else if (formData.name.trim().length < 2) {
      errors.name = '姓名至少需要2個字元'
    }
    
    if (!formData.phone.trim()) {
      errors.phone = '請輸入您的聯絡電話'
    } else if (!/^09\d{8}$/.test(formData.phone.replace(/\D/g, ''))) {
      errors.phone = '請輸入正確的手機號碼格式 (09xxxxxxxx)'
    }
    
    if (!formData.device.trim()) {
      errors.device = '請選擇您的設備型號'
    }
    
    if (!formData.issue.trim()) {
      errors.issue = '請選擇問題類型'
    }
    
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // 準備要寄送的資料
      const emailData = {
        to: 'fixmastertw@gmail.com',
        subject: `FixMaster 維修預約 - ${formData.name} (${formData.device})`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 24px;">🔧 FixMaster 維修預約</h1>
            </div>
            
            <div style="padding: 30px; background-color: #f9f9f9;">
              <h2 style="color: #333; margin-bottom: 20px;">客戶預約資訊</h2>
              
              <table style="width: 100%; border-collapse: collapse; background-color: white;">
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 12px; font-weight: bold; background-color: #f5f5f5; width: 120px;">客戶姓名</td>
                  <td style="padding: 12px;">${formData.name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 12px; font-weight: bold; background-color: #f5f5f5;">聯絡電話</td>
                  <td style="padding: 12px;">${formData.phone}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 12px; font-weight: bold; background-color: #f5f5f5;">裝置型號</td>
                  <td style="padding: 12px;">${formData.device}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 12px; font-weight: bold; background-color: #f5f5f5;">問題類型</td>
                  <td style="padding: 12px;">${formData.issue}</td>
                </tr>
                <tr style="border-bottom: 1px solid #ddd;">
                  <td style="padding: 12px; font-weight: bold; background-color: #f5f5f5;">希望時間</td>
                  <td style="padding: 12px;">${formData.preferredTime || '未指定'}</td>
                </tr>
                <tr>
                  <td style="padding: 12px; font-weight: bold; background-color: #f5f5f5; vertical-align: top;">補充說明</td>
                  <td style="padding: 12px;">${formData.message || '無'}</td>
                </tr>
              </table>
              
              <div style="margin-top: 30px; padding: 20px; background-color: #dc2626; color: white; text-align: center;">
                <h3 style="margin: 0 0 10px 0;">📞 請儘快聯絡客戶確認預約</h3>
                <p style="margin: 0; font-size: 14px;">建議在30分鐘內回電確認維修時間</p>
              </div>
              
              <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #666;">
                <p>此郵件由 FixMaster 維修大師官網自動發送</p>
                <p>預約時間: ${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</p>
              </div>
            </div>
          </div>
        `,
        text: `
FixMaster 維修預約通知

客戶資訊:
- 姓名: ${formData.name}
- 電話: ${formData.phone}
- 裝置: ${formData.device}
- 問題: ${formData.issue}
- 希望時間: ${formData.preferredTime || '未指定'}
- 補充說明: ${formData.message || '無'}

預約時間: ${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}

請儘快聯絡客戶確認預約時間。
        `
      }

      // 使用 EmailJS 或類似服務發送郵件
      // 這裡示範使用 fetch 發送到後端 API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      })

      if (!response.ok) {
        throw new Error('郵件發送失敗')
      }
      
      console.log('Form submitted successfully:', formData)
      setSubmitSuccess(true)
      
      // 重置表單
      setFormData({
        name: '',
        phone: '',
        device: '',
        issue: '',
        preferredTime: '',
        message: ''
      })
      
      // 3秒後隱藏成功訊息
      setTimeout(() => setSubmitSuccess(false), 5000)
      
    } catch (error) {
      console.error('Form submission error:', error)
      
      // 備用方案：使用 mailto 連結
      const subject = encodeURIComponent(`FixMaster 維修預約 - ${formData.name} (${formData.device})`)
      const body = encodeURIComponent(`
客戶預約資訊:

姓名: ${formData.name}
電話: ${formData.phone}
裝置型號: ${formData.device}
問題類型: ${formData.issue}
希望時間: ${formData.preferredTime || '未指定'}
補充說明: ${formData.message || '無'}

預約時間: ${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}

請儘快聯絡客戶確認預約時間。
      `)
      
      const mailtoUrl = `mailto:fixmastertw@gmail.com?subject=${subject}&body=${body}`
      window.open(mailtoUrl, '_blank')
      
      alert('表單將透過您的預設郵件程式發送，請確認寄出。或您可直接來電 02-2816-6666 預約。')
    } finally {
      setIsSubmitting(false)
    }
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
              content: 'service@fixmastertw.com',
      subContent: '24小時內回覆',
      action: '發送郵件',
      actionType: 'email'
    }
  ]

  const businessHours = [
    { day: '週一至週五', hours: '14:00 - 23:00' },
    { day: '週六與週日', hours: '15:00 - 23:00' },
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
               想快點修好，也想修得安心。告訴我們，你的需要是什麼。
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
                  <button 
                    className="bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 flat-button text-sm font-medium transition-colors duration-200"
                    onClick={() => {
                      if (info.actionType === 'phone') {
                        window.location.href = 'tel:+886-2-2816-6666'
                      } else if (info.actionType === 'email') {
                        const subject = encodeURIComponent('FixMaster 維修諮詢')
                        const body = encodeURIComponent(`您好，我想諮詢iPhone維修服務。

請提供以下資訊：
- 維修項目：
- 裝置型號：
- 聯絡電話：

謝謝！`)
                        window.open(`mailto:fixmastertw@gmail.com?subject=${subject}&body=${body}`, '_blank')
                      } else if (info.actionType === 'navigation') {
                        const address = '台北市士林區文林路60號'
                        const encodedAddress = encodeURIComponent(address)
                        
                        // 手機優先使用 Google Maps App
                        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                          window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank')
                        } else {
                          // 桌面版使用 Google Maps 網頁版
                          window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
                        }
                      }
                    }}
                  >
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
                {/* 成功訊息 */}
                {submitSuccess && (
                  <div className="bg-green-50 border border-green-200 p-4 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800">預約已送出！我們將在30分鐘內與您聯繫確認。</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 text-sm mb-2">姓名 *</label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full bg-neutral-50 border px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none transition-colors duration-200 ${
                        formErrors.name ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-accent-500'
                      }`}
                      placeholder="請輸入您的姓名"
                      required
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm mb-2">手機 *</label>
                    <input
                      type="tel"
                      name="phone"
                      inputMode="numeric"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full bg-neutral-50 border px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none transition-colors duration-200 ${
                        formErrors.phone ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-accent-500'
                      }`}
                      placeholder="09xxxxxxxx"
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-700 text-sm mb-2">裝置型號 *</label>
                    <select
                      name="device"
                      value={formData.device}
                      onChange={handleInputChange}
                      className={`w-full bg-neutral-50 border px-4 py-2 text-neutral-900 focus:outline-none transition-colors duration-200 ${
                        formErrors.device ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-accent-500'
                      }`}
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
                    {formErrors.device && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.device}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-neutral-700 text-sm mb-2">問題類型 *</label>
                    <select
                      name="issue"
                      value={formData.issue}
                      onChange={handleInputChange}
                      className={`w-full bg-neutral-50 border px-4 py-2 text-neutral-900 focus:outline-none transition-colors duration-200 ${
                        formErrors.issue ? 'border-red-500 focus:border-red-500' : 'border-neutral-300 focus:border-accent-500'
                      }`}
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
                    {formErrors.issue && (
                      <p className="text-red-500 text-xs mt-1">{formErrors.issue}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-neutral-700 text-sm mb-2">希望時間</label>
                  <input
                    type="datetime-local"
                    name="preferredTime"
                    autoComplete="off"
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
                    autoComplete="off"
                    className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2 text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-accent-500"
                    placeholder="請描述問題詳細狀況"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 flat-button font-semibold transition-colors duration-200 flex items-center justify-center ${
                    isSubmitting 
                      ? 'bg-neutral-400 cursor-not-allowed' 
                      : 'bg-accent-500 hover:bg-accent-600 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      送出中...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      送出預約
                    </>
                  )}
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
                <button 
                  className="w-full bg-accent-500 hover:bg-accent-600 text-white py-2 flat-button font-medium transition-colors duration-200"
                  onClick={() => {
                    const address = '台北市士林區文林路60號'
                    const encodedAddress = encodeURIComponent(address)
                    
                    // 手機優先使用 Google Maps App
                    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                      window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank')
                    } else {
                      // 桌面版使用 Google Maps 網頁版
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
                    }
                  }}
                >
                  🗺️ Google Maps 導航
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
              今天的煩惱，今天就解決。
            </h3>
            <p className="text-neutral-600 text-xl mb-8 max-w-2xl mx-auto">
              一通電話或一則訊息，讓我們幫你的手機恢復到最好狀態
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