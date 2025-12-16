"use client"

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { motionTimings } from '@/lib/motion'

type IconType = React.ComponentType<{ className?: string }>

export interface FAQCategoryItem {
  title: string
  count: number
  Icon: IconType
}

interface Props {
  categories: FAQCategoryItem[]
  selectedIndex: number
  onChange: (index: number) => void
}

export default function FAQCategoryNav({ categories, selectedIndex, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const rowRef = useRef<HTMLDivElement>(null)
  
  // Track first render to prevent auto-scrolling on mount
  const isFirstRender = useRef(true)

  const getItemEl = (index: number): HTMLElement | null => {
    const row = rowRef.current
    if (!row) return null
    const child = row.children.item(index) as HTMLElement | null
    return child
  }

  useEffect(() => {
    // Skip scrolling on initial render to prevent auto-scrolling the page
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const el = getItemEl(selectedIndex)
    
    if (el && scrollRef.current) {
      const container = scrollRef.current
      const scrollLeft = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    }
  }, [selectedIndex])

  const onKeyTabs = (e: React.KeyboardEvent) => {
    const max = categories.length - 1
    let next = selectedIndex
    if (e.key === 'ArrowRight') next = Math.min(max, selectedIndex + 1)
    if (e.key === 'ArrowLeft') next = Math.max(0, selectedIndex - 1)
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = max
    if (next !== selectedIndex) {
      e.preventDefault()
      onChange(next)
    }
  }

  const onWheelHorizontal: React.WheelEventHandler<HTMLDivElement> = (e) => {
    const sc = scrollRef.current
    if (!sc) return
    sc.scrollLeft += (Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX)
    e.preventDefault()
  }

  const onScroll = () => {
    // No-op for now, but kept for potential future use
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="relative overflow-x-auto no-scrollbar glass-control rounded-full p-1.5 md:p-2 bg-neutral-100/90 backdrop-blur-sm md:bg-neutral-100/50 md:backdrop-blur-md"
        role="tablist"
        aria-label="FAQ 分類"
        aria-orientation="horizontal"
        tabIndex={0}
        onKeyDown={onKeyTabs}
        onWheel={onWheelHorizontal}
        onScroll={onScroll}
      >
        <div ref={rowRef} className="relative flex items-center w-max min-w-full">
          {categories.map((cat, i) => {
            const isActive = selectedIndex === i
            return (
              <button
                key={cat.title}
                id={`faq-tab-${i}`}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange(i)}
                onKeyDown={onKeyTabs}
                className={`relative z-10 flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-full text-[15px] font-bold transition-all duration-300 outline-none select-none ${
                  isActive 
                    ? 'text-white' 
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <cat.Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-current opacity-70'}`} />
                  <span className="whitespace-nowrap">{cat.title}</span>
                  <span className={`text-[11px] font-medium py-0.5 px-1.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-neutral-200/50 text-neutral-500'}`}>
                    {cat.count}
                  </span>
                </span>
                
                {/* Active Background Pill */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-neutral-900 rounded-full shadow-md z-0"
                    transition={motionTimings.spring}
                    style={{ originY: "0px" }} // Optimize for layout animations
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
