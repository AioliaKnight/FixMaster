'use client'

import { motion } from 'framer-motion'
import { 
  Gift, 
  Truck, 
  Tag, 
  Clock, 
  Star, 
  Zap, 
  Heart,
  ShoppingCart,
  Trophy
} from 'lucide-react'

export default function PromotionsSection() {
  const mainPromotions = [
    {
      icon: Gift,
      title: '首次預約好禮',
      description: '初次預約維修即贈送9H鋼化玻璃貼',
      originalPrice: '市價 $299',
      discountPrice: '免費贈送',
      badge: '限時優惠',
      color: 'from-pink-500 to-pink-600',
      terms: ['限首次預約客戶', '需完成維修服務', '價值$299玻璃貼', '當場施作'],
      validUntil: '2024.12.31'
    },
    {
      icon: Truck,
      title: '免費收送服務',
      description: '維修滿指定金額，台北市區免費收送',
      originalPrice: '一般 $200',
      discountPrice: '滿額免費',
      badge: '超值服務',
      color: 'from-blue-500 to-blue-600',
      terms: ['台北市區限定', '維修金額滿$1500', '當日收件處理', '完修後免費送回'],
      validUntil: '長期優惠'
    },
    {
      icon: Tag,
      title: '當月特惠機種',
      description: '精選二手iPhone特價優惠，數量有限',
      originalPrice: '市價優惠',
      discountPrice: '最低8折',
      badge: '數量限定',
      color: 'from-purple-500 to-purple-600',
      terms: ['限當月特選機種', '電池健康度80%以上', '外觀9成新', '保固30天'],
      validUntil: '每月更新'
    }
  ]

  const flashDeals = [
    {
      title: 'iPhone 14 Pro 螢幕更換',
      originalPrice: 'Apple官方 $5,490',
      salePrice: '$4,941',
      discount: '9折優惠',
      timeLeft: '48小時',
      icon: '📱'
    },
    {
      title: 'iPhone 13 電池更換',
      originalPrice: 'Apple官方 $2,190',
      salePrice: '$1,971',
      discount: '9折優惠',
      timeLeft: '72小時',
      icon: '🔋'
    },
    {
      title: 'iPhone 12 全機檢測',
      originalPrice: 'Apple官方 $590',
      salePrice: '$531',
      discount: '9折優惠',
      timeLeft: '24小時',
      icon: '🔍'
    }
  ]

  const loyaltyProgram = [
    {
      level: '銅牌會員',
      requirement: '累積維修 1 次',
      benefits: ['95折優惠', '優先預約'],
      color: 'from-orange-400 to-orange-600'
    },
    {
      level: '銀牌會員',
      requirement: '累積維修 3 次',
      benefits: ['9折優惠', '免費檢測', '延長保固'],
      color: 'from-gray-400 to-gray-600'
    },
    {
      level: '金牌會員',
      requirement: '累積維修 5 次',
      benefits: ['85折優惠', '免費收送', 'VIP 通道'],
      color: 'from-gold-400 to-gold-600'
    }
  ]



  return (
    <section id="promotions" className="section-padding bg-white">
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
              限時優惠活動
            </h2>
            <p className="text-neutral-600 text-lg sm:text-xl max-w-2xl mx-auto">
              多重優惠等您來享受，讓您的維修體驗更加超值
            </p>
            <div className="w-16 h-1 bg-accent-500 mx-auto mt-8"></div>
          </motion.div>

          {/* 主要優惠 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {mainPromotions.map((promo, index) => (
              <motion.div
                key={index}
                className="bg-white flat-card p-6 md:p-8 group relative overflow-hidden hover:border-neutral-400 transition-all duration-200"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* 背景裝飾 */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${promo.color} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                
                {/* 標章 */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${promo.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <promo.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {promo.badge}
                  </div>
                </div>

                {/* 標題與描述 */}
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {promo.title}
                </h3>
                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {promo.description}
                </p>

                {/* 價格 */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-neutral-400 text-sm line-through">
                      {promo.originalPrice}
                    </span>
                    <span className="text-accent-500 text-lg font-bold">
                      {promo.discountPrice}
                    </span>
                  </div>
                  <div className="text-neutral-500 text-sm">
                    有效期限：{promo.validUntil}
                  </div>
                </div>

                {/* 條件說明 */}
                <div className="space-y-2 mb-6">
                  {promo.terms.map((term, termIndex) => (
                    <div key={termIndex} className="flex items-center">
                      <Star className="w-4 h-4 text-neutral-900 mr-2 flex-shrink-0" />
                      <span className="text-neutral-600 text-sm">{term}</span>
                    </div>
                  ))}
                </div>

                {/* 立即使用按鈕 */}
                <button 
                  className="w-full bg-accent-500 text-white py-3 flat-button font-semibold hover:bg-accent-600 transition-colors duration-200"
                  onClick={() => {
                    const contactSection = document.getElementById('contact')
                    if (contactSection) {
                      const rect = contactSection.getBoundingClientRect()
                      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                      const navbarHeight = window.innerWidth >= 768 ? 80 : 64
                      const targetPosition = rect.top + scrollTop - navbarHeight - 20
                      
                      window.scrollTo({
                        top: Math.max(0, targetPosition),
                        behavior: 'smooth'
                      })
                      
                      // 預填表單優惠資訊
                      setTimeout(() => {
                        const messageTextarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement
                        if (messageTextarea) {
                          messageTextarea.value = `我想使用「${promo.title}」優惠，請協助預約維修服務。`
                          messageTextarea.dispatchEvent(new Event('input', { bubbles: true }))
                        }
                      }, 1000)
                    }
                  }}
                >
                  🎁 立即享受優惠
                </button>
              </motion.div>
            ))}
          </div>

          {/* 限時搶購 */}
          <motion.div
            className="bg-white flat-card p-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-neutral-900">
                限時優惠
              </h3>
              <div className="bg-accent-500 text-white px-4 py-2 text-sm font-medium animate-pulse">
                限時優惠中
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {flashDeals.map((deal, index) => (
                <div key={index} className="border border-neutral-200 p-6 hover:border-neutral-400 transition-colors duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl">{deal.icon}</div>
                    <div className="bg-accent-100 text-accent-600 px-2 py-1 text-sm font-medium">
                      {deal.discount}
                    </div>
                  </div>
                  <h4 className="font-semibold text-neutral-900 mb-2">{deal.title}</h4>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-neutral-400 text-sm line-through">{deal.originalPrice}</span>
                    <span className="text-accent-500 text-lg font-bold">{deal.salePrice}</span>
                  </div>
                  <div className="flex items-center text-neutral-600 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    剩餘 {deal.timeLeft}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 會員制度 */}
          <motion.div
            className="bg-neutral-50 flat-card p-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 text-center mb-8">
              會員專屬優惠
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {loyaltyProgram.map((level, index) => (
                <div key={index} className="bg-white flat-card p-6 text-center">
                  <div className="w-16 h-16 bg-accent-500 flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-xl text-neutral-900 mb-2">{level.level}</h4>
                  <p className="text-neutral-600 text-sm mb-4">{level.requirement}</p>
                  <div className="space-y-2">
                    {level.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center justify-center">
                        <Heart className="w-4 h-4 text-accent-500 mr-2" />
                        <span className="text-sm text-neutral-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  )
} 