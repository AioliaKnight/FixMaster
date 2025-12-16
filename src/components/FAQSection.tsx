'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ChevronLeft, ChevronRight, Smartphone, Tablet, Monitor, Shield, HelpCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { trackClick } from '@/lib/tracking'
import FAQCategoryNav from './FAQCategoryNav'
import Button from './ui/Button'
import SectionHeader from './ui/SectionHeader'
import { motionTimings, motionViewport } from '@/lib/motion'
import { faqCategories } from '@/data/faqs'

const focusableSelector = 'button, a[href], textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function FAQSection() {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0)


  const currentFaqs = faqCategories[selectedCategoryIndex]?.faqs ?? []
  const currentFaq = selectedFaqIndex !== null ? currentFaqs[selectedFaqIndex] : null

  const openFaqDetail = (target: HTMLElement, index: number) => {
    previousFocusRef.current = target
    setSelectedFaqIndex(index)
    setIsSheetOpen(true)
  }

  const closeFaqDetail = () => {
    setIsSheetOpen(false)
    setSelectedFaqIndex(null)
  }

  const goPrevFaq = () => {
    if (!currentFaqs.length || selectedFaqIndex === null) return
    const next = Math.max(0, selectedFaqIndex - 1)
    setSelectedFaqIndex(next)
  }

  const goNextFaq = () => {
    if (!currentFaqs.length || selectedFaqIndex === null) return
    const next = Math.min(currentFaqs.length - 1, selectedFaqIndex + 1)
    setSelectedFaqIndex(next)
  }

  useEffect(() => {
    if (!isSheetOpen) {
      document.body.classList.remove('no-scroll')
      previousFocusRef.current?.focus()
      return
    }

    document.body.classList.add('no-scroll')
    const getFocusables = () => {
      const node = sheetRef.current
      return node ? (Array.from(node.querySelectorAll(focusableSelector)) as HTMLElement[]) : []
    }

    const focusables = getFocusables()
    const initialFocus = closeButtonRef.current ?? focusables[0]
    initialFocus?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeFaqDetail()
        return
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        goPrevFaq()
        return
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        goNextFaq()
        return
      }

      if (event.key !== 'Tab') return
      const items = getFocusables()
      if (items.length === 0) return
      const firstEl = items[0]
      const lastEl = items[items.length - 1]

      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        firstEl.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('no-scroll')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSheetOpen])

  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-[-20%] top-0 h-[360px] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.10),_rgba(255,255,255,0))] blur-[60px] md:blur-[120px]"
        aria-hidden="true"
      />
      <div className="container mx-auto container-padding relative">
        <div className="max-w-6xl mx-auto">
          {/* 區塊標題 */}
          <motion.div
            className="mb-10 md:mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <SectionHeader
              title="常見問答"
              description="針對維修流程、保固與服務收錄最常見的提問，一次解答。"
            />
          </motion.div>

          {/* 新分類導航 */}
          <div className="sticky top-20 z-30 mb-8 md:mb-10 -mx-4 px-4 md:mx-0 md:px-0 transform-gpu">
            <div className="relative z-10 max-w-4xl mx-auto">
            <FAQCategoryNav
              categories={faqCategories.map(c => ({
                title: c.title,
                count: c.faqs.length,
                Icon: c.title.includes('iPhone') ? Smartphone
                  : c.title.includes('iPad') ? Tablet
                  : c.title.includes('Mac') ? Monitor
                  : c.title.includes('服務') ? Shield
                  : HelpCircle
              }))}
              selectedIndex={selectedCategoryIndex}
              onChange={(i) => {
                setSelectedCategoryIndex(i)
                setSelectedFaqIndex(null)
              }}
            />
            </div>
          </div>

          {/* 問題卡片網格 */}
          <motion.div
            id="faq-panel"
            role="tabpanel"
            aria-labelledby={`faq-tab-${selectedCategoryIndex}`}
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 min-h-[50vh]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            {currentFaqs.map((faq, index) => (
              <motion.button
                key={`${faq.question}-${index}`}
                type="button"
                onClick={(event) => openFaqDetail(event.currentTarget, index)}
                className="text-left glass-surface p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:ring-offset-2 hover:-translate-y-1 motion-soft-enter group"
                aria-haspopup="dialog"
                aria-controls="faq-bottom-sheet"
                aria-expanded={isSheetOpen && selectedFaqIndex === index}
                initial={{ opacity: 0, scale: 0.98, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...motionTimings.soft, delay: index * 0.03 }}
              >
                <div className="glass-content flex flex-col gap-4 p-6 h-full bg-white/40 group-hover:bg-white/60 transition-colors">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="glass-control flex h-10 w-10 flex-shrink-0 items-center justify-center md:h-12 md:w-12 shadow-[var(--elev-2)] bg-white/80">
                      <faq.icon className="w-5 h-5 md:w-6 md:h-6 text-neutral-900" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="mb-1.5 text-[15px] md:text-base font-bold text-neutral-900 line-clamp-2 leading-tight text-balance">
                        {faq.question}
                      </h3>
                      <div className="mb-2 text-xs font-medium text-neutral-500 md:text-sm">
                        {faq.category}
                      </div>
                      <p className="text-xs text-neutral-600 md:text-sm line-clamp-2 whitespace-pre-line leading-relaxed text-pretty">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs font-medium text-neutral-500 md:text-sm mt-auto pt-2 border-t border-neutral-200/30">
                    <span>查看完整解答</span>
                    <span className="inline-flex p-1 rounded-full glass-control shadow-sm group-hover:bg-white transition-colors">
                      <ArrowRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-neutral-900 transition-colors" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Bottom Sheet */}
          {mounted && createPortal(
            <AnimatePresence>
              {isSheetOpen && currentFaq && (
                <motion.div
                  className="fixed inset-0 z-[10000] flex flex-col"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="faq-sheet-title"
                  aria-describedby="faq-sheet-description"
                >
                  <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
                    onClick={closeFaqDetail}
                    aria-hidden="true"
                  />

                  <motion.div
                    ref={sheetRef}
                    className="mt-auto glass-panel border border-white/40 motion-soft-enter shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    id="faq-bottom-sheet"
                    style={{ borderRadius: '24px 24px 0 0' }}
                  >
                    <div className="glass-content overflow-hidden pb-safe bg-white/90 backdrop-blur-xl" style={{ maxHeight: '85dvh', borderRadius: '24px 24px 0 0' }}>
                      <div className="flex justify-center pt-3 pb-1" onClick={closeFaqDetail}>
                        <div className="h-1.5 w-12 rounded-full bg-neutral-300/80" aria-hidden="true" />
                      </div>

                      <div className="flex items-start justify-between px-5 py-4 md:px-8 md:py-6 border-b border-neutral-100">
                        <div className="flex items-start gap-4 pr-4">
                          <div className="glass-control flex h-12 w-12 items-center justify-center text-neutral-900 shadow-[var(--elev-2)] bg-white">
                            <currentFaq.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div>
                            <h3 id="faq-sheet-title" className="text-lg md:text-xl font-bold text-neutral-900 leading-tight text-balance">
                              {currentFaq.question}
                            </h3>
                            <div className="mt-1.5 text-sm font-medium text-neutral-500">
                              {currentFaq.category}
                            </div>
                          </div>
                        </div>
                        <button
                          ref={closeButtonRef}
                          type="button"
                          aria-label="關閉"
                          className="glass-control p-2.5 text-neutral-500 transition-colors duration-200 hover:text-neutral-900 hover:bg-white active:scale-95"
                          onClick={closeFaqDetail}
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="px-5 md:px-8 pt-6 pb-4 overscroll-contain overflow-y-auto text-neutral-800 leading-relaxed text-[15px] md:text-lg whitespace-pre-line font-medium text-pretty" style={{ maxHeight: 'calc(85dvh - 180px)' }} id="faq-sheet-description">
                        {currentFaq.answer}
                      </div>

                      <div className="px-5 md:px-8 py-5 border-t border-neutral-100 bg-white/50">
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <button
                            type="button"
                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-30"
                            onClick={goPrevFaq}
                            disabled={(selectedFaqIndex ?? 0) <= 0}
                          >
                            <ChevronLeft className="h-4 w-4" /> 上一題
                          </button>
                          <span className="text-xs font-medium text-neutral-400">
                            {selectedFaqIndex !== null ? selectedFaqIndex + 1 : 0} / {currentFaqs.length}
                          </span>
                          <button
                            type="button"
                            className="text-sm font-medium text-neutral-500 hover:text-neutral-900 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors disabled:opacity-30"
                            onClick={goNextFaq}
                            disabled={(selectedFaqIndex ?? 0) >= currentFaqs.length - 1}
                          >
                            下一題 <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="glass-control px-4 py-3 text-sm font-medium text-neutral-600 mb-4 shadow-sm bg-white/60 flex items-start gap-2" aria-hidden="true">
                          <div className="mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500" />
                          仍有疑問？歡迎直接聯繫，我們將提供更詳細的說明。
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                          <Button
                            variant="outline"
                            className="sm:w-auto motion-hover-pop font-bold text-[15px]"
                            onClick={() => {
                              trackClick('faq_sheet_contact_line')
                              window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=faq_sheet&utm_campaign=contact_line', '_blank')
                            }}
                          >
                            透過 LINE 詢問
                          </Button>
                          <Button
                            className="sm:w-auto motion-hover-pop font-bold shadow-lg text-[15px]"
                            onClick={() => {
                              trackClick('faq_sheet_contact_book_line')
                              window.open('https://line.me/R/ti/p/@fixmaster?utm_source=website&utm_medium=faq_sheet&utm_campaign=contact_line', '_blank')
                            }}
                          >
                            預約維修時段
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}

          {/* 結尾 CTA */}
          <motion.div
            className="mt-12 md:mt-16 glass-panel p-1 text-center motion-soft-enter"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={motionTimings.soft}
            viewport={motionViewport}
          >
            <div className="glass-content px-6 py-8 text-center md:px-10 md:py-12 space-y-6 bg-white/40">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-neutral-900 md:text-3xl text-balance">
                  還有其他問題嗎？
                </h3>
                <p className="mx-auto max-w-2xl text-neutral-600 text-base font-medium text-pretty">
                  我們的專業客服團隊隨時為您解答，歡迎透過以下方式聯絡我們。
                </p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Button
                  className="px-8 py-4 text-[15px] font-bold motion-hover-pop w-full sm:w-auto"
                  onClick={() => trackClick('faq_tel_click', { section: 'faq' })}
                >
                  直接撥打電話
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 text-[15px] font-bold motion-hover-pop w-full sm:w-auto"
                  onClick={() => trackClick('faq_line_click', { section: 'faq' })}
                >
                  LINE 線上諮詢
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
