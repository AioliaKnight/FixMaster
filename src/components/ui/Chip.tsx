'use client'

import React from 'react'

type ChipProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}

export default function Chip({ active = false, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={`${
        active
          ? 'bg-neutral-900 text-white shadow-[0_2px_10px_rgba(0,0,0,0.12)] border-transparent'
          : 'glass-control text-neutral-700 hover:text-neutral-900'
      } inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[15px] font-medium transition-all duration-300 active:scale-95 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
