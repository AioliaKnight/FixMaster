'use client'

import { useState, useEffect, useRef } from 'react'
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
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)

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

      if (timeoutId) clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        const sections = ['home', 'services', 'testimonials', 'faq', 'trust', 'promotions', 'contact']
        const navbarHeight = window.innerWidth >= 768 ? 80 : 64
        let currentSection = 'home'

        for (const section of sections) {
          const element = document.getElementById(section)
          if (!element) continue
          const rect = element.getBoundingClientRect()
          if (rect.top <= navbarHeight + 50 && rect.bottom >= navbarHeight + 50) {
            currentSection = section
            break
          }
        }

        setActiveSection(currentSection)
      }, 100)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

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
    { name: '優惠活動', href: '#promotions' },
    { name: '聯絡我們', href: '#contact' },
  ]

  const navToneClass = isScrolled || isMenuOpen
    ? 'glass-panel border border-white/25 shadow-[var(--elev-1)]'
    : 'glass-surface border border-transparent'

  const navHeightClass = isScrolled ? 'h-14 md:h-18' : 'h-16 md:h-20'

  const menuButtonClass = `lg:hidden glass-control p-2 transition-all duration-200 z-50 ${
    isMenuOpen
      ? 'glass-elevated text-neutral-900 shadow-[var(--brand-glow)]'
      : 'text-neutral-700 hover:text-neutral-900'
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navToneClass} glass-contrast-boost`}>
      <div className="container mx-auto container-padding">
        <div className={`flex items-center justify-between ${navHeightClass} transition-all duration-200`}>
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
              className="group relative inline-flex items-center gap-2 rounded-full glass-control glass-elevated px-3.5 py-2 pr-4 text-neutral-900 transition-all duration-200 hover:shadow-[var(--brand-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 motion-hover-pop"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
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
              LINE 諮詢
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
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={motionTimings.soft}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="行動版網站導覽"
          >
            <div className="max-w-lg mx-auto">
              <div className="glass-panel border border-white/25 rounded-[24px] shadow-[var(--elev-2)] px-5 py-6 space-y-6">
                <div className="space-y-3">
                  {navigationItems.map((item, index) => {
                    const isActive = activeSection === item.href.replace('#', '')
                    return (
                      <motion.button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={`group relative flex w-full items-center justify-between px-5 py-4 text-base font-medium transition-all duration-200 shadow-none motion-soft-enter ${
                          isActive
                            ? 'glass-control glass-elevated text-neutral-900 shadow-[var(--brand-glow)]'
                            : 'glass-control text-neutral-600 hover:text-neutral-900'
                        }`}
                        style={{ borderRadius: 'var(--radius-xl)' }}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ ...motionTimings.soft, delay: index * 0.04 }}
                        aria-current={isActive ? 'page' : undefined}
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
                  transition={{ ...motionTimings.soft, delay: 0.28 }}
                >
                  <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500">
                    快速聯絡
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href="tel:+886-2-2816-6666"
                      className="glass-control glass-elevated flex items-center justify-center gap-2 py-3 text-neutral-900 transition-all duration-200 motion-soft-enter"
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
                      href="https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=mobile_menu&utm_campaign=contact_line"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-control glass-elevated flex items-center justify-center gap-2 py-3 text-neutral-900 transition-all duration-200 motion-soft-enter"
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
                  <p className="text-xs text-neutral-500 leading-relaxed">
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
