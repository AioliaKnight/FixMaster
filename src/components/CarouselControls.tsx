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
    <div className={`flex items-center justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 z-10 pointer-events-none ${className || ''}`}>
      <button
        onClick={onPrev}
        className="pointer-events-auto bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors duration-200 ml-3 md:ml-4 rounded-full shadow-sm"
        aria-label={ariaLabelPrev}
        type="button"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={onNext}
        className="pointer-events-auto bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-700 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors duration-200 mr-3 md:mr-4 rounded-full shadow-sm"
        aria-label={ariaLabelNext}
        type="button"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
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


