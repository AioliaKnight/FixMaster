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
          ? 'bg-neutral-900 text-white border-neutral-900'
          : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-400'
      } border flat-button whitespace-nowrap px-4 py-2 text-sm rounded-none ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}


