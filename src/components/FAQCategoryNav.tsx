"use client"

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Chip from './ui/Chip'
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
  const [underlineLeft, setUnderlineLeft] = useState(0)
  const [underlineWidth, setUnderlineWidth] = useState(0)
  const scrollTimer = useRef<number | null>(null)
  
  // Track first render to prevent auto-scrolling on mount
  const isFirstRender = useRef(true)

  const getItemEl = (index: number): HTMLElement | null => {
    const row = rowRef.current
    if (!row) return null
    const child = row.children.item(index) as HTMLElement | null
    return child
  }

  const measureUnderline = () => {
    const btn = getItemEl(selectedIndex)
    const container = rowRef.current
    if (!btn || !container) return
    const b = btn.getBoundingClientRect()
    const c = container.getBoundingClientRect()
    setUnderlineLeft(b.left - c.left)
    setUnderlineWidth(b.width)
  }

  useLayoutEffect(() => {
    measureUnderline()
    const onResize = () => measureUnderline()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, categories.length])

  useEffect(() => {
    // Skip scrolling on initial render to prevent auto-scrolling the page
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const el = getItemEl(selectedIndex)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' })
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
    window.requestAnimationFrame(() => {
      measureUnderline()
    })
  }

  return (
    <div className="relative">
      {/* Mobile: horizontal chips with underline */}
      <div
        ref={scrollRef}
        className="relative overflow-x-auto no-scrollbar glass-panel rounded-[28px] px-3 py-3 md:hidden"
        role="tablist"
        aria-label="FAQ 分類"
        aria-orientation="horizontal"
        tabIndex={0}
        onKeyDown={onKeyTabs}
        onWheel={onWheelHorizontal}
        onScroll={onScroll}
      >
        <div ref={rowRef} className="relative flex items-center gap-2 w-max">
          {categories.map((cat, i) => (
            <Chip
              key={cat.title}
              id={`faq-tab-${i}`}
              role="tab"
              aria-selected={selectedIndex === i}
              active={selectedIndex === i}
              tabIndex={selectedIndex === i ? 0 : -1}
              onClick={() => onChange(i)}
              onKeyDown={onKeyTabs}
              className="flex items-center gap-2"
            >
              <cat.Icon className="h-4 w-4" />
              <span className="whitespace-nowrap">{cat.title}</span>
              <span className="text-xs text-neutral-500">({cat.count})</span>
            </Chip>
          ))}
          {/* underline */}
          <motion.div
            className="absolute bottom-[-2px] h-[2px] bg-neutral-900/60 rounded-full"
            initial={false}
            animate={{ x: underlineLeft, width: underlineWidth }}
            transition={motionTimings.soft}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Desktop: grid selectable cards */}
      <div
        className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3"
        role="tablist"
        aria-label="FAQ 分類"
        aria-orientation="horizontal"
        tabIndex={0}
        onKeyDown={onKeyTabs}
      >
        {categories.map((cat, i) => (
          <button
            key={cat.title}
            type="button"
            id={`faq-tab-${i}`}
            role="tab"
            aria-selected={selectedIndex === i}
            tabIndex={selectedIndex === i ? 0 : -1}
            onClick={() => onChange(i)}
            className={`group text-left glass-surface p-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 ${
              selectedIndex === i ? 'ring-1 ring-accent-200' : 'hover:-translate-y-0.5'
            }`}
          >
            <div className="glass-content flex items-start gap-3 p-4">
              <div className={`glass-control flex h-10 w-10 items-center justify-center text-neutral-900 transition-all ${selectedIndex === i ? 'bg-white shadow-(--elev-2)' : ''}`}>
                <cat.Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-neutral-900 line-clamp-2">{cat.title}</div>
                <div className="text-xs text-neutral-500">{cat.count} 則問答</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
