'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { scrollToSectionId } from '@/lib/scroll'
import { trackClick } from '@/lib/tracking'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // 監聽滾動事件
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // 使用防抖來優化性能
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      
      timeoutId = setTimeout(() => {
        // 判斷當前在哪個區塊
        const sections = ['home', 'services', 'testimonials', 'faq', 'trust', 'promotions', 'contact']
        let currentSection = 'home'
        
        // 獲取導航欄高度
        const navbarHeight = window.innerWidth >= 768 ? 80 : 64
        
        for (const section of sections) {
          const element = document.getElementById(section)
          if (element) {
            const rect = element.getBoundingClientRect()
            // 如果區塊的頂部在導航欄下方，且底部在視窗中，則認為是當前區塊
            if (rect.top <= navbarHeight + 50 && rect.bottom >= navbarHeight + 50) {
              currentSection = section
              break
            }
          }
        }
        
        setActiveSection(currentSection)
      }, 100) // 100ms 防抖延遲
    }

    // 初始化時檢查一次
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // 添加resize監聽器以處理螢幕方向改變
    window.addEventListener('resize', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  const navigationItems = [
    { name: '首頁', href: '#home' },
    { name: '服務項目', href: '#services' },
    { name: '顧客評價', href: '#testimonials' },
    { name: '常見問答', href: '#faq' },
    { name: '安心承諾', href: '#trust' },
    { name: '優惠活動', href: '#promotions' },
    { name: '聯絡我們', href: '#contact' }
  ]

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      // 關閉選單和解鎖滾動
      setIsMenuOpen(false)
      document.body.classList.remove('no-scroll')
      
      // 使用 setTimeout 確保選單關閉動畫完成後再滾動
      setTimeout(() => {
        scrollToSectionId(targetId)
      }, 100)
    } else {
      // 如果找不到元素，也要關閉選單
      setIsMenuOpen(false)
      document.body.classList.remove('no-scroll')
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // 防止背景滾動
    if (!isMenuOpen) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  // 清理效果
  useEffect(() => {
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-neutral-200`}>
      <div className="container mx-auto container-padding">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button 
              onClick={() => { trackClick('navbar_logo_click'); handleNavClick('#home') }}
              className="group flex items-center hover:opacity-90 transition-opacity duration-200"
              aria-label="前往首頁"
            >
              <span className="sr-only">FixMaster 維修大師</span>
              <span className="flex items-center">
                <span className="text-[18px] md:text-[20px] tracking-tight font-semibold text-neutral-900">Fix</span>
                <span aria-hidden className="mx-2 h-2 w-2 bg-accent-500 group-hover:bg-accent-600 transition-colors duration-200" />
                <span className="text-[18px] md:text-[20px] tracking-tight font-normal text-neutral-900">Master</span>
              </span>
            </button>
          </motion.div>

          {/* 桌面版導航選單 */}
          <motion.div 
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { trackClick('navbar_nav_click', { target: item.href }); handleNavClick(item.href) }}
                className={`relative text-sm font-medium transition-colors duration-200 hover:text-neutral-900 ${
                  activeSection === item.href.replace('#', '') 
                    ? 'text-neutral-900' 
                    : 'text-neutral-600'
                }`}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-px bg-neutral-900"
                    layoutId="activeIndicator"
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* 桌面版聯絡按鈕 */}
          <motion.div 
            className="hidden lg:flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <a
              href="tel:+886-2-2816-6666"
              className="flex items-center space-x-2 text-neutral-700 hover:text-neutral-900 transition-colors duration-200"
              onClick={() => trackClick('navbar_tel_click')}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">02-2816-6666</span>
            </a>
            <a
              href="https://line.me/R/ti/p/@fixmaster"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 hover:text-accent-700 transition-colors duration-200 text-sm font-medium"
              onClick={() => trackClick('navbar_line_click')}
            >
              LINE 諮詢
            </a>
          </motion.div>

          {/* 行動版選單按鈕 */}
          <motion.button
            className="lg:hidden p-2 text-neutral-700 hover:text-accent-500 transition-colors duration-200 z-50"
            onClick={toggleMenu}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            aria-label={isMenuOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* 行動版選單 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="lg:hidden bg-white border-t border-neutral-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
          >
            <div className="container mx-auto container-padding py-4">
              <div className="space-y-4">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full text-left py-4 px-6 transition-all duration-200 hover:bg-neutral-50 active:bg-neutral-100 ${
                      activeSection === item.href.replace('#', '')
                        ? 'text-neutral-900 bg-neutral-50 border-l border-neutral-900 font-medium'
                        : 'text-neutral-700 hover:text-neutral-900'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="flex items-center">
                      {item.name}
                      {activeSection === item.href.replace('#', '') && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-neutral-900"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </span>
                  </motion.button>
                ))}
                
                {/* 行動版聯絡按鈕 */}
                <motion.div 
                  className="pt-4 border-t border-neutral-200 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <a
                    href="tel:+886-2-2816-6666"
                    className="flex items-center space-x-3 p-4 text-neutral-700 hover:bg-neutral-50 active:bg-neutral-100 transition-colors duration-200"
                    onClick={() => trackClick('navbar_tel_click', { context: 'mobile_menu' })}
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">02-2816-6666</span>
                  </a>
                  <a
                    href="https://line.me/R/ti/p/@fixmaster"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-accent-600 p-4 font-medium hover:bg-neutral-50 active:bg-neutral-100 transition-colors duration-200"
                    onClick={() => trackClick('navbar_line_click', { context: 'mobile_menu' })}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>LINE 諮詢</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 