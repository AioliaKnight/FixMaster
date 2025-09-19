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

  const openMenu = () => {
    setIsMenuOpen(true)
    document.body.classList.add('no-scroll')
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
    document.body.classList.remove('no-scroll')
  }

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

  const navToneClass = isScrolled || isMenuOpen
    ? 'glass-surface glass-strong border border-white/25 shadow-[var(--elev-1)]'
    : 'glass-surface border border-transparent'

  const navHeightClass = isScrolled ? 'h-14 md:h-18' : 'h-16 md:h-20'

  const menuButtonClass = `lg:hidden glass-control p-2 transition-all duration-200 z-50 ${
    isMenuOpen
      ? 'glass-strong text-neutral-900 shadow-[var(--brand-glow)]'
      : 'text-neutral-700 hover:text-neutral-900'
  }`

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    closeMenu()

    if (element) {
      // 使用 setTimeout 確保選單關閉動畫完成後再滾動
      setTimeout(() => {
        scrollToSectionId(targetId)
      }, 100)
    }
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  // 清理效果
  useEffect(() => {
    return () => {
      document.body.classList.remove('no-scroll')
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navToneClass}`}>
      <div className="container mx-auto container-padding">
        <div className={`flex items-center justify-between ${navHeightClass} transition-all duration-200`}>
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
                <span aria-hidden className="mx-2 h-2 w-2 rounded-full bg-accent-500 group-hover:bg-accent-600 transition-colors duration-200" />
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
            className={menuButtonClass}
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
            className="lg:hidden px-4 pb-6 pt-3"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
          >
            <div className="max-w-lg mx-auto">
              <div className="glass-surface glass-strong border border-white/25 rounded-[24px] shadow-[var(--elev-2)] px-5 py-6 space-y-6">
                <div className="space-y-3">
                  {navigationItems.map((item, index) => {
                    const isActive = activeSection === item.href.replace('#', '')
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={`group relative flex w-full items-center justify-between px-5 py-4 text-base font-medium transition-all duration-200 shadow-none ${
                          isActive
                            ? 'glass-control glass-strong text-neutral-900 shadow-[var(--brand-glow)]'
                            : 'glass-control text-neutral-600 hover:text-neutral-900'
                        }`}
                        style={{ borderRadius: 'var(--radius-xl)' }}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                      >
                        <span className="flex items-center gap-2">{item.name}</span>
                        <span
                          className={`h-2 w-2 rounded-full transition-colors duration-200 ${
                            isActive
                              ? 'bg-accent-500 shadow-[0_0_8px_rgba(239,68,68,0.45)]'
                              : 'bg-white/40 group-hover:bg-white/70'
                          }`}
                          aria-hidden="true"
                        />
                      </motion.button>
                    )
                  })}
                </div>

                <motion.div
                  className="space-y-3 border-t border-white/20 pt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.25 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
                    快速聯絡
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+886-2-2816-6666"
                      className="glass-control glass-strong flex items-center justify-center gap-2 py-3 text-neutral-900 transition-all duration-200"
                      style={{ borderRadius: 'var(--radius-xl)' }}
                      onClick={() => {
                        trackClick('navbar_tel_click', { context: 'mobile_menu' })
                        closeMenu()
                      }}
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-sm font-medium">電話</span>
                    </a>
                    <a
                      href="https://line.me/R/ti/p/@fixmaster"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-control glass-strong flex items-center justify-center gap-2 py-3 text-neutral-900 transition-all duration-200"
                      style={{ borderRadius: 'var(--radius-xl)' }}
                      onClick={() => {
                        trackClick('navbar_line_click', { context: 'mobile_menu' })
                        closeMenu()
                      }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">LINE</span>
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
} 
