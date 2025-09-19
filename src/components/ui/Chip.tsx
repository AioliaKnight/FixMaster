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
          ? 'bg-neutral-900 text-white shadow-[var(--elev-2)]'
          : 'glass-control text-neutral-900'
      } pill-button whitespace-nowrap px-4 py-2 text-sm ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}

