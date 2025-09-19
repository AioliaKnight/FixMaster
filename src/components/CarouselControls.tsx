'use client'

import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
        className="pointer-events-auto bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors duration-150 rounded-none shadow-none"
        aria-label={ariaLabelPrev}
        type="button"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button
        onClick={onNext}
        className="pointer-events-auto bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-colors duration-150 rounded-none shadow-none"
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
    <div className={`flex items-center justify-center space-x-2 ${className || ''}`}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`前往第 ${i + 1} 個項目`}
          onClick={() => onDotClick(i)}
          className={activeIndex === i ? 'w-2.5 h-2.5 rounded-full bg-neutral-900' : 'w-2.5 h-2.5 rounded-full bg-neutral-300'}
        />
      ))}
    </div>
  )
}


