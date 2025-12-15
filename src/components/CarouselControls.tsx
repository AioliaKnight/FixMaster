'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

type SliderArrowsProps = {
  onPrev: () => void
  onNext: () => void
  className?: string
  ariaLabelPrev?: string
  ariaLabelNext?: string
}

export function SliderArrows({ onPrev, onNext, className, ariaLabelPrev = '上一個', ariaLabelNext = '下一個' }: SliderArrowsProps) {
  return (
    <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 md:px-3 z-10 pointer-events-none flex items-center justify-between ${className || ''}`}>
      <button
        onClick={onPrev}
        className="pointer-events-auto text-neutral-800 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center transition-all duration-200 rounded-full glass-control shadow-[var(--elev-2)] hover:scale-110 active:scale-95"
        aria-label={ariaLabelPrev}
        type="button"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button
        onClick={onNext}
        className="pointer-events-auto text-neutral-800 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center transition-all duration-200 rounded-full glass-control shadow-[var(--elev-2)] hover:scale-110 active:scale-95"
        aria-label={ariaLabelNext}
        type="button"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  )
}

type SliderDotsProps = {
  count: number
  activeIndex: number
  onDotClick: (index: number) => void
  className?: string
}

export function SliderDots({ count, activeIndex, onDotClick, className }: SliderDotsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className || ''}`}>
      <div className="glass-control px-2 py-1.5 rounded-full flex items-center gap-1.5 bg-white/40 shadow-sm">
        {Array.from({ length: count }, (_, i) => {
          const isActive = activeIndex === i
          return (
            <button
              key={i}
              type="button"
              aria-label={`前往第 ${i + 1} 個項目`}
              aria-current={isActive ? 'true' : undefined}
              aria-pressed={isActive}
              onClick={() => onDotClick(i)}
              className="relative h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/50"
              style={{
                width: isActive ? '24px' : '6px',
                backgroundColor: isActive ? 'rgba(23, 23, 23, 1)' : 'rgba(23, 23, 23, 0.2)'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

