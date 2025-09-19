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
          ? 'bg-neutral-900 text-white'
          : 'bg-white/50 text-neutral-800'
      } flat-button whitespace-nowrap px-4 py-2 text-sm glass-elevated ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}


