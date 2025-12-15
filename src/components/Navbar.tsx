'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle } from 'lucide-react'
import { scrollToSectionId } from '@/lib/scroll'
import { trackClick } from '@/lib/tracking'
import { motionTimings } from '@/lib/motion'

const focusableSelector = 'button, a[href], [role="menuitem"], [tabindex]:not([tabindex="-1"])'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [prefersHighContrast, setPrefersHighContrast] = useState(false)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)

  const openMenu = () => {
    startTransition(() => setIsMenuOpen(true))
    document.body.classList.add('no-scroll')
  }

  const closeMenu = () => {
    startTransition(() => setIsMenuOpen(false))
    document.body.classList.remove('no-scroll')
  }

  // 使用 IntersectionObserver 優化滾動監聽
  useEffect(() => {
    if (typeof window === 'undefined' || isMenuOpen) return

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // 初始化檢查

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // 調整觸發區域，讓判斷更符合視覺中心
      threshold: 0
    }

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = ['home', 'services', 'testimonials', 'faq', 'trust', 'contact']
    
    sections.forEach((section) => {
      const el = document.getElementById(section)
      if (el) observer.observe(el)
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [isMenuOpen])

  // 行動選單焦點管理與鍵盤操作
  useEffect(() => {
    if (!isMenuOpen) {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
      return
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null

    const menuNode = menuContainerRef.current
    const focusables = menuNode ? (Array.from(menuNode.querySelectorAll(focusableSelector)) as HTMLElement[]) : []
    focusables[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
        return
      }

      if (event.key !== 'Tab' || focusables.length === 0) return

      const firstEl = focusables[0]
      const lastEl = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMenuOpen])

  const navigationItems = [
    { name: '首頁', href: '#home' },
    { name: '服務項目', href: '#services' },
    { name: '顧客評價', href: '#testimonials' },
    { name: '常見問答', href: '#faq' },
    { name: '安心承諾', href: '#trust' },
    { name: '聯絡我們', href: '#contact' },
  ]

  const navToneClass = isScrolled || isMenuOpen
    ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-neutral-200/50'
    : 'bg-transparent border-transparent'

  const navHeightClass = isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'

  const menuButtonClass = `lg:hidden glass-control p-2.5 transition-all duration-300 z-50 ${
    isMenuOpen
      ? 'bg-white text-neutral-900 shadow-[var(--elev-2)]'
      : 'text-neutral-700 hover:text-neutral-900 bg-white/50 backdrop-blur-md'
  }`

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '')
    closeMenu()

    setTimeout(() => {
      scrollToSectionId(targetId)
    }, 120)
  }

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  useEffect(() => () => document.body.classList.remove('no-scroll'), [])

  // 偏好高對比：提升玻璃對比（避免重度透明降低可讀性）
  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(prefers-contrast: more)')
    setPrefersHighContrast(!!mq.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersHighContrast(!!e.matches)
    mq.addEventListener?.('change', handler)
    return () => mq.removeEventListener?.('change', handler)
  }, [])

  const boostClass = (isScrolled || isMenuOpen || prefersHighContrast) ? 'glass-contrast-boost' : ''
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out transform-gpu ${navToneClass} ${boostClass} pt-safe`}>
      <div className="container mx-auto container-padding">
        <div className={`flex items-center justify-between ${navHeightClass} transition-all duration-300 ease-in-out`}>
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={motionTimings.soft}
          >
            <button
              onClick={() => {
                trackClick('navbar_logo_click')
                handleNavClick('#home')
              }}
              className="group relative inline-flex items-center gap-2 rounded-full glass-control px-3.5 py-2 pr-4 text-neutral-900 transition-all duration-300 hover:shadow-[var(--elev-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 motion-hover-pop"
              aria-label="前往首頁"
            >
              <span className="sr-only">FixMaster 維修大師</span>
              <span className="flex items-center gap-1.5 md:gap-2">
                <span className="text-[18px] md:text-[20px] tracking-tight font-semibold text-neutral-900">Fix</span>
                <span className="text-[18px] md:text-[20px] tracking-tight font-normal text-neutral-900">Master</span>
              </span>
            </button>
          </motion.div>

          {/* 桌面版導航選單 */}
          <motion.div
            className="hidden lg:flex items-center space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...motionTimings.soft, delay: 0.08 }}
          >
            {navigationItems.map((item) => {
              const isActive = activeSection === item.href.replace('#', '')
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    trackClick('navbar_nav_click', { target: item.href })
                    handleNavClick(item.href)
                  }}
                  className={`relative text-sm font-medium transition-colors duration-200 hover:text-neutral-900 ${
                    isActive ? 'text-neutral-900' : 'text-neutral-600'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 h-px w-full bg-neutral-900"
                      layoutId="activeIndicator"
                    />
                  )}
                </button>
              )
            })}
          </motion.div>

          {/* 桌面版聯絡按鈕 */}
          <motion.div
            className="hidden lg:flex items-center space-x-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...motionTimings.soft, delay: 0.16 }}
          >
            <a
              href="tel:+886-2-2816-6666"
              className="flex items-center space-x-2 text-neutral-700 transition-colors duration-200 hover:text-neutral-900 motion-soft-enter"
              onClick={() => trackClick('navbar_tel_click')}
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">02-2816-6666</span>
            </a>
            <a
              href="https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=navbar&utm_campaign=contact_line"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 transition-colors duration-200 hover:text-accent-700 text-sm font-medium motion-soft-enter"
              onClick={() => trackClick('navbar_line_click')}
            >
              LINE 預約 / 諮詢
            </a>
          </motion.div>

          {/* 行動版選單按鈕 */}
          <motion.button
            className={`${menuButtonClass} motion-hover-pop`}
            onClick={toggleMenu}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={motionTimings.soft}
            aria-label={isMenuOpen ? '關閉選單' : '開啟選單'}
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
            ref={menuContainerRef}
            className="lg:hidden px-4 pb-6 pt-3"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={motionTimings.soft}
            style={{ willChange: 'transform, opacity' }}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="行動版網站導覽"
          >
            <div className="max-w-lg mx-auto">
              <div className="glass-panel rounded-[32px] shadow-[var(--glass-thick-shadow)] px-6 py-8 space-y-8">
                <div className="space-y-3">
                  {navigationItems.map((item, index) => {
                    const isActive = activeSection === item.href.replace('#', '')
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={`group relative flex w-full items-center justify-between px-6 py-4 text-[17px] font-medium transition-all duration-300 shadow-none motion-soft-enter rounded-[20px] ${
                          isActive
                            ? 'bg-neutral-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]'
                            : 'glass-control text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                        }`}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ...motionTimings.soft, delay: index * 0.02 }}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="flex items-center gap-2">{item.name}</span>
                        {isActive && <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" aria-hidden="true" />}
                      </motion.button>
                    )
                  })}
                </div>

                <motion.div
                  className="space-y-4 border-t border-neutral-200/50 pt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...motionTimings.soft, delay: 0.28 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-semibold pl-1">
                    快速聯絡
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="tel:+886-2-2816-6666"
                      className="glass-control flex items-center justify-center gap-2 py-3.5 text-neutral-900 transition-all duration-300 hover:bg-white active:scale-95"
                      onClick={() => {
                        trackClick('navbar_tel_click', { context: 'mobile_menu' })
                        closeMenu()
                      }}
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-[15px] font-medium">電話</span>
                    </a>
                    <a
                      href="https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=mobile_menu&utm_campaign=contact_line"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-control flex items-center justify-center gap-2 py-3.5 text-[#00B900] transition-all duration-300 hover:bg-white active:scale-95"
                      onClick={() => {
                        trackClick('navbar_line_click', { context: 'mobile_menu' })
                        closeMenu()
                      }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-[15px] font-medium">LINE</span>
                    </a>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed px-1">
                    提醒：LINE 與電話均由 IRP 認證顧問接聽，若選擇 LINE 對話可預留常用時段，我們會給予到府收送建議。
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
