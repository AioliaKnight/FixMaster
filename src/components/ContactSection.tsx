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
  Zap,
  ArrowRight
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { trackClick, trackEvent, trackViewPromotion, trackGenerateLead, trackSelectPromotion } from '@/lib/tracking'
import { motionTimings, motionViewport } from '@/lib/motion'
import Button from './ui/Button'

export default function ContactSection() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device: '',
    issue: '',
    preferredTime: '',
    message: '',
    token: '', // honeypot
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    utm_term: '',
    gclid: '',
    fbclid: '',
    referrer: ''
  })
  
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [fallbackNotice, setFallbackNotice] = useState<string | null>(null)

  useEffect(() => {
    try {
      const pick = (k: string) => searchParams?.get(k) || ''
      const updated = {
        utm_source: pick('utm_source'),
        utm_medium: pick('utm_medium'),
        utm_campaign: pick('utm_campaign'),
        utm_content: pick('utm_content'),
        utm_term: pick('utm_term'),
        gclid: pick('gclid'),
        fbclid: pick('fbclid'),
        referrer: typeof document !== 'undefined' ? document.referrer : ''
      }
      setFormData(prev => ({ ...prev, ...updated }))
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    if (!formData.name.trim()) errors.name = '請輸入您的姓名'
    else if (formData.name.trim().length < 2) errors.name = '姓名至少需要2個字元'
    if (!formData.phone.trim()) errors.phone = '請輸入您的聯絡電話'
    else if (!/^09\d{8}$/.test(formData.phone.replace(/\D/g, ''))) errors.phone = '請輸入正確的手機號碼格式 (09xxxxxxxx)'
    if (!formData.device.trim()) errors.device = '請選擇您的設備型號'
    if (!formData.issue.trim()) errors.issue = '請選擇問題類型'
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
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log('Form submitted (simulated)', formData)
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error(error)
      // Fallback logic
      const subject = encodeURIComponent(`FixMaster 維修預約 - ${formData.name} (${formData.device})`)
      const body = encodeURIComponent(`
姓名：${formData.name}
電話：${formData.phone}
裝置：${formData.device}
問題：${formData.issue}
預約：${formData.preferredTime}
備註：${formData.message}
      `)
      const mailtoUrl = `mailto:fixmastertw@gmail.com?subject=${subject}&body=${body}`
      window.open(mailtoUrl, '_blank')
      setFallbackNotice('已為您開啟郵件軟體，若未成功寄出，請直接致電 02-2816-6666，將有專人為您服務。')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: '士林門市',
      content: '台北市士林區文林路 60 號',
      subContent: '捷運劍潭站 1 號出口步行 3 分鐘',
      action: '開啟導航',
      actionType: 'navigation'
    },
    {
      icon: Phone,
      title: '聯絡電話',
      content: '02-2816-6666',
      subContent: '營業時間內專人即時接聽',
      action: '立即撥打',
      actionType: 'phone'
    },
    {
      icon: MessageCircle,
      title: 'LINE 官方帳號',
      content: '@fixmaster',
      subContent: '24 小時線上留言，真人回覆',
      action: '加入好友',
      actionType: 'line'
    },
    {
      icon: Mail,
      title: '電子信箱',
      content: 'fixmastertw@gmail.com',
      subContent: '企業合作與一般諮詢',
      action: '撰寫郵件',
      actionType: 'email'
    }
  ]

  const businessHours = [
    { day: '週一至週五', hours: '14:00 – 23:00' },
    { day: '週六、週日', hours: '15:00 – 23:00' },
    { day: '國定假日', hours: '另行公告' }
  ]

  const features = [
    { icon: Zap, title: '快速回應', description: '營業時間 30 分鐘內回覆' },
    { icon: Phone, title: '電話預約', description: '確認時段，減少現場等待' },
    { icon: MessageCircle, title: 'LINE 諮詢', description: '線上報價與圖文解說' },
    { icon: MapPin, title: '交通便利', description: '士林夜市商圈，交通方便' }
  ]

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-[-10%] -top-24 h-80 bg-[radial-gradient(60%_60%_at_50%_0%,_rgba(255,255,255,0.08),_rgba(255,255,255,0))] blur-[100px]" aria-hidden="true" />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* 區塊標題 */}
          <motion.div 
            className="text-center mb-12 md:mb-16"
            variants={{ initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }}
            initial="initial"
            whileInView="animate"
            transition={motionTimings.soft}
            viewport={motionViewport}
            onViewportEnter={() => trackViewPromotion({ section: 'contact', label: '聯絡我們' })}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-6 text-balance">
              聯絡我們
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto font-medium leading-relaxed text-pretty">
              不維修不收費，30 分鐘內回電；也可直接來電 02-2816-6666 或 LINE @fixmaster。
            </p>
            <p className="text-[15px] text-neutral-500 max-w-2xl mx-auto mt-3 text-pretty">
              若需到府收送，請告知裝置型號與問題，我們將說明免運門檻與可預約時段。
            </p>
          </motion.div>

          {/* 聯絡方式 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12 md:mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="glass-surface p-6 text-center flex flex-col items-center gap-4 hover:bg-white/60 transition-colors group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...motionTimings.soft, delay: index * 0.08 }}
                viewport={motionViewport}
              >
                <div className="glass-control w-14 h-14 flex items-center justify-center text-neutral-900 shadow-[var(--elev-2)] group-hover:scale-110 transition-transform duration-300">
                  <info.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <h3 className="text-[15px] font-bold text-neutral-900 mb-1">{info.title}</h3>
                  <p className="text-sm font-medium text-neutral-800 mb-1">{info.content}</p>
                  <p className="text-xs text-neutral-500">{info.subContent}</p>
                </div>
                <button
                  className="w-full glass-control py-2.5 text-sm font-semibold text-neutral-900 hover:bg-white/80 transition-colors shadow-none hover:shadow-sm"
                  onClick={() => {
                    trackGenerateLead({ section: 'contact', action: 'cta_click', target: info.actionType, label: 'contact_card' })
                    if (info.actionType === 'phone') window.location.href = 'tel:+886-2-2816-6666'
                    else if (info.actionType === 'email') window.open('mailto:fixmastertw@gmail.com', '_blank')
                    else if (info.actionType === 'line') window.open('https://line.me/R/ti/p/@fixmaster', '_blank')
                    else if (info.actionType === 'navigation') window.open('https://maps.google.com/maps?q=台北市士林區文林路60號', '_blank')
                  }}
                >
                  {info.action}
                </button>
              </motion.div>
            ))}
          </div>

          {/* 主要內容區: 快速聯絡 & 營業資訊 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-12 md:mb-16">
            {/* 快速聯絡 CTA */}
            <motion.div
              className="glass-panel overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={motionTimings.soft}
              viewport={motionViewport}
            >
              <div className="p-8 md:p-10 flex flex-col h-full justify-center relative">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                  <Calendar className="w-32 h-32" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 text-balance">
                  想快速預約或詢價？
                </h3>
                <p className="text-neutral-600 text-lg mb-8 leading-relaxed text-pretty">
                  建議使用 LINE 或電話直接聯繫，我們將在營業時間內 30 分鐘內回覆，提供最準確的報價與到府收送建議。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=contact_card&utm_campaign=contact_line"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary py-4 text-[15px] font-bold shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    onClick={() => trackClick('contact_simple_line_cta')}
                  >
                    <MessageCircle className="w-5 h-5" />
                    LINE 快速諮詢
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="tel:+886-2-2816-6666"
                    className="flex-1 glass-control py-4 text-[15px] font-bold text-neutral-900 hover:bg-white/80 flex items-center justify-center gap-2"
                    onClick={() => trackClick('contact_simple_tel_cta')}
                  >
                    <Phone className="w-5 h-5" />
                    02-2816-6666
                  </a>
                </div>
              </div>
            </motion.div>

            {/* 營業時間與地圖 */}
            <motion.div
              className="glass-panel overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={motionTimings.soft}
              viewport={motionViewport}
            >
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-neutral-900" />
                  <h3 className="text-xl font-bold text-neutral-900">營業時間</h3>
                </div>
                <div className="space-y-4 mb-8">
                  {businessHours.map((time, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-neutral-200/50 pb-2 last:border-0">
                      <span className="text-neutral-600 font-medium">{time.day}</span>
                      <span className="text-neutral-900 font-bold">{time.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-[24px] p-1.5 shadow-[var(--elev-2)]">
                  <div className="relative rounded-[20px] overflow-hidden">
                    <iframe 
                      src="https://maps.google.com/maps?q=台北市士林區文林路60號&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="240"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="FixMaster 士林店地圖"
                      className="grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md p-5 border-t border-neutral-100">
                      <div className="flex items-start justify-center gap-3 mb-4">
                        <div className="mt-1 shrink-0 w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                          <MapPin className="w-4 h-4 text-neutral-900" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-neutral-900 text-lg leading-tight">台北市士林區文林路 60 號</p>
                          <p className="text-sm text-neutral-500 mt-1 font-medium text-pretty">捷運劍潭站 1 號出口步行 3 分鐘（士林夜市旁）</p>
                        </div>
                      </div>
                      <button
                        className="w-full bg-neutral-900 text-white py-3.5 rounded-xl text-[15px] font-bold hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                        onClick={() => {
                          trackSelectPromotion({ section: 'contact', action: 'link_click', target: 'maps', label: 'navigate' })
                          const address = '台北市士林區文林路60號'
                          const encodedAddress = encodeURIComponent(address)
                          if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                            window.open(`https://maps.google.com/maps?q=${encodedAddress}`, '_blank')
                          } else {
                            window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
                          }
                        }}
                      >
                        <Navigation className="w-4 h-4" />
                        開啟 Google Maps 導航
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 服務特色 */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            {features.map((feature, index) => (
              <div key={index} className="glass-surface p-5 text-center flex flex-col items-center justify-center bg-white/30">
                <feature.icon className="w-6 h-6 text-neutral-700 mb-3 opacity-80" />
                <h4 className="text-sm font-bold text-neutral-900 mb-1">{feature.title}</h4>
                <p className="text-xs text-neutral-500">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          {/* 最終 CTA */}
          <motion.div
            className="glass-panel text-center motion-soft-enter overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="p-10 md:p-14 relative">
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-2xl md:text-4xl font-bold text-neutral-900 mb-4 tracking-tight text-balance">
                  今天的煩惱，今天就解決。
                </h3>
                <p className="text-neutral-600 text-base md:text-lg mb-10 max-w-2xl mx-auto font-medium text-pretty">
                  一通電話或一則訊息，讓我們幫你的 iPhone 恢復到原廠般的最佳狀態。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="tel:+886-2-2816-6666"
                    className="btn-primary px-8 py-4 text-[15px] font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
                    onClick={() => trackGenerateLead({ section: 'contact', action: 'cta_click', target: 'tel', label: 'final' })}
                  >
                    立即撥打預約
                  </a>
                  <a
                    href="https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=final_cta&utm_campaign=contact_line"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-control px-8 py-4 text-[15px] font-bold text-neutral-900 hover:bg-white/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                    onClick={() => trackGenerateLead({ section: 'contact', action: 'cta_click', target: 'line', label: 'final' })}
                  >
                    LINE 線上諮詢
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
